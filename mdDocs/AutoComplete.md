`AutoComplete` (component)
==========================



Props
-----

### `Reset`

type: `func`


### `async`

type: `bool`
defaultValue: `false`


### `className`

type: `string`


### `debounce`

type: `number`
defaultValue: `250`


### `disabled`

type: `bool`
defaultValue: `false`


### `fuzzyOptions`

type: `shape[object Object]`
defaultValue: `{
  caseSensitive: false,
  shouldSort: true,
  sortFn (a, b) {
    return a.score - b.score;
  },
  threshold: 0.6,
  tokenize: false,
  verbose: false,
  distance: 100,
  include: [],
  location: 0
}`


### `list`

type: `array`


### `multiSelect`

type: `bool`
defaultValue: `false`


### `name` (required)

type: `string`


### `onBlur`

type: `func`


### `onChange`

type: `func`


### `onFocus`

type: `func`


### `onSelect` (required)

type: `func`


### `placeholder`

type: `string`
defaultValue: `'Search'`


### `resultsTemplate`

type: `func`
defaultValue: `Suggestions.defaultResultsTemplate`


### `showInitialResults`

type: `bool`
defaultValue: `false`


### `showTagRemove`

type: `bool`
defaultValue: `true`


### `tags`

defaultValue: `false`


### `valueKey`

type: `string`
defaultValue: `'title'`


### `width`

type: `number`
defaultValue: `430`

