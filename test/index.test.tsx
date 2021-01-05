import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useMediaQuery } from '../src';
import { defineMatches } from './testUtil';

let windowSpy: jest.SpyInstance;

const baseWindow = {
  matches: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

beforeEach(() => {
  windowSpy = jest.spyOn(global, 'window', 'get');
  global.matchMedia = jest.fn().mockImplementation(() => ({ ...baseWindow }));
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe(`useMediaQuery when window`, () => {
  describe(`no args`, () => {
    it(`displays false`, () => {
      const { result } = renderHook(() => useMediaQuery());
      const [val] = result.current;

      expect(val).toBe(false);
    });
  });

  it('returns arr of false if if no string, or wrong mediaQuery', () => {
    const { result } = renderHook(() =>
      useMediaQuery(['', 'max-height:500px'])
    );

    const [arg1, arg2] = result.current;
    expect(arg1).toBe(false);
    expect(arg2).toBe(false);
  });
  it('takes a base size', () => {
    global.innerWidth = 500;
    const query = '(max-width: 600px)';

    const arr = [query];
    arr.forEach(element => {
      global.matchMedia = jest.fn().mockImplementation(() => ({
        ...baseWindow,
        matches: defineMatches(element),
      }));
      const {
        result: { current },
      } = renderHook(() => useMediaQuery(query));
      expect(current[0]).toBe(true);
    });
  });
});
describe('Multiple Args', () => {
  it('passes', () => {
    global.innerWidth = 510;
    const query = '(max-width: 600px)';
    const query2 = '(max-width: 500px)';

    const arr = [query, query2];
    const expectArr = arr.map(element => {
      global.matchMedia = jest.fn().mockImplementation(() => ({
        ...baseWindow,
        matches: defineMatches(element),
      }));
      const {
        result: { current },
      } = renderHook(() => useMediaQuery(query));

      return current[0];
    });
    expect(expectArr[0]).toBe(true);
    expect(expectArr[1]).toBe(false);
  });

  it('changes value', () => {
    global.innerWidth = 1200;
    const query = '(max-width: 1000px)';
    global.matchMedia = jest.fn().mockImplementation(() => ({
      ...baseWindow,
      matches: defineMatches(query),
    }));
    const { result } = renderHook(() => useMediaQuery(query));
    expect(result.current[0]).toBe(false);

    const newSize = 800;
    global.matchMedia = jest.fn().mockImplementation(() => ({
      ...baseWindow,
      matches: defineMatches(query, newSize),
    }));
    act(() => {
      global.innerWidth = newSize;
    });
    fireEvent(window, new Event('resize'));
    const hook = renderHook(() => useMediaQuery(query));
    expect(hook.result.current[0]).toBe(true);
  });
  it('works with resize', async () => {
    global.innerWidth = 1200;
    const query = '(max-width: 1000px)';
    global.matchMedia = jest.fn().mockImplementation(() => ({
      ...baseWindow,
      matches: defineMatches(query),
    }));
    // @ts-ignore
    const { result } = renderHook(() => useMediaQuery(query));
    expect(result.current[0]);
    act(() => {
      // @ts-ignore
      window.innerWidth = 800;
    });

    fireEvent(window, new Event('resize'));
  });
});
