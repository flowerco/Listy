import { FormEvent, ReactElement, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import React from "react";
import { searchMovies } from "../../utils/MoviedApiServices";
import { Movie } from "../../../customTypes";
import SearchList from "./SearchList";
import "../PostForm.css";
import { onPostAdded } from "../../utils/PostFormServices";

export const SearchPage = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);
  const initialState = { title: "", genre: "", image: "", rating: "" };


  const [formState, setFormState] = useState(initialState);
  const [searchList, setSearchList] = useState([] as Movie[]);
  const [popupActive, setPopupActive] = useState(false);
  const [movie, setMovie] = useState(initialState);

  const handleFormChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVal = event.target.value;
    setFormState({ ...formState, title: newVal });
    newVal === ""
      ? setSearchList([])
      : setSearchList(await searchMovies(newVal));
  };

  const handleMovieClick = (movie: Movie) => {
    setPopupActive(true);
    setMovie({
      title: movie.title,
      genre: movie.genre,
      image: movie.poster_path,
      rating: "4/10",
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const newPost = await onPostAdded({ userId: "6339ea6ea686a0ddcd561ffd", id:"", ...formState });
    // TODO: Update state in redux
    // dispatch({ type:'ADD_POST', payload: newPost });
    setPopupActive(false);
    setFormState(initialState);
  };

	// if (isLoading) {
	// 	return <div>SearchPage Loading...</div>;
	// }

	return authState.isAuthenticated ? (
		<main className='login-page'>
			<section className='search-container'>
				<h1 className='hello'>Hello!</h1>
				<label className='mt-4'>Search for Movies/TV:</label>
					<input className='search-bar' type='text' onChange={handleFormChange} value={formState.title} />
			</section>
		</main>
	) : (
		<></>
	);
};
