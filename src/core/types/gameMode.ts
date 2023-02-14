import * as buildConfig from '@/config/build';

export type TGameMode = 'single' | 'multi';

export const defaultGameMode = buildConfig.isDev
  ? 'multi' // DEBUG
  : 'multi';
