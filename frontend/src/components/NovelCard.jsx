const NovelCard = ({ novel }) => {
  return (
    <>
      <img
        src={novel.image}
        alt={novel.title}
        className="h-[340px] w-full rounded-xl object-cover"
      />

      <h3 className="mt-3 text-white font-semibold text-lg truncate">
        {novel.title}
      </h3>

      <p className="text-md text-gray-600">
        {novel.genre}
      </p>
    </>
  );
};

export default NovelCard;
