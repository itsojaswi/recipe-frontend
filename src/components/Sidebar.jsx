import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NotebookPen,
  Star,
  CookingPot,
  CirclePlus,
  Search,
} from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";
import SearchRecipes from "./SearchBar";

const Sidebar = () => {
  const { user } = useAuthContext();
  const username = user ? user.username : "name";
  const items = [
    {
      text: "Recipes",
      link: "/recipes",
      icon: (
        <span className="icon">
          <CookingPot />
        </span>
      ),
    },
    {
      text: "Meal Planner",
      link: "/mealplanner",
      icon: (
        <span className="icon">
          <NotebookPen />
        </span>
      ),
    },
    {
      text: "Favorites",
      link: "/favorite",
      icon: (
        <span className="icon">
          <Star />
        </span>
      ),
    },
    {
      text: "My Recipes",
      link: "/my-recipes",
      icon: (
        <span className="icon">
          <CirclePlus />
        </span>
      ),
    },
    {
      text: "Search",
      link: "#", // Updated to prevent page refresh
      icon: (
        <span className="icon">
          <Search />
        </span>
      ),
      action: () => setIsModalOpen(true), // Open the modal when clicked
    },
  ];

  const [selected, setSelected] = useState(0);
  const [profileBorder, setProfileBorder] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const location = useLocation();

  useEffect(() => {
    const index = items.findIndex((item) => {
      // Check if the current path matches the link or specific paths (e.g., "Add Recipe")
      return (
        location.pathname === item.link ||
        (item.link === "/my-recipes" && location.pathname === "/add-recipe")
      );
    });

    if (index !== -1) {
      setSelected(index);
    } else {
      setSelected(0);
    }
  }, [location.pathname]);

  const handleItemClick = (index, item, isProfile = false) => {
    if (isProfile) {
      setSelected(-1);
      setProfileBorder(true);
    } else {
      setSelected(index);
      setProfileBorder(false);
      if (item.action) {
        item.action(); // Execute the custom action if defined
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="fixed h-screen bg-white flex flex-col justify-between shadow-lg lg:w-[180px] md:w-[150px] sm:w-[100px] ">
        <div className="w-full mt-[69px] text-[#949494] font-medium">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative p-[20px] flex flex-col items-center ${
                selected === index ? "text-[#B55D51]" : ""
              }`}
            >
              {selected === index && (
                <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#B55D51] rounded-l-full" />
              )}
              <Link
                to={item.link}
                className="flex flex-col items-center"
                onClick={() => handleItemClick(index, item)}
              >
                {item.icon}
                <span className="mt-2 text-sm hidden lg:block">
                  {item.text}
                </span>
              </Link>
            </div>
          ))}
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col items-center border-t-2 border-[#D9D9D9] p-[50px]">
          <Link
            to=""
            className="text-[#B55D51] mt-1 text-sm font-medium"
            onClick={() => handleItemClick(-1, {}, true)}
          >
            <div className="flex justify-center">
              <img
                src="./avatar.png"
                alt="Profile"
                className={`rounded-full mb-3 ${
                  profileBorder ? "border-4 border-[#B55D51]" : ""
                } w-16 h-16 lg:w-20 lg:h-20 sm:w-14 sm:h-14`}
              />
            </div>
            <div className="flex justify-center items-center mt-2">
              <span className="font-semibold text-[#636363] lg:text-[20px] md:text-[15px] sm:text-sm">
                {username}
              </span>
            </div>
            <div className="flex justify-center items-center mt-2">
              <p>Edit Profile</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Include the SearchRecipes component */}
      <SearchRecipes isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default Sidebar;
