import { CHANGE_ISSUES_SELECTORS, UPDATE_SELECTOR_DATA } from '../actions';

const initialState = {
  filter: {
    language: {
      type: 'option',
      name: 'Language',
      selectedIndex: 0,
      options: [],
    },
    projectSize: {
      type: 'range',
      name: 'Project Size (KB)',
      min: 1,
      max: 65535,
      left: 1,
      right: 65535,
    },
    popularity: {
      type: 'range',
      name: 'Popularity (Star)',
      min: 1,
      max: 65535,
      left: 1,
      right: 65535,
    },
  },
  sorter: {
    sortBy: {
      type: 'option',
      name: 'Sort By',
      selectedIndex: 0,
      options: [],
    },
    order: {
      type: 'option',
      name: 'Order',
      selectedIndex: 0,
      options: [],
    },
  },
};

const selectorGetterMap = {
  option: (selector) => selector.options[selector.selectedIndex].value,
  range: (selector) => ({
    left: selector.left,
    right: selector.right,
  }),
};

const selectorChangeMap = {
  option: (selector, change) => Object.assign({}, selector, {
    selectedIndex: change.selectedIndex,
  }),
  range: (selector, change) => Object.assign({}, selector, {
    left: change.left,
    right: change.right,
  }),
};

const selectorUpdateMap = {
  option: (selector, dataObj) => {
    const oldOptions = selector.options;
    const newOptions = [...oldOptions].concat(
      dataObj.options.filter(
        (option) => oldOptions.every(
          (oldOption) => oldOption.value !== option.value
        )
      )
    );
    return Object.assign({}, selector, {
      options: newOptions,
    });
  },
  range: (selector, dataObj) => {
    return Object.assign({}, selector, {
      left: dataObj.left || selector.left || 1,
      right: dataObj.right || selector.right || 10000,
      min: dataObj.min,
      max: dataObj.max,
    });
  },
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
            selectorChangeMap[prev[key].type](prev[key], changes[key])
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
    case UPDATE_SELECTOR_DATA: {
      return action.dataGroup.reduce(
        (prevState, dataObj) => {
          const category = dataObj.category;
          const subSelectors = prevState[category];
          if (!subSelectors) {
            return prevState;
          } else {
            const selectorPropName = dataObj.selectorPropName;
            const selector = subSelectors[selectorPropName];
            if (!selector) {
              return prevState;
            } else {
              const nextState = Object.assign({}, prevState, {
                [category]: Object.assign({}, subSelectors, {
                  [selectorPropName]: selectorUpdateMap[selector.type](selector, dataObj),
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

export const getSelectorValue = (state, subSelectorsName, selectorPropName) => {
  const selector = state[subSelectorsName][selectorPropName];
  return selectorGetterMap[selector.type](selector);
};

const buildRangeQuery = (state, selectorGroupName, selectorName) => {
  const { left, right } = getSelectorValue(state, selectorGroupName, selectorName);
  return JSON.stringify({
    operator: '&',
    value: [
      { operator: '<=', value: right },
      { operator: '>=', value: left },
    ],
  });
};

export const buildQuery = (state) => {
  const config = {};
  if (getSelectorValue(state, 'filter', 'language') !== 'all') {
    config.language = getSelectorValue(state, 'filter', 'language');
  }
  config.projectSize = buildRangeQuery(state, 'filter', 'projectSize');
  config.popularity = buildRangeQuery(state, 'filter', 'popularity');
  config.sortBy = getSelectorValue(state, 'sorter', 'sortBy');
  config.order = getSelectorValue(state, 'sorter', 'order');
  return config;
};

export const getSelectors = (state) => state;
export default issueSelectors;
