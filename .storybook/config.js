import { configure } from '@kadira/storybook';
import 'font-awesome/scss/font-awesome.scss';

function loadStories () {
  require('../stories/Radio.story');
}

configure(loadStories, module);
