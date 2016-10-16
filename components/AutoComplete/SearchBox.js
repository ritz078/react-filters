import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Tag from './Tag';

import autoBind from '../utils/autoBind';

export default class SearchBox extends Component {
  constructor (props) {
    super(props);

    autoBind([
      'handleQueryChange',
      'removeLastTag'
    ], this);
  }

  getTags () {
    return this.props.multiSelected.map((val, i) => (
      <Tag
        id={i}
        onRemove={this.props.onTagRemove}
        showRemove={this.props.showTagRemove}
        text={val[this.props.valueKey]}
      />
    ));
  }

  getTagContainer () {
    const { multiSelect, multiSelected } = this.props;
    if (multiSelect && multiSelected && multiSelected.length) {
      return (
        <div className='ac-tag-wrapper' ref='tagWrapper'>
             {this.getTags()}
        </div>
      );
    }
    return null;
  }

  handleQueryChange () {
    this.props.onQueryChange(this.refs.autocomplete.value);
  }

  removeLastTag (e) {
    const { onTagRemove, multiSelected } = this.props;
    const keyCode = e.which || e.keyCode;
    if (keyCode === 8 && multiSelected && multiSelected.length && !this.props.value.length) {
      e.preventDefault();
      e.stopPropagation();
      onTagRemove({
        id: multiSelected.length - 1
      });
    }
  }

  render () {
    const {
      onFocus,
      onBlur,
      disabled,
      placeholder,
      value,
      Reset,
      onReset,
      multiSelect
    } = this.props;

    const mainClass = classNames('ac-searchbox', {
      tags: multiSelect
    });

    return (
      <div className={mainClass}>
        <span>{this.getTagContainer()}</span>

        <input
          className='ac-searchbox-input'
          disabled={disabled}
          onBlur={onBlur}
          onChange={this.handleQueryChange}
          onFocus={onFocus}
          onKeyDown={this.removeLastTag}
          placeholder={placeholder}
          ref='autocomplete'
          type='text'
          value={value}
        />

        <span
          className='ac-reset'
          onClick={onReset}
        >
          {value.length > 0 && <Reset />}
        </span>


      </div>
    );
  }
}

function noop () {

}

SearchBox.propTypes = {
  Reset: PropTypes.element.isRequired,
  disabled: PropTypes.bool,
  multiSelect: PropTypes.bool,
  multiSelected: PropTypes.array,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onQueryChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  onTagRemove: PropTypes.func,
  placeholder: PropTypes.string,
  showTagRemove: PropTypes.bool,
  value: PropTypes.string.isRequired,
  valueKey: PropTypes.string
};

function ResetContent () {
  return <i className='icon-cancel' />;
}

SearchBox.defaultProps = {
  Reset: ResetContent,
  onBlur: noop,
  onFocus: noop,
  placeholder: 'Search'
};
