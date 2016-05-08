import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Switch } from '../components';
import Container from './Container';

storiesOf('Switch Button', module)
  .add('default', () => (
    <Container
      Filter={Switch}
      name='story1'
      action={action}
    />
  ))
  .add('disabled', () => (
    <Container
      Filter={Switch}
      name='story1'
      label='hello'
      action={action}
      disabled
    />
  ));
