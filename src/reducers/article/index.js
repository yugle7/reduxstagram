import * as constant from 'actions/article';
import { Map, List } from 'immutable';


const initialState = Map({
    list: List(),
    single: Map({ title: '', content: '', createdAt: '', user: {} }),
    loading: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.LIST_REQUEST: return state.set('loading', true);
        case constant.LIST_SUCCESS: return state.set('loading', false).set('list', List(action.payload));
        case constant.LIST_FAILURE: return state.set('loading', false);

        case constant.SINGLE_REQUEST: return state.set('loading', true);
        case constant.SINGLE_SUCCESS: return state.set('loading', false).set('single', Map(action.payload));
        case constant.SINGLE_FAILURE: return state.set('loading', false);

        case constant.CREATE_REQUEST: return state.set('loading', true);
        case constant.CREATE_SUCCESS: return state.set('loading', false).set('single', Map(action.payload));
        case constant.CREATE_FAILURE: return state.set('loading', false);

        case constant.UPDATE_REQUEST: return state.set('loading', true);
        case constant.UPDATE_SUCCESS: return state.set('loading', false).set('single', Map(action.payload));
        case constant.UPDATE_FAILURE: return state.set('loading', false);

        case constant.DELETE_REQUEST: return state.set('loading', true);
        case constant.DELETE_SUCCESS: return state.set('loading', false).update('list', list => list.filter(item => item.id !== action.payload.id));
        case constant.DELETE_FAILURE: return state.set('loading', false);

        default: return state;
    }
};
