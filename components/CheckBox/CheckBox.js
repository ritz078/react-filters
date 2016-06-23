import React from 'react';
import classNames from 'classnames';
import Switch from '../Switch/Switch';

export default class CheckBox extends Switch {
}

CheckBox.defaultProps = {
  ...Switch.defaultProps,
  iconElem (p) {
    const iconClass = classNames('fa', {
      'icon-check-box-outline-blank': !p.value,
      'icon-check-box': p.value
    });
    return <i className={iconClass} />;
  }
};
