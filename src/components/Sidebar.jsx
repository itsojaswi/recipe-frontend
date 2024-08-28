import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NotebookPen,
  Star,
  CookingPot,
  CirclePlus,
  Search,
} from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";

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
      text: "Add Recipe",
      link: "/addrecipe",
      icon: (
        <span className="icon">
          <CirclePlus />
        </span>
      ),
    },
    {
      text: "Search",
      link: "/search",
      icon: (
        <span className="icon">
          <Search />
        </span>
      ),
    },
  ];

  const [selected, setSelected] = useState(0);
  const [profileBorder, setProfileBorder] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const index = items.findIndex((item) => item.link === location.pathname);
    if (index !== -1) {
      setSelected(index);
    } else {
      setSelected(0);
    }
  }, [location.pathname]);

  const handleItemClick = (index, isProfile = false) => {
    if (isProfile) {
      setSelected(-1); // Ensure no menu item is selected
      setProfileBorder(true); // Add border to profile image
    } else {
      setSelected(index);
      setProfileBorder(false); // Remove border from profile image
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="w-[190px] fixed h-screen bg-white flex flex-col justify-between shadow-lg ">
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
                onClick={() => handleItemClick(index)}
              >
                {item.icon}
                <span className="mt-2 text-sm">{item.text}</span>
              </Link>
            </div>
          ))}
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col items-center border-t-2 border-[#D9D9D9] p-[50px]">
          <Link
            to=""
            className="text-[#B55D51] mt-1 text-sm font-medium"
            onClick={() => handleItemClick(-1, true)}
          >
            <div className="flex  justify-center">
              <img
                src="./avatar.png"
                alt="Profile"
                className={`w-20 h-20 rounded-[100%] mb-3 ${
                  profileBorder ? "border-4 border-[#B55D51]" : ""
                }`}
              />
            </div>
            <span className="font-semibold text-[#636363] text-[20px] ">
              {username}
            </span>
            <div className="flex justify-center mt-2">
              <p>Edit Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
