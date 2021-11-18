import React from 'react';
import { connect } from 'react-redux';
import './Movie.css';
import { getMovieDetail } from '../../actions/index.js';


class Movie extends React.Component {

    componentDidMount() {
        // ya sabemos que el componente fue montado
        // ahora podemos empezar a realizar acciones con el mismo
        // por ejemplo ... consultas con la api ..... entonces puedo invocar a la accion
        // getMovieDetail !
        this.props.getMovieDetail(this.props.match.params.id)
        console.log("movie",this.props.movie)


            }
    render() {
        return (
            <div className="movie-detail">
            
                <div>
                    <img alt={"img"} src={this.props.movie.Poster}/>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        movie : state.movieDetail
    }
}

export default connect(mapStateToProps, {getMovieDetail})(Movie);
