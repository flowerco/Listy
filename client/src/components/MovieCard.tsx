import { ReactElement, useState } from "react";
import './PostForm.css';

type MovieType = {
  title: string,
  genre: string,
  image: string
}

export const MovieCard = (
  { movie, popupCallback, submitCallback} 
  : { movie: MovieType, 
      popupCallback: (value: React.SetStateAction<boolean>) => void, 
      submitCallback: (rating:string, event: React.MouseEvent<HTMLButtonElement>) => Promise<void>
  }
  ) => {

  // The only state which can be updated from in this card is the rating.
  const [rating, setRating] = useState('')

  return (

    <div className='modal-content'>
      <div className="relative h-full w-full px-20 py-10 flex flex-col justify-between">
        <div className='flex h-4/5'>
          <img className="object-contain " src={`https://image.tmdb.org/t/p/w300${movie.image}`} alt="poster for selected movie"></img>
          <div className="h-full flex flex-col px-4 justify-evenly">
            <div className='text-4xl font-semibold'>
              {movie.title}
            </div>
            <div className='text-2xl py-6'>
              Genre: {movie.genre}
            </div>
            <div className="text-2xl">
              <label>Rating:</label>
              <input
                required
                className='w-full'
                name='rating'
                type='text'
                placeholder='rating'
                onChange={e => setRating(e.target.value)}
                value={rating}
              />
            </div>

          </div>
        </div>
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
      </div>
    </div>
  )

}