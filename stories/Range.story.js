import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Range } from '../components';
import Container from './Container';

storiesOf('Range Slider', module)
  .add('default', () => (
    <Container
      Filter={Range}
      name='range'
      action={action}
    />
  ));
