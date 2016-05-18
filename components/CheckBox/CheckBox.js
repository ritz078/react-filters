import React from 'react';
import classNames from 'classnames';
import Switch from '../Switch/Switch';

export default class CheckBox extends Switch {
}

CheckBox.defaultProps = {
  ...Switch.defaultProps,
  iconElem (p) {
    const iconClass = classNames('fa', {
      'fa-circle-o': !p.value,
      'fa-dot-circle-o': p.value
    });
    return <i className={iconClass} />;
  }
};
