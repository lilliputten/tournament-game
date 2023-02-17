import { TPartnersInfo } from '@/core';
import * as partnersInfo from './partnersInfo';

const info1: TPartnersInfo = {
  '230211-165455-365-5694359': {
    name: 'aaa',
    questionAnswers: { Test: 'wrong' },
  },
};
const info2: TPartnersInfo = {
  '230211-165455-365-5694359': {
    name: 'aaa',
    questionAnswers: { Test: 'wrong', Test2: 'correct' },
  },
};
const info3: TPartnersInfo = {
  '230211-165455-365-5694359': {
    name: 'aaa',
    questionAnswers: { Test2: 'correct', Test: 'wrong' },
  },
};

describe('partnersInfo', () => {
  it('should expose object', () => {
    const type = typeof partnersInfo;
    expect(type).toBe('object');
  });

  describe('checkPartnersInfoIsEquals', () => {
    it('should be a function', () => {
      const type = typeof partnersInfo.checkPartnersInfoIsEquals;
      expect(type).toBe('function');
    });
    it('compare with undefined', () => {
      const result = partnersInfo.checkPartnersInfoIsEquals(info1, undefined);
      expect(result).toBeFalsy();
    });
    it('compare with undefined', () => {
      const result = partnersInfo.checkPartnersInfoIsEquals(info1, info2);
      expect(result).toBeFalsy();
    });
    it('compare same objects', () => {
      const result = partnersInfo.checkPartnersInfoIsEquals(info1, { ...info1 });
      expect(result).toBeTruthy();
    });
    it('compare same objects with different keys order', () => {
      const result = partnersInfo.checkPartnersInfoIsEquals(info2, info3);
      expect(result).toBeTruthy();
    });
  });
});
