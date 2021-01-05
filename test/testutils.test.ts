import { isMax, isMin } from '../src/utils/testUtils';
isMax;

describe('isMax', () => {
  describe('with no args', () => {
    it(' should be false', () => expect(isMax()).toBe(false));
  });
});

describe('isMin', () => {
  describe('with no args', () => {
    it.skip(' should be false', () => expect(isMin()).toBe(false));
  });

  describe('when passing args', () => {
    it.skip('should analyze and return false when never shows min', () => {
      expect(isMin('max-width:1')).toBe(false);
    });
    it.skip('should analyze and return false when never shows min', () => {
      expect(isMin('min-width:1')).toBe(false);

      expect(isMin('(min-width:1px)')).toBe(true);
      expect(isMin('(min-hello)')).toBe(false);
    });
  });
});
