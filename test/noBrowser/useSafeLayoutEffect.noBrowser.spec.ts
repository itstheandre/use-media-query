/** * @jest-environment node */
import * as React from 'react';
import { useSafeLayoutEffect } from '../../src/utils';

describe(`useSafeLayoutEffect`, () => {
  it(`when no browser`, () => {
    expect(useSafeLayoutEffect).toStrictEqual(React.useEffect);
  });
});
