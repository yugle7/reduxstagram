import { Map } from 'immutable';
import jwtDecode from 'jwt-decode';
import * as auth from 'actions/auth';

const initialState = Map({
    me: Map({
        role: 'anonymous',
        name: '',
        picture: '',
    }),
    access: Map(),
    refresh: Map(),
    errors: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
        case auth.SIGNIN_SUCCESS:
            window.localStorage.setItem('access_token', action.payload.token);
            console.log(action, jwtDecode(action.payload.token));
            return state.set('me', Map(action.payload.user)).set('errors', {});
            // access: {
            //     token: action.payload.access,
            //     ...jwtDecode(action.payload.access),
            // },
            // refresh: {
            //     token: action.payload.refresh,
            //     ...jwtDecode(action.payload.refresh),
            // },
        case auth.TOKEN_RECEIVED:
            return state.set('access', Map({ token: action.payload.access, ...jwtDecode(action.payload.access) }));
        case auth.SIGNIN_FAILURE:
        case auth.TOKEN_FAILURE:
            return state
                .set('access', Map())
                .set('refresh', Map())
                .set('errors', action.payload.response || { non_field_errors: action.payload.statusText });
        case auth.SIGNOUT: {
            window.localStorage.removeItem('access_token');
            return initialState;
        }
        default:
            return state;
    }
};

export const accessToken = state => state.access && state.access.token;

export const refreshToken = state => state.refresh && state.refresh.token;

// export const isExpired = timestamp => timestamp ? (timestamp - Date.now()/1000 << 0) < 5 : true;
export const isExpired = timestamp => !timestamp || Date.now() / 1000 > timestamp; // +5 seconds

export const isAccessTokenExpired = ({ access }) => isExpired(access && access.exp);
export const isRefreshTokenExpired = ({ refresh }) => isExpired(refresh && refresh.exp);

export const isAuthenticated = state => !isRefreshTokenExpired(state);
export const errors = state => state.errors;
