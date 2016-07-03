import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Group } from '../components';
import Container from './Container';

const value = [{
  label: 'a',
  count: 6
}, {
  label: 'b'
}, {
  label: 'c'
}];

const value2 = [{
  label: 'a',
  count: 6
}, {
  label: 'b'
}, {
  label: 'c'
}];

storiesOf('Group Button', module)
  .addDecorator((story) => <Container action={action} value={value}>{story()}</Container>)
  .add('Switch', () => (
    <Group
      name='group'
      type='switch'
      value={value}
    />
  ))
  .add('Radio', () => (
    <Group
      name='group'
      type='radio'
      value={value2}
    />
  ))
  .add('Checkbox', () => (
    <Group
      name='group'
      type='checkbox'
      value={value}
    />
  ));
