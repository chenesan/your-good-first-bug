import React, { Component } from 'react';
import { Range } from 'rc-slider';
import HandleWithInput from './handle-with-input';

class RangeWithInput extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.changeIsValid = this.changeIsValid.bind(this);
    this.createHandleWithInput = this.createHandleWithInput.bind(this);
    this.state = {
      changeByInput: false,
    };
  }
  componentDidUpdate() {
    if (this.state.changeByInput) {
      this.setState({ changeByInput: false });
    }
  }
  changeIsValid(change) {
    return !(
      change.left >= change.right ||
      change.left < this.props.min ||
      change.right > this.props.max
    );
  }
  handleRangeChange([left, right]) {
    const change = { left, right };
    this.props.changeHandler(change);
  }
  handleInputChange(val, index) {
    const change = {
      left: index === 0 ? Number(val) : this.props.left,
      right: index === 1 ? Number(val) : this.props.right,
    };
    if (this.changeIsValid(change)) {
      this.props.changeHandler(change);
      this.setState({ changeByInput: true });
    } else {
      return;
    }
  }
  createHandleWithInput(props) {
    return <HandleWithInput {...props} changeHandler={this.handleInputChange} />;
  }
  render() {
    const defaultValue = (
      (this.props.defaultValue && this.props.defaultValue.length === 2) ?
        this.props.defaultValue :
        [this.props.min, this.props.max]
    );
    const condProps = {};
    if (this.state.changeByInput) {
      // When the value has been changed by input
      // We have to pass new value prop into Range
      // Or the bounds of Range won't change
      condProps.value = [this.props.left, this.props.right];
    }
    return (
      <Range
        min={this.props.min} max={this.props.max}
        defaultValue={defaultValue}
        handle={this.createHandleWithInput}
        onAfterChange={this.handleRangeChange}
        {...condProps}
      />
    );
  }
}

RangeWithInput.propTypes = {
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  right: React.PropTypes.number.isRequired,
  defaultValue: React.PropTypes.arrayOf(React.PropTypes.number),
  changeHandler: React.PropTypes.func.isRequired,
};

export default RangeWithInput;
