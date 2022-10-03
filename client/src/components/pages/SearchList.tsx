import { ReactElement, useState } from "react";
import { Movie } from "../../../customTypes";

const SearchList = ({ media, callback } : { media: Movie[], callback: (movie: Movie) => void }) => {

  return (
    <div className="mt-4 flex h-44 w-11/12 overflow-auto">
    { media.map((movie, index) => {
        return (
            <img
              className="object-cover shadow-md h-full mr-3"
              key={index} 
              onClick={() => callback(movie)} 
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            ></img>
        )
      })
    }
    </div>
  );
}

export default SearchList;