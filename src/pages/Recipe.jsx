import { CalendarDays, MessageCircle, Star, Share2 } from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Ingredients from "../components/Ingredients";
import SimilarRecipe from "../components/SimilarRecipe";
import { Input } from "@/components/ui/input";

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
  const reviews = [
    {
      name: "John Doe",
      time: "2 hours ago",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit inventore numquam repellat libero! Voluptatem quos, doloremque nesciunt ea facere possimus. Ratione, inventore! Adipisci iste provident quos blanditiis ducimus expedita tempora.",
    },
    {
      name: "John Doe",
      time: "2 hours ago",
      review: "This recipe was amazing! I loved it.",
    },
    {
      name: "John Doe",
      time: "2 hours ago",
      review: "This recipe was amazing! I loved it.",
    },
    {
      name: "John Doe",
      time: "2 hours ago",
      review: "This recipe was amazing! I loved it.",
    },
    {
      name: "John Doe",
      time: "2 hours ago",
      review: "This recipe was amazing! I loved it.",
    },
  ];

  const dummyIngredients = [
    "Cook the noodles according to package instructions. Drain and set aside.",
    "Heat a large pan or wok over medium-high heat. Add oil and let it heat up.",
    "Add minced garlic and ginger to the pan. Sauté until fragrant, about 1 minute.",
    "Add thinly sliced vegetables (like bell peppers, carrots, and cabbage) and stir-fry for 2-3 minutes until slightly tender.",
    "Push the vegetables to one side of the pan, then add the cooked noodles.",
    "Pour soy sauce, oyster sauce, and a dash of sesame oil over the noodles. Toss everything together until well combined.",
    "Cook for another 2-3 minutes, letting the noodles absorb the sauce and become slightly crispy.",
    "Add cooked protein (like chicken, shrimp, or tofu) if desired, and stir-fry for another minute.",
    "Garnish with chopped green onions and sesame seeds before serving.",
    "Serve hot and enjoy your homemade Chow Mein!",
  ];
  // dummyData.js
  const dummyRecipe = [
    {
      text: "chowmin eat chowmin please kjdvksdfkkjsg,fdsmn",
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
        "This is a classic chow mein recipe that's quick and easy to make.",
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

  const handelAddToMeal = () => {
    console.log("Added to meal");
  };
  const handelSubmit = () => {
    console.log("SUBMITED");
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="text-xl font-bold">chowmin</h1>
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
            <div className="flex justify-center items-center gap-[2px]">
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
            <Button className=" p-2 rounded-[5px] mr-2 border">
              <FaRegBookmark className="h-[20px] w-[20px] text-[#B55D51]" />
            </Button>
            <Button className=" p-2 rounded-[5px] ml-2 border">
              <Share2 className="h-[20px] w-[20px] text-[#B55D51]" />
            </Button>
          </div>
        </div>
        <hr className="h-[2px] border border-stone-200 mt-[10px]" />
      </div>
      <div className="mt-6 flex flex-col lg:flex-row ">
        <div className="w-full  ">
          <img src="./chowmin.jpg" alt="Chowmin" className="w-full" />
          <div className="mt-4 ">
            <div className="flex justify-between items-center ">
              <h1 className="italic font-medium text-2xl">Cook Time: 45min</h1>
              <Button
                onClick={handelAddToMeal}
                className="bg-[#B55D51] text-white rounded-full hover:bg-[#B55D51]"
              >
                Add to meal
              </Button>
            </div>
            <div className="mt-5">
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                sunt atque. Ad dolores voluptatum saepe tenetur velit fugiat
                aliquam tempore reiciendis nam exercitationem natus rem
                provident, maxime eius, praesentium nobis! Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Ipsum nesciunt
                obcaecati, deserunt possimus enim ab maxime ad cumque. Obcaecati
                corporis esse sed excepturi reiciendis natus harum, iste error
                repellat. Aut.
              </h1>
            </div>
            <div className="mb-3 mt-8 rounded-[8px] bg-white p-6 ">
              <h1 className="italic text-3xl font-medium">Instructions</h1>
              <ul className="">
                {dummyIngredients.map((ingredient, index) => {
                  return (
                    <div key={index} className="flex items-center gap-3 m-3 ">
                      <div className="h-[20px] w-[20px] bg-[#B55D51] text-white rounded-[4px] justify-center flex">
                        <p className="text-sm font-medium">{index + 1}</p>
                      </div>
                      <li key={index}>{ingredient}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="bg-white rounded-[8px] flex flex-col justify-center items-center space-y-4 p-4">
              <h1 className="italic text-3xl font-medium mt-3">
                Leave a review
              </h1>
              <p>
                Click stars to rate the recipe{" "}
                <span className="text-[#B55D51]">*</span>
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="text-yellow-400 h-[20px] w-[20px]"
                  />
                ))}
              </div>
              <div className="w-[50%]">
                <h1>
                  Review <span className="text-[#B55D51]">*</span>
                </h1>
                <textarea
                  id="message"
                  rows="4"
                  className=" p-2.5 w-full text-sm text-gray-900 rounded-[10px] border outline-none scrollbar-hide"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              <Button
                onClick={handelSubmit}
                className="bg-[#B55D51] text-white rounded-[20px] hover:bg-[#B55D51]"
              >
                Submit
              </Button>
              <div className="w-full">
                <hr className="h-1px border border-stone-200 w-full " />
                <div className="m-2 flex flex-col ">
                  <h1 className="italic text-3xl font-medium">Reviews</h1>
                  <div className="flex  m-2 flex-col  p-4 ">
                    {reviews.map((review, index) => (
                      <div key={index} className=" flex flex-col  p-2">
                        <div className="flex gap-3  items-center  justify-between">
                          <div className="flex gap-3 items-center">
                            <img
                              src="./chowmin.jpg"
                              alt=""
                              className="w-[30px] h-[30px] rounded-full"
                            />
                            <p className="text-[20px] text-[#494747] font-medium">
                              {review.name}
                            </p>
                          </div>
                          <p className="text-sm text-[#67727E]">
                            {review.time}
                          </p>
                        </div>
                        <div className="ml-10 m-4">
                          <p className="text-[#6B6B6B]">{review.review}</p>
                        </div>
                        <hr className="h-[2px] border border-stone-200 mt-[10px]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 ml-0 lg:ml-11 mt-8 lg:mt-0 ">
          <Ingredients />
          <div className="mt-8 text-4xl ">
            <h1 className="italic font-medium">Similar Recipe</h1>
            <div className="bg-white p-2 rounded-[10px] mt-[20px]">
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
