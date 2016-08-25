`Toggle` (component)
====================

Hello world

Props
-----

### `attributes`

Sometimes you may need to add some custom attributes to the root tag of the
component. attributes will accept an object where the key and values will
be those attributes and their value respectively.

Eg : If you pass
```js
attributes = {
 'data-attr1' : 'val1',
 'data-attr2' : 'val2'
}
```
the root tag will have the attributes `data-attr1` and `data-attr2` with the
corresponding values as `val1` and `val2` respectively

type: `object`


### `className`

Optional className to be added to the root tag of the component

type: `string`


### `count`

In case you want to show aggregation/count in front of label then pass the
number in this option. This is generally useful for showing the items present
corresponding to that filter option.

type: `number`


### `countElem`

type: `union(func|element)`

defaultValue: 
```js
function(p) {
  return <span className='toggle-count'>({p.count})</span>;
}
```

### `disabled`

Set to `true` if you want to disable the component interactions.

type: `bool`
defaultValue: `false`


### `iconElement`

type: `func`


### `iconLabel`

type: `array`


### `label`

The label text present in the component. If this option is not set only the
icon element will render.

type: `string`


### `labelPosition`

type: `enum('before'|'after')`
defaultValue: `'before'`


### `mode`

type: `enum('normal'|'tag')`
defaultValue: `'normal'`


### `name` (required)

type: `string`


### `onChange`

type: `func`
defaultValue: `noop`


### `type`

type: `enum('switch'|'radio'|'checkbox')`
defaultValue: `'switch'`


### `value`

type: `bool`
defaultValue: `false`

