import { createSlice } from "@reduxjs/toolkit";

//from sign up page and sign in you have defined some states there
const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Add reducers here, these are functions that will update the state
        signInStart : (state) => {
            //console.log('start');
            state.loading = true;
        },
        signInSuccess : (state, action) => {
            //console.log('success');
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure : (state, action) => {
            //console.log('failure');
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;