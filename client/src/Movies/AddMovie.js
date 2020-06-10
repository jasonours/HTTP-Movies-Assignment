import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const newMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const AddMovie = props => {
    const [movie, setMovie] = useState(newMovie);

    const { push } = useHistory();
    
    const handleChange = event => {
        event.persist();
        if (event.target.name !== 'stars'){
            setMovie({
                ...movie,
                [event.target.name]: event.target.value,
            })
        } else {        
            setMovie({
                ...movie,
                stars: [...event.target.value.split(",")]
            })
        }
    };


    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res)
                push(`/`)
            })
            .catch(err => 
                console.log(err.res)
            )
        };

  return (
    <div>
        <h2>Add Movie</h2>
        <form onSubmit={handleSubmit} className='form'>
            <input type='text' name='title' placeholder='Title' onChange={handleChange} value={movie.title}/>
            <input type='text' name='director' placeholder='Director' onChange={handleChange} value={movie.director}/>
            <input type='text' name='metascore' placeholder='Metascore' onChange={handleChange} value={movie.metascore}/>
            <input type='text' name='stars' placeholder='Staring' onChange={handleChange} value={movie.stars}/>
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;