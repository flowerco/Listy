import { Movie } from '../../../customTypes';
import { PacmanLoader } from 'react-spinners';

const SearchList = ({
	media,
	searching,
	callback,
}: {
	media: Movie[];
	searching: boolean,
	callback: (movie: Movie) => void;
}) => {

	return (
		<div className='mt-8 flex h-44 w-11/12 overflow-auto'>
			{ media.length > 0 
      ? media.map((movie, index) => {
          return (
              <img
                className="object-cover shadow-md h-full mr-3 cursor-pointer"
                key={index} 
                onClick={() => callback(movie)} 
                src={ movie.poster_path 
										? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
										: 'https://cdn.vox-cdn.com/thumbor/wOZjPhGoN3riyhcWF0y2t5CjEjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19957766/88b52e90_9368_0132_1df6_0a2c89e5f2f5.jpeg'}
              ></img>
          )
        })
      : searching
				? <div className="flex w-full mt-4 h-full items-start justify-center">
          	<PacmanLoader size={60} color={"#6b9080"}/>
        	</div>
				: <></>
    }
		</div>
	);
};

export default SearchList;
