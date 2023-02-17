import isEqual from 'lodash/isEqual';

import { TPartnersInfo } from '@/core';
import { TGameSessionState } from '../types';

export function getPartnersInfoTotalSize(partnersInfo: TPartnersInfo) {
  if (!partnersInfo) {
    return 0;
  }
  const questionAnswersSizes = Object.values(partnersInfo).map(
    ({ questionAnswers }) => (questionAnswers && Object.keys(questionAnswers).length) || 0,
  );
  return questionAnswersSizes?.reduce((sum, n) => sum + n, 0);
}

export function checkIsNotEmptyPartnersInfo(partnersInfo: TPartnersInfo) {
  return !!getPartnersInfoTotalSize(partnersInfo);
}

export function checkPartnersInfoIsEquals(info1?: TPartnersInfo, info2?: TPartnersInfo) {
  return isEqual(info1, info2);
}

export function updatePartnersInfo(state: TGameSessionState, partnersInfo: TPartnersInfo) {
  const oldPartnersInfo = state.partnersInfo;
  const equals = checkPartnersInfoIsEquals(oldPartnersInfo, partnersInfo);
  if (!equals) {
    console.log('[partnersInfo:updatePartnersInfo]', {
      oldPartnersInfo,
      partnersInfo,
    });
    state.partnersInfo = partnersInfo;
    return true;
  }
  return false;
}
