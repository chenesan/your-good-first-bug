import axios from 'axios';
import { buildIssuesRequest } from '../reducers';
import { isFetching, hasReachedPageEnd, NO_NEXT_LINK } from '../reducers/data';

function buildLinkStateFromLinkHeader(linkHeader) {
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
    // There's no link header in response
    // That means the result of query has only one or zero page, and we reached
    // the end.
    state.next = NO_NEXT_LINK;
    state.isEnd = true;
  }
  return state;
}

function buildFailureLinkState() {
  return {
    next: NO_NEXT_LINK,
    isEnd: true,
  };
}

export const CLEAN_ISSUE_DATA = 'CLEAN_ISSUE_DATA';
export const FETCH_ISSUES_REQUEST = 'FETCH_ISSUES_REQUEST';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAILURE = 'FETCH_ISSUES_FAILURE';
export const CHANGE_ISSUES_SELECTORS = 'CHANGE_ISSUES_SELECTORS';
export const UPDATE_SELECTOR_DATA = 'UPDATE_SELECTOR_DATA';

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

export const fetchIssuesSuccess = (response) => {
  const linkState = buildLinkStateFromLinkHeader(response.headers.link);
  const action = {
    type: FETCH_ISSUES_SUCCESS,
    data: response.data,
    link: linkState,
  };
  return action;
};

export const fetchIssuesRequest = () => ({
  type: FETCH_ISSUES_REQUEST,
});

export const fetchIssuesFailure = () => ({
  type: FETCH_ISSUES_FAILURE,
  link: buildFailureLinkState(),
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
        dispatch(fetchIssuesSuccess(response));
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

export const updateSelectorData = (dataGroup) => {
  const action = {
    type: UPDATE_SELECTOR_DATA,
    dataGroup,
  };
  return action;
};
