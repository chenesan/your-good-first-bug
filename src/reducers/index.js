import { combineReducers } from 'redux';
import { data } from './data';
import { ui } from './ui';
import { issueSelectors } from './issue-selectors';

const reducer = combineReducers({
  data,
  ui,
  issueSelectors,
});

export const getIssueList = (state) => state.data.issueListIds.map(
  id => state.data.issueListById[id]
);

export default reducer;
