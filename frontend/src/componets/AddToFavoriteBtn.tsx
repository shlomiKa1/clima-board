import useFavoriteToggle from "../hooks/useFavoriteToggle";

interface AddFavoriteProps {
  cityName: string;
  lat: number;
  lon: number;
}

const AddToFavoriteBtn = ({ cityName, lat, lon }: AddFavoriteProps) => {
  const { isFavorite, toggle, loading } = useFavoriteToggle(cityName, lat, lon);

  return (
    <div>
      <button onClick={toggle} disabled={loading}>
        {loading ? "מעדכן..." : isFavorite ? "הסר ממעודפים" : "הוסף למועדפים"}
      </button>
    </div>
  );
};

export default AddToFavoriteBtn;
