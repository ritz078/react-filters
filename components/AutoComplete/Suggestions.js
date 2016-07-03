import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Suggestions (props) {
  const resultsTemplate = props.results.map((val, i) =>
    props.resultsTemplate(val, i, props.selectedIndex));
  return (
    <div className='ac-suggestions-wrapper'>
         {resultsTemplate}
    </div>
  );
}

Suggestions.defaultResultsTemplate = function (val, i, selectedIndex) {
  const className = classNames('ac-suggestion', {
    'ac-suggestion-active': i === selectedIndex
  });
  return <div className={className} key={i} data-index={i}>{val.title}</div>;
};

Suggestions.propTypes = {
  results: PropTypes.array.isRequired,
  resultsTemplate: PropTypes.func,
  selectedIndex: PropTypes.number
};
