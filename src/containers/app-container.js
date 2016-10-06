import { connect } from 'react-redux';
import App from '../components/app';
import { getBugList } from '../reducers/';
import { changeFilter, cleanBugData, fetchIssues } from '../actions';

const mapStateToProps = (state) => ({
  bugList: getBugList(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBugList: () => {
    dispatch(fetchIssues());
  },
  changeLanguage: (language) => {
    dispatch(changeFilter({ language }));
    dispatch(cleanBugData());
    dispatch(fetchIssues());
  },
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
