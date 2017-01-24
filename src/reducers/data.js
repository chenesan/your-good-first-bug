import { CHANGE_ISSUES_SELECTOR, CLEAN_ISSUE_DATA, FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS } from '../actions/';

export const NO_NEXT_LINK = 'NO_NEXT_LINK';
export const UNKNOWN_LINK = 'UNKNOWN_LINK';

const initialState = {
  issueListIds: [],
  issueListById: {},
  status: {
    fetching: false,
    link: {
      root: '/api/v1/issues',
      next: '/api/v1/issues',
      isEnd: false,
    },
  },
};

const changeStatus = (status, option) => {
  const updatedStatus = {
    fetching: option.fetching !== undefined ? option.fetching : status.fetching,
    link: option.link ?
      Object.assign({}, status.link, {
        next: option.link.next,
        isEnd: option.link.isEnd,
      }) : status.link,
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
      });
      const nextState = Object.assign({}, state, {
        status: nextStatus,
      });
      return nextState;
    }
    case FETCH_ISSUES_SUCCESS: {
      const nextStatus = changeStatus(
        state.status,
        {
          fetching: false,
          link: action.link,
        }
      );
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
      const nextStatus = changeStatus(
        state.status,
        {
          link: {
            next: initialState.status.link.next,
            isEnd: false,
          },
        });
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
  return state.status.link.isEnd;
};
export const getNextLink = (state) => (
  state.status.link.next === NO_NEXT_LINK ? null : state.status.link.next
);
export const getRootUrl = (state) => state.status.link.root;
export const hasReadLink = (state) => {
  return false;
};
export default data;
