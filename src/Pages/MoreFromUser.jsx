import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import img1 from "../assets/car/IMG_1.jpeg";
import img2 from "../assets/car/IMG_2.jpeg";
import img3 from "../assets/car/IMG_3.jpeg";
import img4 from "../assets/car/IMG_4.jpeg";
import img5 from "../assets/car/IMG_5.jpeg";
import img6 from "../assets/car/IMG_6.jpeg";
import img7 from "../assets/car/IMG_7.jpeg";
import img8 from "../assets/car/IMG_8.jpeg";
import img9 from "../assets/car/IMG_9.jpeg";
import { Link } from "react-router";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

const cars = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnIXnEn2igucsK9Q_gFJaJK5KAosOuYey94wWA6G-0oYoTjet1UBXHjJeaCuhM939L00Y&usqp=CAU",
    carName: "Tesla Model S",
    price: 79999,
    views: 1200,
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8G0BYbt9A82jA2mO7rHdrIL96WTS8ZAn6w&s",
    carName: "BMW X5",
    price: 60999,
    views: 985,
  },
  {
    id: 3,
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Q7/12198/1732789850926/side-view-(left)-90.jpg",
    carName: "Audi Q7",
    price: 68999,
    views: 1100,
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkd5e_Bq8kcICm4-iK0FKiynTvPLe3Vyxqg&s",
    carName: "Mercedes-Benz GLE",
    price: 72999,
    views: 1300,
  },
  {
    id: 5,
    image:
      "https://images.prismic.io/carwow/c2d2e740-99e2-4faf-8cfa-b5a75c5037c0_ford-mustang-2024-lhd-front34static.jpg?auto=format&cs=tinysrgb&fit=crop&q=60&w=750",
    carName: "Ford Mustang",
    price: 55999,
    views: 1450,
  },
  {
    id: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzKd67PTSEk4QXu6aVdKzy0-MOroC2XXryAw&s",
    carName: "Chevrolet Camaro",
    price: 52999,
    views: 1250,
  },
  {
    id: 7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4OK6fAthgk4GQuSrTAK-WBp53lPUKHevJQ&s",
    carName: "Porsche Cayenne",
    price: 89999,
    views: 970,
  },
  {
    id: 8,
    image:
      "https://www.autoblog.com/.image/t_share/MjA5MDg5MTU1NjM1NDg4NjEy/2024-range-rover-evoque.jpg",
    carName: "Range Rover Evoque",
    price: 67999,
    views: 1020,
  },
  {
    id: 9,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZrPg8oxK1WV11VAvG0a3Rf4zft_U2i_pVLA&s",
    carName: "Toyota Land Cruiser",
    price: 84999,
    views: 890,
  },
];

export default function MoreFromUser({title, button}) {
  const swiperRef = useRef(null);

  return (
    <div className="w-full py-10 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl text-[#314252] font-bold">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button className="bg-[#ff9540] px-4 py-2 rounded-md text-[#314352] cursor-pointer">
            {button}
          </button>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-gray-800 text-[#ff9540] p-2 rounded"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-gray-800 text-[#ff9540] p-2 rounded"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="overflow-hidden"
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
       <Link to={`/cardetails/${car.carName
          }`} >
            <div className="shadow-sm shadow-indigo-100 rounded">
              <div className="overflow-hidden rounded-t-md">
                <img
                  alt=""
                  src={car.image}
                  className="h-40 sm:h-56 w-full object-cover bg-center transition-transform duration-500 hover:scale-105 ease-in-out"
                />
              </div>
              <div>
                <div className=" space-y-1 sm:space-y-2 text-[16px] sm:text-[18px] font-semibold text-left p-4">
                  <h2 className=" text-[#314352]">{car.carName}</h2>
                  <h2 className=" text-[#314352]">${car.price}</h2>
                </div>
                <div className="mt-6 text-xs border-t-2 border-gray-100 py-3">
                  <div className="flex justify-between px-4 py-2">
                    <div className="flex gap-2 items-center">
                      <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                        <IoEyeOutline className="w-1/2 h-1/2" />
                      </div>
                      <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                        <IoIosGitCompare className="w-1/2 h-1/2" />
                      </div>
                      <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                        <CiHeart className="w-1/2 h-1/2" />
                      </div>
                    </div>
                    <div className="flex justify-center items-center cursor-pointer">
                      <p className="text-gray-400 text-[12px] sm:text-[14px]">
                        {car.views} Views
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
