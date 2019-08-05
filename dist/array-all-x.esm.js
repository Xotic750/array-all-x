import any from 'array-any-x'; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * This method executes a provided function once for each array element.
 *
 * @function all
 * @param {Array} array - The array to iterate over.
 * @param {Function} callBack - Function to execute for each element.
 * @param {*} [thisArg] - Value to use as this when executing callback.
 * @throws {TypeError} If array is null or undefined.
 * @throws {TypeError} If callBack is not a function.
 */
// eslint-enable jsdoc/check-param-names

var all = function all(array, callBack
/* , thisArg */
) {
  any(array, function iteratee() {
    callBack.apply(void 0, arguments);
  },
  /* eslint-disable-next-line prefer-rest-params */
  arguments[2]);
};

export default all;

//# sourceMappingURL=array-all-x.esm.js.map