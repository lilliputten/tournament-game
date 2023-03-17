import * as buildConfig from '@/config/build';

export type TGameMode = 'single' | 'multi';

export const defaultGameMode: TGameMode = buildConfig.isDev
  ? 'multi' // DEBUG
  : 'multi';
