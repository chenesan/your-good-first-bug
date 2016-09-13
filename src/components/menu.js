import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.getClassName = this.getClassName.bind(this);
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
  render() {
    const className = this.getClassName();
    return (<div
      className={className}
    >menu</div>);
  }
}

Menu.propTypes = {
  side: React.PropTypes.bool.isRequired,
  gridClass: React.PropTypes.string.isRequired,
  hide: React.PropTypes.bool.isRequired,
};

export default Menu;
