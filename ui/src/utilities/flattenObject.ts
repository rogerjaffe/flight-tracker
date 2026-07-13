type FlatObject = Record<string, any>;

/**
 * Flattens a deeply nested object into a single-level object.
 * Paths are joined with a dot (e.g., "b.d"). Arrays are preserved.
 */
export function flattenObject(
  obj: Record<string, any>,
  parentPath = "",
  result: FlatObject = {},
): FlatObject {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    // Construct the new dot-notation path
    const currentPath = parentPath ? `${parentPath}.${key}` : key;
    const value = obj[key];

    // Check if value is a plain object (and not null or an array)
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, currentPath, result);
    } else {
      result[currentPath] = value;
    }
  }

  return result;
}
