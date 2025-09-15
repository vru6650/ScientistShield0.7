
import { generateSlug } from './slug.js';

describe('generateSlug', () => {
    test('converts title to URL-friendly slug', () => {
        expect(generateSlug('Hello World!')).toBe('hello-world');
    });

    test('removes non-alphanumeric characters', () => {
        expect(generateSlug('React & Node.js Basics')).toBe(
            'react-nodejs-basics',
        );
    });

    test('converts underscores to hyphens', () => {
        expect(generateSlug('Hello_world_again')).toBe('hello-world-again');
    });

    test('collapses whitespace and trims hyphens', () => {
        expect(
            generateSlug('  Multiple   Spaces -- and symbols!!!  '),
        ).toBe('multiple-spaces-and-symbols');
    });

    test('returns empty string when given only whitespace', () => {
        expect(generateSlug('   ')).toBe('');
    });

    test('strips diacritics from characters', () => {
        // The accented characters should be converted to their ASCII equivalents
        expect(generateSlug('Café déjà vu')).toBe('cafe-deja-vu');
    });

    test('throws an error when input is not a string', () => {
        expect(() => generateSlug(123)).toThrow('Title must be a string');
    });
});
