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
        text={val[this.props.valueKey]}
        showRemove={this.props.showTagRemove}
        onRemove={this.props.onTagRemove}
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
    if (keyCode === 8 && multiSelected && multiSelected.length) {
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
          type='text'
          ref='autocomplete'
          placeholder={placeholder}
          disabled={disabled}
          onChange={this.handleQueryChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onKeyDown={this.removeLastTag}
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
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  Reset: PropTypes.element.isRequired,
  onReset: PropTypes.func,
  multiSelect: PropTypes.bool,
  multiSelected: PropTypes.array,
  showTagRemove: PropTypes.bool,
  valueKey: PropTypes.string,
  onTagRemove: PropTypes.func
};

function ResetContent () {
  return <i className='icon-cancel' />;
}

SearchBox.defaultProps = {
  onFocus: noop,
  onBlur: noop,
  placeholder: 'Search',
  Reset: ResetContent
};
