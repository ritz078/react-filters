`Slider` (component)
====================



Props
-----

### `attributes`

type: `object`
defaultValue: `{}`


### `disabled`

type: `bool`
defaultValue: `false`


### `max`

type: `number`
defaultValue: `20`


### `min`

type: `number`
defaultValue: `0`


### `name` (required)

type: `string`


### `onChange`

type: `func`


### `onDragEnd`

type: `func`
defaultValue: `noop`


### `onDragStart`

type: `func`
defaultValue: `noop`


### `orientation`

type: `enum('horizontal'|'vertical')`
defaultValue: `'horizontal'`


### `rangeTemplate`

type: `func`

defaultValue: 
```js
function(min, max) {
  return (
    <div className='slider-range' >
      <div className='slider-range-min' >{min}</div>
      <div className='slider-range-max' >{max}</div>
    </div>
  );
}
```

### `readOnly`

type: `bool`
defaultValue: `false`


### `showSteps`

type: `bool`
defaultValue: `false`


### `step`

type: `number`
defaultValue: `1`


### `toolTipTemplate`

type: `func`

defaultValue: 
```js
function(value) {
  return value;
}
```

### `type`

type: `enum('value'|'range')`
defaultValue: `'value'`


### `value`

type: `union(array|number)`
defaultValue: `[5, 10]`

