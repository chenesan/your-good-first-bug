import { CHANGE_ISSUES_SELECTORS } from '../actions';

const initialState = {
  filter: {
    language: {
      value: 'all',
      options: ['all', 'Python', 'JavaScript'],
    },
    projectSize: {
      value: 'all',
      options: ['all', 'large', 'medium', 'small'],
    },
  },
  sorter: {
    sortBy: {
      value: 'createdAt',
      options: ['createdAt', 'popularity', 'projectSize'],
    },
    order: {
      value: 'descendant',
      options: ['descendant', 'ascendant'],
    },
  },
};

const setSelectorValue = (selector, value) => {
  return Object.assign({}, selector, {
    value,
  });
};

const setSubSelectors = (subSelectors, changes) => {
  return Object.keys(changes).reduce(
    (prev, key) => {
      if (prev[key] === undefined) {
        return prev;
      } else {
        return Object.assign({}, prev, {
          [key]: Object.assign({}, prev[key], setSelectorValue(prev[key], changes[key].value)),
        });
      }
    },
    subSelectors
  );
};

export const issueSelectors = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ISSUES_SELECTORS: {
      const nextState = Object.keys(action.changes).reduce(
        (prevState, key) => {
          if (state[key] === undefined) {
            return state;
          } else {
            return Object.assign({}, state, {
              [key]: Object.assign(
                {}, state[key], setSubSelectors(state[key], action.changes[key])
              ),
            });
          }
        },
        state
      );
      return nextState;
    }
    default: {
      return state;
    }
  }
};

// selectors

export const getSelectors = (state) => state;

export default issueSelectors;
