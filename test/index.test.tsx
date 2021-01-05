import { isMediaQuery } from '@solx/ismediaquery';
import { renderHook, act } from '@testing-library/react-hooks';
import { useMediaQuery, useQuery } from '../src';
import { isMin } from './testUtil';
// import { fireEvent } from '@testing-library/react';
// import { useMediaQuery } from '../src';

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
  // global.matchMedia
});

describe(`useMediaQuery when window`, () => {
  act;
  describe(`no args`, () => {
    it(`displays false`, () => {
      const { result } = renderHook(() => useMediaQuery());
      const [val] = result.current;

      expect(val).toBe(false);
    });
  });

  it('returns arr of false if if no string, or wrong mediaQuery', () => {
    console.log(isMediaQuery(''));
    const { result } = renderHook(() =>
      useMediaQuery(['', 'max-height:500px'])
    );

    const [arg1, arg2] = result.current;
    expect(arg1).toBe(false);
    expect(arg2).toBe(false);
    console.log('result. LOOKY HERE?:', result.current);
  });
  it('takes a base size', () => {
    global.innerWidth = 500;
    global.matchMedia = jest
      .fn()
      .mockImplementation(() => ({ ...baseWindow, matches: false }));
    const { result } = renderHook(() => useQuery('(max-width: 600px)'));
    const { result: result2 } = renderHook(() => useQuery('max-width: 600px'));

    isMin();
    result2;
    result;
    // console.log('result:', result.current);
  });
});
// import * as React from 'react';
// import { useMediaQuery, useSafeLayoutEffect } from '../src/utils';
// import { renderHook, act } from '@testing-library/react-hooks';
// import { fireEvent } from '@testing-library/react';
// // import { window } from '../src/utils';
// // import { isBrowser } from '../src/utils';
// let windowSpy: jest.SpyInstance;
// // jest.mock('../src/utils', () => ({
// //   window: {
// //     document: {
// //       createElement: jest.fn(),
// //     },
// //   },
// // }));

// const baseWindow = {
//   matches: true,
//   addEventListener: jest.fn(),
//   removeEventListener: jest.fn(),
// };

// beforeEach(() => {
//   windowSpy = jest.spyOn(global, 'window', 'get');
//   global.matchMedia = jest.fn().mockImplementation(() => ({
//     ...baseWindow,
//   }));
// });

// afterEach(() => {
//   windowSpy.mockRestore();
//   // global.matchMedia
// });

// describe('Get useSafeLayoutEffect', () => {
//   it('works?', () => {
//     expect(useSafeLayoutEffect).toBeDefined();
//     expect(useSafeLayoutEffect).toStrictEqual(React.useLayoutEffect);
//   });

//   /** * @jest-environment node */
//   it('works2', () => {
//     // window.innerWidth = 500;
//     act(() => {
//       // Change the viewport to 500px.
//       // @ts-ignore
//       window.innerWidth = 500;
//       // @ts-ignore
//       window.innerHeight = 500;
//     });
//     fireEvent(window, new Event('resize'));
//     let querySize = '(max-width: 1px)';
//     const regx = /(\d+)/;
//     const match = querySize.match(regx);
//     let regexRetrieveNums = match ? parseInt(match[0]) : false;

//     global.matchMedia = jest.fn().mockImplementation(() => ({
//       ...baseWindow,
//       matches: regexRetrieveNums < window.innerWidth ? true : false,
//     }));
//     const { result, rerender } = renderHook(() => useMediaQuery(querySize));
//     const [val] = result.current;
//     expect(val).toBe(true);
//     querySize = '(min-width: 1000px)';
//     const newMatch = querySize.match(regx);
//     regexRetrieveNums = newMatch ? parseInt(newMatch[0]) : false;
//     global.matchMedia = jest.fn().mockImplementation(() => ({
//       ...baseWindow,
//       matches: regexRetrieveNums < window.innerWidth ? false : true,
//     }));
//     act(() => {
//       // Change the viewport to 500px.

//       // @ts-ignore
//       window.innerHeight = 200;
//     });
//     fireEvent(window, new Event('resize'));
//     rerender(() => useMediaQuery(querySize));
//     expect(result.current[0]).toBe(true);
//   });
// });
