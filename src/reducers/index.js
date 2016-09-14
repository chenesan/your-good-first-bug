import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui';
import { data } from './data';

const reducer = combineReducers({
  data,
  ui: uiReducer,
});

export default reducer;
