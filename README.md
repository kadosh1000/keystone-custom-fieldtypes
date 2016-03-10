keystone-custom-fieldtypes
===========================

A minimal module copying custom keystone field types from any directory into keystone.


## Installation
From your keystone project's root:
```shell
  npm install keystone-custom-fieldtypes --save
```

## Usage

```js
  var kcf = require('keystone-custom-fieldtypes');

  kcf.loadFromDir();
```

> Note
> If no dir was specified, will try to load from '/fieldTypes'