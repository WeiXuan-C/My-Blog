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
  },
});

const movieReducer = movieStore.reducer


export const { setMovie } = movieStore.actions;
export default movieReducer;
