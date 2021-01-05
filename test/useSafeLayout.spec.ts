import * as React from 'react';
import { useSafeLayoutEffect } from '../src/utils';

describe(`useSafeLayoutEffect`, () => {
  it.skip(`when no browser`, () => {
    expect(useSafeLayoutEffect).toStrictEqual(React.useLayoutEffect);
  });
});
