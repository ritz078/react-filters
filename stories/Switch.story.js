import React  from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Toggle } from '../components';
import Container from './Container';

storiesOf('Switch Button')
  .addDecorator((story) => <Container action={action} value={false}>{story()}</Container>)
  .add('Basic', () => (
    <Toggle name='basic' />
  ))
  .add('Label and count', () => (
    <Toggle
      name='story1'
      label='hello'
      count={6}
    />
  ))
  .add('Icon Label', () => (
    <Toggle
      name='switch-icon-label'
      iconLabel={['on', 'off']}
    />
  ));
