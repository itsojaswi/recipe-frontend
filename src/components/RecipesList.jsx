import RecipeCard from "./RecipeCard";

const RecipesList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesList;
