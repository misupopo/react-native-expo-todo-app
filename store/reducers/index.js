import { combineReducers } from 'redux';

import TodoReducer from './todoReducer';

export default combineReducers({
    todoReducer: TodoReducer,
});
