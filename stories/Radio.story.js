import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Toggle } from '../components';
import Container from './Container';

storiesOf('Radio Button', module)
  .addDecorator((story) => <Container action={action} value={false}>{story()}</Container>)
  .add('with a text', () => (
    <Toggle
      name='basic'
      type='radio'
    />
  ))
  .add('with no text', () => (
    <Toggle
      name='story1'
      label='hello'
      disabled
      count={6}
      type='radio'
    />
  ));
