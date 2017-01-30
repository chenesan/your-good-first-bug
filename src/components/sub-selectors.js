import React, { Component } from 'react';
import Selector from './selector';

class SubSelectors extends Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(change) {
    const wrappedChange = {
      [this.props.propName]: change,
    };
    this.props.selectorChangeHandler(wrappedChange);
  }
  render() {
    return (
      <div className={`sub-selectors ${this.props.propName}`}>
        <h4 className="title">{this.props.name}</h4>
        {
          Object.keys(this.props.selectors).map(
            (key, index) => {
              const selector = this.props.selectors[key];
              return (
                <Selector
                  key={index}
                  name={selector.name}
                  propertyName={key}
                  currentValue={selector.options[selector.selectedIndex].value}
                  options={selector.options}
                  changeHandler={this.changeHandler}
                />
              );
            }
          )
        }
      </div>
    );
  }
}

SubSelectors.propTypes = {
  name: React.PropTypes.string.isRequired,
  propName: React.PropTypes.string.isRequired,
  selectors: React.PropTypes.shape(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      options: React.PropTypes.array.isRequired,
      selectedIndex: React.PropTypes.number.isRequired,
    })
  ).isRequired,
  selectorChangeHandler: React.PropTypes.func.isRequired,
};

export default SubSelectors;
