##&lt;Toggle/&gt;

Use this component if you want to use radio, checkbox or switch button.

###Basic Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Toggle } from 'react-filters';

  ReactDOM.render(document.getElementById('app'), (
    <Toggle
      name={'demo'}
      onChange={handleChange}
      type={'radio'}
      label={'hello world'}
      count={8}
    />
    )
  )

```

###Options
props|default|Description
-----|-------|-----------
attributes|{}|An object containing attributes-value that can be added to the top most element of the component. Eg: `{'data-id':1, 'data-value':'hello'}` will add `data-id=1` and `data-value="hello"` as attributes to the root element of component.
className|''|optional additional classname of the component
count|null|count to be shown with the label
countElement|`<span className='toggle-count' >({p.count})</span>`|A function to return the template of the count element.
disabled|false|Boolean to disable the component
iconElement|noop|function to return the icon element
iconLabel|null| Accepts an array
label|''|Label of the component
labelPosition|'before'|whether label should be present 'before' the icon or 'after'
mode|'normal'|'normal'/'tag'. Specify the type of component.
name|''|Name of the component
onChange|noop|function called on any change in the component.
type|'switch'|one of 'checkbox', 'radio' or 'switch'
value|false|initial value of the Component



