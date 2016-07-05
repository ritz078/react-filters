import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Slider } from '../components';
import Container from './Container';

storiesOf('Slider Component (Range)', module)
  .addDecorator((story) => (
    <Container
      className={'range-container'}
      action={action}
      value={[6, 10]}
    >
      {story()}
    </Container>))
  .add('Default', () => (
    <Slider name={'range'} min={0} type={'range'} max={100}/>
  ))
  .add('Read Only', () => (
    <Slider name={'read-only'} type={'range'} readOnly />
  ))
  .add('Disabled', () => (
    <Slider name={'disabled'} type={'range'} disabled/>
  ))
  .add('Steps', () => (
    <Slider name={'steps'} type={'range'} showSteps step={2}/>
  ))
  .add('Vertical', () => (
    <Slider name={'vertical'} type={'range'} orientation={'vertical'} showSteps />
  ));
