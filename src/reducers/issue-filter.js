import { CHANGE_ISSUES_FILTER } from '../actions';

const initialState = {
  language: 'all',
};

export const issueFilter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ISSUES_FILTER: {
      return Object.assign({}, state, action.option);
    }
    default: {
      return state;
    }
  }
};

export default issueFilter;
