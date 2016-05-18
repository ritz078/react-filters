import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Radio } from '../components';
import Container from './Container';

storiesOf('Radio Button', module)
  .add('with a text', () => (
    <Container
      Filter={Radio}
      name='story1'
      action={action}
    />
  ))
  .add('with no text', () => (
    <Container
      Filter={Radio}
      name='story1'
      label='hello'
      action={action}
      disabled
      count={6}
    />
  ));
