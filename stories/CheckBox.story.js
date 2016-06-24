import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Toggle } from '../components';
import Container from './Container';

storiesOf('Checkbox Button', module)
  .addDecorator((story) => <Container action={action} value={false}>{story()}</Container>)
  .add('with a text', () => (
    <Toggle
      name='basic'
      type='checkbox'
    />
  ))
  .add('with no text', () => (
    <Toggle
      name='no-text'
      label='hello'
      count={6}
      disabled
      type='checkbox'
    />
  ));
