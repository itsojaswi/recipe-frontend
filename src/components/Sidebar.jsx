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
import { LuLogOut } from "react-icons/lu";
import { useLogout } from "../hooks/useLogout";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";

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
  const [profileSelected, setProfileSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useLogout(); // Use the logout function
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      setProfileSelected(true);
      setSelected(-1); // Ensure no item is selected
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
        setSelected(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, profileSelected]);

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

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
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
        <div>
          <div className="flex flex-col items-center border-t-2 border-[#D9D9D9] py-[20px]">
            <Link
              to="/profile"
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
              <div className="flex justify-center items-center mt-2">
                <span className="font-semibold text-[#636363] lg:text-[20px] md:text-[15px] sm:text-sm">
                  {username}
                </span>
              </div>
            </Link>
          </div>
          <div className=" bg-[#a39593] text-white flex justify-center items-center py-3  font-semibold">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="text-lg flex items-center"
            >
              <LuLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* Include the SearchRecipes component */}
      <SearchRecipes isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

      <Dialog
        className=""
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
      >
        <DialogContent
          style={{ borderRadius: "15px" }}
          className="bg-white "
          id="logout-dialog-content"
        >
          <img
            className="w-20 h-20 m-auto "
            src="https://media.tenor.com/FO7Yh3d7GqgAAAAj/bruh-moment.gif"
            alt=""
          />
          <DialogTitle>
            <p className="flex flex-col justify-center items-center font-semibold text-[20px]">
              Are you sure you want to leave?
            </p>
          </DialogTitle>
          <div className="flex justify-end space-x-2 mt-4 ">
            <Button
              style={{ borderRadius: "10px" }}
              onClick={() => setIsDialogOpen(false)}
              className="bg-gray-500 hover:bg-gray-500 text-white "
            >
              Stay
            </Button>
            <Button
              style={{ borderRadius: "10px" }}
              onClick={handleLogout}
              className="bg-[#B55D51] hover:bg-[#B55D51] text-white rounded-sm"
            >
              Leave
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
