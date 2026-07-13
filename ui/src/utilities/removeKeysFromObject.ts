export function removeKeysFromObject<
  T extends Record<string, any>,
  K extends string,
>(obj: T, keysToRemove: K[]): Omit<T, K> {
  // Create a shallow copy to avoid mutating the original object
  const result = { ...obj };

  // Loop through the list and delete the target keys
  keysToRemove.forEach((key) => {
    if (key in result) {
      delete (result as any)[key];
    }
  });

  return result as Omit<T, K>;
}
