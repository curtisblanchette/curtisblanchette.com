import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './store/reducers/themeSlice'

const store = configureStore({
	// Automatically calls `combineReducers`
	reducer: {
		theme: themeReducer,
	}
});

export default store;