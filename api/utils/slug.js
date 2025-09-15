/**
 * Convert a string into a URL friendly slug.
 *
 * The function performs the following operations:
 * - trims surrounding whitespace
 * - converts all characters to lower case
 * - converts underscores to hyphens
 * - removes any character that is not alphanumeric, a space or a hyphen
 * - replaces consecutive whitespace characters with a single hyphen
 * - collapses multiple hyphens into one
 * - trims leading or trailing hyphens
 *
 * @param {string} title - The text to transform.
 * @returns {string} A slugified representation of the provided title.
 */
export function generateSlug(title) {
    if (typeof title !== 'string') {
        throw new TypeError('Title must be a string');
    }

    const trimmed = title.trim();
    if (trimmed === '') {
        return '';
    }

    return trimmed
        .toLowerCase()
        // Normalize the string so diacritics are separate code points
        // (e.g. "é" -> "e\u0301") allowing them to be stripped below.
        .normalize('NFKD')
        // Remove all diacritic marks that may remain after normalization
        .replace(/[\u0300-\u036f]/g, '')
        // Treat underscores as hyphens for word separation
        .replace(/_/g, '-')
        // Remove all characters except letters, numbers, spaces and hyphens
        .replace(/[^a-z0-9\s-]/g, '')
        // Convert remaining whitespace to hyphens
        .replace(/\s+/g, '-')
        // Collapse multiple hyphens into a single hyphen
        .replace(/-+/g, '-')
        // Remove any leading or trailing hyphens
        .replace(/^-+|-+$/g, '');
}