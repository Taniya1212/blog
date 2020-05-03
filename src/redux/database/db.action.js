import React from "react";
import firestore from '../../firebase/firebase.utils';


class SavedList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movies: []
      };
    }
  
    componentDidMount() {
      
        console.log("a");
      firestore.collection("movies")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          console.log(data);
          this.setState({ movies: data });
        });
    
    }

    render() {
        const { movies } = this.state;
        return (
          <div className="row">
            {movies.map(movie => (
              <div key={movie.uid} className="col-lg-6 col-md-6 col-s-12 mb-4">
                <div className="card h-100">
                  <div className="card">
                    <div className="card-body">
                      <h5>{movie.title}</h5>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }

export default SavedList;