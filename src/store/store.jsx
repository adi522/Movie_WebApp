import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvSlice";
import personReducer from "./reducers/personSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        tvShows: tvReducer,
        people: personReducer,
    },
}); 