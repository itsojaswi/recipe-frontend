import FavoriteCard from "./FavoriteCard";

const FavoriteList = () => {
  const favorites = [
    {
      imageSrc: "https://via.placeholder.com/250",
      title: "Green Salad Recipes",
      initialRating: 3,
      initialBookmarked: true,
    },
    {
      imageSrc: "https://via.placeholder.com/250",
      title: "Pasta Recipes",
      initialRating: 4,
      initialBookmarked: false,
    },
    {
      imageSrc: "https://via.placeholder.com/250",
      title: "Pasta Recipes",
      initialRating: 4,
      initialBookmarked: false,
    },
    {
      imageSrc: "https://via.placeholder.com/250",
      title: "Pasta Recipes",
      initialRating: 4,
      initialBookmarked: false,
    },
    {
      imageSrc: "https://via.placeholder.com/250",
      title: "Pasta Recipes",
      initialRating: 4,
      initialBookmarked: false,
    },
    {
      imageSrc: "https://via.placeholder.com/250",
      title: "Pasta Recipes",
      initialRating: 4,
      initialBookmarked: false,
    },
    // Add more items here
  ];

  console.log("Favorites:", favorites);

  return (
    <div className="flex space-x-4">
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
  );
};

export default FavoriteList;
