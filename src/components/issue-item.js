import React, { Component } from 'react';

class IssueItem extends Component {
  render() {
    const time = this.props.issueData.createdAt.split('T')[0];
    return (
      <div className="col col-xs-12 col-sm-6">
        <article className="issue-item">
          <h3 className="title">
            <a href={this.props.issueData.url} className="issue">
              {this.props.issueData.title}
            </a>
          </h3>
          <section className="content">
            <a href={this.props.issueData.project.url} className="project">
              {this.props.issueData.project.name}
            </a>
            <div className="projectDescription">{this.props.issueData.project.description}</div>
            <div className="languages">
              {
                this.props.issueData.languages.map(
                  (language) => <span className="language">{language}</span>
                )
              }
            </div>
            <time className="time">{time}</time>
          </section>
        </article>
      </div>
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
