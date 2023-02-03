// import {createAction} from "@reduxjs/toolkit/src";
// import {ApplicationService} from "../../service/ApplicationService";
//
// export const fetchAddAttemptRequest =
//     createAction('FETCH_ADD_ATTEMPT_REQUEST');
// export const fetchAddAttemptSuccess =
//     createAction('FETCH_ADD_ATTEMPT_SUCCESS');
// export const fetchAddAttemptFailure =
//     createAction('FETCH_ADD_ATTEMPT_FAILURE');
//
// export function fetchAddAttempt(attempt) {
//     return dispatch => {
//         dispatch(fetchAddAttemptRequest());
//         return ApplicationService.addAttempt(attempt)
//             .then(response => {
//                 return response.json();
//             })
//             .then((newAttempt) => {
//                 dispatch(fetchAddAttemptSuccess(newAttempt));
//             })
//             .catch(error => {
//                 dispatch(fetchAddAttemptFailure(error.message));
//             })
//     }
// }