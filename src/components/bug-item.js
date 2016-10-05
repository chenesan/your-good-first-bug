import React, { Component } from 'react';

class BugItem extends Component {
  render() {
    return (
      <article className="bug-item col-xs-12 col-sm-5">
        <h3 className="title">{this.props.bugData.title}</h3>
        <footer className="metadata">
          <span className="project">{this.props.bugData.project}</span>
          <div className="languages">
          {
            this.props.bugData.languages.map(
              (language) => <span className="language">{language}</span>
            )
          }
          </div>
          <address className="sources">
            <a href={this.props.bugData.url} className="issue">Issue source</a>
            <a href={this.props.bugData.projectUrl} className="project">project source</a>
          </address>
          <time className="date">{this.props.bugData.date}</time>
        </footer>
      </article>
    );
  }
}

BugItem.propTypes = {
  bugData: React.PropTypes.shape({
    languages: React.PropTypes.arrayOf(() => true),
    title: React.PropTypes.string.isRequired,
    project: React.PropTypes.string.isRequired,
    projectUrl: React.PropTypes.string.isRequired,
    date: React.PropTypes.instanceOf(Date),
    url: React.PropTypes.string.isRequired,
  }),
};

export default BugItem;
