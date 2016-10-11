import { combineReducers } from 'redux';
import { data, getNextLink, getRootUrl } from './data';
import { ui } from './ui';
import { issueSelectors, buildQuery } from './issue-selectors';

const reducer = combineReducers({
  data,
  ui,
  issueSelectors,
});

export const getIssueList = (state) => state.data.issueListIds.map(
  id => state.data.issueListById[id]
);

export const buildIssuesRequest = (state) => {
  const nextLink = getNextLink(state.data);
  const rootUrl = getRootUrl(state.data);
  const url = nextLink || rootUrl;
  const query = url === rootUrl ? buildQuery(state.issueSelectors) : {};
  return {
    query,
    url,
  };
};

export default reducer;
