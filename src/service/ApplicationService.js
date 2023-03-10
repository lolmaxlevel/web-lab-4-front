import { JwtManager } from "./JwtManager.js";

export const BASE_URL = "http://localhost:42880/api";

export const ApplicationService = {
    addAttempt: async function (attempt) {
        let body = JSON.stringify(attempt);
        return fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JwtManager.getCurrentAccessToken()}`,
            },
            body: body,
        }).then((response) => {
            return refreshHandler(response, () => {
                return ApplicationService.addAttempt(attempt);
            });
        });
    },
    removeAllAttempts: async function () {
        return fetch(`${BASE_URL}/delete_all`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${JwtManager.getCurrentAccessToken()}`,
            },
        }).then((response) => {
            return refreshHandler(response, () => {
                return ApplicationService.removeAllAttempts();
            });
        });
    },
    getAttemptsWithOffset: async function (offset, count) {
        let url = `${BASE_URL}/get_with_offset?offset=${offset}&size=${count}`;
        return fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${JwtManager.getCurrentAccessToken()}`,
            },
        }).then((response) => {
            return refreshHandler(response, () => {
                return ApplicationService.getAttemptsWithOffset(
                    offset,
                    count
                );
            });
        });
    },
    getRowsCount: async function () {
        return fetch(`${BASE_URL}/get_count/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${JwtManager.getCurrentAccessToken()}`,
            },
        }).then((response) => {
            return refreshHandler(response, () => {
                return ApplicationService.getRowsCount();
            });
        });
    },
    login: async function (username, password) {
        return JwtManager.login(username, password);
    },
    logout: async function () {
        return JwtManager.logout();
    },
    register: async function (username, password) {
        return fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Do not add Authorization Header here
            },
            body: JSON.stringify({ username: username, password: password }),
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 409 || response.status === 403 || response.status === 400) {
                return false;
            } else {
                console.log("Unexpected response status: " + response.status);
                return false;
            }
        }).then((data) => {
            if (data) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("username", username);
                return true;
            }
        });
    },
};

/**
 * This function is used to handle 403 response status.
 * If the response status is 403, it means that the access token has expired.
 * In this case, we need to refresh the access token and repeat the request.
 * @param response
 * @param func
 * @returns {*|Promise<*>}
 */
function refreshHandler(response, func) {
    if (response.status === 403) {
        console.log("Access token has expired, refreshing...");
        return JwtManager.refreshAccessToken().then(
            () => {
                return func();
            },
            () => {
                // The promise was rejected, so the refresh token has expired or is invalid
                // We need to log out the user to prevent further errors
                JwtManager.logout();
            }
        );
    } else {
        return response;
    }
}
