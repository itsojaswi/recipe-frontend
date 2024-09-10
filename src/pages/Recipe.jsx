import { CalendarDays, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Ingredients from "../components/Ingredients";
import SimilarRecipe from "../components/SimilarRecipe";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/hooks/useAuthContext";
import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";
import { toast } from "sonner";

const dummyRecipe = [
  {
    text: "Chicken Chowmein",
    paragraph:
      "A delicious and easy-to-make chicken chowmein recipe that you can make at home.",
    rating: 4,
  },
  {
    text: "Chicken Biryani",
    paragraph:
      "A classic chicken biryani recipe that is sure to impress your guests.",
    rating: 5,
  },
  {
    text: "Chicken Curry",
    paragraph:
      "A spicy and flavorful chicken curry recipe that is perfect for a weeknight dinner.",
    rating: 4,
  },
  {
    text: "Chicken Fried Rice",
    paragraph:
      "A quick and easy chicken fried rice recipe that is perfect for busy weeknights.",
    rating: 4,
  },
];

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
    try {
      if (!reviewText || reviewRating === 0) {
        toast.error("Please provide both rating and a review.", {
          style: {
            borderRadius: "10px",
            background: "#BD6E64",
            color: "white",
          },
        });
        return;
      }
      const { data: recipeData } = await axios.post(
        `http://localhost:4000/api/recipe/${recipeId}/reviews`,
        {
          user: user._id,
          rating: reviewRating,
          reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: recipeData.reviews,
      }));

      setReviewText(""); // Clear the review text after submission
      setReviewRating(0); // Clear the rating after submission
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const averageRating =
    recipe.reviews.reduce((acc, review) => acc + review.rating, 0) /
    recipe.reviews.length;

  return (
    <div>
      <div className="w-full">
        <h1 className="text-[40px] font-bold">{recipe.title}</h1>
        <div className="flex justify-between mt-[20px]">
          <div className="flex gap-10 normal-case">
            <Link to={`/profile/${recipe.createdBy._id}`}>
              <div className="flex justify-center items-center">
                <img
                  src={recipe.createdBy.profile.avatar}
                  alt=""
                  className="h-[25px] w-[25px] rounded-full mr-[6px]  "
                />
                <h2>{recipe.createdBy.username}</h2>
              </div>
            </Link>
            <InfoItem
              icon={CalendarDays}
              text={format(new Date(recipe.createdAt), "do MMMM, yyyy")}
            />

            {/* more functionality as needed */}
            {/* <InfoItem icon={MessageCircle} text="9" rotate="270" />
            <InfoItem icon={FaRegBookmark} text="9" /> */}
            <div className="flex justify-center items-center gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < averageRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927C9.45 2.104 10.55 2.104 10.951 2.927l1.7 3.429 3.788.584c.842.13 1.175 1.16.568 1.755l-2.739 2.67.646 3.772c.144.84-.74 1.487-1.488 1.09L10 14.347l-3.215 1.69c-.749.396-1.633-.251-1.488-1.09l.646-3.772-2.739-2.67c-.607-.595-.274-1.625.568-1.755l3.788-.584 1.7-3.429z" />
                </svg>
              ))}
              <h1 className="ml-[6px]">{Math.ceil(averageRating) || 0}/5 </h1>
            </div>
          </div>
          {/* add more functionality as needed */}
          {/* <div>
            <Button className=" p-2 rounded-[5px] mr-2 border">
              <FaRegBookmark className="h-[20px] w-[20px] text-[#B55D51]" />
            </Button>
            <Button className=" p-2 rounded-[5px] ml-2 border">
              <Share2 className="h-[20px] w-[20px] text-[#B55D51]" />
            </Button>
          </div> */}
        </div>
        <hr className="h-[2px] border border-stone-200 mt-[10px]" />
      </div>
      <div className="mt-6 flex flex-col lg:flex-row ">
        <div className="w-full ">
          <img
            src={recipe.image}
            alt={recipe.title}
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
                Submit Review
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
                              {review.user?.username}
                            </p>
                          </div>
                          <p className="text-sm text-[#67727E]">
                            {formatDistanceToNow(new Date(review.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        <div className="ml-10 m-4">
                          <p className="text-[#6B6B6B]">{review.reviewText}</p>
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
            <h1 className="italic font-medium">More like this</h1>
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
