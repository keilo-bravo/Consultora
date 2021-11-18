import React, { Component } from "react";
import { View, Text, TextInput, TouchableHighlight, Image } from 'react-native';
import { connect } from "react-redux";
import { getMovies, addMovieFavorite } from '../../actions/index.js';

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  handleChange(event) {
    console.log("event",event);
    this.setState({ title: event });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title);
  }

  render() {
    const { title } = this.state;
    console.log("llego?",title);
    return (
      <View>
        <Text>Buscador</Text>
        <View>
          <Text>Película: </Text>
          <TextInput
            name="title"
            type="text"
            id="text"
            autoComplete="off"
            defaultValue={title}
            onChangeText={(e) => this.handleChange(e)}
          />
          <TouchableHighlight onPress={(e) => this.handleSubmit(e)}>
          <Text>BUSCAR</Text>
          </TouchableHighlight>
        </View>
        {
          this.props.moviesLoaded && this.props.moviesLoaded.map( (movie) =>(
            <Text key={movie.imdbID}>
              {/* <Link to={`/movie/${movie.imdbID}`}> */}
                {movie.Title}
                {' '}
                {movie.Year}
              {/* </Link> */}
              {/* <Button onClick={()=> {this.props.addMovieFavorite({title:movie.Title, id:movie.imdbID})}}>
                {icon()}
              </Button> */}
            </Text>
          ))
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    moviesLoaded: state.moviesLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Buscador);