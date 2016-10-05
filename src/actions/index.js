export const ADD_BUG_DATA = 'ADD_BUG_DATA';
export const CLEAN_AND_ADD_BUG_DATA = 'CLEAN_AND_ADD_BUG_DATA';

export const addBugData = (bugData) => {
  const action = {
    type: ADD_BUG_DATA,
    bugData,
  };
  return action;
};

export const cleanAndAddBugData = (bugData) => {
  const action = {
    type: CLEAN_AND_ADD_BUG_DATA,
    bugData,
  };
  return action;
};
