import React from 'react';

import { TGameSessionState } from '@/features/GameSession';
import { TGameParamsState } from '@/features/GameParams';
import {
  useGameParamsToken,
  useGameParamsUserName,
  useGameSessionPartnerName,
  useGameSessionPartnerToken,
} from '@/core';

export interface TPartnerData {
  name: TGameSessionState['partnerName'] | TGameParamsState['userName'];
  token: TGameSessionState['partnerToken'] | TGameParamsState['token'];
}
export type TUsePartnerDataHook = () => TPartnerData;

export function useYourData(): TPartnerData {
  const token = useGameParamsToken();
  const name = useGameParamsUserName();
  const data: TPartnerData = React.useMemo(() => {
    return { token, name };
  }, [token, name]);
  return data;
}

export function usePartnerData(): TPartnerData {
  const token = useGameSessionPartnerToken();
  const name = useGameSessionPartnerName();
  const data: TPartnerData = React.useMemo(() => {
    return { token, name };
  }, [token, name]);
  return data;
}

export function usePartnerDataHook(self?: boolean): TUsePartnerDataHook {
  return self ? useYourData : usePartnerData;
}
