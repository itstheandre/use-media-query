import { isBrowser } from './isBrowser';

import * as React from 'react';

export const useSafeLayoutEffect = isBrowser
  ? React.useLayoutEffect
  : React.useEffect;
