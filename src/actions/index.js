import axios from 'axios';

export const CLEAN_ISSUE_DATA = 'CLEAN_ISSUE_DATA';
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

export const cleanIssueData = () => ({
  type: CLEAN_ISSUE_DATA,
});

export const fetchIssuesSuccess = (issueData) => {
  const action = {
    type: FETCH_ISSUES_SUCCESS,
    issueData,
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
  return axios.get('/api/v1/issues', config);
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
