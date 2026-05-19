const cache = new Map<string, string>();

function cacheKey(text: string): string {
  return text.trim().toLowerCase();
}

export function getCachedTranslation(text: string): string | undefined {
  return cache.get(cacheKey(text));
}

export function setCachedTranslation(original: string, translated: string): void {
  const key = cacheKey(original);
  if (!key) return;
  cache.set(key, translated);
}

export function getTranslationCacheSize(): number {
  return cache.size;
}
