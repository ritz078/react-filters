`Count` (component)
===================



Props
-----

prop name | isRequired | type
-------|------|------
[decrementElement](#decrementElement)| |`func`
[disabled](#disabled)| |`bool`
[incrementElement](#incrementElement)| |`func`
[max](#max)| |`number`
[min](#min)| |`number`
[name](#name)|✔️|`string`
[onChange](#onChange)|✔️|`func`
[prefix](#prefix)| |`string`
[step](#step)| |`number`
[suffix](#suffix)| |`string`
[value](#value)| |`number`
### `decrementElement`
type: `func`

defaultValue: 
```js
function() {
  return (
    <button className='count-button' >
      <i className='icon-remove' />
    </button>
  );
}
```


### `disabled`
type: `bool`
defaultValue: `false`



### `incrementElement`
type: `func`

defaultValue: 
```js
function() {
  return (
    <button className='count-button' >
      <i className='icon-add' />
    </button>
  );
}
```


### `max`
type: `number`
defaultValue: `Number.POSITIVE_INFINITY`



### `min`
type: `number`
defaultValue: `Number.NEGATIVE_INFINITY`



### `name` (required)
type: `string`



### `onChange` (required)
type: `func`



### `prefix`
type: `string`



### `step`
type: `number`
defaultValue: `1`



### `suffix`
type: `string`



### `value`
type: `number`
defaultValue: `0`


