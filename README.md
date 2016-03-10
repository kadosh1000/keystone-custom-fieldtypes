#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

keystone-custom-fieldtypes
===========================

A minimal module copying custom keystone field types from any directory into keystone.


## Installation
From your keystone project's root:
```shell
  npm install keystone-custom-fieldtypes --save
```

## Usage

In your project's keystone.js file before `keystone.init` call:

```js
  var kcf = require('keystone-custom-fieldtypes');

  kcf.loadFromDir('path');
```

> Note
> If no dir was specified, will try to load from '/fieldTypes'

### Example Dir Structure
`
fieldTypes
    ├───custom
    │       CustomField.js
    │       CustomType.js
    │
    ├───foo
    │       BarField.js
    │       BarType.js
    │
    └───secondcustom
            SecondCustomField.js
            SecondCustomType.js
`

Dir names not need to have any relavence to the actual type name (ex: `foo`)

### Warning:
Pay Attention : using this module assumes that all the custom fields inside your custom fields dir are on current keystone's format. Use the same pattern as in keystone's `fields\types` dir. Give each of your types its own dir, `{field}Type.js` file and `{filed}Field.js` file


[npm-url]: https://www.npmjs.com/package/keystone-custom-fieldtypes
[npm-image]: https://badge.fury.io/js/keystone-custom-fieldtypes.svg
[travis-url]: https://travis-ci.org/kadosh1000/keystone-custom-fieldtypes
[travis-image]: https://travis-ci.org/kadosh1000/keystone-custom-fieldtypes.svg?branch=master


## License
MIT © kadosh1000