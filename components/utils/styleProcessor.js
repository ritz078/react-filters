import deepAssign from 'deep-assign';

/**
 * Merge the stylings of active states with the default styling
 * @param style  An object containing the default and state stylings
 * @param options
 * @returns {{}} The resulting style based on options.
 */
export default function (style, options = {}) {
  let processed = style.base;

  for (const key in options) {
    if (options.hasOwnProperty(key) && style[key] && options[key] && (key !== 'disabled')) {
      processed = deepAssign({}, style.base, style[key]);
    }
  }

  // give top most priority to disabled state styling
  if (options.disabled) {
    processed = deepAssign({}, style.base, style.disabled);
  }

  return processed;
}
