import FavoriteCard from "./FavoriteCard";

const FavoriteList = ({ favorites }) => {
  console.log("Favorites:", favorites);

  return (
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
  );
};

export default FavoriteList;
