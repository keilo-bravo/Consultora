import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { removeMovieFavorite } from '../../actions/index.js';
import './Favorites.css';

export class ConnectedList extends Component {

  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        <ul>
        {
          this.props.moviesFavourites && this.props.moviesFavourites.map((movie) =>(
                  <li key={movie.id}>
                      <Link to={`/movie/${movie.id}`}>
                          {movie.title}
                      </Link>
                      <button onClick={()=> {this.props.removeMovieFavorite(movie.id)}}> X </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
    return {
        moviesFavourites: state.moviesFavourites
    }
}


function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: movie => dispatch(removeMovieFavorite(movie))
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(ConnectedList);