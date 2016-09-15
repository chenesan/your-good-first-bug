const initialState = {
  filters: {
    language: 'all',
    codebaseSize: 1000,
  },
  sorter: {
    sortBy: 'date',
    sortOrder: 'descendant',
  },
};

export const ui = (state = initialState, action) => {
  switch (action) {
    default:
      return state;
  }
};

export default ui;
