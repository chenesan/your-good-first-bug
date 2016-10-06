import { combineReducers } from 'redux';
import { data } from './data';
import { ui } from './ui';
import { issueFilter } from './issue-filter';

const reducer = combineReducers({
  data,
  ui,
  issueFilter,
});

export const getBugList = (state) => {
  const bugInstanceList = state.data.bugListIds.map(id => state.data.bugListById[id]);
  const sorter = state.ui.sorter;
  return bugInstanceList.sort((a, b) => {
    const itemA = a[sorter.sortBy];
    const itemB = b[sorter.sortBy];
    if (sorter.sortOrder === 'descendant') {
      return itemB - itemA;
    } else {
      return itemA - itemB;
    }
  });
};

export default reducer;
