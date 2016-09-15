import { connect } from 'react-redux';
import App from '../components/app';
import { getBugList } from '../reducers/';
import { requestBugData } from '../actions';

const mapStateToProps = (state) => ({
  bugList: getBugList(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBugList: (numberOfBug = 20) => {
    dispatch(requestBugData(numberOfBug));
  },
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
