<a
  href="https://travis-ci.org/Xotic750/array-all-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/array-all-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/array-all-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/array-all-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/array-all-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/array-all-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/array-all-x"
  title="npm version">
<img src="https://badge.fury.io/js/array-all-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/array-all-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/array-all-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/array-all-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/array-all-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/array-all-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/array-all-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_array-all-x"></a>

## array-all-x

Like Array.forEach but does not skip holes.

<a name="exp_module_array-all-x--module.exports"></a>

### `module.exports` ⏏

This method executes a provided function once for each array element.

**Kind**: Exported member  
**Throws**:

- <code>TypeError</code> If array is null or undefined.
- <code>TypeError</code> If callBack is not a function.

| Param     | Type                  | Description                                   |
| --------- | --------------------- | --------------------------------------------- |
| array     | <code>array</code>    | The array to iterate over.                    |
| callBack  | <code>function</code> | Function to execute for each element.         |
| [thisArg] | <code>\*</code>       | Value to use as this when executing callback. |

**Example**

```js
import all from 'array-all-x';

const items = ['item1', 'item2', 'item3'];
const copy = [];

all(items, function(item) {
  copy.push(item);
});

console.log(copy); // ['item1', 'item2', 'item3']
```
