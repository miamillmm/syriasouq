import React, { useState } from "react";
import cover from "../../assets/service/cover.jpg";

const LoginAndRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="relative sm:pt-10 md:pt-30 flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#304455",
          opacity: 0.85,
        }}
      ></div>

      {/* Main Content */}
      <div
        className={`bg-white mb-10 sm:mb-20 shadow-md rounded-lg p-6 sm:p-8 w-[90%] sm:w-96 z-10 transition-all duration-500 ${
          activeTab === "register" ? "pb-10 sm:pb-14" : "pb-4 sm:pb-6"
        }`}
      >
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 gap-5">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 py-2 font-bold text-base sm:text-lg ${
              activeTab === "login"
                ? "border-b-4 border-orange-400 text-[#314352] cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 py-2 font-bold text-base sm:text-lg ${
              activeTab === "register"
                ? "border-b-4 border-orange-400 text-[#314352] cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }`}
          >
            Register
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "login" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full p-3 border rounded-lg focus:outline-orange-400 placeholder-[#314352]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full placeholder-[#314352] p-3 border rounded-lg focus:outline-orange-400"
            />
            <div className="flex justify-between items-center">
              <label className="flex items-center checkbox-bg-[#ff9540] space-x-2 cursor-pointer text-[#314352]">
                <input
                  type="checkbox"
                  className="accent-[#ff9540] rounded p-1"
                />
                <span>Remember me</span>
              </label>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#ff9540] text-sm cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <button className="w-full bg-[#ff9540] text-[#314352] py-3 rounded-lg cursor-pointer text-lg">
              Login
            </button>
          </div>
        )}

        {activeTab === "register" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:outline-[#ff9540]"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full p-3 border rounded-lg focus:outline-[#ff9540]"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-3 border rounded-lg focus:outline-[#ff9540]"
            />
            <div className="flex items-center space-x-2">
              <label className="flex items-center checkbox-bg-[#ff9540] space-x-2 cursor-pointer text-[#314352]">
                <input
                  type="checkbox"
                  className="accent-[#ff9540] rounded p-1"
                />
                <span>Enable WhatsApp Communication</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <label className="flex items-center checkbox-bg-[#ff9540] space-x-2 cursor-pointer text-[#314352]">
                <input
                  type="checkbox"
                  className="accent-[#ff9540] rounded p-1"
                />
                <span>Enable Viber Communication</span>
              </label>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-orange-400"
            />
            <div className="flex items-center space-x-2">
              <label className="flex items-center checkbox-bg-[#ff9540] space-x-2 cursor-pointer text-[#314352]">
                <input
                  type="checkbox"
                  className="accent-[#ff9540] rounded p-1"
                />
                <span>
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-[#ff9540] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ff9540] after:transition-all after:duration-500 after:ease-in-out hover:after:w-full"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button className="w-full bg-[#ff9540] text-white py-3 rounded-lg font-bold cursor-pointer">
              Register
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-black/50"
        >
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 w-[90%] sm:w-[30rem] relative z-30">
            <div className="flex flex-col items-center mb-4">
              <div className="bg-gray-200 p-6 rounded-full mb-4">
                <span className="text-4xl text-gray-600">?</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800">
                Reset Password
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center">
                Enter the email address associated with the account.
              </p>
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg mb-4 focus:outline-orange-400"
            />
            <div className="flex justify-between">
              <button className="bg-[#ff9540] text-white px-6 py-2 rounded-lg font-bold">
                Send
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginAndRegister;
