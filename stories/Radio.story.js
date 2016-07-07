import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Toggle } from '../components';
import Container from './Container';

storiesOf('Radio Button', module)
  .addDecorator((story) => <Container action={action} value={false}>{story()}</Container>)
  .add('Default', () => (
    <Toggle
      name='basic'
      type='radio'
      label={'I am label'}
    />
  ))
  .add('Disabled', () => (
    <Toggle
      name='story1'
      label='hello'
      disabled
      count={6}
      type='radio'
    />
  ))
  .add('Tag', () => (
    <Toggle
      name={'tag'}
      label={'hello'}
      count={6}
      mode={'tag'}
      type={'radio'}
    />
  ))
  .add('Tag Disabled', () => (
    <Toggle
      name={'tag'}
      label={'hello'}
      count={6}
      mode={'tag'}
      type={'radio'}
      disabled
    />
  ));
