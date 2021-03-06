import React, { Component } from 'react';

class Selector extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(event) {
    const selectedIndex = this.props.options.findIndex(
      (option) => option.value === event.currentTarget.value
    );
    const change = {
      [this.props.propertyName]: {
        selectedIndex,
      },
    };
    this.props.changeHandler(change);
  }
  render() {
    return (
      <div className="menu-selector">
        <h5 className="name">{this.props.name}</h5>
        <select
          name="condition" className="options"
          onChange={this.onChangeHandler}
        >
          {
            this.props.options.map(
              (option) => (
                <option value={option.value} selected={option.value === this.props.currentValue}>
                  {option.description || option.value }
                </option>
              )
            )
          }
        </select>
      </div>
    );
  }
}

Selector.propTypes = {
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
    })
  ).isRequired,
  currentValue: React.PropTypes.string.isRequired,
  propertyName: React.PropTypes.string.isRequired,
  changeHandler: React.PropTypes.func.isRequired,
};

export default Selector;
