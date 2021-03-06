import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import AddMovie from "./Movies/AddMovie";

import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const setMovie = movie => {
    const newMovieList = [...movieList];
    const index = newMovieList.findIndex(m => m.id === movie.id);
    newMovieList[index] = movie;
    setMovieList(newMovieList);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList}/>
      </Route>

      <Route exact path="/add-movie/:id" component={AddMovie} />

      <Route  exact path="/movies/:id"
        render = {props => <Movie {...props} addToSavedList={addToSavedList} /> } />      

      <Route path='/update-movie/:id'
        render = {props => <UpdateMovie {...props} movies={movieList} setMovie={setMovie} /> } />
    </>
  );
};

export default App;