import { connect } from 'react-redux';
import App from '../components/app';
import { getIssueList } from '../reducers/';
import { changeFilter, cleanIssueData, fetchIssues } from '../actions';

const mapStateToProps = (state) => ({
  issueList: getIssueList(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadIssueList: () => {
    dispatch(fetchIssues());
  },
  changeLanguage: (language) => {
    dispatch(changeFilter({ language }));
    dispatch(cleanIssueData());
    dispatch(fetchIssues());
  },
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
