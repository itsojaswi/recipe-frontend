import React from "react";
import { Star } from "lucide-react";

const SimilarRecipe = ({ text, paragraph, rating }) => {
  return (
    <div className=" h-[140px] p-3 w-full flex items-start ">
      <div className="h-[120px] w-[200px] flex-shrink-0">
        <img
          src="./chowmin.jpg"
          alt=""
          className="w-full h-full object-covermb-[70px] rounded-[8px]"
        />
      </div>
      <div className="ml-4 flex-grow flex flex-col justify-between w-[300px]">
        <div className=" flex flex-col justify-between ">
          <div className=" h-[35px]">
            <h1 className="text-xl font-bold truncate">{text}</h1>
          </div>
          <div className=" h-[70px]">
            <p
              className="text-sm overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {paragraph}
            </p>
          </div>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="text-yellow-400 h-[16px] w-[16px]" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarRecipe;
