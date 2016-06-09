import React from 'react';
import classNames from 'classnames';
import Switch from '../Switch/Switch';

export default class CheckBox extends Switch {
}

CheckBox.defaultProps = {
  ...Switch.defaultProps,
  iconElem (p) {
    const iconClass = classNames('fa', {
      'fa-square-o': !p.value,
      'fa-check-square': p.value
    });
    return <i className={iconClass} />;
  }
};
