##&lt;Toggle/&gt;

Use this component if you want to use radio, checkbox or switch button.

###Basic Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Toggle } from 'react-filters'

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


