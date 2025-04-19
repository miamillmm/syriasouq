import React from "react";
import Translate from "../utils/Translate";

const Button = () => {
  return (
    <div>
      {" "}
      <button className="bg-[#B80200] text-white my-3 ml-20 text-[18px] font-light px-4 py-2 rounded-md cursor-pointer">
        <Translate text={"Add"} /> <span>+</span>
      </button>
    </div>
  );
};

export default Button;
