import React, { Component } from 'react';
import SubSelectors from './sub-selectors';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.selectorChangeHandler = this.selectorChangeHandler.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }
  componentDidMount() {
    if (typeof window !== 'undefined' && !window.sessionStorage.getItem('issueSelector')) {
      window.sessionStorage.setItem('issueSelector', JSON.stringify(this.props.selectors));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selectors !== nextProps.selectors) {
      window.sessionStorage.setItem('issueSelector', JSON.stringify(nextProps.selectors));
    }
  }
  getClassName() {
    const classList = ['main-menu', this.props.gridClass];
    if (this.props.side) {
      classList.push('-side');
    }
    if (this.props.hide) {
      classList.push('-hide');
    }
    return classList.join(' ');
  }
  selectorChangeHandler(change) {
    this.props.selectorChangeHandler(change);
  }
  render() {
    const className = this.getClassName();
    return (<aside className={className}>
      <SubSelectors
        name="sorter" selectors={this.props.selectors.sorter}
        selectorChangeHandler={this.selectorChangeHandler}
      />
      <SubSelectors
        name="filter" selectors={this.props.selectors.filter}
        selectorChangeHandler={this.selectorChangeHandler}
      />
    </aside>);
  }
}

Menu.propTypes = {
  side: React.PropTypes.bool.isRequired,
  gridClass: React.PropTypes.string.isRequired,
  hide: React.PropTypes.bool.isRequired,
  selectorChangeHandler: React.PropTypes.func.isRequired,
  selectors: React.PropTypes.shape({
    sorter: React.PropTypes.object.isRequired,
    filter: React.PropTypes.object.isRequired,
  }).isRequired,
};

export default Menu;
