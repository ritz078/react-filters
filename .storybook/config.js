import { configure } from '@kadira/storybook';
import 'font-awesome/scss/font-awesome.scss';
import './base.scss';
import '../components/styles.scss';


function loadStories () {
  require('../stories/Radio.story');
  require('../stories/Range.story');
  require('../stories/Switch.story');
  require('../stories/CheckBox.story');
  require('../stories/AutoComplete.story')
}

configure(loadStories, module);
