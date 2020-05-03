import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import firebase from '../../firebase/firebase.utils';
import {Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('movies');
    this.unsubscribe = null;
    this.state = {
      movies: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const movies = [];
    querySnapshot.forEach((doc) => {
      const { title, genre,year, rating,summary,imageUrl } = doc.data();
      movies.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        genre,
        year,
        rating,
        summary,
        imageUrl
      });
    });
    this.setState({
      movies
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              MOVIE LIST
            </h3>
          </div>
          <div className="panel-body">
            <Button variant="outline-primary"><Link to="/create" >Add Movie</Link></Button>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Year</th>
                  <th>Rating</th>
                  <th>Summary</th>
                  <th>ImageUrl</th>
                </tr>
              </thead>
              <tbody>

                {this.state.movies.map(movie =>
                  <tr>
                   <td><Link to={`/show/${movie.key}`}>{movie.title}</Link></td>
              
                   
                    <td>{movie.genre}</td>
                    <td>{movie.year}</td>
                    <td>{movie.rating}</td>
                    <td>{movie.summary}</td>
                    <td>{movie.imageUrl}</td>
                  
                  </tr>
              
              )
              
              }

                

              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;