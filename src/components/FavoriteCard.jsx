import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const FavoriteCard = ({ imageSrc, title }) => {
  return (
    <div className="w-[350px] h-[250px] rounded-xl shadow-xl hover:scale-105 transition-transform duration-400 ease-in-out relative ">
      <img
        src={imageSrc}
        alt={title}
        className="object-cover w-full h-full rounded-xl"
      />
      <div
        className="absolute top-0 rounded-xl bottom-0 w-full p-2 text-white transition-opacity duration-300 bg-transparnet opacity-0 hover:opacity-100 z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0),rgba(0,0,0,0.7))",
        }}
      >
        <h2 className="text-lg font-semibold text-white absolute left-3 bottom-4 ">
          {title}
        </h2>
        <button className="text-white bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full m-1 right-3 top-2 absolute">
          <HiDotsVertical className="h-[20px] w-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;
