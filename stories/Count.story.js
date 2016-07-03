import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Count } from '../components';
import Container from './Container';

storiesOf('Count', module)
  .addDecorator((story) => <Container action={action} value={0}>{story()}</Container>)
  .add('Basic', () => (
    <Count name={'basic'} />
  ))
  .add('Disabled', () => (
    <Count name={'disabled'} disabled />
  ))
  .add('Define Range', () => (
    <Count name={'range'} min={0} max={5} />
  ))
  .add('Stepped change', () => (
    <Count name={'step'} step={3} />
  ));
