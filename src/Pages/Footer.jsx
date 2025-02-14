import { IoIosAt } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import LanguageSwitcher from "../utils/LanguageSwitcher";
import { LuMapPin } from "react-icons/lu";
import { CiAt } from "react-icons/ci";
import Translate from "../utils/Translate";

const Footer = () => {
  return (
    <>
      <div>
        <footer className="bg-[#4b4b4bfa] text-white py-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-6 text-center md:text-left">
            {/* Company Section */}
            <div className="space-y-1">
              <h3 className="font-bold text-2xl">
                <Translate text={"company"} />
              </h3>
              <p className="text-gray-300 text-sm flex justify-center md:justify-start items-center gap-2">
                <LuMapPin /> <Translate text={"Damascus, Syria"} />
              </p>
              <p className="text-gray-300 text-sm flex justify-center md:justify-start items-center gap-2">
                <CiAt /> syriasouq.shop@outlook.com
              </p>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="font-bold mb-3">
                <Translate text={"useful links"} />
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="/about"
                    className="text-red-500 hover:underline font-bold"
                  >
                    <Translate text={"About us"} />
                  </a>
                </li>
                <li>
                  <a
                    href="/term-and-use"
                    className="text-red-500 hover:underline font-bold"
                  >
                    <Translate text={"Terms of Use"} />
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-red-500 hover:underline font-bold"
                  >
                    <Translate text={"Privacy Policy"} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Get Social */}
            <div>
              <h3 className="font-bold mb-3">
                <Translate text={"get social"} />
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="#"
                    className="text-red-500 hover:underline font-bold"
                  >
                    <Translate text={"facebook"} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-red-500 hover:underline font-light"
                  >
                    <Translate text={"twitter"} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-red-500 hover:underline font-light"
                  >
                    <Translate text={"instagram"} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold mb-3">
                <Translate text={"support"} />
              </h3>
              <a
                href="/contact"
                className="text-red-500 hover:underline font-light"
              >
                <Translate text={"contact us"} />
              </a>
            </div>

            {/* Languages */}
            <div>
              <h3 className="font-bold mb-3">
                <Translate text={"languages"} />
              </h3>
              <a href="#" className="text-red-500 hover:underline font-light">
                <Translate text={"arabic (arabic language)"} />
              </a>
            </div>
          </div>
        </footer>
        <footer className="footer sm:footer-horizontal footer-center text-gray-300 bg-[#272727fa] p-4">
          <aside>
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <Translate text={"SyriaSouq - All rights reserved."} />
            </p>
          </aside>
        </footer>
      </div>
      <LanguageSwitcher />
    </>
  );
};

export default Footer;
