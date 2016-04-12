import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Radio } from '../components';

const data = [{
  key  : 2,
  label: 'hello',
  count: 5
}, {
  key  : 4,
  label: 'world',
  count: 5
}];

debugger;
storiesOf('Radio Button', module)
  .add('with a text', () => (<Radio data={data} />))
  .add('with no text', () => (<Radio data={data} onChange={action('a')} />));
