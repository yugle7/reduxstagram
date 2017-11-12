import { RSAA } from 'redux-api-middleware';

export const LIST_REQUEST = '@@user/LIST_REQUEST';
export const LIST_SUCCESS = '@@user/LIST_SUCCESS';
export const LIST_FAILURE = '@@user/LIST_FAILURE';
export const ME_REQUEST = '@@user/ME_REQUEST';
export const ME_SUCCESS = '@@user/ME_SUCCESS';
export const ME_FAILURE = '@@user/ME_FAILURE';
export const SINGLE_REQUEST = '@@user/SINGLE_REQUEST';
export const SINGLE_SUCCESS = '@@user/SINGLE_SUCCESS';
export const SINGLE_FAILURE = '@@user/SINGLE_FAILURE';
export const CREATE_REQUEST = '@@user/CREATE_REQUEST';
export const CREATE_SUCCESS = '@@user/CREATE_SUCCESS';
export const CREATE_FAILURE = '@@user/CREATE_FAILURE';
export const UPDATE_REQUEST = '@@user/UPDATE_REQUEST';
export const UPDATE_SUCCESS = '@@user/UPDATE_SUCCESS';
export const UPDATE_FAILURE = '@@user/UPDATE_FAILURE';
export const PASSWORD_REQUEST = '@@user/PASSWORD_REQUEST';
export const PASSWORD_SUCCESS = '@@user/PASSWORD_SUCCESS';
export const PASSWORD_FAILURE = '@@user/PASSWORD_FAILURE';
export const DELETE_REQUEST = '@@user/DELETE_REQUEST';
export const DELETE_SUCCESS = '@@user/DELETE_SUCCESS';
export const DELETE_FAILURE = '@@user/DELETE_FAILURE';


const embed = (params) => {
    if (typeof params !== 'object') return '';
    const query = Object.entries(params).map(([ key, value ]) => `${key}=${value}`).join('&');
    return query ? `?${query}` : '';
};

export const list = params => ({
    [RSAA]: {
        endpoint: `/api/users${embed({ ...params, access_token: localStorage.getItem('access_token') })}`,
        method: 'GET',
        types: [ LIST_REQUEST, LIST_SUCCESS, LIST_FAILURE ],
    },
});

export const me = () => ({
    [RSAA]: {
        endpoint: `/api/users/me${embed({ access_token: localStorage.getItem('access_token') })}`,
        method: 'GET',
        types: [ ME_REQUEST, ME_SUCCESS, ME_FAILURE ],
    },
});

export const single = id => ({
    [RSAA]: {
        endpoint: `/api/users/${id}`,
        method: 'GET',
        types: [ SINGLE_REQUEST, SINGLE_SUCCESS, SINGLE_FAILURE ],
    },
});

export const create = params => ({
    [RSAA]: {
        endpoint: '/api/users',
        method: 'POST',
        body: { access_token: 'yAOqxNZD1vxSZlS1upDY51tHdFhIBk1B', ...params },
        types: [ CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE ],
    },
});

export const update = (id, params) => ({
    [RSAA]: {
        endpoint: `/api/users/${id}`,
        method: 'PUT',
        body: { ...params },
        types: [ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ],
    },
});

export const password = (id, { email, prevPassword, nextPassword }) => ({
    [RSAA]: {
        endpoint: `/api/users/${id}/password`,
        method: 'PUT',
        body: { password: nextPassword },
        headers: { Authorization: `Basic ${btoa(`${email}:${prevPassword}`)}` },
        types: [ PASSWORD_REQUEST, PASSWORD_SUCCESS, PASSWORD_FAILURE ],
    },
});

export const remove = id => ({
    [RSAA]: {
        endpoint: `/api/users/${id}`,
        method: 'DELETE',
        types: [ DELETE_REQUEST, { type: DELETE_SUCCESS, payload: { id } }, DELETE_FAILURE ],
    },
});
