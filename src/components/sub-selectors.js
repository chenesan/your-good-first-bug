import React, { Component } from 'react';
import Selector from './selector';

class SubSelectors extends Component {
  render() {
    return (
      <div className={this.props.name}>
        <h4 className="title">{this.props.name}</h4>
        {
          Object.keys(this.props.selectors).map(
            (key, index) => (
              <Selector
                key={index}
                name={key}
                options={this.props.selectors[key].options.map(value => ({ value }))}
                changeHandler={this.props.selectorChangeHandler}
              />
            )
          )
        }
      </div>
    );
  }
}

SubSelectors.propTypes = {
  name: React.PropTypes.string.isRequired,
  selectors: React.PropTypes.shape(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      options: React.PropTypes.array.isRequired,
    })
  ).isRequired,
  selectorChangeHandler: React.PropTypes.func.isRequired,
};

export default SubSelectors;
