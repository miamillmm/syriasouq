import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import img1 from "../../assets/car/IMG_1.jpeg";
import img2 from "../../assets/car/IMG_2.jpeg";
import img3 from "../../assets/car/IMG_3.jpeg";
import img4 from "../../assets/car/IMG_4.jpeg";
import img5 from "../../assets/car/IMG_5.jpeg";
import img6 from "../../assets/car/IMG_6.jpeg";
import img7 from "../../assets/car/IMG_7.jpeg";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const images = [img1, img2, img3, img4, img5, img6, img7];

export default function Gallery() {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 max-w-5xl mx-auto">
      {/* Left Side - Main Image */}
      <div className="w-full md:w-2/3">
        <img
          src={mainImage}
          alt="Main Preview"
          className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Swiper Slider */}
      <div className="w-full md:w-1/3 flex flex-col gap-2 relative h-[320px] md:h-[500px]">
        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute -top-6 left-1/2 transform -translate-x-1/2 text-white p-2 z-10 cursor-pointer">
          <IoIosArrowUp className="text-gray-500 w-8 h-8 md:w-16 md:h-16" />
        </button>
        <button className="swiper-button-next-custom absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white p-2 cursor-pointer z-10">
          <IoIosArrowDown className="text-gray-500 w-8 h-8 md:w-16 md:h-16" />
        </button>

        <Swiper
          direction="vertical"
          slidesPerView={2}
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          className="h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="h-[140px] md:h-[240px]">
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover cursor-pointer rounded-lg hover:opacity-80"
                onClick={() => setMainImage(img)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
