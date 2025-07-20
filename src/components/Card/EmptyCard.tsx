interface EmptyCardProps {
  imgSrc: string;
  message: string;
}

export const EmptyCard = ({ imgSrc, message }: EmptyCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="No notes" className="w-24" />

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};
