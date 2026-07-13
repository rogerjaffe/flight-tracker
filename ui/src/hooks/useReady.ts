import type { Signal } from "@preact/signals";

type NonNullSignalValues<T extends readonly Signal<unknown>[]> = {
  [K in keyof T]: NonNullable<T[K] extends Signal<infer V> ? V : never>;
};

/**
 * Reads a list of signals and returns their values as a tuple.
 * Returns `null` if any of them is currently null/undefined.
 * When non-null, TypeScript narrows every tuple element to NonNullable<T>.
 */
export function useReady<T extends readonly Signal<unknown>[]>(
  ...signals: T
): NonNullSignalValues<T> | null {
  const values = signals.map((s) => s.value);
  if (values.some((v) => v == null)) return null;
  return values as unknown as NonNullSignalValues<T>;
}
