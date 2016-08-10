import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Group } from '../components';
import Container from './Container';

const value = [{
  id: 1,
  label: 'a',
  count: 6
}, {
  id: 2,
  label: 'b'
}, {
  id: 3,
  label: 'c'
}];

const value2 = [{
  id: 1,
  label: 'a',
  count: 6
}, {
  id: 2,
  label: 'b'
}, {
  id: 3,
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
  ))
  .add('Radio Tag', () => (
    <Group
      name='group-tag'
      type={'radio'}
      value={value}
      mode={'tag'}
    />
  ))
  .add('Checkbox Tag', () => (
    <Group
      name='group-tag'
      type={'checkbox'}
      value={value}
      mode={'tag'}
    />
  ));
