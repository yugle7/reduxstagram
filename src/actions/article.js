import { RSAA } from 'redux-api-middleware';

export const LIST_REQUEST = '@@article/LIST_REQUEST';
export const LIST_SUCCESS = '@@article/LIST_SUCCESS';
export const LIST_FAILURE = '@@article/LIST_FAILURE';
export const SINGLE_REQUEST = '@@article/SINGLE_REQUEST';
export const SINGLE_SUCCESS = '@@article/SINGLE_SUCCESS';
export const SINGLE_FAILURE = '@@article/SINGLE_FAILURE';
export const CREATE_REQUEST = '@@article/CREATE_REQUEST';
export const CREATE_SUCCESS = '@@article/CREATE_SUCCESS';
export const CREATE_FAILURE = '@@article/CREATE_FAILURE';
export const UPDATE_REQUEST = '@@article/UPDATE_REQUEST';
export const UPDATE_SUCCESS = '@@article/UPDATE_SUCCESS';
export const UPDATE_FAILURE = '@@article/UPDATE_FAILURE';
export const DELETE_REQUEST = '@@article/DELETE_REQUEST';
export const DELETE_SUCCESS = '@@article/DELETE_SUCCESS';
export const DELETE_FAILURE = '@@article/DELETE_FAILURE';

export const list = () => ({
    [RSAA]: {
        endpoint: '/api/article',
        method: 'GET',
        types: [ LIST_REQUEST, LIST_SUCCESS, LIST_FAILURE ],
    },
});

export const single = id => ({
    [RSAA]: {
        endpoint: `/api/article/${id}`,
        method: 'GET',
        types: [ SINGLE_REQUEST, SINGLE_SUCCESS, SINGLE_FAILURE ],
    },
});

export const create = ({ title, content }) => ({
    [RSAA]: {
        endpoint: '/api/article',
        method: 'POST',
        body: { title, content },
        types: [ CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE ],
    },
});

export const update = (id, { title, content }) => ({
    [RSAA]: {
        endpoint: `/api/article/${id}`,
        method: 'PUT',
        body: ({ title, content }),
        types: [ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ],
    },
});

export const remove = id => ({
    [RSAA]: {
        endpoint: `/api/article/${id}`,
        method: 'DELETE',
        types: [ DELETE_REQUEST, { type: DELETE_SUCCESS, payload: { id } }, DELETE_FAILURE ],
    },
});
