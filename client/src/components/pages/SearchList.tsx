import { ReactElement, useState } from "react";
import { Movie } from "../../../customTypes";
import ClipLoader from 'react-spinners/ClipLoader';

const SearchList = ({ media, callback } : { media: Movie[], callback: (movie: Movie) => void }) => {

  return (
    <div className="mt-8 flex h-44 w-11/12 overflow-auto">
      { media.map((movie, index) => {
          return (
              <img
                className="object-cover shadow-md h-full mr-3 cursor-pointer"
                key={index} 
                onClick={() => callback(movie)} 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              ></img>
          )
        })
      }
    {/* { media.length > 0 
      ? media.map((movie, index) => {
          return (
              <img
                className="object-cover shadow-md h-full mr-3 cursor-pointer"
                key={index} 
                onClick={() => callback(movie)} 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              ></img>
          )
        })
      : <div className="flex w-full mt-4 h-full items-center justify-center">
          <ClipLoader size={120}/>
        </div>
    } */}
    </div>
  );
}

export default SearchList;