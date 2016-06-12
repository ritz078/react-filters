import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Fuzzy from 'fuse.js';

import autoBind from '../utils/autoBind';
import debounce from '../utils/debounce';

// TODO: disabled state
// grouping
// click
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
      selectedIndex: 0
    };

    autoBind([
      'handleChange',
      'onSelect',
      'onKeyDown',
      'getOptions',
      'resultsTemplate'
    ], this);

    this.handleChange = debounce(this.handleChange, props.debounce);
    if (!props.async) this.fuse = new Fuzzy(props.list, this.getOptions());
  }

  componentWillReceiveProps (newProps) {
    if (newProps.async || (newProps.showInitialResults && !this.query)) {
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
        this.props.onSelect(this.state.results[this.state.selectedIndex]);
      }
      this.setState({
        results: [],
        selectedIndex: 0
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
    this.query = this.refs.autocomplete.value;
    if (!this.props.async) {
      this.setState({
        results: this.props.showInitialResults && !this.query ? this.props.list : this.fuse.search(this.query)
      });
    }
    if (typeof this.props.onChange === 'function') {
      this.setState({
        results: this.props.onChange(this.query, this.props, this)
      });
    }
  }

  render () {
    const { name, disabled, placeholder, async } = this.props;
    const mainClass = classNames('react-filters', 'autocomplete', name, {
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
        />
           {async && <i className='fa fa-spin '/>}
           {
             this.state.results && this.state.results.length > 0 &&
             <div className='ac-suggestions-wrapper'>
                  {this.resultsTemplate()}
             </div>
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
  verbose: PropTypes.bool
};

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
  verbose: false
};
