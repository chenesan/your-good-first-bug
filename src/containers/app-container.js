import { connect } from 'react-redux';
import xhr from 'xhr';
import App from '../components/app';
import { getBugList } from '../reducers/';
import { addBugData } from '../actions';

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
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
