import { insideParens } from './insideParens';

export const isMin = (query?: string): boolean => {
  if (!query) {
    return false;
  }
  if (/max/gi.test(query) || !/min/gi.test(query)) {
    return false;
  }

  if (!/-height|-width/gi.test(query) || !/px/gi.test(query)) {
    return false;
  }

  const isInsideParens = insideParens.exec(query);
  if (!isInsideParens) {
    return false;
  }

  return true;
};
// && query.split(/\(\-/)[1] === 'min' : false;
