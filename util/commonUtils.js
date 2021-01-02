/**
 * @author Slesha Tuladhar <sleshatuladhar@gmail.com>
 */

const commonUtils = (() => {
  const groupBy = (array, key) => {
    return array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  const replaceAndLowerCase = (str = '', from, to, replaceForeign = false) => {
    const replaceFrom = new RegExp(from, 'g');
    let newStr = str
      .replace(replaceFrom, to)
      .toLowerCase();
    if (replaceForeign) {
      newStr = newStr.replace(/[^a-zA-Z 0-9]+/g, '');
    }
    return newStr;
  }

  return {
    replaceAndLowerCase,
    groupBy
  }
})();

module.exports = commonUtils;
