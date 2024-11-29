import { createSlice } from '@reduxjs/toolkit';


const movieStore = createSlice({
  name: 'movie',
  initialState: {
    movie: null, // Initial state for movie
  },
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload; // Set movie data
    },
    createMovie: (state, action) =>{
      state.movie = action.payload;
    },
  },
});

const movieReducer = movieStore.reducer
export default movieReducer;

export const { setMovie, createMovie } = movieStore.actions;

