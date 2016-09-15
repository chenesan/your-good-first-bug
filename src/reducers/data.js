// These are temporary stub data for implementing infinite scroll
// and data loading action.
// Once we build the backend, we should remove them.
const bugStubs = [{
  title: 'bug1',
  url: 'https://github.com/facebook/react/issues/7711',
  date: 1234,
  organizer: 'facebook',
  project: 'react',
  projectUrl: 'https://github.com/facebook/react/',
  source: 'github',
  languages: ['javascript'],
}, {
  title: 'bug2',
  url: 'https://github.com/pallets/flask/issues/2007',
  date: 4321,
  organizer: 'pallets',
  project: 'flask',
  projectUrl: 'https://github.com/pallets/flask/',
  source: 'github',
  languages: ['python'],
}];

const initialBugListIds = Array(100).fill(undefined).map((val, index) => index + 1);
const initialBugListById = initialBugListIds.reduce((bugListById, id) => {
  const bug = Object.assign({}, bugStubs[id % 2], {
    id,
  });
  return Object.assign(bugListById, {
    [id]: bug,
  });
}, {});

const initialState = {
  bugListIds: initialBugListIds,
  bugListById: initialBugListById,
};

export const data = (state = initialState, action) => {
  switch (action) {
    default:
      return state;
  }
};

export default data;
