import './collection-item.styles.scss';
import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import firebase from '../../firebase/firebase.utils';

class Cards extends Component {
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

<div>
        
        {this.state.movies
        .map(movie =>
        <tr >
               
               <div class="carda" >
  <div class="card-image"><img src = {movie.imageUrl}></img></div>  
  <div class="card-content">
    <h2>
      {movie.title}
    </h2>
    <p>Release Date:{movie.year}</p>
    <p>Genre: {movie.genre}</p>
    <p>Ratings:{movie.rating}</p>
    <p>
      Summary: {movie.summary}
    </p>
  </div>
</div>
</tr>
        )}
</div>
);
}}

  export default Cards;

