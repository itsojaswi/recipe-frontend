import { CalendarDays, MessageCircle, Star, Share2 } from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Ingredients from "../components/Ingredients";
import SimilarRecipe from "../components/SimilarRecipe";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "react-hook-form";
import { useAuthContext } from "@/hooks/useAuthContext";

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
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const { user } = useAuthContext();
  const token = user?.token;

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/recipe/${recipeId}`
        );
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        setError("error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handelAddToMeal = () => {
    console.log("Added to meal");
  };

  const handleSubmitReview = async () => {
    console.log("Submitting review:", reviewText, reviewRating);
    try {
      if (!reviewText || reviewRating === 0) {
        console.log("Please provide both a rating and a review.");
        return;
      }
      const { data: reviewData } = await axios.post(
        `http://localhost:4000/api/recipe/${recipeId}/reviews`,
        {
          user: user._id,
          rating: reviewRating,
          reviews: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );

      console.log("Review submitted:", reviewData);
      setReviewText(""); // Clear the review text after submission
      setReviewRating(0); // Clear the rating after submission
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="text-[40px] font-bold">{recipe.title}</h1>
        <div className="flex justify-between mt-[20px]">
          <div className="flex gap-10 normal-case">
            <div className="flex justify-center items-center">
              <img
                src={
                  "https://hungerend.com/wp-content/uploads/2023/06/buff-keema-noodles.jpg"
                }
                alt=""
                className="h-[25px] w-[25px] rounded-full mr-[6px]  "
              />
              <h2>owner</h2>
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
        <div className="w-full ">
          <img
            src={recipe.image}
            alt="Chowmin"
            className="w-full h-[700px] object-cover"
          />
          <div className="mt-4 ">
            <div className="flex justify-between items-center ">
              <h1 className="italic font-medium text-2xl">
                Cook Time: {recipe.cookTime} min
              </h1>
              <Button
                onClick={handelAddToMeal}
                className="bg-[#B55D51] text-white rounded-full hover:bg-[#B55D51]"
              >
                Add to meal
              </Button>
            </div>
            <div className="mt-5">
              <h1>{recipe.description}</h1>
            </div>
            <div className="mb-3 mt-8 rounded-[8px] bg-white p-6 ">
              <h1 className="italic text-3xl font-medium">Instructions</h1>
              <ul className="">
                {recipe.instructions.map((instruction, index) => {
                  return (
                    <div key={index} className="flex items-center gap-3 m-3 ">
                      <div className="h-[20px] w-[20px] bg-[#B55D51] text-white rounded-[4px] justify-center flex">
                        <p className="text-sm font-medium">{index + 1}</p>
                      </div>
                      <li key={index}>{instruction.text}</li>
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
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    onClick={() => setReviewRating(i + 1)}
                    className={`h-[20px] w-[20px] ${
                      i < reviewRating ? "text-yellow-400" : "text-gray-400"
                    } cursor-pointer`}
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
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className=" p-2.5 w-full text-sm text-gray-900 rounded-[10px] border outline-none scrollbar-hide"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              <Button
                onClick={handleSubmitReview}
                className="bg-[#B55D51] text-white rounded-[20px] hover:bg-[#B55D51]"
              >
                Submit
              </Button>
              <div className="w-full">
                <hr className="h-1px border border-stone-200 w-full " />
                <div className="m-2 flex flex-col ">
                  <h1 className="italic text-3xl font-medium">Reviews</h1>
                  <div className="flex  m-2 flex-col  p-4 ">
                    {recipe.reviews.map((review, index) => (
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
                            {review.createdAt}
                          </p>
                        </div>
                        <div className="ml-10 m-4">
                          <p className="text-[#6B6B6B]">{review.reviews}</p>
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
          <Ingredients recipeIngredients={recipe.ingredients} />
          <div className="mt-8 text-4xl ">
            <h1 className="italic font-medium">Similar Recipe</h1>
            <div className="bg-white p-2 rounded-[10px] mt-[20px]">
              {/* {dummyRecipe.map((recipe, index) => (
                <SimilarRecipe
                  key={index}
                  text={recipe.text}
                  paragraph={recipe.paragraph}
                  rating={recipe.rating}
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
