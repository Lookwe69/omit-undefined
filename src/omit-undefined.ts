/**
 * Defines a type `OmitUndefinedProps` that creates a new type by making properties of `T` optional if their type
 * extends `undefined`, and keeping other properties required.
 */
export type OmitUndefined<T> = {
	[K in keyof T as undefined extends T[K] ? K : never]?: Exclude<T[K], undefined>;
} & {
	[K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

/**
 * Creates a new object containing only the properties of the input object that are not `undefined`.
 *
 * @param {T} obj  - The object to process.
 * @returns {OmitUndefined<T>} A new object with properties that were not `undefined` in the original object.
 * @template T  - An object type.
 */
export function omitUndefined<const T extends object>(obj: T): OmitUndefined<T> {
	const cleanedObj = { ...obj };

	for (const key in cleanedObj) {
		if (cleanedObj[key] === undefined) {
			delete cleanedObj[key];
		}
	}

	return cleanedObj;
}
