import dbTypes from './db.types';

const INITIAL_STATE = {
  collections:null
};

const dbReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dbTypes.UPDATE_COLLECTIONS:
      return{
        ...state,
       collections: action.payload
     }
    default:
      return state;
  }
};

export default dbReducer;