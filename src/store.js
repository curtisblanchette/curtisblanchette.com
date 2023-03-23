import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './components/ToggleSwitch/themeSlice'

const store = configureStore({
	// Automatically calls `combineReducers`
	reducer: {
		theme: themeReducer,
	}
});

export default store;