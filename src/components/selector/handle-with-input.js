import React, { Component } from 'react';

class HandleWithInput extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.onInputStart = this.onInputStart.bind(this);
    this.onInputFocusOut = this.onInputFocusOut.bind(this);
    this.state = {
      inputting: false,
    };
  }
  handleInput(e) {
    if (e.keyCode === 13) {
      // key down with enter, finish input.
      const newValue = e.target.value;
      this.props.changeHandler(newValue, this.props.index);
    }
  }
  onInputStart(e) {
    e.stopPropagation();
    this.setState(Object.assign({}, this.state, {
      inputting: true,
    }));
  }
  onInputFocusOut() {
    this.setState(Object.assign({}, this.state, {
      inputting: false,
    }));
  }
  render() {
    const { className, vertical, offset } = this.props;
    const handleStyle = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const wrapperStyle = handleStyle;
    return (
      <div className="handle-with-input" style={wrapperStyle}>
        <input
          type="text"
          className="input"
          value={this.state.inputting ? undefined : this.props.value}
          onTouchStart={this.onInputStart}
          onMouseDown={this.onInputStart}
          onKeyDown={this.handleInput}
          onBlur={this.onInputFocusOut}
        />
        <div className={className} style={handleStyle} />
      </div>
    );
  }
}

HandleWithInput.propTypes = {
  className: React.PropTypes.string,
  defaultValue: React.PropTypes.any,
  offset: React.PropTypes.number,
  vertical: React.PropTypes.bool,
  changeHandler: React.PropTypes.func,
};

export default HandleWithInput;
