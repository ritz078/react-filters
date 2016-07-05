import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Slider } from '../components';
import Container from './Container';

storiesOf('Slider Component (Value)', module)
  .addDecorator((story) => (
    <Container
      className={'range-container'}
      action={action}
      value={6}
    >
      {story()}
    </Container>))
  .add('Default', () => (
    <Slider name={'simple-value'} type='value'/>
  ))
  .add('Read only', () => (
    <Slider name={'read-only'} type={'value'} readOnly/>
  ))
  .add('Disabled', () => (
    <Slider name={'disabled'} type={'value'} disabled/>
  ))
  .add('Steps', () => (
    <Slider name={'steps'} type={'value'} showSteps/>
  ));
