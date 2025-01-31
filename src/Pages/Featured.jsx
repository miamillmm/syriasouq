import { useState, useEffect } from "react";
import { Link } from "react-router";
import { TiArrowRight } from "react-icons/ti";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

const Featured = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/cars`)
      .then((res) => {
        setDatas(res.data);
      })
      .catch((error) => {
        console.log("error fetching data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 w-screen py-10 md:py-20">
      {/* header */}
      <div className="header flex flex-col md:flex-row justify-between flex-wrap items-center mb-12">
        <div className="space-y-4 text-center md:text-left">
          <button className="text-[12px] sm:text-[14px] font-[400] text-gray-500 bg-gray-100 py-2 px-4 rounded cursor-pointer">
            Handy picked
          </button>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352]">
            Featured listings
          </h2>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <button className="text-[14px] sm:text-[16px] font-[400] text-[#ff9540] bg-[#314352] py-3 sm:py-4 px-6 sm:px-8 rounded cursor-pointer">
            All
          </button>
          <button className="bg-[#ff9540] text-[#314352] text-[16px] sm:text-[18px] font-[400] justify-between py-3 sm:py-4 px-8 sm:px-12 rounded-md flex items-center gap-2 cursor-pointer">
            View All
            <span>
              <TiArrowRight />
            </span>
          </button>
        </div>
      </div>

      {/* All Car cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {datas?.map((data, index) => (
          <Link to={`/cardetails/${data.carName}`} key={data.id}>
            <div className="shadow-sm shadow-indigo-100 rounded ">
              <div className="overflow-hidden rounded-t-md">
                <img
                  alt=""
                  src={data.image}
                  className="h-40 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                />
              </div>
              <div>
                <div className="mt-4 ml-4 space-y-1 sm:space-y-2 text-[16px] sm:text-[18px] font-semibold">
                  <h2 className=" text-[#314352]">{data.carName}</h2>
                  <h2 className=" text-[#314352]">${data.price}</h2>
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
                        {data.views} Views
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;
