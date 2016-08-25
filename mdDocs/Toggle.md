`Toggle` (component)
====================

Hello world

Props
-----

prop name | isRequired | type
-------|------|------
[attributes](#attributes)| |`object`
[className](#className)| |`string`
[count](#count)| |`number`
[countElem](#countElem)| |`union(func|element)`
[disabled](#disabled)| |`bool`
[iconElement](#iconElement)| |`func`
[iconLabel](#iconLabel)| |`array`
[label](#label)| |`string`
[labelPosition](#labelPosition)| |`enum('before'|'after')`
[mode](#mode)| |`enum('normal'|'tag')`
[name](#name)|✔️|`string`
[onChange](#onChange)| |`func`
[type](#type)| |`enum('switch'|'radio'|'checkbox')`
[value](#value)|✔️|`bool`
### `attributes`
type: `object`

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



### `className`
type: `string`

Optional className to be added to the root tag of the component



### `count`
type: `number`

In case you want to show aggregation/count in front of label then pass the
number in this option. This is generally useful for showing the items present
corresponding to that filter option.



### `countElem`
type: `union(func|element)`

defaultValue: 
```js
function(p) {
  return <span className='toggle-count'>({p.count})</span>;
}
```


### `disabled`
type: `bool`
defaultValue: `false`

Set to `true` if you want to disable the component interactions.



### `iconElement`
type: `func`



### `iconLabel`
type: `array`



### `label`
type: `string`

The label text present in the component. If this option is not set only the
icon element will render.



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



### `value` (required)
type: `bool`
defaultValue: `false`


