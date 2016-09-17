export const ADD_BUG_DATA = 'ADD_BUG_DATA';

export const addBugData = (bugData) => {
  const action = {
    type: ADD_BUG_DATA,
    bugData,
  };
  return action;
};
