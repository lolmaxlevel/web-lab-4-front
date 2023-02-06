import {JwtManager} from "../../service/JwtManager";
import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    loggedIn: JwtManager.userIsLoggedIn(),
    username: localStorage.getItem("username"),
    password: '',
    isLoading: false,
    error:'',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setErrorMessage: (state, action) => {
            state.error = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        fetchLogin: (state, action) => {
            state.isLoading = true
        },
        fetchLoginSuccess: (state, action) => {
            state.isLoading = false
            state.error = ''
            state.loggedIn = true
        },
        fetchLoginFailure: (state, action) => {
            state.isLoading = false
            state.loggedIn = false
            state.error = action.payload
        },
        fetchRegister: (state, action) => {
            state.isLoading = true
        },
        fetchRegisterSuccess: (state, action) => {
            state.isLoading = false
            state.error = ''
            state.loggedIn = true
        },
        fetchRegisterFailure: (state, action) => {
            state.isLoading = false
            state.loggedIn = false
            state.error = action.payload
        },
        fetchLogout: (state, action) => {
            state.loggedIn = false
        },
    }
})
export default userSlice.reducer;