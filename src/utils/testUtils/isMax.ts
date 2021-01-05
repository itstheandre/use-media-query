export const isMax = (query?: string) => (query ? /max/gi.test(query) : false);
// || query.split(/\(\-/)[1] === 'max' : false;
