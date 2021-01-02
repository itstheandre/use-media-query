import { isBrowser } from '../src/utils';
let windowSpy: jest.SpyInstance;

beforeEach(() => {
  windowSpy = jest.spyOn(global, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('Window Stuff', () => {
  it('real value when there is a window', () => {
    //   windowSpy
    expect(isBrowser).toStrictEqual(window.document.createElement);
  });
});
