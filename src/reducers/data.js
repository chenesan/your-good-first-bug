const initialState = {
  bugList: [
    {
      title: 'bug1',
      url: 'https://github.com/facebook/react/issues/7711',
      timestamp: Date.now(),
      organizer: 'facebook',
      project: 'react',
      projectUrl: 'https://github.com/facebook/react/',
      source: 'github',
      languages: ['javascript'],
    },
    {
      title: 'bug2',
      url: 'https://github.com/pallets/flask/issues/2007',
      timestamp: Date.now(),
      organizer: 'pallets',
      project: 'flask',
      projectUrl: 'https://github.com/pallets/flask/',
      source: 'github',
      languages: ['python'],
    },
  ],
  bugListById: {},
};

export const data = (state = initialState, action) => {
  switch (action) {
    default:
      return state;
  }
};

export default data;
