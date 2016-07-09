import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Fuzzy from 'fuse.js';

import autoBind from '../utils/autoBind';
import debounce from '../utils/debounce';

import SearchBox from './SearchBox';
import Suggestions from './Suggestions';

import deepCopy from 'deep-copy';

export default class AutoComplete extends Component {
  constructor (props) {
    super(props);

    this.state = {
      multiSelected: [],
      query: '',
      results: props.showInitialResults ? props.list : [],
      selectedIndex: 0
    };

    autoBind([
      'onSelect',
      'onKeyDown',
      'getOptions',
      'onResetClick',
      'handleQueryChange',
      'removeTag'
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
    const { selectedIndex, results } = this.state;
    const { name, valueKey, onSelect, multiSelect } = this.props;

    if (e.keyCode === 40 && (selectedIndex < results.length - 1)) {
      this.setState({
        selectedIndex: selectedIndex + 1
      });
    } else if (e.keyCode === 38 && (selectedIndex > 0)) {
      this.setState({
        selectedIndex: selectedIndex - 1
      });
    } else if (e.keyCode === 13) {
      if (multiSelect) {
        this.state.multiSelected.push(results[selectedIndex]);
      }

      if (multiSelect) {
        onSelect({
          action: 'added',
          changed: results[selectedIndex],
          name,
          value: this.state.multiSelected
        });
      } else if (results[selectedIndex]) {
        onSelect({
          name,
          value: results[selectedIndex]
        });
      }

      this.setState({
        query: multiSelect ? '' : results[selectedIndex][valueKey],
        results: [],
        selectedIndex: 0
      });
    }
  }

  onResetClick () {
    this.setState({ query: '' });
    if (!this.props.showInitialResults) this.setState({ results: [] });
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
      distance,
      id,
      include,
      keys,
      location,
      maxPatternLength,
      shouldSort,
      sortFn,
      threshold,
      tokenize,
      verbose
    };
  }

  getSuggestions () {
    const { resultsTemplate } = this.props;
    const { results, selectedIndex } = this.state;
    if (results && results.length) {
      return (
        <Suggestions
          results={results}
          resultsTemplate={resultsTemplate}
          selectedIndex={selectedIndex}
        />
      );
    }
    return null;
  }

  removeTag ({ id }) {
    const changed = this.state.multiSelected[id];
    const multiSelected = deepCopy(this.state.multiSelected);
    multiSelected.splice(id, 1);
    this.setState({ multiSelected }, () => (
      this.props.onSelect({
        action: 'removed',
        changed,
        name: this.props.name,
        value: this.state.multiSelected
      })
    ));
  }

  handleQueryChange (query) {
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
    const {
      name,
      disabled,
      placeholder,
      onFocus,
      onBlur,
      Reset,
      multiSelect,
      showTagRemove,
      valueKey
    } = this.props;

    const mainClass = classNames('react-filters', 'rf-autocomplete', name, {
      disabled
    });

    return (
      <div className={mainClass} onKeyDown={this.onKeyDown}>
        <SearchBox
          Reset={Reset}
          disabled={disabled}
          multiSelect={multiSelect}
          multiSelected={this.state.multiSelected}
          onBlur={onBlur}
          onFocus={onFocus}
          onQueryChange={this.handleQueryChange}
          onReset={this.onResetClick}
          onTagRemove={this.removeTag}
          placeholder={placeholder}
          showTagRemove={showTagRemove}
          value={this.state.query}
          valueKey={valueKey}
        />

           {this.getSuggestions()}
      </div>
    );
  }
}

AutoComplete.propTypes = {
  Reset: PropTypes.func,
  async: PropTypes.bool,
  caseSensitive: PropTypes.bool,
  className: PropTypes.string,
  debounce: PropTypes.number,
  disabled: PropTypes.bool,
  distance: PropTypes.number,
  id: PropTypes.string,
  include: PropTypes.array,
  keys: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  list: PropTypes.array,
  location: PropTypes.number,
  maxPatternLength: PropTypes.number,
  multiSelect: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  resultsTemplate: PropTypes.func,
  shouldSort: PropTypes.bool,
  showInitialResults: PropTypes.bool,
  showTagRemove: PropTypes.bool,
  sortFn: PropTypes.func,
  threshold: PropTypes.number,
  tokenize: PropTypes.bool,
  valueKey: PropTypes.string,
  verbose: PropTypes.bool,
  width: PropTypes.number
};

AutoComplete.defaultProps = {
  async: false,
  caseSensitive: false,
  debounce: 250,
  disabled: false,
  distance: 100,
  include: [],
  location: 0,
  multiSelect: false,
  placeholder: 'Search',
  resultsTemplate: Suggestions.defaultResultsTemplate,
  shouldSort: true,
  showInitialResults: false,
  showTagRemove: true,
  sortFn (a, b) {
    return a.score - b.score;
  },
  tags: false,
  threshold: 0.6,
  tokenize: false,
  valueKey: 'title',
  verbose: false,
  width: 430
};
