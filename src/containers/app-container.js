import { connect } from 'react-redux';
import App from '../components/app';

const mapStateToProps = (state) => ({
  bugList: state.data.bugList,
});

const mapDispatchToProps = () => {};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
