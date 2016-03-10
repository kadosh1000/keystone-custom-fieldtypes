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



#### Pay Attention : using this module assumes that all the custom fields inside your custom fields dir are on current keystone's format. Use the same pattern as in keystone's `fields\types` dir. Give each of your types its own dir, `{field}Type.js` file and `{filed}Field.js` file