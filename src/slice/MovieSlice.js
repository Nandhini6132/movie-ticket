import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movie: [],
  upcomingMovie: [],
  castcrew: {},
  playVideo: {},
  movieDetail: {},
  amount: {},
  seats: {},
  grandTotal: {},
  date: {},
  time: {},
  id: {},
  rowNo: {},
  seatNo: {},
  bookingDetails: [],
  snacksDetail: [],
  overAllTotal:{},
  subTotal:{}

};

const MovieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getAmount: (state, action) => {
      const det = {
        amount: action.payload.price,
        seats: action.payload.noOfSeats,
        date: action.payload.BookingDate,
        time: action.payload.time,
        grandTotal: action.payload.grandTotal,
        comb: action.payload.comb,
      };
      state.bookingDetails.push(det);
    },

    getSnack: (state, action) => {
      const filteredSnacksDetail = state.snacksDetail.filter(item => item !== undefined);
      if (filteredSnacksDetail.length > 5) {
        alert('nnnn')
      } else {

        const det = {
          id: action.payload.ida,
          snackName: action.payload.name,
          snackPrice: action.payload.price,
          snackQuantity: action.payload.quantity

        }
        state.snacksDetail.push(det)
      }
    },

    removeSnack: (state, action) => {

      const index = state.snacksDetail.findIndex(item => item.id === action.payload);


      if (index !== -1) {

        state.snacksDetail.splice(index, 1);
      }
    },



    getSeatLength: (state, action) => {
      state.seats = action.payload;
    },

    getDate: (state, action) => {
      state.date = action.payload;
    },

    getTime: (state, action) => {
      state.time = action.payload;
    },
    getId: (state, action) => {
      state.id = action.payload;
    },
    getRowNo: (state, action) => {
      state.rowNo = action.payload;
    },
    getSeatNo: (state, action) => {
      state.seatNo = action.payload;
    },
    removeRowAndSeat: (state, action) => {
      state.seatNo = null;
      state.rowNo = null;
    },
    getOverAllTotal: (state, action) => {
      state.overAllTotal = action.payload;
    },
    getSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.movie = action.payload;
      })

      .addCase(fetchMovieToPlayVideo.fulfilled, (state, action) => {
        state.playVideo = action.payload;
      })
      .addCase(fetchMovieToGetDetails.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
      })
      .addCase(fetchUpcomingMovie.fulfilled, (state, action) => {
        state.upcomingMovie = action.payload;
      })
      .addCase(fetchCastAndCrew.fulfilled, (state, action) => {
        state.castcrew = action.payload;
      });
  },
});

export const fetchAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=2685c7ff5ed7c6d106338b0631c3a318"
    );

    return response.data.results;
  }
);

export const fetchMovieToPlayVideo = createAsyncThunk(
  "movies/getMovieToPlayVideo",
  async (id) => {
    const response = await axios.get(
      ` https://api.themoviedb.org/3/movie/${id}/videos?api_key=2685c7ff5ed7c6d106338b0631c3a318`
    );

    return response.data.results[0];
  }
);

export const fetchMovieToGetDetails = createAsyncThunk(
  "movies/getMovieSingleMovie",
  async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2685c7ff5ed7c6d106338b0631c3a318`
    );
    return response.data;
  }
);

export const fetchUpcomingMovie = createAsyncThunk(
  "movies/upcomingMovie",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=2685c7ff5ed7c6d106338b0631c3a318`
    );
    return response.data.results;
  }
);

export const fetchCastAndCrew = createAsyncThunk(
  "movies/castandcrew",
  async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=2685c7ff5ed7c6d106338b0631c3a318`
    );
    return response.data;
  }
);

export const {
  getAmount,
  getSeatLength,
  getDate,
  getTime,
  getId,
  getRowNo,
  getSeatNo,
  removeRowAndSeat,
  getSnack,
  removeSnack,
  getOverAllTotal,
  getSubTotal


} = MovieSlice.actions;
export default MovieSlice.reducer;
