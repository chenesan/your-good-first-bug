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
    return (<aside className={className}>
      <div className="sortBy">
        <h4 className="title">Sorting by:</h4>
        <div className="selection">
          <h5 className="name">Condition:</h5>
          <select name="condition" className="options">
            <option value="date">date</option>
            <option value="project size">project size</option>
            <option value="popularity">popularity</option>
          </select>
        </div>
        <div className="selection">
          <h5 className="name">Order:</h5>
          <select name="order" className="options">
            <option value="descendant">descendant</option>
            <option value="ascendant">ascendant</option>
          </select>
        </div>
      </div>
      <div className="filter">
        <h4 className="title">Filter:</h4>
        <div className="selection">
          <h5 className="name">Language:</h5>
          <select name="condition" className="options">
            <option value="all">all</option>
            <option value="python">python</option>
            <option value="javascript">javascript</option>
          </select>
        </div>
        <div className="selection">
          <h5 className="name">Code base size:</h5>
          <select name="condition" className="options">
            <option value="all">all</option>
            <option value="< 1k lines">{"< 1k lines"}</option>
            <option value="1k ~ 10k lines">1k ~ 10k lines</option>
            <option value="> 10k lines">{"> 10k lines"}</option>
          </select>
        </div>
      </div>
    </aside>);
  }
}

Menu.propTypes = {
  side: React.PropTypes.bool.isRequired,
  gridClass: React.PropTypes.string.isRequired,
  hide: React.PropTypes.bool.isRequired,
};

export default Menu;
