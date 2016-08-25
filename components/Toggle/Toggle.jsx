import React, { PropTypes } from 'react';
import classNames from 'classnames';
import autoBind from '../utils/autoBind';
import noop from '../utils/noop';

function radioElement (p) {
  const iconClass = classNames({
    'icon-radio-button-unchecked': !p.value,
    'icon-radio-button-checked': p.value
  });
  return <i className={iconClass}/>;
}

function checkBoxElement (p) {
  const iconClass = classNames({
    'icon-check-box-outline-blank': !p.value,
    'icon-check-box': p.value
  });
  return <i className={iconClass}/>;
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
    <div className='toggle-wrapper'>
      <div className={labelClass}>{iconLabelText}</div>
      <div className='toggle-btn'/>
    </div>
  );
}

/**
 * Hello world
 */
export default class Toggle extends React.Component {
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
        {...attributes}
        className={mainClass}
        onClick={!disabled && this.handleClick}
      >
        {
          label && <div className={labelClass}>
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
  /**
   * Sometimes you may need to add some custom attributes to the root tag of the
   * component. attributes will accept an object where the key and values will
   * be those attributes and their value respectively.
   *
   * Eg : If you pass
   * ```js
   * attributes = {
   *  'data-attr1' : 'val1',
   *  'data-attr2' : 'val2'
   * }
   * ```
   * the root tag will have the attributes `data-attr1` and `data-attr2` with the
   * corresponding values as `val1` and `val2` respectively
   */
  attributes: PropTypes.object,

  /**
   * Optional className to be added to the root tag of the component
   */
  className: PropTypes.string,

  /**
   * In case you want to show aggregation/count in front of label then pass the
   * number in this option. This is generally useful for showing the items present
   * corresponding to that filter option.
   */
  count: PropTypes.number,
  countElem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]),

  /**
   * Set to `true` if you want to disable the component interactions.
   */
  disabled: PropTypes.bool,
  iconElement: PropTypes.func,
  iconLabel: PropTypes.array,

  /**
   * The label text present in the component. If this option is not set only the
   * icon element will render.
   */
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf([
    'before', 'after'
  ]),
  mode: PropTypes.oneOf(['normal', 'tag']),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.oneOf([
    'switch', 'radio', 'checkbox'
  ]),
  value: PropTypes.bool
};

Toggle.defaultProps = {
  countElem (p) {
    return <span className='toggle-count'>({p.count})</span>;
  },
  disabled: false,
  labelPosition: 'before',
  mode: 'normal',
  onChange: noop,
  type: 'switch',
  value: false
};
