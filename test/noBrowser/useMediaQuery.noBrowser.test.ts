/** * @jest-environment node */
import { renderHook } from '@testing-library/react-hooks';
import { useMediaQuery } from '../../src';

describe(`useMediaQuery`, () => {
  describe('no Browser', () => {
    it.skip('no args', () => {
      const { result } = renderHook(() => useMediaQuery());
      const [val] = result.current;

      expect(val).toBeFalsy();
    });
  });

  it.skip('one arg', () => {
    const { result } = renderHook(() => useMediaQuery('min-height: 1000px'));
    const [val] = result.current;

    expect(val).toBeFalsy();
  });

  it.skip(`multiple args`, () => {
    const query = '(min-width: 1000px)';
    const { result } = renderHook(() => useMediaQuery([query, query, query]));
    expect(result.current.length).toBe(3);
    expect(result.current).toStrictEqual([false, false, false]);
  });
});
