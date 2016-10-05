import { ADD_BUG_DATA } from '../actions/';

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
      nextState.bugListById[bug.id] = bug;
      nextState.bugListIds.push(bug.id);
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
