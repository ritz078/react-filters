import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import autoBind from '../utils/autoBind';
import lastElement from '../utils/lastElement';
import getSelectedIds from '../utils/getSelectedIds';

import deepCopy from 'deep-copy';

import Toggle from '../Toggle/Toggle';

function handleSingleSelect (arr, index) {
  return arr.map((val, i) => {
    const obj = val;
    obj.value = (i === index) ? !val.value : false;
    return obj;
  });
}

function formatValue (props) {
  const { value, selectedIds, id } = props;
  if (!selectedIds) return value;
  const value$ = deepCopy(value);
  return value$.map(val => {
    if ((typeof selectedIds === 'object' && selectedIds.indexOf(val[id]) >= 0) ||
      (typeof selectedIds === 'number' && selectedIds === val[id])) val.value = true;
    return val;
  });
}

export default class Group extends Component {
  constructor (props) {
    super(props);

    this.formattedValue = formatValue(props);

    autoBind([
      'handleChange'
    ], this);
  }

  componentDidMount () {
    this.formattedValue = formatValue(this.props);
  }

  componentWillReceiveProps (newProps) {
    this.formattedValue = formatValue(newProps);
  }

  getElements () {
    const { type, mode } = this.props;
    return this.formattedValue.map((val, i) => (
      <Toggle
        {...val}
        key={i}
        mode={mode}
        name={`${type}-${i}`}
        onChange={this.handleChange}
        type={type}
        value={val.value}
      />
    ));
  }

  handleChange (data) {
    const { name, type, id, value } = this.props;
    let newValue = deepCopy(this.formattedValue);

    const index = parseInt(lastElement(data.name.split('-')), 10);

    if (type === 'checkbox' || type === 'switch') {
      newValue[index].value = data.value;
    } else {
      newValue = handleSingleSelect(newValue, index);
    }

    this.props.onChange({
      index,
      name,
      oldValue: value,
      value: newValue,
      selectedIds: getSelectedIds(newValue, id, type === 'radio')
    });
  }

  render () {
    const { name, className, attributes, type } = this.props;
    const mainClass = classNames('rf-group', `${type}-group`, name, className);
    return (
      <div {...attributes} className={mainClass}>
        {this.getElements()}
      </div>
    );
  }
}

Group.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  mode: PropTypes.oneOf(['normal', 'tag']),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'radio', 'checkbox', 'switch'
  ]),
  value: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.bool
    })
  ),
  selectedIds: PropTypes.array,
  id: PropTypes.string
};

Group.defaultProps = {
  id: 'id'
};
