export const createMovie = (movie) => {
    return (dispatch, getState) => {
      // make async call to database
      return (dispatch, getState, {getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('movie').add({
          ...movie,
          authorFirstName: 'Net',
          authorLastName: 'Ninja',
          authorId: 12345,
          createdAt: new Date()
        }).then(() => {
          dispatch({ type: 'CREATE_MOVIE_SUCCESS' });
        }).catch(err => {
          dispatch({ type: 'CREATE_MOVIE_ERROR' }, err);
        });
      }
    };
    }