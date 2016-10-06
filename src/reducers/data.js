import { CLEAN_BUG_DATA, FETCH_ISSUES_SUCCESS } from '../actions/';

const initialState = {
  bugListIds: [],
  bugListById: {},
};

const buildBug = (rawBug) => (
  {
    title: rawBug.title,
    languages: [rawBug.project.language.name],
    project: rawBug.project.name,
    projectUrl: rawBug.project.url,
    url: rawBug.url,
    date: rawBug.createdAt,
    id: rawBug.id,
  }
);

const addBugData = (state, action) => {
  const bugData = action.bugData;
  const nextState = Object.assign({}, state);
  bugData.forEach((rawBug) => {
    const bug = buildBug(rawBug);
    if (!state.bugListById[bug.id]) {
      nextState.bugListById = Object.assign({}, nextState.bugListById, {
        [bug.id]: bug,
      });
      nextState.bugListIds = nextState.bugListIds.concat([bug.id]);
    } else {
      return;
    }
  });
  return nextState;
};

const cleanState = () => Object.assign({}, initialState);

export const data = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ISSUES_SUCCESS: {
      const nextState = addBugData(state, action);
      return nextState;
    }
    case CLEAN_BUG_DATA: {
      const nextState = cleanState();
      return nextState;
    }
    default:
      return state;
  }
};

export default data;
