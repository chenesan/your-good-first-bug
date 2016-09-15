import { ADD_BUG_DATA } from '../actions/';

const initialState = {
  bugListIds: [],
  bugListById: {},
};

const addBugData = (state, action) => {
  const bugData = action.bugData;
  const nextState = Object.assign({}, state);
  bugData.forEach((data) => {
    if (!state.bugListById[data.id]) {
      nextState.bugListById[data.id] = data;
      nextState.bugListIds.push(data.id);
    } else {
      return;
    }
  });
  return nextState;
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUG_DATA: {
      const nextState = addBugData(state, action);
      return nextState;
    }
    default:
      return state;
  }
};

export default data;
