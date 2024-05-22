import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        username: null,
        email: null,
        isArtist: false,
        isFalse: false,
        medias: []
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUsername: (state, action) => {
            state.value.username = action.payload;
        },
        updateEmail: (state, action) => {
            state.value.email = action.payload;
        },
        updateToken: (state, action) => {
            state.value.token = action.payload;
        },
        updateType: (state, action) => {
            state.value.type = action.payload;
        },
        addMedia: (state, action) => {
            state.value.medias.push(action.payload);
        },
        removeMedia: (state, action) => {
            state.value.medias = state.value.medias.filter(e => e !== action.payload);
        },
    },
});

export const { updateUsername, updateEmail, updateToken, updateType, addMedia, removeMedia } = userSlice.actions;
export default userSlice.reducer;