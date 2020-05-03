import { createSelector } from 'reselect';

const selectMovie = state => state.movies;
console.log(selectMovie);

export const selectCollections = createSelector(
  [selectMovie],
  movies => movies.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
  collections ?  Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections =>
    collections ? collections[collectionUrlParam] : null
  );
