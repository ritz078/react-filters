import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Fuzzy from 'fuse.js';

import autoBind from '../utils/autoBind';
import debounce from '../utils/debounce';

// TODO : grouping, click

const defaultResultsTemplate = (val, i, selectedIndex) => {
  const className = classNames('ac-suggestion', {
    'ac-suggestion-active': i === selectedIndex
  });
  return <div className={className} key={i}>{val.title}</div>;
};

export default class AutoComplete extends Component {
  constructor (props) {
    super(props);

    this.state = {
      results: props.showInitialResults ? props.list : [],
      selectedIndex: 0,
      query: ''
    };

    autoBind([
      'handleChange',
      'onSelect',
      'onKeyDown',
      'getOptions',
      'resultsTemplate',
      'onResetClick'
    ], this);

    this.handleChange = debounce(this.handleChange, props.debounce);
    if (!props.async) this.fuse = new Fuzzy(props.list, this.getOptions());
  }

  componentWillReceiveProps (newProps, newState) {
    if (newProps.async || (newProps.showInitialResults && !newState.query)) {
      this.setState({ results: newProps.list || [] });
    }
  }

  onSelect () {
    const { name, onSelect } = this.props;
    onSelect(name);
  }

  onKeyDown (e) {
    if (e.keyCode === 40 && (this.state.selectedIndex < this.state.results.length - 1)) {
      this.setState({
        selectedIndex: this.state.selectedIndex + 1
      });
    } else if (e.keyCode === 38 && (this.state.selectedIndex > 0)) {
      this.setState({
        selectedIndex: this.state.selectedIndex - 1
      });
    } else if (e.keyCode === 13) {
      if (this.state.results[this.state.selectedIndex]) {
        this.props.onSelect(this.props.name, this.state.results[this.state.selectedIndex]);
      }
      this.setState({
        results: [],
        selectedIndex: 0
      });
    }
  }

  onResetClick () {
    this.refs.autocomplete.value = '';
    this.setState({ query: '' });
    if (!this.props.showInitialResults) {
      this.setState({
        results: []
      });
    }
  }

  getOptions () {
    const {
      caseSensitive,
      id,
      include,
      keys,
      shouldSort,
      sortFn,
      tokenize,
      verbose,
      maxPatternLength,
      distance,
      threshold,
      location
    } = this.props;

    return {
      caseSensitive,
      id,
      include,
      keys,
      shouldSort,
      sortFn,
      tokenize,
      verbose,
      maxPatternLength,
      distance,
      threshold,
      location
    };
  }

  resultsTemplate () {
    return this.state.results.map((val, i) =>
      this.props.resultsTemplate(val, i, this.state.selectedIndex));
  }

  handleChange () {
    const query = this.refs.autocomplete.value;
    if (!this.props.async) {
      this.setState({
        query,
        results: this.props.showInitialResults && !query ? this.props.list : this.fuse.search(query)
      });
    }
    if (typeof this.props.onChange === 'function') {
      this.setState({
        query,
        results: this.props.onChange(query, this.props, this)
      });
    }
  }

  render () {
    const { name, disabled, placeholder, onFocus, onBlur, Reset } = this.props;
    const mainClass = classNames('react-filters', 'rf-autocomplete', name, {
      disabled
    });

    return (
      <div className={mainClass} onKeyDown={this.onKeyDown}>
        <input
          className='ac-searchbox'
          type='text'
          ref='autocomplete'
          placeholder={placeholder}
          disabled={disabled}
          onChange={this.handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span
          className='ac-reset'
          onClick={this.onResetClick}
        >
          {this.state.query.length > 0 && <Reset />}
        </span>
           {
             this.state.results && !!this.state.results.length &&
             (
               <div className='ac-suggestions-wrapper'>
                    {this.resultsTemplate()}
               </div>
             )
           }
      </div>
    );
  }
}

AutoComplete.propTypes = {
  async: PropTypes.bool,
  showInitialResults: PropTypes.bool,
  debounce: PropTypes.number,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  caseSensitive: PropTypes.bool,
  className: PropTypes.string,
  distance: PropTypes.number,
  id: PropTypes.string,
  include: PropTypes.array,
  maxPatternLength: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  width: PropTypes.number,
  keys: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  list: PropTypes.array,
  location: PropTypes.number,
  placeholder: PropTypes.string,
  resultsTemplate: PropTypes.func,
  shouldSort: PropTypes.bool,
  sortFn: PropTypes.func,
  threshold: PropTypes.number,
  tokenize: PropTypes.bool,
  verbose: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  Reset: PropTypes.func
};

const noop = function () {
};

function ResetContent () {
  return <i className='icon-cancel' />;
}

AutoComplete.defaultProps = {
  async: false,
  debounce: 250,
  showInitialResults: false,
  disabled: false,
  caseSensitive: false,
  distance: 100,
  include: [],
  location: 0,
  width: 430,
  placeholder: 'Search',
  resultsTemplate: defaultResultsTemplate,
  shouldSort: true,
  sortFn (a, b) {
    return a.score - b.score;
  },
  threshold: 0.6,
  tokenize: false,
  verbose: false,
  onFocus: noop,
  onBlur: noop,
  Reset: ResetContent
};
