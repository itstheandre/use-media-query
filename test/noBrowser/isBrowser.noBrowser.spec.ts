/** * @jest-environment node */
import { isBrowser } from '../../src/utils';

describe(`isBrowser`, () => {
  it('when no browser', () => {
    expect(isBrowser).toBe(false);
  });
});
