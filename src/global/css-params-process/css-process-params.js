/** @module config.css-process-params
 *  @since 2023.01.26, 23:35
 *  @changed 2023.01.26, 23:35
 */

/** <string | RegExp>[] - paterns for parapx to convert from `{id}: {val}` to `{id}Px: {val}px. */
const pxKeys = [
  // pattern for refactor: (\$\b\w*)(Offset|Padding|Spacing|Margin|Width|Height|Size|Radius|Xs|Sm|Md|Lg|Xl|Xxl)\b
  // vim pattern for refactor: \(\$\<\w*\)\(Offset\|Padding\|Spacing\|Margin\|Width\|Height\|Size\|Radius\|Xs\|Sm\|Md\|Lg\|Xl\|Xxl\)\>/e
  /(Offset|Padding|Spacing|Margin|Width|Height|Size|Radius)$/,
  /(Base|Xs|Sm|Md|Lg|Xl|Xxl|2xl|3xl|4xl)$/,
  // /fontSize/i,
  // 'popupWindowOffset',
];

/** <string | RegExp>[] - paterns for params to convert from `{id}: {val}` to `{id}Ms: {val}ms. */
const msKeys = [
  // pattern for refactor: (\$\b\w*)(Time)\b
  // vim pattern for refactor: \(\$\<\w*\)\(Time\)\>/e
  /(Time|Timeout)$/,
];

module.exports = {
  pxKeys,
  msKeys,
};
