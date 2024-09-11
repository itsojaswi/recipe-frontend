import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-full p-4">
      <h1 className="text-center text-3xl mt-11 font-semibold text-[#B55D51]">
        Page not found
      </h1>
      <div className="flex items-center justify-center h-full flex-col">
        <img src="./error.png" alt="error" className="h-[700px] w-[800px]  " />
        <Link to={"/recipes"}>
          <div className="h-[60px] gap-3 px-8 bg-[#B55D51] text-white text-xl rounded-[50px] flex justify-center items-center m-4">
            <FaArrowLeft />
            <button>Go back to home page</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
