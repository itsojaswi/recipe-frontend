import MyRecipe from "../components/MyRecipe";

const Favorite = () => {
  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px] mb-[20px]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 "></div>
    </div>
  );
};

export default Favorite;
