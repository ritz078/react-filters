import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import autoBind from '../utils/autoBind';
import noop from '../utils/noop';

import AutoComplete from '../AutoComplete/index';

export default class InputRange extends Component {
  constructor (props) {
    super(props);
    this.state = {};

    autoBind([
      'onSelect'
    ], this);
  }

  onSelect (name, selected) {
    this.props.onSelect(name, selected);
  }

  render () {
    const { name, disabled, suggestions, placeholders } = this.props;
    const mainClass = classNames('react-filters', 'rf-input-range', name, { disabled });
    return (
      <div className={mainClass}>
        <AutoComplete
          keys={['author', 'title']}
          list={suggestions[0]}
          name={'ir-lower'}
          onSelect={this.onSelect}
          placeholder={placeholders[0]}
        />
        <span className='ir-separator'> - </span>
        <AutoComplete
          keys={['author', 'title']}
          list={suggestions[1]}
          name={'ir-upper'}
          onSelect={this.onSelect}
          placeholder={placeholders[1]}
        />
      </div>
    );
  }
}

InputRange.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  placeholders: PropTypes.arrayOf(PropTypes.string),
  suggestions: PropTypes.array
};

InputRange.defaultProps = {
  disabled: false,
  onSelect: noop
};
