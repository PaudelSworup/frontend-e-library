import React from "react";

const FavouriteGenres = ({ genre }) => {
  return (
    <div className="ml-2 m-10">
      <h3 className="text-white text-lg font-bold tracking-wider">
        Favourite Genre(s)
      </h3>
      <div className="text-white flex gap-3 flex-wrap">
        {genre?.map((genre, i) => {
          return (
            <p
              key={i}
              className="bg-slate-600 px-5 mt-3 cursor-pointer p-2 text-lg tracking-widest uppercase font-semibold rounded-3xl"
            >
              {genre}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FavouriteGenres;
