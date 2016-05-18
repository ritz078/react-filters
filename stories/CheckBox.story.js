import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { CheckBox } from '../components';
import Container from './Container';

storiesOf('Checkbox Button', module)
  .add('with a text', () => (
    <Container
      Filter={CheckBox}
      name='story1'
      action={action}
    />
  ))
  .add('with no text', () => (
    <Container
      Filter={CheckBox}
      name='story1'
      label='hello'
      action={action}
      disabled
      count={6}
    />
  ));
