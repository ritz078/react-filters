`AutoComplete` (component)
==========================



Props
-----

prop name | isRequired | type
-------|------|------
[Reset](#reset)| |`func`
[async](#async)| |`bool`
[className](#classname)| |`string`
[debounce](#debounce)| |`number`
[disabled](#disabled)| |`bool`
[fuzzyOptions](#fuzzyoptions)| |`shape[object Object]`
[list](#list)| |`array`
[multiSelect](#multiselect)| |`bool`
[name](#name)|✔️|`string`
[onBlur](#onblur)| |`func`
[onChange](#onchange)| |`func`
[onFocus](#onfocus)| |`func`
[onSelect](#onselect)|✔️|`func`
[placeholder](#placeholder)| |`string`
[resultsTemplate](#resultstemplate)| |`func`
[showInitialResults](#showinitialresults)| |`bool`
[showTagRemove](#showtagremove)| |`bool`
[tags](#tags)| |
[valueKey](#valuekey)| |`string`
[width](#width)| |`number`
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


