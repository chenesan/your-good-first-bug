import { connect } from 'react-redux';
import App from '../components/app';
import { getBugList } from '../reducers/';

const mapStateToProps = (state) => ({
  bugList: getBugList(state),
});

const mapDispatchToProps = () => {};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
