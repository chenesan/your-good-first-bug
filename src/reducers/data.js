import { CHANGE_ISSUES_SELECTOR, CLEAN_ISSUE_DATA, FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS } from '../actions/';

export const NO_NEXT_LINK = 'NO_NEXT_LINK';

const initialState = {
  issueListIds: [],
  issueListById: {},
  status: {
    fetching: false,
    link: {
      root: '/api/v1/issues',
      next: NO_NEXT_LINK,
    },
  },
};

const changeStatus = (status, option) => {
  const updatedStatus = {
    fetching: option.fetching !== undefined ? option.fetching : status.fetching,
    link: Object.assign({}, status.link, { next: option.next ? option.next : NO_NEXT_LINK }),
  };
  return Object.assign({}, status, updatedStatus);
};

const buildIssue = (rawIssue) => (
  {
    title: rawIssue.title,
    body: rawIssue.body,
    languages: [rawIssue.project.language.name],
    project: {
      name: rawIssue.project.name,
      url: rawIssue.project.url,
      description: rawIssue.project.description,
      size: rawIssue.project.size,
    },
    url: rawIssue.url,
    createdAt: rawIssue.createdAt,
    id: rawIssue.id,
  }
);

const addIssueData = (state, action) => {
  const issueData = action.data;
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
      const nextStatus = changeStatus(state.status, {
        fetching: true,
        link: {
          next: action.next,
        },
      });
      const nextState = Object.assign({}, state, {
        status: nextStatus,
      });
      return nextState;
    }
    case FETCH_ISSUES_SUCCESS: {
      const nextStatus = changeStatus(state.status, { fetching: false, next: action.next });
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
    case CHANGE_ISSUES_SELECTOR: {
      const nextStatus = changeStatus(state.status, { next: initialState.status.link.next });
      const nextState = Object.assign({}, state, { status: nextStatus });
      return nextState;
    }
    default:
      return state;
  }
};

// selector

export const isFetching = (state) => state.status.fetching;
export const hasReachedPageEnd = (state) => {
  return false;
};
export const getNextLink = (state) => (
  state.status.link.next === NO_NEXT_LINK ? null : state.status.link.next
);
export const getRootUrl = (state) => state.status.link.root;

export default data;
