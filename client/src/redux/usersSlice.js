import {createSlice} from '@reduxjs/toolkit';

const usersSlice=createSlice({
    name: "users",
    initialState:{
        users:null,
    },
    reducers:{
        SetUser:(state, action)=>{
            state.user = action.payload;
        },
    },
});

export const {SetUser}=usersSlice.actions;
export default usersSlice.reducer;