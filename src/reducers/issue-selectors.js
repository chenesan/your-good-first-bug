import { CHANGE_ISSUES_SELECTORS } from '../actions';

const initialState = {
  filter: {
    language: {
      selectedIndex: 0,
      options: [
        { value: 'all' },
        { value: 'Python' },
        { value: 'JavaScript' },
      ],
    },
    projectSize: {
      selectedIndex: 0,
      options: [
        { value: 'all' },
        { value: JSON.stringify([{ operator: '>=', value: 3000 }]), description: 'large' },
        { value: JSON.stringify([
          { operator: '<', value: 3000 },
          { operator: '>=', value: 1000 },
        ]),
          description: 'medium',
        },
        { value: JSON.stringify([{ operator: '<', value: 1000 }]), description: 'small' },
      ],
    },
  },
  sorter: {
    sortBy: {
      selectedIndex: 0,
      options: [
        { value: 'createdAt' },
        { value: 'popularity' },
        { value: 'projectSize', description: 'Project Size' },
      ],
    },
    order: {
      selectedIndex: 0,
      options: [
        { value: 'descendant' },
        { value: 'ascendant' },
      ],
    },
  },
};

const setSelectedIndex = (selector, selectedIndex) => {
  return Object.assign({}, selector, {
    selectedIndex,
  });
};

const setSubSelectors = (subSelectors, changes) => {
  return Object.keys(changes).reduce(
    (prev, key) => {
      if (prev[key] === undefined) {
        return prev;
      } else {
        return Object.assign({}, prev, {
          [key]: Object.assign(
            {},
            prev[key],
            setSelectedIndex(prev[key], changes[key].selectedIndex)
          ),
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

export const getSelectorValue = (state, subSelectorsName, selectorName) => {
  const selector = state[subSelectorsName][selectorName];
  return selector.options[selector.selectedIndex].value;
};

export const buildQuery = (state) => {
  const config = {};
  if (getSelectorValue(state, 'filter', 'language') !== 'all') {
    config.language = getSelectorValue(state, 'filter', 'language');
  }
  if (getSelectorValue(state, 'filter', 'projectSize') !== 'all') {
    config.projectSize = getSelectorValue(state, 'filter', 'projectSize');
  }
  config.sortBy = getSelectorValue(state, 'sorter', 'sortBy');
  config.order = getSelectorValue(state, 'sorter', 'order');
  return config;
};

export const getSelectors = (state) => state;

export default issueSelectors;
