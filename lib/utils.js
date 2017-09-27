// CONVERTION UTILS
// ----------------------------------------------------------------------------

// Convert value to INT, if the result is NaN, return alt instead of value
function toInt(value, alt) {
  value = +value

  return value === +value ? value : alt
}

// Convert value to INT, if the result is NaN or a negative value, return alt instead of value
function toPosInt(value, alt) {
  value = toInt(value, alt)
  return value >= 0 ? value : alt
}

// Check value and return either null is value was null or a valide timestamp otherwise
function toNullTime(value) {
  if (value === null)  { return null }
  if (value === +value && value >= 0) { return value }
  return Date.now()
}

// Export utilities
// ----------------------------------------------------------------------------
export { toInt, toPosInt, toNullTime }
