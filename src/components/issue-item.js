import React, { Component } from 'react';

class IssueItem extends Component {
  render() {
    return (
      <article className="issue-item col-xs-12 col-sm-5">
        <h3 className="title">{this.props.issueData.title}</h3>
        <footer className="metadata">
          <span className="project">{this.props.issueData.project.name}</span>
          <div className="projectDescription">{this.props.issueData.project.description}</div>
          <div className="languages">
          {
            this.props.issueData.languages.map(
              (language) => <span className="language">{language}</span>
            )
          }
          </div>
          <address className="sources">
            <a href={this.props.issueData.url} className="issue">Issue source</a>
            <a href={this.props.issueData.project.url} className="project">project source</a>
          </address>
          <time className="date">{this.props.issueData.createdAt}</time>
        </footer>
      </article>
    );
  }
}

IssueItem.propTypes = {
  issueData: React.PropTypes.shape({
    languages: React.PropTypes.arrayOf(() => true),
    title: React.PropTypes.string.isRequired,
    project: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
    }),
    createdAt: React.PropTypes.instanceOf(Date),
    url: React.PropTypes.string.isRequired,
  }),
};

export default IssueItem;
