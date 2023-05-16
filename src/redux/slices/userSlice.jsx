import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading:true,
        repos:[]
    },
    reducers: {
        setUser(state, action){
            state.user = action.payload.user;
        },
        setLoading(state, action){
            state.loading = action.payload.loading;
        },
        setRepos(state,action){
            state.repos = action.payload.repos;
        }
    }
});

export const {setUser,setLoading,setRepos} = userSlice.actions;

export default userSlice.reducer;
