import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const initialMovie = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    };

const UpdateMovie = () => {
    const { id } = useParams();
    const { push } = useHistory();

    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => 
                console.log(err.res)
            )
    }, [id]);

    const handleChange = event => {
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
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
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
            <h2>Update</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type='text' name='title' placeholder='Title' onChange={handleChange} value={movie.title}/>
                <input type='text' name='director' placeholder='Director' onChange={handleChange} value={movie.director}/>
                <input type='text' name='metascore' placeholder='Metascore' onChange={handleChange} value={movie.metascore}/>
                <input type='text' name='stars' placeholder='Staring' onChange={handleChange} value={movie.stars}/>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default UpdateMovie;