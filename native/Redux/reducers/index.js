const initialState = {
  moviesFavourites: [],
  moviesLoaded: [],
  movieDetail: {}
};

function Reducer(state = initialState, action) {
  switch(action.type){
    case "GET_MOVIES":
      return {
        ...state,
        moviesLoaded: action.payload.Search
      }
    case "ADD_MOVIE_FAVORITE":
    //[{id},{id},{id}]
    if (!(state.moviesFavourites.some(obj => obj.id === action.payload.id))){
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.concat(action.payload)
      }
    }
    else return state;
    case "DELETE_MOVIE_FAVORITE":
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.filter(movie=> movie.id !== action.payload)
      }
    case "GET_MOVIE_DETAIL": 
      return {
        ...state,
        movieDetail: action.payload
      }
    default: return state;

  }
}

export default Reducer;