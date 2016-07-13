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
    <Slider name={'simple-value'} />
  ))
  .add('Read only', () => (
    <Slider name={'read-only'} readOnly />
  ))
  .add('Disabled', () => (
    <Slider name={'disabled'} disabled />
  ))
  .add('Steps', () => (
    <Slider name={'steps'} showSteps />
  ))
  .add('Vertical', () => (
    <Slider
      name={'vertical'}
      orientation={'vertical'}
      showSteps
      onDragStart={action('drag-start')}
      onDragEnd={action('drag-end')}
    />
  ));
