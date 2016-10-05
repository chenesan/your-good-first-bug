import { connect } from 'react-redux';
import axios from 'axios';
import App from '../components/app';
import { getBugList } from '../reducers/';
import { addBugData, cleanAndAddBugData } from '../actions';

const mapStateToProps = (state) => ({
  bugList: getBugList(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBugList: () => {
    xhr.get('/api/v1/bugs', (err, resp) => {
      if (err) {
        throw err;
      } else {
        const data = JSON.parse(resp.body);
        dispatch(addBugData(data));
      }
    });
  },
  changeLanguage: (language) => {
    dispatch(changeFilter({ language }));
    xhr.get(`/api/v1/bugs?language=${language}`, (err, resp) => {
      if (err) {
        throw err;
      } else {
        const data = JSON.parse(resp.body);
        dispatch(cleanAndAddBugData(data));
      }
    });
  },
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
