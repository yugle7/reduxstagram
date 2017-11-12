import { combineReducers } from 'redux';
import auth, * as fromAuth from './auth';
import user from './user';
import counter from './counter';
import article from './article';

export default combineReducers({
    auth,
    user,
    counter,
    article,
});


export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth);
export const accessToken = state => fromAuth.accessToken(state.auth);
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth);
export const refreshToken = state => fromAuth.refreshToken(state.auth);
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth);
export const authErrors = state => fromAuth.errors(state.auth);
export const withAuth = (headers = {}) => state => ({ ...headers, Authorization: `Bearer ${accessToken(state)}` });
