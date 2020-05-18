import React from 'react';
import Video from './video';

const VideoDetail = ({movie}) => {
    return (
        <div>
            <h1>{movie.title}</h1>
            <Video videoId={movie.videoId}/>
            <p>{movie.overview}</p>
        </div>
    );
}

export default VideoDetail;