import {ApplicationService} from "../../service/ApplicationService";
import {userSlice} from "../reducers/userSlice";

export const fetchLogin = (username, password) => async (dispatch) => {
    dispatch(userSlice.actions.fetchLogin());
    await ApplicationService.login(username, password).then((result) => {
        if (result) {
            dispatch(userSlice.actions.fetchLoginSuccess());
            dispatch(userSlice.actions.setUsername(username));
        } else {
            dispatch(userSlice.actions.fetchLoginFailure("Wrong username or password"));
        }
    })
        .catch(error => {
            dispatch(userSlice.actions.fetchLoginFailure(error.message));
        });
}
export const fetchRegister = (username, password) => async (dispatch) => {
    dispatch(userSlice.actions.fetchRegister());
    await ApplicationService.register(username, password).then((result) => {
        if (result) {
            dispatch(userSlice.actions.fetchRegisterSuccess());
            dispatch(userSlice.actions.setUsername(username));
        } else {
            dispatch(userSlice.actions.fetchRegisterFailure("User with such username already exists"));
        }
    })
        .catch(error => {
            dispatch(userSlice.actions.fetchRegisterFailure(error.message));
        });
}
export const fetchLogout = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchLogout());
    await ApplicationService.logout();
}
export const fetchAttempts = (offset, count) => async (dispatch) => {
    await ApplicationService.getAttemptsWithOffset(offset, count).then(response => response.json())
        .then(data => {
            dispatch(userSlice.actions.setAttempts(data.attempts));
        })
        .catch(error => {
            console.log(error.message);
        });
}
export const fetchAddAttempt = (attempt) => async (dispatch) => {
    dispatch(userSlice.actions.fetchAddAttempt());
    await ApplicationService.addAttempt(attempt).then((result) => {
        if (result) {
            dispatch(userSlice.actions.fetchAddAttemptSuccess());
        } else {
            dispatch(userSlice.actions.fetchAddAttemptFailure("Failed to add attempt"));
        }
    })
        .catch(error => {
            dispatch(userSlice.actions.fetchAddAttemptFailure(error.message));
        });
}