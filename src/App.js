
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var imgUrl="http://image.tmdb.org/t/p/w185//";
class App extends Component {
  constructor(){
    super()

    this.state={
      movies:[]
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    var query = this.input.value;
    console.log(query);
    this.componentDidMount(query);
  }
  componentDidMount(query){
    var api = 'https://api.themoviedb.org/3/search/movie?api_key=98e29b7ce43f0e1d5ee589664b968f3e&query='
    axios.get(api + query)
      .then(response => 
        this.setState ({
          movies:response.data.results
        }))
  }
  render() {
    const {movies} = this.state;
    var movieList = movies.map((movie) => 
    <div className="col-4 movie">  
      <img src={imgUrl + movie.poster_path}className="movieImg" alt='commando' />
      <p className="overview">{movie.overview}</p>
      <h3  key={movie.id}className="text-center movieTitle">{movie.title}</h3>
    </div>)
    return (
      <div className="App">
        <div className="jumbotron">  
            <div className="container">
            <div className="row">
            <h2 className="col-12 text-center">Search for a Movie</h2>
              <form onSubmit={this.onSubmit} className="col-12">
                <input className= "col-12 form-control" placeholder="Search Movies..."
                ref = {input => this.input = input}/>
              </form>
              <div>
                <ul className= "col-12 row">{movieList}</ul>
              </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;