import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		theme: 'dark'
	},
	reducers: {
		// Give case reducers meaningful past-tense "event"-style names
		setLight(state, action) {
			// const { theme } = action.payload
			// "Mutating" update syntax thanks to Immer, and no `return` needed
			state.theme = 'light';
		},
		setDark(state) {
			state.theme = 'dark';
		}
	}
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { setLight, setDark } = themeSlice.actions

export const selectTheme = (state) => state.theme.theme;

// Export the slice reducer as the default export
export default themeSlice.reducer;