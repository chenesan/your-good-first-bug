import React, { Component } from 'react';
import SELECTOR from './selector/index';

class Selector extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(change) {
    const payload = {
      [this.props.propName]: change,
    };
    this.props.changeHandler(payload);
  }
  render() {
    const SelectorImpl = SELECTOR[this.props.type];
    return (
      <div className="menu-selector">
        <h5 className="name">{this.props.name}</h5>
        <SelectorImpl {...this.props} changeHandler={this.onChangeHandler} />
      </div>
    );
  }
}

Selector.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  propName: React.PropTypes.string.isRequired,
  changeHandler: React.PropTypes.func.isRequired,
};

export default Selector;
