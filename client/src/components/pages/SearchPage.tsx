import { FormEvent, ReactElement, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { searchMovies } from "../../utils/MoviedApiServices";
import { Movie } from "../../../customTypes";
import SearchList from "./SearchList";
import "../PostForm.css";
import { onPostAdded } from "../../utils/PostFormServices";

export const SearchPage = (): ReactElement => {
  const initialState = { title: "", genre: "", image: "", rating: "" };

  const [isAuthenticated, setAuthenticated] = useState(true);
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

  return isAuthenticated ? (
    <main className="login-page">
      {popupActive ? (
        <div className="w-[80vw] h-[60vh]">
          <div className="modal-content flex flex-col w-full h-full px-10">
            <form
              className="relative h-full w-full mt-72"
              onSubmit={onSubmit}
              encType="multipart/form-data"
            >
              <div className="flex flex-col w-full">
                <div className="text-3xl font-bold mb-10">{movie.title}</div>

                <div className="flex justify-between items-center">
                  <div>
                    <img
                      className="h-60"
                      src={`https://image.tmdb.org/t/p/w300${movie.image}`}
                    ></img>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center w-[40%]">
                      <div className="text-2xl mt-4">Genre: {movie.genre}</div>
                      <div className="mt-4 w-full">
                        <label>Rating</label>
                        <input
                          required
                          className=""
                          name="rating"
                          type="text"
                          placeholder="rating"
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              rating: e.target.value,
                            })
                          }
                          value={formState.rating}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-between mt-10">
                  <button
                    className="w-[40%] bg-[#31433b] h-[6vh] rounded-lg text-white font-bold"
                    onClick={() => setPopupActive(false)}
                  >
                    CLOSE
                  </button>
                  <button
                    className="w-[40%] bg-[#6b9080] h-[6vh] rounded-lg text-white font-bold"
                    type="submit"
                  >
                    POST
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <section className="search-container">
        <label className="mt-4">Search for Movies/TV:</label>
        <input
          className="search-bar"
          type="text"
          onChange={handleFormChange}
          value={formState.title}
        />
        {searchList.length > 0 ? (
          <SearchList
            media={searchList.slice(0, 8)}
            callback={handleMovieClick}
          />
        ) : (
          <></>
        )}
      </section>
    </main>
  ) : (
    <></>
  );
};
