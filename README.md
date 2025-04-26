# @lookwe/omit-undefined

A small utility package for TypeScript and JavaScript projects to create a new object with all `undefined` properties removed. It also provides a TypeScript helper type to accurately represent objects without `undefined` properties.

## Installation

You can install `@lookwe/omit-undefined` using npm or yarn:

```bash
npm install @lookwe/omit-undefined
# or
yarn add @lookwe/omit-undefined
```

## Usage

```js
import { omitUndefined, OmitUndefined } from '@lookwe/omit-undefined';

const cleanedObject = omitUndefined({
	id: undefined,
	name: 'Example',
	isActive: true,
});

console.log(cleanedObject);
// {
//   name: 'Example',
//   description: true,
// }
```

### `OmitUndefined<T>` Type

This utility type helps you define the shape of an object where properties that could potentially be `undefined` in the original type `T` are now optional and guaranteed to not be `undefined`.

```ts
import { OmitUndefined } from '@lookwe/omit-undefined';

type User = {
	id: number | undefined;
	username: string;
	email?: string | undefined;
	roles: string[] | undefined;
};

type DefinedUser = OmitUndefined<User>;
// DefinedUser will be:
// {
//   id?: number;
//   username: string;
//   email?: string;
//   roles?: string[];
// }

const validUser: DefinedUser = {
	username: 'testuser',
};

const anotherValidUser: DefinedUser = {
	id: 123,
	username: 'anotheruser',
	email: '[email address removed]',
	roles: ['admin', 'editor'],
};

// The following would have a type error because 'username' is required in DefinedUser
// const invalidUser: DefinedUser = {};
```

## Usefulness with `exactOptionalPropertyTypes`

With the introduction of the `exactOptionalPropertyTypes` flag in TypeScript 4.4, a stricter distinction is made between an optional property being absent and being explicitly set to `undefined`. However, many existing utility types and even some libraries don't fully account for this nuanced behavior. They often treat optional properties (`propertyName?: Type`) as being equivalent to properties that can explicitly be `undefined` (`propertyName: Type | undefined`).

This can lead to situations where, with `exactOptionalPropertyTypes` enabled, you might expect an optional property with an `undefined` value to be treated as truly absent by utility functions or type definitions, but instead, it's still considered present (albeit with an `undefined` value).

`@lookwe/omit-undefined` and its `OmitUndefined` type are designed to be mindful of this distinction. The `omitUndefined` function explicitly removes properties whose value is `undefined`, ensuring that the resulting object truly reflects the absence of those properties. Similarly, the `OmitUndefined` type accurately represents an object where properties that _could_ have been `undefined` in the original type are now optional in the resulting type, but their possible values no longer include `undefined`.

This makes `@lookwe/omit-undefined` a valuable tool, especially when working with TypeScript projects that leverage the benefits of `exactOptionalPropertyTypes` for more precise type checking and a clearer understanding of optional properties. It helps bridge the gap where other libraries might fall short in fully supporting this stricter interpretation of optionality.
