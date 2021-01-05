export function defineMatches(query: string, val?: number) {
  if (query.includes('and')) {
    // !todo need to do when the user has `and`
    return;
  }
  const num = query?.match(/\d+/gi);
  const existsNum = num?.length ? num.join('') : '';
  const value = existsNum ? parseInt(existsNum) : 0;
  const isHeight = /height/gi.test(query);

  if (/min/gi.test(query)) {
    if (val) {
      return value <= val;
    }
    return isHeight ? value <= window.innerHeight : value <= window.innerWidth;
  }
  if (val) {
    return value >= val;
  }

  return isHeight ? value >= window.innerHeight : value >= window.innerWidth;
}
