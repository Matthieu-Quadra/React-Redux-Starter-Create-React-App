import React, { Component } from 'react'
import SearchChoice from './search-bar-list';
import axios from 'axios'

const API_KEY = 'api_key=';
const URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText:'', 
            placeHolder:'Tapez votre film...',
            intervalBeforeRequest:1000,
            lockRequest: false,
            language: 'fr',
            apiKey : props.apiKey, 
            movies: {},
            searchTextSelected: ''
        };
    }
    receivedSearch(searchText) {
        //console.log('Click', searchText);
        axios.get(`${URL_SEARCH}language=${this.state.language}&${API_KEY}${this.state.apiKey}&query=${searchText}`).then(function(response) {
            if(searchText) {
                //console.log('Searchtext rempli');
                if (response.data && response.data.results[0]) {
                    //console.log('response', response.data.results);
                    this.setState({movies:response.data.results});
                    //console.log('response 2', this.state.movies);
                }
            }
        }.bind(this));
    }
    handleChoiceClik(movie) {
        this.props.callback(movie);
        this.setState({movies: {}, searchTextSelected: movie.title})
    }
    render () {
        const displaySearchChoice =() => {
            //console.log('ça passe', this.state.movies)
            if (this.state.movies.length > 0) {
                return (
                    <SearchChoice movies={this.state.movies} callback={this.handleChoiceClik.bind(this)}/>
                )
            }
        }
        return (
        <div>
            <div className='row'>
                <div className='col-md-8 input-group'>
                        <input 
                            type='text' 
                            className='form-control input-lg' 
                            onChange={this.handleChange.bind(this)} 
                            placeholder={this.state.placeHolder} 
                            value={this.state.searchTextSelected}/>
                        <span className='input-group-btn'>
                            <button className='btn btn-secondary' onClick={this.handleOnClick.bind(this)}>OK</button>
                        </span>
                </div>
                <div className='col-md-2'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img height='40px' src='./img/france.svg' onClick={this.onClickFR.bind(this)} alt='fr'/>
                        </div>
                        <div className='col-md-4'>
                            <img height='40px' src='./img/england.svg' onClick={this.onClickEN.bind(this)} alt='en-US'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-8 search_barList'>
                {displaySearchChoice()}
            </div>
        </div>
        )
    } 
    handleChange(event) {
        this.setState({searchText: event.target.value, searchTextSelected: event.target.value});
        if (!this.state.lockRequest) {
            this.setState({lockRequest:true});
            setTimeout(function(){this.search();}.bind(this),this.state.intervalBeforeRequest)
        }
    }
    handleOnClick(event) {
            this.search();
    }
    search() {
        if (this.state.searchText) {
            this.receivedSearch(this.state.searchText);
            //this.props.callback(this.state.searchText);
        }
        this.setState({lockRequest:false});
    }
    onClickFR(event) {
        this.setState({language: 'fr'}, () => {
            this.props.callbackLanguage(this.state.language);
        });
    }
    onClickEN(event) {
        this.setState({language: 'en-US'}, () => {
            this.props.callbackLanguage(this.state.language);
        });
    }
}

export default SearchBar;