import React from "react";
import { IoIosPhonePortrait, IoIosAt } from "react-icons/io";
import { IoLocationSharp, IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-[#374b5c] text-white px-20 py-20 h-auto">
        <aside>
          <IoIosPhonePortrait className="bg-gray-600 rounded text-white" />
          <p className="flex items-center gap-2 text-gray-300">
            <IoLocationSharp className="bg-gray-600 rounded text-white" />{" "}
            Damascus, Syria
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <IoIosAt className="bg-gray-600 rounded text-white" />{" "}
            syriasouq.shop@outlook.com
          </p>
          <h3 className="text-white my-2">Follow our social media</h3>
          <div className="flex gap-2 items-center">
            <div className="hover:text-[#ff9540] hover:border-[#ff9540] cursor-pointer duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
              <FaFacebookF className="w-1/2 h-1/2" />
            </div>
            <div className="hover:text-[#ff9540] hover:border-[#ff9540] cursor-pointer duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
              <FaXTwitter className="w-1/2 h-1/2" />
            </div>
            <div className="hover:text-[#ff9540] hover:border-[#ff9540] cursor-pointer duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
              <FaLinkedinIn className="w-1/2 h-1/2" />
            </div>
            <div className="hover:text-[#ff9540] hover:border-[#ff9540] cursor-pointer duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
              <IoLogoInstagram className="w-1/2 h-1/2" />
            </div>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Useful Links</h6>
          <a className="link link-hover">Panel</a>
          <a className="link link-hover">Our Team</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav className="leading-[0.80] no-underline">
          <h6 className="footer-title">Categories</h6>

          <span className="text-black cursor-pointer">404</span>
          <span className="text-black cursor-pointer">About us</span>
          <span className="text-black cursor-pointer">Blog</span>
          <span className="text-black cursor-pointer">Cart</span>
          <span className="text-black cursor-pointer">Checkout</span>
          <span className="text-black cursor-pointer">Compare</span>
          <span className="text-black cursor-pointer">FAQ</span>
          <span className="text-black cursor-pointer">Home</span>
          <span className="text-black cursor-pointer">Login and Register</span>
          <span className="text-black cursor-pointer">My account</span>
          <span className="text-black cursor-pointer">Our Team</span>
          <span className="text-black cursor-pointer">Panel</span>
          <span className="text-black cursor-pointer">Privacy Policy</span>
          <span className="text-black cursor-pointer">Shop</span>
        </nav>
        <nav>
          <h6 className="footer-title">Newest Listing</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center text-gray-300 bg-[#2C3C49] p-4">
        <aside>
          <p>
            &copy; {new Date().getFullYear()} SyriaSouq - All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
