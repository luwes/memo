// Adapted from https://github.com/reduxjs/reselect

function memo(func, equalityCheck = defaultEqualityCheck) {
  let lastArgs = null
  let lastResult = null
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments)
    }

    lastArgs = arguments
    return lastResult
  }
}

function defaultEqualityCheck(newVal, oldVal) {
  if (newVal === oldVal && !isPlainObject(newVal)) return true

  let countA = 0
  let countB = 0
  for (let key in newVal) {
    if (Object.hasOwnProperty.call(newVal, key) && newVal[key] !== oldVal[key]) {
      return false
    }
    countA++
  }
  for (let key in oldVal) {
    if (Object.hasOwnProperty.call(oldVal, key)) countB++
  }
  return countA === countB
}

/**
 * @param obj The object to inspect.
 * @returns True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false
  }

  // Do this in a for loop (and not a `forEach` or an `every`)
  // so we can determine equality as fast as possible.
  const length = prev.length
  for (let i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false
    }
  }

  return true
}

export default memo;
