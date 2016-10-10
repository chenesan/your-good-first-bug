import axios from 'axios';
import { getNextLink, isFetching } from '../reducers/data';

function getDataFromLinkHeader(link) {
  const data = {};
  link.split(',').forEach(line => {
    const [urlSeg, relSeg] = line.split(';').map(val => val.trim());
    const url = urlSeg.slice(1, -1);
    const rel = relSeg.split('=')[1].slice(1, -1);
    data[rel] = url;
  });
  return data;
}

export const CLEAN_ISSUE_DATA = 'CLEAN_ISSUE_DATA';
export const FETCH_ISSUES_REQUEST = 'FETCH_ISSUES_REQUEST';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAILURE = 'FETCH_ISSUES_FAILURE';
export const CHANGE_ISSUES_SELECTORS = 'CHANGE_ISSUES_SELECTORS';

export const changeSelectors = (changes) => {
  const action = {
    type: CHANGE_ISSUES_SELECTORS,
    changes,
  };
  return action;
};

export const cleanIssueData = () => ({
  type: CLEAN_ISSUE_DATA,
});

export const fetchIssuesSuccess = (payload) => {
  const action = {
    type: FETCH_ISSUES_SUCCESS,
    data: payload.data,
    next: payload.next,
  };
  return action;
};

export const fetchIssuesRequest = () => ({
  type: FETCH_ISSUES_REQUEST,
});

export const fetchIssuesFailure = () => ({
  type: FETCH_ISSUES_FAILURE,
});

const buildIssuesRequest = (selectors, url) => {
  const config = {
    params: {},
  };
  if (selectors.filter.language.value !== 'all') {
    config.params.language = selectors.filter.language.value;
  }
  if (selectors.filter.projectSize.value !== 'all') {
    config.params.projectSize = selectors.filter.projectSize.value;
  }
  config.params.sortBy = selectors.sorter.sortBy;
  config.params.order = selectors.sorter.order;
  return axios.get(url, config);
};

export const fetchIssues = () => (dispatch, getState) => {
  const state = getState();
  const nextLink = getNextLink(state.data);
  if (isFetching(state.data) || !nextLink) {
    return;
  } else {
    const request = buildIssuesRequest(state.issueSelectors, nextLink);
    dispatch(fetchIssuesRequest());
    request.then(
      (response) => {
        const payload = {
          data: response.data,
          next: getDataFromLinkHeader(response.headers.link).next,
        };
        dispatch(fetchIssuesSuccess(payload));
      },
      (err) => {
        console.error(err);
        dispatch(fetchIssuesFailure());
      }
    ).catch(
      (err) => { console.error(err); }
    );
  }
};
