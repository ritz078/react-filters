import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import classNames from 'classnames';
import { AutoComplete } from '../components';


const list = [{
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald'
}, {
  id: 2,
  title: 'The DaVinci Code',
  author: 'Dan Brown'
}, {
  id: 3,
  title: 'Angels & Demons',
  author: 'Dan Brown'
}];

class AutoCompleteContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onChange (query) {
    const url = `https://buy.housing.com/api/v0/search/suggest/?&source=web&polygon_uuid=a0fd32816f73961748cf&cursor=1&string=${query}`;
    if (query.length) {
      fetch(url)
        .then((x) => x.json())
        .then((data) => {
          this.setState({ data });
        });
    }
  }

  onSelect ({ ...args }) {
    this.setState({ data: [] });
    action('selected')(args);
  }

  resultTemplate (val, i, selectedIndex) {
    const className = classNames('ac-suggestion', {
      'ac-suggestion-active': i === selectedIndex
    });
    return <div className={className} key={val.uuid}>{val.name} <span>{val.type}</span></div>;
  }

  render () {
    return (
      <AutoComplete
        name={'default'}
        keys={['author', 'title']}
        onSelect={this.onSelect}
        onChange={this.onChange}
        list={this.state.data}
        resultsTemplate={this.resultTemplate}
        async
      />
    );
  }
}

storiesOf('AutoComplete', module)
  .add('Basic', () => (
    <AutoComplete
      name={'default'}
      list={list}
      onSelect={action('selected')}
      keys={['author', 'title']}
    />
  ))
  .add('Disabled', () => (
    <AutoComplete
      name={'default'}
      list={list}
      onSelect={action('selected')}
      keys={['author', 'title']}
      disabled
    />
  ))
  .add('Async requests', () => <AutoCompleteContainer />)
  .add('Fuzzy Search', () => (
    <AutoComplete
      name='fuzzy-autocomplete'
      list={list}
      onSelect={action('selected')}
      keys={['author', 'title']}
    />
  ))
  .add('Initial Suggestions', () => (
    <AutoComplete
      name='fuzzy-autocomplete'
      list={list}
      onSelect={action('selected')}
      keys={['author', 'title']}
      showInitialResults
    />
  ));
