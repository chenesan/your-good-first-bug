import React from 'react';
import IssueItem from './issue-item';
import NoResult from './no-result';

export default function Content(props) {
  let innerContent;
  if (props.issueList.length === 0 && props.fetchingIsFailed) {
    // not fetching and there's no issues
    // so there's no result.
    innerContent = <NoResult />;
  } else {
    innerContent = props.issueList.map((issueData) => (
      <IssueItem issueData={issueData} />
    ));
  }
  return <div className="content">{innerContent}</div>;
}

Content.propTypes = {
  fetchingIsFailed: React.PropTypes.bool.isRequired,
  issueList: React.PropTypes.arrayOf((propVal, key) => {
    // todo: validator
    if (!propVal.title) {
      return new Error(`Issue lack of title: ${propVal} with key ${key}`);
    }
    return propVal;
  }),
};
