import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Radio } from '../components';
import Container from './Container';

storiesOf('Radio Button', module)
  .addDecorator((story) => <Container action={action} value={false}>{story()}</Container>)
  .add('with a text', () => (
    <Radio name='basic' />
  ))
  .add('with no text', () => (
    <Radio
      name='story1'
      label='hello'
      disabled
      count={6}
    />
  ));
