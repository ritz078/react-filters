import { configure } from '@kadira/storybook';
import 'font-awesome/scss/font-awesome.scss';
import './base.scss';


function loadStories () {
  require('../stories/Radio.story');
  require('../stories/Switch.story');
}

configure(loadStories, module);
