import React from 'react';
import Switch from '../Switch/Switch';
import classNames from 'classnames';

export default class Radio extends Switch {
}

Radio.defaultProps = {
  ...Switch.defaultProps,
  iconElem (p) {
    const iconClass = classNames({
      'icon-radio-button-unchecked': !p.value,
      'icon-radio-button-checked': p.value
    });
    return <i className={iconClass} />;
  }
};
