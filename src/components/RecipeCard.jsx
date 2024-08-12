const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl  shadow-lg p-2">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="rounded-xl w-full h-34 object-cover mb-4"
      />
      <h3 className="text-xl font-semibold">{recipe.name}</h3>
      <div className="flex items-center text-gray-500 mt-[12px]">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-[30px] w-[30px] rounded-[100%]"
        />
        <div className="flex justify-between w-full">
          <p className="text-sm ml-[8px] ">by {recipe.author}</p>
          <p className="text-sm ">{recipe.time} min</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-400">
          {"★".repeat(recipe.rating)}
          {"☆".repeat(5 - recipe.rating)}
        </span>
        <button
          className={`p-2 rounded-full ${
            recipe.favorite ? "text-red-600" : "text-gray-400"
          }`}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
