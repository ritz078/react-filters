import React, { PropTypes, Component } from 'react';

export default class Container extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (data) {
    this.setState({
      value: data.value
    }, () => {
      this.props.action('data changed')(data);
    });
  }

  render () {
    const self = this;
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        value: self.state.value,
        onChange: self.handleChange
      });
    });

    return (
      <div className={this.props.className}>
        {children}
      </div>
    );
  }
}

Container.propTypes = {
  action: PropTypes.func,
  value: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string
};
