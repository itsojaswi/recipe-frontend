import { useState } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { RxCross2 } from "react-icons/rx";

const SearchRecipes = ({ isOpen, setIsOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(["Pasta"]);

  const handleRemoveItem = (itemToRemove) => {
    setSearchResults(searchResults.filter((item) => item !== itemToRemove));
  };

  const filteredResults = searchResults.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-xl p-4 bg-white">
        <div className="mb-[10px]">
          <DialogClose asChild>
            <button className="absolute top-4 right-4 text-gray-500 border hover:text-gray-800">
              <RxCross2 className="w-5 h-5" />
            </button>
          </DialogClose>
        </div>
        <div className="relative w-full ">
          <div className="flex items-center border-b pb-2">
            <input
              type="text"
              placeholder="Search for a recipe..."
              className="flex-grow p-2 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="text-gray-400 w-5 h-5" />
          </div>
          <ul className="mt-4">
            {filteredResults.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <RxCross2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchRecipes;
