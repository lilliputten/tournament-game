/** @module expose-control-node
 *  @desc Bare component to cintrol GameSession events on the top level of react nodes
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 22:29
 */

import React from 'react';

import { useGameSessionIsWaitingCycle } from './expose-hooks';

export default function ExposeControlNode(): null {
  const isWaitingCycle = useGameSessionIsWaitingCycle();
  React.useEffect(() => {
    if (isWaitingCycle) {
      console.log('[src/features/GameSession/expose-control-node]: start requests cycle');
      return () => {
        console.log('[src/features/GameSession/expose-control-node]: stop requests cycle');
      };
    }
  }, [isWaitingCycle]);

  return null;
}
