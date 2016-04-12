import React, { PropTypes, Component } from 'react';
import classNames from 'classNames';

import './Radio.scss';

class Radio extends Component {
  constructor (props) {
    super(props);
    this.state       = {
      value      : props.value,
      disabledIds: []
    };
    debugger;
    this.handleClick = this.handleClick.bind(this);
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

  handleClick (e) {
    this.setState({
      value: e.currentTarget.getAttribute('data-key')
    });
  }

  template () {
    return this.props.data.map((val, index)=> {
      const isSelected = (this.state.value === val.key);

      const iconClass = classNames('fa', {
        'fa-circle-o'    : this.props.icon === 'radio' && !isSelected,
        'fa-dot-circle-o': this.props.icon === 'radio' && isSelected
      });

      const aggregations = this.props.showCount && (
          <span className='aggr'>[{val.aggr || '0'}]</span>);

      const childClass = classNames('ssf-child', 'filter-child', {
        'disabled'                    : this.state.disabledIds.indexOf(val.key) >= 0,
        'ssf-selected filter-selected': isSelected
      });

      return (
        <div key={val.key} onClick={this.handleClick} data-key={val.key} className={childClass}>
          {this.props.iconFirst && <i className={iconClass}/> }
          <span>{val.label}</span> {aggregations}
          {!this.props.iconFirst && <i className={iconClass}/> }
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
  className : PropTypes.string,
  attributes: PropTypes.object
};

Radio.defaultProps = {
  icon      : 'radio',
  showCount : false,
  attributes: {},
  onChange  : noop,
  value     : null,
  disabled  : false,
  iconFirst : true
};

export default Radio;


