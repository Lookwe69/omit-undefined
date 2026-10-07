import assert from 'node:assert';
import { describe, it } from 'node:test';
import { expectTypeOf } from 'expect-type';

import { omitNullable, OmitNullable, omitUndefined, OmitUndefined } from './omit-undefined.js';

describe('OmitUndefined Type', () => {
	it('should make properties optional if their type includes undefined', () => {
		expectTypeOf<
			OmitUndefined<{
				a: number | undefined;
				b: string;
				c?: boolean;
				d: undefined;
			}>
		>().toMatchObjectType<{
			a?: number;
			b: string;
			c?: boolean;
		}>();
	});

	it('should keep properties required if their type does not include undefined', () => {
		expectTypeOf<
			OmitUndefined<{
				a: number;
				b: string;
			}>
		>().toMatchObjectType<{
			a: number;
			b: string;
		}>();
	});

	it('should handle optional properties correctly', () => {
		expectTypeOf<
			OmitUndefined<{
				a?: number;
				b: string;
			}>
		>().toMatchObjectType<{
			a?: number;
			b: string;
		}>();
	});
});

describe('omitUndefined Function', () => {
	it('should return a new object with undefined properties removed', () => {
		const obj = { a: 1, b: undefined, c: 'hello' };
		const result = omitUndefined(obj);
		assert.deepEqual(result, { a: 1, c: 'hello' });
	});

	it('should return an empty object if all properties are undefined', () => {
		const obj = { a: undefined, b: undefined };
		const result = omitUndefined(obj);
		assert.deepEqual(result, {});
	});

	it('should NOT return the same object event if no properties are undefined', () => {
		const obj = { a: 1, b: 'test', c: true };
		const result = omitUndefined(obj);
		assert.notEqual(result, obj);
	});

	it('should work with different data types', () => {
		const obj = { a: 0, b: null, c: undefined, d: false, e: '' };
		const result = omitUndefined(obj);
		assert.deepEqual(result, { a: 0, b: null, d: false, e: '' });
	});

	it('should handle empty objects', () => {
		const obj = {};
		const result = omitUndefined(obj);
		assert.deepEqual(result, {});
	});
});

describe('OmitNullable Type', () => {
	it('should make properties optional if their type includes null or undefined', () => {
		expectTypeOf<
			OmitNullable<{
				a: number | undefined;
				b: string | null;
				c: boolean;
				d?: null;
			}>
		>().toMatchObjectType<{
			a?: number;
			b?: string;
			c: boolean;
		}>();
	});

	it('should keep properties required if their type does not include null or undefined', () => {
		expectTypeOf<
			OmitNullable<{
				a: number;
				b: string;
			}>
		>().toMatchObjectType<{
			a: number;
			b: string;
		}>();
	});
});

describe('omitNullable Function', () => {
	it('should return a new object with null and undefined properties removed', () => {
		const obj = { a: 1, b: undefined, c: null, d: 'hello' };
		const result = omitNullable(obj);
		assert.deepEqual(result, { a: 1, d: 'hello' });
	});

	it('should return an empty object if all properties are null or undefined', () => {
		const obj = { a: null, b: undefined };
		const result = omitNullable(obj);
		assert.deepEqual(result, {});
	});

	it('should NOT return the same object even if no properties are null or undefined', () => {
		const obj = { a: 1, b: 'test', c: true };
		const result = omitNullable(obj);
		assert.notEqual(result, obj);
	});

	it('should work with different data types', () => {
		const obj = { a: 0, b: false, c: '', d: null, e: undefined };
		const result = omitNullable(obj);
		assert.deepEqual(result, { a: 0, b: false, c: '' });
	});

	it('should handle empty objects', () => {
		const obj = {};
		const result = omitNullable(obj);
		assert.deepEqual(result, {});
	});
});
