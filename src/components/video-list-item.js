import React from 'react';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

const VideoListItem = (props) => {
    const {movie} = props;
    return (
        <li className='list-group-item' onClick={handleClick}>
            <div className='media'>
                <div className='media-left'>
                    <img className='media-object img-rounded' width='100px'  src={setImgURL()} alt='Affiche du film'/>
                </div>
                <div className='media-body'>
                    <h5 className='title_list_item'>{movie.title}</h5>
                </div>
            </div>
        </li>
    );
    function handleClick() {
        props.callback(movie);
    }
    function setImgURL() {
        if (movie.poster_path) {
            return `${IMAGE_URL}${movie.poster_path}`
        }
        return './img/movie.png'
    }
};

export default VideoListItem;