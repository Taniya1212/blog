import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase.utils';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      key: ''
    };
  }

  componentDidMount() {
      const id = this.props.location.pathname.split('/');
      const id_new = id[2];
     
    const ref = firebase.firestore().collection('movies').doc(id_new);
    console.log(ref);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          movie: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('movies').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          <h4><Link to="/write">Movie List</Link></h4>
            <h3 className="panel-title">
              {this.state.movie.title}
            </h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Genre:</dt>
              <dd>{this.state.movie.genre}</dd>
              <dt>Year:</dt>
              <dd>{this.state.movie.year}</dd>
              <dt>Summary:</dt>
              <dd>{this.state.movie.summary}</dd>
              <dt>Ratings:</dt>
              <dd>{this.state.movie.rating}</dd>
              <dt>Url:</dt>
              <dd>{this.state.movie.imageUrl}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;

            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;