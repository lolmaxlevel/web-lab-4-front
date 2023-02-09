import {JwtManager} from "../../service/JwtManager";
import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    attempts: [],
    loggedIn: JwtManager.userIsLoggedIn(),
    username: localStorage.getItem("username") ? localStorage.getItem("username") : '',
    password: '',
    isLoading: false,
    error:'',
    needUpdate: false,
    rValue: 1,
    activePage: 1,
    rowsCount:0
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
        fetchLogin: (state, ) => {
            state.isLoading = true
        },
        fetchLoginSuccess: (state, ) => {
            state.isLoading = false
            state.error = ''
            state.loggedIn = true
        },
        fetchLoginFailure: (state, action) => {
            state.isLoading = false
            state.loggedIn = false
            state.error = action.payload
        },
        fetchRegister: (state, ) => {
            state.isLoading = true
        },
        fetchRegisterSuccess: (state, ) => {
            state.isLoading = false
            state.error = ''
            state.loggedIn = true
        },
        fetchRegisterFailure: (state, action) => {
            state.isLoading = false
            state.loggedIn = false
            state.error = action.payload
        },
        fetchLogout: (state, ) => {
            state.loggedIn = false
        },
        setAttempts: (state, action) => {
            state.attempts = action.payload
        },
        fetchAddAttempt: (state, ) => {
            state.isLoading = true
            state.needUpdate = true
        },
        fetchAddAttemptSuccess: (state, ) => {
            state.isLoading = false
            state.error = ''
            state.needUpdate = false
        },
        fetchAddAttemptFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.needUpdate = false
        },
        setNeedUpdate: (state, action) => {
            state.needUpdate = action.payload
        },
        setRValue: (state, action) => {
            state.rValue = action.payload
        },
        setRowsCount: (state, action) => {
            state.rowsCount = action.payload
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload
        }
    }
})
export default userSlice.reducer;