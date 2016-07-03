import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Range } from '../components';
import Container from './Container';

storiesOf('Range Slider', module)
  .addDecorator((story) => (
    <Container
      className={'range-container'}
      action={action}
      value={[5, 10]}
    >
      {story()}
    </Container>))
  .add('Default', () => (
    <Range name={'range'} min={0} max={100}/>
  ))
  .add('Read Only', () => (
    <Range name={'read-only'} readOnly />
  ))
  .add('Disabled', () => (
    <Range name={'disabled'} disabled/>
  ));
