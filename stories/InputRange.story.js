import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { InputRange } from '../components';

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

const suggestions = [list, list];

storiesOf('InputRange', module)
.add('Basic', () => (
  <InputRange
    suggestions={suggestions}
    placeholders={['min', 'max']}
  />
));
