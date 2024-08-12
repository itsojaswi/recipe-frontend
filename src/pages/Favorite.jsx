import FavoriteCard from "../components/FavoriteCard";

const Favorite = () => {
  return (
    <div className="flex overflow-scroll scrollbar-hide">
      <div className="p-8 w-full bg-gray-50 ">
        <div className="ml-11">
          <div>
            <h1 className="text-3xl font-bold">Discover Recipes</h1>
            <hr className="h-[2px] border border-stone-200 mt-[20px]" />
          </div>
          <FavoriteCard />
        </div>
      </div>
    </div>
  );
};

export default Favorite;
