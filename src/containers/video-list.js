import React from 'react';
import VideoListItem from '../components/video-list-item';

const VideoList = (props) => {
    //console.log('video list', moviesList)
    const {moviesList} = props;
    return (
        <ul>
            {
                moviesList.map(movie => (
                    <VideoListItem key={movie.id} movie={movie} callback={receivedMovieCLicked}/>
                ))
            }
        </ul>
    );
    function receivedMovieCLicked(movie) {
        props.callback(movie);
    }
};

export default VideoList;