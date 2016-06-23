import React  from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Switch } from '../components';
import Container from './Container';

storiesOf('Switch Button')
  .addDecorator((story) => <Container action={action} value={false}>{story()}</Container>)
  .add('Basic', () => (
    <Switch name='basic' />
  ))
  .add('Label and count', () => (
    <Switch
      name='story1'
      label='hello'
      count={6}
    />
  ))
  .add('Icon Label', () => (
    <Switch
      name='switch-icon-label'
      iconLabel={['on', 'off']}
    />
  ));
