import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { CheckBox } from '../components';
import Container from './Container';

storiesOf('Checkbox Button', module)
  .addDecorator((story) => <Container action={action} value={false}>{story()}</Container>)
  .add('with a text', () => (
    <CheckBox name='basic' />
  ))
  .add('with no text', () => (
    <CheckBox
      name='no-text'
      label='hello'
      count={6}
      disabled
    />
  ));
