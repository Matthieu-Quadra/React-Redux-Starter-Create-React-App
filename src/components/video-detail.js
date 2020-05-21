import React from 'react';
import Video from './video';

const VideoDetail = ({movie}) => {
    //console.log('ici', movie.id)
    return (
        <div className='margin-top:0px'>
            <h1>{movie.title}</h1>
            <Video videoId={movie.videoId}/>
            <p>{movie.overview}</p>
        </div>
    );
}

export default VideoDetail;