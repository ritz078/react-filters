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
    const { Filter, ...other } = this.props;

    return (
      <div>
        <Filter
          value={this.state.value}
          onChange={this.handleChange}
          {...other}
        />
      </div>
    );
  }
}

Container.propTypes = {
  Filter : PropTypes.element.isRequired,
  action : PropTypes.func
};
