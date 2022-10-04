import { ReactElement, useState } from "react";

type MovieType = {
  title: string,
  genre: string,
  image: string
}

export const MovieCard = (
  { movie, popupCallback, submitCallback} 
  : { movie: MovieType, 
      popupCallback: (value: React.SetStateAction<boolean>) => void, 
      submitCallback: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  }
  ) => {

  // The only state which can be updated from in this card is the rating.
  const [rating, setRating] = useState('')

  return (
    <div className='popup'>
					<div className='modal-content'>

						<form onSubmit={submitCallback} encType='multipart/form-data'>
							<div className='all-inputs'>
                <div>
                  <img src={`https://image.tmdb.org/t/p/w300${movie.image}`} alt="poster for selected movie"></img>
								</div>

								<div className='name-input-div'>
									{movie.title}
								</div>

								<div className='rating-input-div'>
									<label>Rating</label>
									<input
										required
										className='add-post-input'
										name='rating'
										type='text'
										placeholder='rating'
										onChange={e => setRating(e.target.value)}
										value={rating}
									/>
								</div>

								<div className='genre-input-div'>
									{movie.genre}
								</div>
              <button
                className='close-modal'
                onClick={() => popupCallback(false)}
              >
                CLOSE
              </button>
							<button className='post-modal'>POST</button>
							</div>
						</form>
					</div>
				</div>
  )

}