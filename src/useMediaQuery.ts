import * as React from 'react';
import { isBrowser, Query, useSafeLayoutEffect } from './utils';

function useQuery(query?: undefined): boolean[];
// function useQuery(query?: { max: true; width: number }): boolean[];
// function useQuery(query?: { max: false; width: number }): boolean[];
function useQuery(query?: string): boolean[];
function useQuery(query?: string[]): boolean[];
// function useQuery(query?: Query | { max: boolean; width: number }): boolean[] {
function useQuery(query?: Query): boolean[] {
  console.log('query:', query);
  if (!query) {
    return [false];
  }

  // let queries: string[];

  // if (typeof query === 'object') {
  //   if (Array.isArray(query)) {
  //     queries = query;
  //   } else if (query.max) {
  //     queries = [`(max)-width: ${query.width}px`];
  //   } else {
  //     queries = [`(min-width: ${query.width}px)`];
  //   }
  // } else {
  //   queries = [query];
  // }
  const queries = Array.isArray(query) ? query : [query];
  const isSupported = isBrowser && 'matchMedia' in window;

  const [matches, setMatches] = React.useState(
    queries.map(e => {
      return isSupported ? !!window.matchMedia(e).matches : false;
    })
  );
  console.log('matches:', matches);

  useSafeLayoutEffect(() => {
    if (!isSupported) return undefined;

    const mediaQueryList = queries.map(query => window.matchMedia(query));

    const listenerList = mediaQueryList.map((mediaQuery, index) => {
      /* istanbul ignore next */
      const listener = () => {
        return setMatches(prev =>
          prev.map((prevValue, idx) =>
            index === idx ? !!mediaQuery.matches : prevValue
          )
        );
      };

      mediaQuery.addEventListener('change', listener);

      return listener;
    });

    return () => {
      mediaQueryList.forEach((mediaQuery, index) => {
        mediaQuery.removeEventListener('change', listenerList[index]);
      });
    };
  }, [query]);

  return matches;
}

function useMediaQuery(query?: Query): boolean[] {
  if (!query) return [false];
  if (!Array.isArray(query) && typeof query === 'object') {
    return [false];
  }
  /* istanbul ignore next */
  const queries = Array.isArray(query) ? query : [query];
  const isSupported = isBrowser && 'matchMedia' in window;

  const [matches, setMatches] = React.useState(
    queries.map(query => {
      // console.log(query);
      // console.log('MAAAAATCH ', isBrowser && window.matchMedia(query));
      return isSupported ? !!window.matchMedia(query).matches : false;
    })
  );
  //   console.log('matches:', matches);

  useSafeLayoutEffect(() => {
    if (!isSupported) return undefined;

    const mediaQueryList = queries.map(query => window.matchMedia(query));

    const listenerList = mediaQueryList.map((mediaQuery, index) => {
      /* istanbul ignore next */
      const listener = () => {
        return setMatches(prev =>
          prev.map((prevValue, idx) =>
            index === idx ? !!mediaQuery.matches : prevValue
          )
        );
      };

      mediaQuery.addEventListener('change', listener);

      return listener;
    });

    return () => {
      mediaQueryList.forEach((mediaQuery, index) => {
        mediaQuery.removeEventListener('change', listenerList[index]);
      });
    };
  }, [query]);

  return matches;
}

export { useMediaQuery, useQuery };
