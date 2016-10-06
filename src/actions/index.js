import axios from 'axios';

export const ADD_BUG_DATA = 'ADD_BUG_DATA';
export const CLEAN_BUG_DATA = 'CLEAN_BUG_DATA';
export const FETCH_ISSUES_REQUEST = 'FETCH_ISSUES_REQUEST';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAILURE = 'FETCH_ISSUES_FAILURE';
export const CHANGE_ISSUES_FILTER = 'CHANGE_ISSUES_FILTER';

export const changeFilter = (option) => {
  const action = {
    type: CHANGE_ISSUES_FILTER,
    option,
  };
  return action;
};

export const cleanBugData = () => ({
  type: CLEAN_BUG_DATA,
});

export const fetchIssuesSuccess = (bugData) => {
  const action = {
    type: FETCH_ISSUES_SUCCESS,
    bugData,
  };
  return action;
};

export const fetchIssuesRequest = () => ({
  type: FETCH_ISSUES_REQUEST,
});

export const fetchIssuesFailure = () => ({
  type: FETCH_ISSUES_FAILURE,
});

const buildIssuesRequest = (filter) => {
  const config = {
    params: {},
  };
  if (filter.language !== 'all') {
    config.params.language = filter.language;
  }
  return axios.get('/api/v1/bugs', config);
};

export const fetchIssues = () => (dispatch, getState) => {
  const state = getState();
  const request = buildIssuesRequest(state.issueFilter);
  dispatch(fetchIssuesRequest());
  request.then(
    (response) => {
      const issueData = response.data;
      dispatch(fetchIssuesSuccess(issueData));
    },
    (err) => {
      console.error(err);
      dispatch(fetchIssuesFailure());
    }
  ).catch(
    (err) => { console.error(err); }
  );
};
