import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import autoBind from '../utils/autoBind';

function radioElem (p) {
  const iconClass = classNames({
    'icon-radio-button-unchecked': !p.value,
    'icon-radio-button-checked': p.value
  });
  return <i className={iconClass} />;
}

function checkBoxElem (p) {
  const iconClass = classNames('fa', {
    'icon-check-box-outline-blank': !p.value,
    'icon-check-box': p.value
  });
  return <i className={iconClass} />;
}

function switchElem (prop) {
  const labelClass = classNames('toggle-icon-label', {
    'toggle-il-left': prop.value,
    'toggle-il-right': !prop.value
  });

  let iconLabelText;

  if (prop.iconLabel && prop.iconLabel.length) {
    iconLabelText = prop.value ? prop.iconLabel[0] : prop.iconLabel[1];
  }
  return (
    <div className='toggle-wrapper'>
         {
           prop.iconLabel && prop.iconLabel.length &&
           (
             <div className={labelClass}>
                  {iconLabelText}
             </div>
           )
         }

      <div className='toggle-btn'></div>
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
    const { iconElem, type } = this.props;
    if (iconElem) return iconElem(this.props);
    if (type === 'radio') return radioElem(this.props);
    else if (type === 'checkbox') return checkBoxElem(this.props);
    else if (type === 'switch') return switchElem(this.props);
    return null;
  }

  handleClick () {
    this.props.onChange({
      name: this.props.name,
      value: !this.props.value
    });
  }

  render () {
    const {
      name,
      label,
      labelPosition,
      value,
      disabled,
      countElem,
      count,
      type
    } = this.props;

    const mainClass = classNames('react-filters', 'rf-toggle', type, name, {
      'toggle-disabled': disabled,
      'toggle-active': value
    });

    const labelClass = classNames('toggle-label', {
      'toggle-before': labelPosition === 'before',
      'toggle-after': labelPosition === 'after'
    });

    return (
      <div onClick={!disabled && this.handleClick} className={mainClass}>
           {label && <div className={labelClass}>
                          {label}
                          {count !== undefined && countElem(this.props)}
           </div>}
           {this.getIconElement()}
      </div>
    );
  }
}

Toggle.propTypes = {
  count: PropTypes.number,
  countElem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]),
  disabled: PropTypes.bool,
  iconElem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]),
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  iconLabel: PropTypes.array,
  type: PropTypes.oneOf([
    'switch', 'radio', 'checkbox'
  ])
};

function noop () {
}

Toggle.defaultProps = {
  countElem (p) {
    return <span className='toggle-count'>({p.count})</span>;
  },
  value: false,
  onChange: noop,
  labelPosition: 'before',
  disabled: false,
  type: 'switch'
};
