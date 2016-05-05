import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import './Radio.scss';

class Radio extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value       : props.value,
      disabledKeys: []
    };
    this.bindHandlers();
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      value: newProps.value
    });
  }

  shouldComponentUpdate (newProps, newState) {
    return newState.value !== this.props.value;
  }

  componentDidUpdate (oldProps) {
    this.props.onChange(oldProps);
  }

  bindHandlers () {
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    this.setState({
      value: e.currentTarget.getAttribute('data-key')
    });
  }

  template () {
    return this.props.data.map((val)=> {
      const isSelected = (this.state.value === val.key);

      const iconClass = classNames('fa', {
        'fa-circle-o'    : this.props.icon === 'radio' && !isSelected,
        'fa-dot-circle-o': this.props.icon === 'radio' && isSelected
      });

      const aggregations = this.props.showCount && (
          <span className='aggr'>[{val.aggr || '0'}]</span>);

      const childClass = classNames('ssf-child', 'filter-child', {
        disabled                      : this.state.disabledKeys.indexOf(val.key) >= 0,
        'ssf-selected filter-selected': isSelected
      });

      return (
        <div key={val.key} onClick={this.handleClick} data-key={val.key} className={childClass}>
          { this.props.iconFirst && <i className={iconClass}/> }
          <span>{val.label}</span> {aggregations}
          { !this.props.iconFirst && <i className={iconClass}/> }
        </div>
      );
    });
  }

  render () {
    const mainClass = classNames('filter', `filter-${this.props.name}`, this.props.className, {
      disabled: this.props.disabled
    });
    return (
      <div className={mainClass} {...this.props.attributes}>
        <div className='filter-title'>{this.props.title}</div>
        <div className='filter-content'>{this.template()}</div>
      </div>
    );
  }
}

function noop () {
}

Radio.propTypes = {
  attributes: PropTypes.object,
  className : PropTypes.string,
  data      : PropTypes.arrayOf(
    PropTypes.shape({
      key  : PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number
    })
  ),
  disabled  : PropTypes.bool,
  iconFirst : PropTypes.bool,
  name      : PropTypes.string.isRequired,
  onChange  : PropTypes.func,
  showCount : PropTypes.bool,
  title     : PropTypes.string,
  value     : PropTypes.number
};

Radio.defaultProps = {
  attributes: {},
  disabled  : false,
  icon      : 'radio',
  iconFirst : true,
  onChange  : noop,
  showCount : false,
  value     : null
};

export default Radio;


