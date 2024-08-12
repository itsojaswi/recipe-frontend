import { useState } from "react";
import { Bookmark, Star } from "lucide-react";

const FavoriteCard = ({
  imageSrc,
  title,
  initialRating,
  initialBookmarked,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [rating, setRating] = useState(initialRating);

  console.log("Rating:", rating);
  console.log("Bookmarked:", isBookmarked);
  console.log("Bookmarked:", title);

  return (
    <div className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="h-[200px] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-2">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= rating ? (
                <Star
                  key={star}
                  className="h-4 w-4 text-yellow-500 cursor-pointer"
                  onClick={() => setRating(star)}
                />
              ) : (
                <Star
                  key={star}
                  className="h-4 w-4 text-gray-400 cursor-pointer"
                  onClick={() => setRating(star)}
                />
              )
            )}
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-gray-600 focus:outline-none"
          >
            {isBookmarked ? (
              <Bookmark className="h-5 w-5 text-red-500" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
