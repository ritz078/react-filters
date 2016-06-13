import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Count } from '../components';
import Container from './Container';

storiesOf('Count', module)
  .add('Basic', () => (
    <Container
      Filter={Count}
      name='basic-count'
      action={action}
    />
  ))
  .add('Disabled', () => (
    <Container
      Filter={Count}
      name='basic-count'
      action={action}
      disabled
    />
  ))
  .add('Define Range', () => (
    <Container
      Filter={Count}
      name='basic-count'
      action={action}
      min={0}
      max={5}
    />
  ))
  .add('Stepped change', () => (
    <Container
      Filter={Count}
      name='basic-count'
      action={action}
      step={3}
    />
  ));
