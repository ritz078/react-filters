<p align="center"><img src="assets/logo.png" align="center" alt="" width="150"></p>

<p align="center">
<a href="https://travis-ci.org/ritz078/react-filters">
<img src="https://travis-ci.org/ritz078/react-filters.svg?branch=master" alt="Build Status" style="max-width:100%;">
</a>
<a href="https://github.com/ritz078/react-filters">
<img src="https://img.shields.io/npm/v/react-filters.svg" alt="npm" style="max-width:100%;">
</a>
<a href="https://codeclimate.com/github/ritz078/react-filters"><img src="https://codeclimate.com/github/ritz078/react-filters/badges/gpa.svg" /></a>
<a href="https://codecov.io/gh/ritz078/react-filters">
  <img src="https://img.shields.io/codecov/c/github/ritz078/react-filters.svg?style=flat" alt="Codecov" />
</a>
<a href="https://twitter.com/intent/tweet?text=react-filters+%7C+A+JS+plugin+to+embed+emojis%2C+media%2C+maps%2C+tweets%2C+code%2C+services+and+parse+markdown+http%3A%2F%2Fbit.ly%2F1NIvT8A&amp;url='http%3A%2F%2Fbit.ly%2F1NIvT8A'&amp;hashtags=JavaScript">
<img src="https://img.shields.io/twitter/url/https/github.com/ritz078/embed.js.svg?style=social" alt="Twitter" style="max-width:100%;">
</a>
</p>

> A collection of Components like autocomplete, radio, checkbox, slider etc. written in React.

##Installation
```
npm install --save react-filters
```

##Basic Usage
import the component you need to use.

```js
import { Slider, Toggle } from 'react-filters/dist';
```

If you don't want to use all the components and are concerned about file size, you can just import the component you need.

```js
import Slider from 'react-filters/dist/Slider';
import Toggle from 'react-filters/dist/Toggle';
```

##Components

Click on the component name to go to their documentation.

- [x] [Toggle](mdDocs/Toggle.md) (Switch, Checkbox, Radio)
- [x] [Slider](mdDocs/Slider.md)
- [x] [Autocomplete](mdDocs/AutoComplete.md)
- [x] [Input Range](mdDocs/InputRange.md)
- [x] [Count](mdDocs/Count.md)
- [ ] Select
- [ ] Dropdown

##Development
1. Clone the repo
1. Create a new branch.
1. Run `npm install && npm run storybook`
1. You can find the server running at **localhost:9002**
1. Add feature or fix bug. Add tests if required.
1. if commit fails make sure that there's no linting error or failed test by running `npm run test && npm run lint`


##License
MIT @ Ritesh Kumar
