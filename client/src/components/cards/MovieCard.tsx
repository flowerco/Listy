import { useState } from "react";
import { MovieCardData } from "../../../customTypes";
import '../Components.css';

export const MovieCard = (
  { movie, popupCallback, submitCallback} 
  : { movie: MovieCardData, 
      popupCallback: (value: React.SetStateAction<boolean>) => void, 
      submitCallback: (rating:string, event: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    }
  ) => {

  // The only state which can be updated from in this card is the rating.
  const [rating, setRating] = useState('')

  return (
    <div className='modal-content'>
      <div className="relative h-full w-full px-20 py-10 flex flex-col justify-between">
        <CardData movie={movie} rating={rating} setRating={setRating} /> 
        <CardButtons rating={rating} popupCallback={popupCallback} submitCallback={submitCallback}/>
      </div>
    </div>
  )
}

const CardData = (
   { movie, rating, setRating } 
   : { movie: MovieCardData, rating: string, setRating: React.Dispatch<React.SetStateAction<string>> }
  ) => {
  return (
    <div className='flex h-4/5'>
      <img className="object-contain " src={`https://image.tmdb.org/t/p/w300${movie.image}`} alt="poster for selected movie"></img>
      <div className="h-full flex flex-col px-4 justify-evenly">
        <div className='text-4xl font-semibold'>{movie.title}</div>
        <div className='text-2xl py-6'>Genre: {movie.genre}</div>
        <div className="text-2xl">
          <label>Rating Out of 10:</label>
          <input
            required
            className='w-full'
            name='rating'
            type='text'
            placeholder='Set rating...'
            onChange={e => setRating(e.target.value)}
            value={rating}
          />
        </div>
      </div>
    </div>
  );
}

const CardButtons = (
    {rating, popupCallback, submitCallback} 
    : {
        rating: string,
        popupCallback: (value: React.SetStateAction<boolean>) => void, 
        submitCallback: (rating:string, event: React.MouseEvent<HTMLButtonElement>) => Promise<void>
      }
  ) => {
  return (
    <div className="flex justify-between">
      <button
        className='h-[6vh] w-[40%] text-white font-bold bg-[#31433b] rounded-lg'
        onClick={() => popupCallback(false)}
      >
        CLOSE
      </button>
      <button 
        className='h-[6vh] w-[40%] text-white font-bold bg-[#6b9080] rounded-lg'
        onClick={(event) => rating ? submitCallback(rating, event) : null}
      >
        POST
      </button>
    </div>
  )
}