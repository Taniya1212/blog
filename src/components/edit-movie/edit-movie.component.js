import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase.utils';


class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      genre: '',
      year: '',
      rating: '',
      summary: '',
      imageUrl: '',
   
    };
  }

  componentDidMount() {
    const id = this.props.location.pathname.split('/');
    const id_new = id[2];
    const ref = firebase.firestore().collection('movies').doc(id_new);
    ref.get().then((doc) => {
      if (doc.exists) {
        const movie = doc.data();
        this.setState({
          key: doc.id,
          title: movie.title,
          genre: movie.genre,
          year: movie.year,
          rating: movie.rating,
          summary: movie.summary,
          imageUrl: movie.imageUrl
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({movie:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, genre, year,rating,summary,imageUrl } = this.state;
    const id = this.props.location.pathname.split('/');
    const id_new = id[2];
    const key = this.props;

    console.log(key);
    console.log(this.state)
    const updateRef = firebase.firestore().collection('movies').doc(this.state.key);
    updateRef.set({
        title,
        genre,
        year,
        rating,
        summary,imageUrl  }).then((docRef) => {
      this.setState({
        title: '',
        genre: '',
        year: '',
        rating: '',
        summary: '',
        imageUrl: '',
   });
      this.props.history.push("/show/"+id_new)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT MOVIE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Movie List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">genre</label>
                <input type="text" class="form-control" name="description" value={this.state.genre} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="author">Year:</label>
                <input type="text" class="form-control" name="year" value={this.state.year} onChange={this.onChange} placeholder="Year" />
              </div>
              <div class="form-group">
                <label for="author">Rating:</label>
                <input type="text" class="form-control" name="rating" value={this.state.rating} onChange={this.onChange} placeholder="Rating" />
              </div>
              <div class="form-group">
                <label for="author">Year:</label>
                <input type="text" class="form-control" name="summary" value={this.state.summary} onChange={this.onChange} placeholder="Summary" />
              </div>
              <div class="form-group">
                <label for="author">Year:</label>
                <input type="text" class="form-control" name="imageUrl" value={this.state.imageUrl} onChange={this.onChange} placeholder="imageUrl" />
              </div>

              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
