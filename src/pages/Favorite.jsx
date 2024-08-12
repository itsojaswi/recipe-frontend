import FavoriteCard from "../components/FavoriteCard";

const Favorite = () => {
  const favorites = [
    {
      imageSrc: "https://via.placeholder.com/250",
      title: "Green Salad Recipes",
      initialRating: 3,
      initialBookmarked: true,
    },
  ];

  return (
    <div className="flex w-[100wh] overflow-scroll scrollbar-hide">
      <div className="p-8 w-full h-[100vh] bg-gray-50">
        <div className="ml-11">
          <div>
            <h1 className="text-3xl font-bold">Favorites</h1>
            <hr className="h-[2px] border border-stone-200 mt-[20px]" />
          </div>
          <div className="">
            {favorites.map((favorite, index) => (
              <FavoriteCard
                key={index}
                imageSrc={favorite.imageSrc}
                title={favorite.title}
                initialRating={favorite.initialRating}
                initialBookmarked={favorite.initialBookmarked}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
