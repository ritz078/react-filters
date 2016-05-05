import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Switch } from '../components';
import Container from './Container';

storiesOf('Switch Button', module)
  .add('with a text', () => (
    <Container
      Filter={Switch}
      name='story1'
      label='hello'
      action={action}
    />
  ))
  .add('with no text', () => (<Switch value={false} onChange={action('a')}/>));
