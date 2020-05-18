import React, { Component } from 'react';
import SearchBar from '../components/search-bar'
import VideoList from './video-list';
import axios from 'axios';
import VideoDetail from '../components/video-detail';

const URL_MOVIE = 'https://api.themoviedb.org/3/';
const URL_PARAM_POPU = 'discover/movie?sort_by=popularity.desc&include_adult=false';
const API_KEY = 'api_key=';
const URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?';
const URL_PARAM_RECOMMANDATION = '/recommendations?include_adult=false';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {apiKey: props.apiKey, moviesList: {}, currentMovie: {}, language: 'fr'};
    }

    UNSAFE_componentWillMount() {
        this.intiMovies();
    }

    intiMovies() {
        axios.get(`${URL_MOVIE}${URL_PARAM_POPU}&language=${this.state.language}&${API_KEY}${this.state.apiKey}`).then(function(response) {
            this.setState({moviesList:response.data.results.slice(1,6), currentMovie:response.data.results[0]},function() {
                this.addVideoURL();
            });
        }.bind(this));
    }
    addVideoURL() {
        //console.log('AddVideo', this.state.currentMovie.id);
        axios.get(`${URL_MOVIE}movie/${this.state.currentMovie.id}?${API_KEY}${this.state.apiKey}&language=${this.state.language}&append_to_response=videos&include_adult=false`).then(function(response) {
            //console.log('', response);
            if (response.data && response.data.videos.results[0]) {
                const videoId = response.data.videos.results[0].key;
                let newCurrentMovie = this.state.currentMovie;
                newCurrentMovie.videoId = videoId;
                this.setState({currentMovie:newCurrentMovie});    
            }
            //console.log('', newCurrentMovie);
        }.bind(this));
    }
    receivedMovieClick(movie) {
        this.setState({currentMovie:movie}, function() {
            this.addVideoURL();
            this.setRecommandation();
        })
    }
    receivedSearch(searchText) {
        //console.log('Click', searchText);
        axios.get(`${URL_SEARCH}language=${this.state.language}&${API_KEY}${this.state.apiKey}&query=${searchText}`).then(function(response) {
            if(searchText) {
                //console.log('Searchtext rempli');
                if (response.data && response.data.results[0]) {
                    //console.log('response', response.data.results[1].id, this.state.currentMovie.id);
                    if (response.data.results[0].id !== this.state.currentMovie.id) {
                        this.setState({currentMovie:response.data.results[0]},function() {    
                            this.addVideoURL();
                            this.setRecommandation();
                        });
                    }
                }
            }
        }.bind(this));
    }
    setRecommandation() {
        axios.get(`${URL_MOVIE}movie/${this.state.currentMovie.id}${URL_PARAM_RECOMMANDATION}&language=${this.state.language}&${API_KEY}${this.state.apiKey}`).then(function(response) {
            this.setState({moviesList:response.data.results.slice(0,5)});
        }.bind(this));
    }
    changeLanguage(language) {
        if (language!==this.state.language) {
            this.setState({language: language}, function() {
                axios.get(`${URL_MOVIE}movie/${this.state.currentMovie.id}?language=${this.state.language}&${API_KEY}${this.state.apiKey}`).then(function(response) {
                    console.log('', response)
                    this.setState({currentMovie:response.data},function() {
                        this.addVideoURL();
                        this.setRecommandation();
                    });
                }.bind(this));    
            });
        }
        //console.log('', language)
    }
    render () {
        const renderVideoList = () => {
            if (this.state.moviesList.length>0) {
                return <VideoList moviesList={this.state.moviesList} callback={this.receivedMovieClick.bind(this)}/>;
            }
        }
        const renderVideoDetail = () => {
            if (this.state.currentMovie.id > 0) {
                return <VideoDetail movie={this.state.currentMovie}/>
            }
        }
        return (
            <div>
                <div className='search_bar'>
                    <SearchBar callback={this.receivedSearch.bind(this)} callbackLanguage={this.changeLanguage.bind(this)}/>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {renderVideoDetail()}
                    </div>
                    <div className='col-md-4'>
                        {renderVideoList()}
                    </div>
                </div>
            </div>
        );    
    }
}

export default App;