import React, { Component } from 'react';

class Option extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(event) {
    const selectedIndex = this.props.options.findIndex(
      (option) => option.value === event.currentTarget.value
    );
    this.props.changeHandler({ selectedIndex });
  }
  render() {
    const options = this.props.options;
    const currentValue = options[this.props.selectedIndex];
    return (
      <select
        name="condition" className="options"
        onChange={this.onChangeHandler}
      >
        {
          options.map(
            (option) => (
              <option value={option.value} selected={option.value === currentValue}>
                {option.description || option.value }
              </option>
            )
          )
        }
      </select>
    );
  }
}

Option.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
    })
  ).isRequired,
  selectedIndex: React.PropTypes.number.isRequired,
  changeHandler: React.PropTypes.func.isRequired,
};

export default Option;
