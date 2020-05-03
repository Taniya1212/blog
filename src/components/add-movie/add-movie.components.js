import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase.utils';
import './add-movie.styles.scss';
import {Form, FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('movies');  
    this.state = {
      title: '',
      genre: '',
      year: '',
      rating: '',
      summary: '',
      imageUrl: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  
  onSubmit = (e) => {
    e.preventDefault();

    const { title, genre, year,rating,summary,imageUrl } = this.state;
    
    this.ref.add({
      title,
      genre,
      year,
      rating,
      summary,imageUrl

    }).then((docRef) => {
      this.setState({
        title: '',
        genre: '',
        year: '',
        rating: '',
        summary: '',
        imageUrl: '',
      });
      console.log(docRef);
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, genre, year, summary , rating ,imageUrl} = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD MOVIE
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/write" className="btn-primary">MOVIE LIST</Link></h4>
            <Form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <FormControl type="text" className="mr-sm-2" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre:</label>
                <FormControl type="text" className="mr-sm-2" name="genre" value={genre} onChange={this.onChange} placeholder="Genre" />
                 </div>
              <div className="form-group">
                <label htmlFor="year">Year:</label>
                <FormControl type="text" className="mr-sm-2" name="year" value={year} onChange={this.onChange} placeholder="Year" />
              </div>
              <div className="form-group">
                <label htmlFor="summary">Summary:</label>
                <FormControl type="text" className="mr-sm-2" name="summary" value={summary} onChange={this.onChange} placeholder="Summary" />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <FormControl type="text" className="mr-sm-2" name="rating" value={rating} onChange={this.onChange} placeholder="Ratings" />
              </div>
              <div className="form-group">
                <label htmlFor="imagUrl">ImageUrl:</label>
                <FormControl type="text" className="mr-sm-2" name="imageUrl" value={imageUrl} onChange={this.onChange} placeholder="ImageUrl" />
              </div>
             
              <Button type="submit" variant="success">Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;