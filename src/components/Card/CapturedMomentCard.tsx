import { FaHeart } from "react-icons/fa";
import { formatDate } from "../../utils/helpers";
import { GrMapLocation } from "react-icons/gr";

interface CapturedMomentCardProps {
  imageUrl: string;
  title: string;
  story: string;
  date: string;
  visitedLocation: string[];
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

const CapturedMomentCard = ({
  imageUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavorite,
  onFavoriteClick,
}: CapturedMomentCardProps) => {
  return (
    <article className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        className="w-full h-56 object-cover rounded-lg"
        src={imageUrl}
        alt={title}
      />
      <button className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border-white/30 absolute top-4 right-4">
        <FaHeart
          className={`icon-btn ${
            isFavorite ? "text-red-500" : "text-white-500"
          }`}
          onClick={onFavoriteClick}
        />
      </button>

      <div className="p-4">
        <header className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">{formatDate(date)}</span>
          </div>
        </header>

        <p className="text-xs text-slate-600 mt-2">{story.slice(0, 60)}</p>

        <div className="inline-flex items-center gap-2 text-[13px] text-violet-600 bg-violet-200/40 rounded mt-3 px-2 py-1">
          <GrMapLocation />
          {visitedLocation.map((item, idx) =>
            visitedLocation.length == idx + 1 ? `${item}` : `${item}, `
          )}
        </div>
      </div>
    </article>
  );
};

export default CapturedMomentCard;
