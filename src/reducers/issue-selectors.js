import { CHANGE_ISSUES_SELECTORS, UPDATE_SELECTOR_OPTIONS } from '../actions';

const initialState = {
  filter: {
    language: {
      selectedIndex: 0,
      options: [],
    },
    projectSize: {
      selectedIndex: 0,
      options: [],
    },
  },
  sorter: {
    sortBy: {
      selectedIndex: 0,
      options: [],
    },
    order: {
      selectedIndex: 0,
      options: [],
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
    case UPDATE_SELECTOR_OPTIONS: {
      return action.optionsGroup.reduce(
        (prevState, optionsObj) => {
          const category = optionsObj.category;
          const subSelectors = prevState[category];
          if (!subSelectors) {
            return prevState;
          } else {
            const selectorName = optionsObj.selectorName;
            const selector = subSelectors[selectorName];
            if (!selector) {
              return prevState;
            } else {
              const oldOptions = selector.options;
              const newOptions = [...oldOptions].concat(
                optionsObj.options.filter(
                  (option) => oldOptions.every(
                    (oldOption) => oldOption.value !== option.value
                  )
                )
              );
              const nextState = Object.assign({}, prevState, {
                [category]: Object.assign({}, subSelectors, {
                  [selectorName]: Object.assign({}, selector, {
                    options: newOptions,
                  }),
                }),
              });
              return nextState;
            }
          }
        },
        state
      );
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
