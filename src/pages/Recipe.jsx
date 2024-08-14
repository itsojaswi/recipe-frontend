import { CalendarDays, MessageCircle, Star, Share2 } from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Ingredients from "../components/Ingredients";
import SimilarRecipe from "../components/SimilarRecipe";

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
  // dummyData.js
  const dummyRecipe = [
    {
      text: "Delicious Chow Mein",
      paragraph:
        "This is a classic chow mein recipe that's quick and easy to make. this was so authentic and tasty you must try this recipe at home with the ingredients that are commonly available at home",
      rating: 4.5,
    },
    {
      text: "Delicious Chow Mein",
      paragraph:
        "This is a classic chow mein recipe that's quick and easy to make. this was so authentic and tasty you must try this recipe at home with the ingredients that are commonly available at home",
      rating: 4.5,
    },
    {
      text: "Delicious Chow Mein",
      paragraph:
        "This is a classic chow mein recipe that's quick and easy to make. this was so authentic and tasty you must try this recipe at home with the ingredients that are commonly available at home",
      rating: 4.5,
    },
    {
      text: "Delicious Chow Mein",
      paragraph:
        "This is a classic chow mein recipe that's quick and easy to make. this was so authentic and tasty you must try this recipe at home with the ingredients that are commonly available at home",
      rating: 4.5,
    },
    {
      text: "Delicious Chow Mein",
      paragraph:
        "This is a classic chow mein recipe that's quick and easy to make. this was so authentic and tasty you must try this recipe at home with the ingredients that are commonly available at home",
      rating: 4.5,
    },
  ];

  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-bold">chowmin</h1>
        <div className="flex justify-between mt-[20px]">
          <div className="flex gap-10 normal-case">
            <div className="flex justify-center items-center">
              <img
                src="./chowmin.jpg"
                alt="recipe"
                className="h-[25px] w-[25px] rounded-full mr-[6px]  "
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
      <div className="mt-6 flex flex-col lg:flex-row border">
        <div className="w-full  border">
          <img src="./chowmin.jpg" alt="Chowmin" className="w-full" />
          <div className="mt-4 border">
            <div className="flex justify-between items-center">
              <h1>Cook Time: 45min</h1>
              <Button>dshfsdhkj</Button>
            </div>
            <div>
              <ul className="list-disc pl-6">
                <li>Ingredient 1</li>
                <li>Ingredient 2</li>
                <li>Ingredient 3</li>
                {/* Add more ingredients here */}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 ml-0 lg:ml-11 mt-8 lg:mt-0 border">
          <Ingredients />
          <div className="mt-8 text-4xl border">
            <h1 className="italic font-medium">Similar Recipe</h1>
            <div className="bg-white">
              {dummyRecipe.map((recipe, index) => (
                <SimilarRecipe
                  key={index}
                  text={recipe.text}
                  paragraph={recipe.paragraph}
                  rating={recipe.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
