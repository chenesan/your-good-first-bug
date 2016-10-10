import { connect } from 'react-redux';
import App from '../components/app';
import { getIssueList } from '../reducers/';
import { isFetching } from '../reducers/data';
import { getSelectors } from '../reducers/issue-selectors';
import { changeSelectors, cleanIssueData, fetchIssues } from '../actions';

const mapStateToProps = (state) => ({
  issueList: getIssueList(state),
  fetching: isFetching(state.data),
  selectors: getSelectors(state.issueSelectors),
});

const mapDispatchToProps = (dispatch) => ({
  loadIssueList: () => {
    dispatch(fetchIssues());
  },
  selectorChangeHandler: (changes) => {
    dispatch(changeSelectors(changes));
    dispatch(cleanIssueData());
    dispatch(fetchIssues());
  },
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
