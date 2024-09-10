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
  const userId = user ? user.userId : "";
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
      link: "/Search",
      icon: (
        <span className="icon">
          <Search />
        </span>
      ),
    },
  ];

  const [selected, setSelected] = useState(0);
  const [profileSelected, setProfileSelected] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/profile/${userId}`) {
      setProfileSelected(true);
      setSelected(-1);
    } else {
      setProfileSelected(false);
      const index = items.findIndex((item) => {
        return (
          location.pathname === item.link ||
          (item.link === "/my-recipes" && location.pathname === "/add-recipe")
        );
      });

      if (index !== -1) {
        setSelected(index);
      } else {
        setSelected(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleItemClick = (index, item, isProfile = false) => {
    if (isProfile) {
      setSelected(-1);
      setProfileSelected(true);
    } else {
      setSelected(index);
      setProfileSelected(false);
      if (item.action) {
        item.action();
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
        {/* Bottom Profile Section */}
        <div>
          <div className="flex flex-col items-center border-t-2 border-[#D9D9D9] py-[20px]">
            <Link
              to={`/profile/${userId}`}
              className="text-[#B55D51] mt-1 text-sm font-medium"
              onClick={() => handleItemClick(-1, {}, true)}
            >
              <div className="flex justify-center">
                <img
                  src="./avatar.png"
                  alt="Profile"
                  className={`rounded-full mb-3 ${
                    profileSelected ? "border-4 border-[#B55D51]" : ""
                  } w-16 h-16 lg:w-20 lg:h-20 sm:w-14 sm:h-14`}
                />
              </div>
              <div className="flex justify-center items-center mt-2 mb-7">
                <span className="font-semibold text-[#636363] lg:text-[20px] md:text-[15px] sm:text-sm">
                  {username}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
