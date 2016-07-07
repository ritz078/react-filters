import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import autoBind from '../utils/autoBind';

function radioElement (p) {
  const iconClass = classNames({
    'icon-radio-button-unchecked': !p.value,
    'icon-radio-button-checked': p.value
  });
  return <i className={iconClass} />;
}

function checkBoxElement (p) {
  const iconClass = classNames({
    'icon-check-box-outline-blank': !p.value,
    'icon-check-box': p.value
  });
  return <i className={iconClass} />;
}

function switchElement (prop) {
  const labelClass = classNames('toggle-icon-label', {
    'toggle-il-left': prop.value,
    'toggle-il-right': !prop.value
  });

  let iconLabelText;

  if (prop.iconLabel && prop.iconLabel.length) {
    iconLabelText = prop.value ? prop.iconLabel[0] : prop.iconLabel[1];
  }
  return (
    <div className='toggle-wrapper' >
      <div className={labelClass} >{iconLabelText}</div>
      <div className='toggle-btn' />
    </div>
  );
}

export default class Toggle extends Component {
  constructor (props) {
    super(props);
    autoBind([
      'handleClick'
    ], this);
  }

  shouldComponentUpdate (nextProps) {
    return (
      (nextProps.value !== this.props.value) ||
      (nextProps.count !== this.props.count)
    );
  }

  getIconElement () {
    const { iconElement, type } = this.props;
    if (typeof iconElement === 'function') return iconElement(this.props);
    if (type === 'radio') return radioElement(this.props);
    else if (type === 'checkbox') return checkBoxElement(this.props);
    else return switchElement(this.props);
  }

  handleClick () {
    this.props.onChange({
      name: this.props.name,
      value: !this.props.value
    });
  }

  isNormal () {
    return this.props.mode === 'normal';
  }

  render () {
    const {
      attributes,
      className,
      name,
      label,
      labelPosition,
      value,
      disabled,
      countElem,
      count,
      type
    } = this.props;

    const mainClass = classNames('rf-toggle', type, className, name, {
      'toggle-disabled': disabled,
      'toggle-active': value,
      'toggle-tag': !this.isNormal()
    });

    const labelClass = classNames('toggle-label', {
      'toggle-before': labelPosition === 'before',
      'toggle-after': labelPosition === 'after'
    });

    return (
      <div
        onClick={!disabled && this.handleClick}
        className={mainClass}
        {...attributes}
      >
        {
          label && <div className={labelClass} >
            {label}
            {count !== undefined && countElem(this.props)}
          </div>
        }
        {this.isNormal() && this.getIconElement()}
      </div>
    );
  }
}

Toggle.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  count: PropTypes.number,
  countElem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]),
  disabled: PropTypes.bool,
  iconElement: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]),
  iconLabel: PropTypes.array,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  mode: PropTypes.oneOf(['normal', 'tag']),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  type: PropTypes.oneOf([
    'switch', 'radio', 'checkbox'
  ])
};

function noop () {
}

Toggle.defaultProps = {
  countElem (p) {
    return <span className='toggle-count' >({p.count})</span>;
  },
  disabled: false,
  labelPosition: 'before',
  mode: 'normal',
  onChange: noop,
  value: false,
  type: 'switch'
};
