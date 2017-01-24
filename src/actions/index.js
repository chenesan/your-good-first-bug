import axios from 'axios';
import { buildIssuesRequest } from '../reducers';
import { isFetching, hasReachedPageEnd, NO_NEXT_LINK } from '../reducers/data';

function buildLinkDataFromLinkHeader(linkHeader) {
  const data = {};
  const state = {};
  if (linkHeader) {
    linkHeader.split(',').forEach(line => {
      const [urlSeg, relSeg] = line.split(';').map(val => val.trim());
      const url = urlSeg.slice(1, -1);
      const rel = relSeg.split('=')[1].slice(1, -1);
      data[rel] = url;
    });
    state.next = data.next || NO_NEXT_LINK;
    state.isEnd = !data.last;
  } else {
    state.next = NO_NEXT_LINK;
    state.isEnd = true;
  }
  return state;
}

export const CLEAN_ISSUE_DATA = 'CLEAN_ISSUE_DATA';
export const FETCH_ISSUES_REQUEST = 'FETCH_ISSUES_REQUEST';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAILURE = 'FETCH_ISSUES_FAILURE';
export const CHANGE_ISSUES_SELECTORS = 'CHANGE_ISSUES_SELECTORS';
export const UPDATE_SELECTOR_OPTIONS = 'UPDATE_SELECTOR_OPTIONS';

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
    link: payload.link,
  };
  return action;
};

export const fetchIssuesRequest = () => ({
  type: FETCH_ISSUES_REQUEST,
});

export const fetchIssuesFailure = () => ({
  type: FETCH_ISSUES_FAILURE,
});

export const fetchIssues = () => (dispatch, getState) => {
  const state = getState();
  if (isFetching(state.data) || hasReachedPageEnd(state.data)) {
    return;
  } else {
    const { url, query } = buildIssuesRequest(state);
    const config = { params: query };
    const request = axios.get(url, config);
    dispatch(fetchIssuesRequest());
    request.then(
      (response) => {
        const linkData = buildLinkDataFromLinkHeader(response.headers.link);
        const payload = {
          data: response.data,
          link: linkData,
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

export const updateSelectorOptions = (optionsGroup) => {
  const action = {
    type: UPDATE_SELECTOR_OPTIONS,
    optionsGroup,
  };
  return action;
};
