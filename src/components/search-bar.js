import React, { Component } from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText:'', 
            placeHolder:'Tapez votre film...',
            intervalBeforeRequest:1000,
            lockRequest: false
        };
    }
    render () {
        return (
            <div className='row'>
                <div className='col-md-8 input-group'>
                    <input type='text' className='form-control input-lg' onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
                    <span className='input-group-btn'>
                        <button className='btn btn-secondary' onClick={this.handleOnClick.bind(this)}>OK</button>
                    </span>
                </div>
                <div className='col-md-2'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img height='40px' src='./img/france.svg' onClick={this.onClickFR.bind(this)}/>
                        </div>
                        <div className='col-md-4'>
                            <img height='40px' src='./img/england.svg' onClick={this.onClickEN.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
    handleChange(event) {
        this.setState({searchText: event.target.value});
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
            this.props.callback(this.state.searchText);
        }
        this.setState({lockRequest:false});
    }
    onClickFR(event) {
        this.props.callbackLanguage('fr');
    }
    onClickEN(event) {
        this.props.callbackLanguage('en-US');
    }
}

export default SearchBar;