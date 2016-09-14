import React, { Component } from 'react';

class Jumbotron extends Component {
  render() {
    return (
      <header className="main-jumbotron">
        <h1 className="title">{this.props.title}</h1>
      </header>
    );
  }
}

Jumbotron.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Jumbotron;
