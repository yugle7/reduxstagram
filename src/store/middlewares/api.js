import { CALL_API, apiMiddleware } from 'redux-api-middleware';


export default store => next => action => { // eslint-disable-line
    const callApi = action[CALL_API];
    if (callApi) { // Check if this action is a redux-api-middleware action
        callApi.headers = { 'Content-Type': 'application/json', ...callApi.headers };
        if ([ 'DELETE', 'PUT', 'POST' ].includes(callApi.method)) callApi.body = JSON.stringify({ access_token: localStorage.getItem('access_token'), ...callApi.body });
    }

    // return apiMiddleware(store)(next)(action);
    return next(action);
};


// import { CALL_API } from 'redux-api-middleware';
// import isNil from 'lodash/isNil';
// import get from 'lodash/get';
//
// export default store => next => action => {
//     const callApi = action[CALL_API];
//
//     // Check if this action is a redux-api-middleware action.
//     if (callApi) {
//         // Prepend API base URL to endpoint if it does not already contain a valid base URL.
//         if (!/^((http|https|ftp):\/\/)/i.test(callApi.endpoint)) {
//             callApi.endpoint = `127.0.0.1:8000${callApi.endpoint}`;
//         }
//
//         // Set headers to empty object if undefined.
//         if (isNil(callApi.headers)) {
//             callApi.headers = {};
//         }
//
//         // Set Content-Type to application/json if Content-Type does not already have a value.
//         if (isNil(get(callApi.headers, 'Content-Type', null))) {
//             callApi.headers['Content-Type'] = 'application/json';
//         }
//     }
//
//     // Pass the FSA to the next action.
//     return next(action);
// };
