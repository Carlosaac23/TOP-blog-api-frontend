export function toSafeText(value, fallback) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}
