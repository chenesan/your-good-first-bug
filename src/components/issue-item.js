import React, { Component } from 'react';
import Markdown from 'react-remarkable';

const HEAD_LINES_NUMBER = 3;

class IssueItem extends Component {
  getHeadLinesOfBody(data, lineNumber) {
    const body = data.body;
    if (!body) {
      return '';
    } else {
      const lines = body.split('\n');
      return lines.slice(0, lineNumber).join('\n');
    }
  }
  render() {
    const time = this.props.issueData.createdAt.split('T')[0];
    const headLines = this.getHeadLinesOfBody(this.props.issueData, HEAD_LINES_NUMBER);
    return (
      <article className="issue-item">
        <h3 className="title">
          <a href={this.props.issueData.url} className="issue">
            {this.props.issueData.title}
          </a>
        </h3>
        <section className="content">
          <blockquote className="description">
            <Markdown source={headLines} />
          </blockquote>
          <a href={this.props.issueData.url} className="more">See more</a>
          <a href={this.props.issueData.project.url} className="project">
            {this.props.issueData.project.name}
          </a>
          <div className="projectDescription">{this.props.issueData.project.description}</div>
          {
            // Usually there are more than one language in a project
            // Here we only show the first one (the most frequently used one)
            // If no data, just show 'unknown'
          }
          <span className="language">{this.props.issueData.languages[0] || 'Unknown'}</span>
          <time className="time">{time}</time>
        </section>
      </article>
    );
  }
}

IssueItem.propTypes = {
  issueData: React.PropTypes.shape({
    languages: React.PropTypes.arrayOf(() => true),
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string,
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
