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
      results: props.showInitialResults ? props.list : [],
      selectedIndex: 0,
      query: '',
      multiSelected: []
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
          name,
          value: this.state.multiSelected,
          action: 'added',
          changed: results[selectedIndex]
        });
      } else if (results[selectedIndex]) {
        onSelect({
          name,
          value: results[selectedIndex]
        });
      }

      this.setState({
        results: [],
        selectedIndex: 0,
        query: multiSelect ? '' : results[selectedIndex][valueKey]
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

  getSuggestions () {
    const { resultsTemplate } = this.props;
    const { results, selectedIndex } = this.state;
    if (results && results.length) {
      return (
        <Suggestions
          results={results}
          selectedIndex={selectedIndex}
          resultsTemplate={resultsTemplate}
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
        name: this.props.name,
        value: this.state.multiSelected,
        action: 'removed',
        changed
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
          onQueryChange={this.handleQueryChange}
          Reset={Reset}
          value={this.state.query}
          multiSelected={this.state.multiSelected}
          onReset={this.onResetClick}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          multiSelect={multiSelect}
          showTagRemove={showTagRemove}
          valueKey={valueKey}
          onTagRemove={this.removeTag}
        />

           {this.getSuggestions()}
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
  Reset: PropTypes.func,
  valueKey: PropTypes.string,
  showTagRemove: PropTypes.bool,
  multiSelect: PropTypes.bool
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
  resultsTemplate: Suggestions.defaultResultsTemplate,
  shouldSort: true,
  sortFn (a, b) {
    return a.score - b.score;
  },
  threshold: 0.6,
  tokenize: false,
  verbose: false,
  valueKey: 'title',
  tags: false,
  showTagRemove: true,
  multiSelect: false
};
