import { CLEAN_ISSUE_DATA, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS } from '../actions/';

const initialState = {
  issueListIds: [],
  issueListById: {},
  status: {
    fetching: false,
  },
};

const changeStatus = (status, option) => {
  const updatedStatus = {
    fetching: option.fetching !== undefined ? option.fetching : status.fetching,
  };
  return Object.assign({}, status, updatedStatus);
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
    case FETCH_ISSUES_REQUEST: {
      const nextStatus = changeStatus(state.status, { fetching: true });
      const nextState = Object.assign({}, state, {
        status: nextStatus,
      });
      return nextState;
    }
    case FETCH_ISSUES_SUCCESS: {
      const nextStatus = changeStatus(state.status, { fetching: false });
      const nextState = Object.assign(
        addIssueData(state, action),
        { status: nextStatus }
      );
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

// selector

export const isFetching = (state) => state.status.fetching;

export default data;
