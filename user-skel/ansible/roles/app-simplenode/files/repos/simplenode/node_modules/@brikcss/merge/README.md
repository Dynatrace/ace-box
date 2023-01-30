# Deep Merge

<!-- Shields. -->
<p>
	<!-- NPM version. -->
	<a href="https://www.npmjs.com/package/@brikcss/merge"><img alt="NPM version" src="https://img.shields.io/npm/v/@brikcss/merge.svg?style=flat-square"></a>
	<!-- NPM downloads/month. -->
	<a href="https://www.npmjs.com/package/@brikcss/merge"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/@brikcss/merge.svg?style=flat-square"></a>
	<!-- Travis branch. -->
	<a href="https://github.com/brikcss/merge/tree/master"><img alt="Travis branch" src="https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master"></a>
	<!-- Codacy. -->
	<a href="https://www.codacy.com"><img alt="Codacy code quality grade" src="https://img.shields.io/codacy/grade/49af7ce4215c4720a6dbc90c3b7fcdbe/master.svg?style=flat-square"></a>
	<a href="https://www.codacy.com"><img alt="Codacy code coverage" src="https://img.shields.io/codacy/coverage/49af7ce4215c4720a6dbc90c3b7fcdbe/master.svg?style=flat-square"></a>
	<!-- Coveralls -->
	<a href='https://coveralls.io/github/brikcss/merge?branch=master'><img src='https://img.shields.io/coveralls/github/brikcss/merge/master.svg?style=flat-square' alt='Coverage Status' /></a>
	<!-- JS Standard style. -->
	<a href="https://standardjs.com"><img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square"></a>
	<!-- Prettier code style. -->
	<a href="https://prettier.io/"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
	<!-- Semantic release. -->
	<a href="https://github.com/semantic-release/semantic-release"><img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square"></a>
	<!-- Commitizen friendly. -->
	<a href="http://commitizen.github.io/cz-cli/"><img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square"></a>
	<!-- Greenkeeper. -->
	<a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/brikcss/merge.svg?style=flat-square" alt="Greenkeeper badge"></a>
	<!-- MIT License. -->
	<a href="https://choosealicense.com/licenses/mit/"><img alt="License" src="https://img.shields.io/npm/l/express.svg?style=flat-square"></a>
</p>

Utility to perform a deep merge of two or more Objects or Arrays.

## Environment support

| Node | CLI | UMD | ES Module | Browser |
| :--: | :-: | :-: | :-------: | :-----: |
|  ✔   |  x  |  ✔  |     ✔     |    ✔    |

## Install

```sh
npm install @brikcss/merge --save-dev
```

## Setup

**Node:**

```js
const merge = require('@brikcss/merge');
```

**JS Modules:**

```js
import merge from '@brikcss/merge';
```

**Browser:**

```js
const merge = window.brikcss.merge;
```

## Usage

Pass list of objects (or arrays) directly to the merge function:

```js
merge(...objects);
```

To use with options, set 1st argument as an Array of objects (or arrays) and set 2nd argument as options Object:

```js
merge([...objects], options);
```

**Note:**

`Merge` works similarly to the `Object.assign()` method in that the first object is set as the merge target and will mutate with each merged object. If you wish to do a full clone, simply pass an empty Object (or Array) as the first object:

```js
merge({}, obj1, obj2);
// Or with options:
merge([{}, obj1, obj2], options);
```

## API

### `Merge(...objects)` or `Merge([...objects], options)`

A container function to merge _either Objects or Arrays_. Any number of Objects or Arrays can be merged, _but they all need to be either Objects or Arrays, not a mix of both._

If only two arguments exist, and the 1st argument is an Array and the 2nd is an Object, `Merge` will merge the items in the Array and treat the Object as options.

### `Merge.objects(target, source, options)`

Returns the target Object, which is now merged with the source Object.

-   `target` _{Object}_ Target to merge to.
-   `source` _{Object}_ Object to merge with target.
-   `options` _{Object}_ [Configuration options](#options).

### `Merge.arrays(target, source, options)`

Returns the target Array, which is now merged with the source Array.

-   `target` _{Array}_ Target to merge to.
-   `source` _{Array}_ Array to merge with target.
-   `options` _{Object}_ [Configuration options](#options).

### Options

**`arrayStrategy`** _{String}_

-   `unique` (_default_): Concatenate arrays and remove duplicates.
-   `merge`: Same as unique, except nested objects and arrays are merged.
-   `concat`: Concatenate arrays, but do not remove duplicates.
-   `overwrite`: Overwrite target array with source.

**`ignore`** _{String[]}_

Array of string paths to ignore, or not merge. Use object key names and/or array index values to specify values to ignore. For example: `ignore: ['key', '1', 'a.b.c.d']` will ignore the object key `key`, the 2nd item an array, and the `d` property in the path `a.b.c.d`.
