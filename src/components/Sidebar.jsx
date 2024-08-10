import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import {
  NotebookPen,
  Star,
  CookingPot,
  CirclePlus,
  Search,
} from "lucide-react";

const Sidebar = () => {
  const items = [
    {
      text: "Recipes",
      link: "",
      icon: (
        <span className="icon">
          <CookingPot />
        </span>
      ),
    },
    {
      text: "Meal Planner",
      link: "",
      icon: (
        <span className="icon">
          <NotebookPen />
        </span>
      ),
    },
    {
      text: "Favorites",
      link: "",
      icon: (
        <span className="icon">
          <Star />
        </span>
      ),
    },
    {
      text: "Add Recipe",
      link: "",
      icon: (
        <span className="icon">
          <CirclePlus />
        </span>
      ),
    },
    {
      text: "Search",
      link: "",
      icon: (
        <span className="icon">
          <Search />
        </span>
      ),
    },
  ];

  const [selected, setSelected] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const index = items.findIndex((item) => item.link === location.pathname);
    if (index !== -1) {
      setSelected(index);
    } else {
      setSelected(0);
    }
  }, []);

  const handleItemClick = (index) => {
    setSelected(index);
  };

  return (
    <div style={{ display: "flex", width: "97vw" }}>
      <div className="w-64 h-screen bg-white flex flex-col justify-between shadow-lg ">
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
          <img
            src="./facebook.png"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <span className="mt-2 font-semibold text-[#636363] ">Mark Obroy</span>
          <Link to="" className="text-[#B55D51] mt-1 text-sm font-medium">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
