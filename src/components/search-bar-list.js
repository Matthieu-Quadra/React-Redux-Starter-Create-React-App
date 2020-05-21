import React from 'react';

const SearchChoice = (props) => {
    const {movies} = props;
    //movies = movies.slice(0,5);
    const myMovies = movies.slice(0,5);
    //console.log(movies)
    return (
        <ul className='list-group-flush'>
            {   
                myMovies.map(movie => (
                <li className='list-group-item' key={movie.id} onClick={() => {handleClick(movie)}}>{movie.title} [{movie.original_title}]</li>
                ))
            }
        </ul>
    );
    function handleClick(movie) {
        //console.log('event 2', movie);
        props.callback(movie)
    }
}

export default SearchChoice;