import FavoriteCard from "../components/FavoriteCard";

const Favorite = () => {
  const favorites = [
    {
      imageSrc: "./chowmin.jpg",
      title: "Green Salad Recipes",
      initialRating: 3,
      initialBookmarked: true,
    },
    {
      imageSrc: "./chowmin.jpg",
      title: "Green Salad Recipes",
      initialRating: 3,
      initialBookmarked: true,
    },
    {
      imageSrc: "./chowmin.jpg",
      title: "Green Salad Recipes",
      initialRating: 3,
      initialBookmarked: true,
    },
    {
      imageSrc: "./chowmin.jpg",
      title: "Green Salad Recipes",
      initialRating: 3,
      initialBookmarked: true,
    },
    {
      imageSrc: "./chowmin.jpg",
      title: "Green Salad Recipes",
      initialRating: 3,
      initialBookmarked: true,
    },
  ];

  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px] mb-[20px]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 ">
        {favorites.map((favorite, index) => (
          <FavoriteCard
            key={index}
            imageSrc={favorite.imageSrc}
            title={favorite.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
