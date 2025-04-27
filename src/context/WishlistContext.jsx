import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AuthContext } from "./AuthContext";

// Create the Wishlist Context
const WishlistContext = createContext();

// Wishlist Provider Component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false); // New loading state
  const { user, logout } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Fetch the user's wishlist when the component mounts or user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const wishlistRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/wishlist/uid/${user._id}`,
            {
              headers: { authorization: `Bearer ${user.jwt}` },
            }
          );
          const wishlistData = wishlistRes.data.data || [];
          setWishlist(wishlistData);
          console.log("Fetched wishlist:", wishlistData); // Debug log
        } catch (error) {
          console.error("Error fetching wishlist:", error);
          if (error.response?.status !== 404) {
            toast.error(
              currentLanguage === "ar"
                ? "فشل في جلب قائمة الرغبات"
                : "Failed to fetch wishlist",
              {
                position: "top-right",
                autoClose: 3000,
              }
            );
          }
          setWishlist([]);
        }
      }
    };

    fetchWishlist();
  }, [user, currentLanguage]);

  // Function to fetch wishlist (reused in handleWishlist)
  const fetchWishlist = async () => {
    try {
      const wishlistRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist/uid/${user._id}`,
        {
          headers: { authorization: `Bearer ${user.jwt}` },
        }
      );
      const wishlistData = wishlistRes.data.data || [];
      setWishlist(wishlistData);
      console.log("Refreshed wishlist:", wishlistData); // Debug log
      return wishlistData;
    } catch (error) {
      console.error("Error refreshing wishlist:", error);
      setWishlist([]);
      return [];
    }
  };

  // Function to handle adding or removing cars from the wishlist
  const handleWishlist = async (car) => {
    if (!user) {
      toast.warn(
        currentLanguage === "ar"
          ? "يرجى تسجيل الدخول قبل إدارة قائمة الرغبات الخاصة بك"
          : "Please log in before managing your wishlist",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    if (isWishlistLoading) {
      console.log("Wishlist action in progress, please wait...");
      return; // Prevent multiple simultaneous actions
    }

    setIsWishlistLoading(true); // Set loading state

    try {
      // Refresh wishlist to ensure we have the latest data
      const latestWishlist = await fetchWishlist();
      const wishlistItem = latestWishlist.find(
        (item) => item.car?._id === car._id
      );

      if (wishlistItem) {
        // Remove from wishlist
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/wishlist/${wishlistItem._id}`,
          {
            headers: { authorization: `Bearer ${user.jwt}` },
          }
        );
        await fetchWishlist(); // Refresh wishlist after deletion
        toast.success(
          currentLanguage === "ar"
            ? "تم إزالة السيارة من قائمة الرغبات"
            : "Car removed from wishlist",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        // Add to wishlist
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/wishlist`,
          {
            userId: user._id,
            carId: car._id,
          },
          {
            headers: { authorization: `Bearer ${user.jwt}` },
          }
        );
        console.log("Add wishlist response:", res.data); // Debug log
        await fetchWishlist(); // Refresh wishlist after addition
        toast.success(
          currentLanguage === "ar"
            ? "تم إضافة السيارة إلى قائمة الرغبات"
            : "Car added to wishlist",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Error in wishlist action:", error);
      toast.error(
        currentLanguage === "ar"
          ? "فشل في تحديث قائمة الرغبات"
          : "Failed to update wishlist",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsWishlistLoading(false); // Reset loading state
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, handleWishlist, isWishlistLoading }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use Wishlist Context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};