import { CLEAN_ISSUE_DATA, FETCH_ISSUES_SUCCESS } from '../actions/';

const initialState = {
  issueListIds: [],
  issueListById: {},
};

const buildIssue = (rawIssue) => (
  {
    title: rawIssue.title,
    languages: [rawIssue.project.language.name],
    project: rawIssue.project.name,
    projectUrl: rawIssue.project.url,
    url: rawIssue.url,
    date: rawIssue.createdAt,
    id: rawIssue.id,
  }
);

const addIssueData = (state, action) => {
  const issueData = action.issueData;
  const nextState = Object.assign({}, state);
  issueData.forEach((rawIssue) => {
    const issue = buildIssue(rawIssue);
    if (!state.issueListById[issue.id]) {
      nextState.issueListById = Object.assign({}, nextState.issueListById, {
        [issue.id]: issue,
      });
      nextState.issueListIds = nextState.issueListIds.concat([issue.id]);
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
      const nextState = addIssueData(state, action);
      return nextState;
    }
    case CLEAN_ISSUE_DATA: {
      const nextState = cleanState();
      return nextState;
    }
    default:
      return state;
  }
};

export default data;
