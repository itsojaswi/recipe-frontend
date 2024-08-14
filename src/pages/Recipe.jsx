import { CalendarDays, MessageCircle, Star, Share2 } from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Ingredients from "../components/Ingredients";

const InfoItem = ({ icon: Icon, text, rotate }) => (
  <div className="flex justify-center items-center">
    <Icon
      className={`mr-[6px] ${
        rotate ? "rotate-" + rotate : ""
      } h-[16px] w-[16px] text-[#B55D51]`}
    />
    <h2>{text}</h2>
  </div>
);

const Recipe = () => {
  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Recipe</h1>
        <div className="flex justify-between mt-[20px]">
          <div className="flex gap-10">
            <div className="flex justify-center items-center">
              <img
                src="./chowmin.jpg"
                alt="recipe"
                className="h-[25px] w-[25px] rounded-full mr-[6px]"
              />
              <h2>maddie</h2>
            </div>
            <InfoItem icon={CalendarDays} text="July 20, 2024" />
            <InfoItem icon={MessageCircle} text="9" rotate="270" />
            <InfoItem icon={FaRegBookmark} text="9" />
            <div className="flex justify-center items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="text-yellow-400 h-[16px] w-[16px]"
                />
              ))}
              <h1 className="ml-[6px]">1/5</h1>
            </div>
          </div>
          <div>
            <Button className="border p-2 rounded-[5px] mr-2">
              <FaRegBookmark className="h-[20px] w-[20px] text-[#B55D51]" />
            </Button>
            <Button className="border p-2 rounded-[5px] ml-2">
              <Share2 className="h-[20px] w-[20px] text-[#B55D51]" />
            </Button>
          </div>
        </div>
        <hr className="h-[2px] border border-stone-200 mt-[10px]" />
      </div>
      <div className="mt-6 flex border">
        <div className="w-[100%]">
          <img src="./chowmin.jpg" alt="Chowmin" className="w-full" />
        </div>
        <div className="w-1/2 ml-11 border">
          <Ingredients />
          <div className="border mt-8 font-medium text-4xl">
            <h1 className="italic ">Similar Recipe</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
