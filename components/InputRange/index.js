import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import autoBind from '../utils/autoBind';

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
          name={'ir-lower'}
          list={suggestions[0]}
          onSelect={this.onSelect}
          keys={['author', 'title']}
          placeholder={placeholders[0]}
        />
        <span className='ir-separator'> - </span>
        <AutoComplete
          name={'ir-upper'}
          list={suggestions[1]}
          onSelect={this.onSelect}
          keys={['author', 'title']}
          placeholder={placeholders[1]}
        />
      </div>
    );
  }
}

InputRange.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  suggestions: PropTypes.array,
  placeholders: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired
};

function noop () {

}

InputRange.defaultProps = {
  disabled: false,
  onSelect: noop
};
