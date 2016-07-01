import { configure, addDecorator } from '@kadira/storybook';
import './base.scss';
import '../components/styles.scss';
import centered from '@kadira/react-storybook-decorator-centered';

addDecorator(centered);

function loadStories () {
  require('../stories/Switch.story');
  require('../stories/Radio.story');
  require('../stories/Range.story');
  require('../stories/CheckBox.story');
  require('../stories/AutoComplete.story');
  require('../stories/Count.story');
  require('../stories/InputRange.story');
  require('../stories/Group.story');
}

configure(loadStories, module);
