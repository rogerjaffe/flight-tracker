export function findInMap<K, V>(
  map: Map<K, V>,
  predicate: (value: V) => boolean,
): V | null {
  for (const value of map.values()) {
    if (predicate(value)) {
      return value; // Returns immediately on the first match
    }
  }
  return null; // Returns undefined if no match is found
}
