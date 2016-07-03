import React, { Component, PropTypes } from 'react';

import autoBind from '../utils/autoBind';

export default class Tag extends Component {
  constructor (props) {
    super(props);

    autoBind([
      'handleRemove'
    ], this);
  }

  handleRemove () {
    this.props.onRemove({
      id: this.props.id,
      text: this.props.text
    });
  }

  render () {
    const { showRemove, id, text } = this.props;
    return (
      <div className='ac-tag' data-id={id}>
        <span className='ac-tag-text'>{text}</span>
           {showRemove &&
             <span
               onClick={this.handleRemove}
               className='ac-tag-remove'
             >
                &#x2715;
             </span>
           }
      </div>
    );
  }
}

Tag.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  showRemove: PropTypes.bool
};
