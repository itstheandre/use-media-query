import * as React from 'react';
import { isMediaQuery } from '@solx/ismediaquery';
import { isBrowser, Query, useSafeLayoutEffect } from './utils';

function useMediaQuery(query?: string): boolean[];
function useMediaQuery(query?: string[]): boolean[];
function useMediaQuery(query?: Query): boolean[] {
  const burn = query ? false : true;
  let queries: string[];
  if (burn && !query) {
    queries = [];
  } else {
    queries = Array.isArray(query) ? query : [query as string];
  }

  const every = queries.every(isMediaQuery);

  const isBad = burn || !every;

  const isSupported = isBrowser && 'matchMedia' in window;

  const [matches, setMatches] = React.useState(
    !isBad
      ? queries.map(e => {
          return isSupported ? !!window.matchMedia(e).matches : false;
        })
      : queries.length === 0
      ? [false]
      : queries.map(_ => false)
  );

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

export { useMediaQuery, useMediaQuery as useQuery };
