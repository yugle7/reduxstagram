import { RSAA } from 'redux-api-middleware';

export const SIGNIN_REQUEST = '@@auth/SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = '@@auth/SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = '@@auth/SIGNIN_FAILURE';
export const SIGNOUT = '@@auth/SIGNOUT';
export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';


export const signIn = ({ email, password }) => ({
    [RSAA]: {
        endpoint: '/api/auth/',
        method: 'POST',
        body: { access_token: 'yAOqxNZD1vxSZlS1upDY51tHdFhIBk1B' },
        headers: { Authorization: `Basic ${btoa(`${email}:${password}`)}` },
        types: [ SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE ],
    },
});
export const signOut = () => ({
    type: SIGNOUT,
});

/*
export const login = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
    },
});

export const refreshAccessToken = token => ({
    [RSAA]: {
        endpoint: '/api/auth/token/refresh/',
        method: 'POST',
        body: JSON.stringify({ refresh: token }),
        headers: { 'Content-Type': 'application/json' },
        types: [ TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE ],
    },
});
*/
