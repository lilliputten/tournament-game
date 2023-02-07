/** @module DynamicScroller
 *  @since 2023.02.02, 02:10
 *  @changed 2023.02.02, 03:21
 */

import React, { useCallback, useEffect, useState } from 'react';

export interface TWithDynamicScrollerParams {
  gap?: number;
}

export interface TWithDynamicScrollerProps extends JSX.IntrinsicAttributes {
  isScrolledToEnd?: boolean;
}

interface TWithProps {
  setListContainerRef?: (ref: React.RefObject<HTMLDivElement> | null) => void;
  isLoading?: boolean;
}

const hasWindow = typeof window !== 'undefined';
const hasDocument = typeof document !== 'undefined';

// TODO: To move to helpers?
const isNodeScrolledToEnd = (node?: HTMLDivElement | null, gap = 0): boolean => {
  if (!node || !hasWindow) {
    return false;
  }
  const rect = node.getBoundingClientRect();
  const bottom = rect.bottom - gap;
  const windowHeight = window.innerHeight;
  const isInside = bottom <= windowHeight;
  /* // DEBUG
   * console.log('[DynamicScroller:isNodeScrolledToEnd]', {
   *   rect,
   *   bottom,
   *   windowHeight,
   *   isInside,
   * });
   */
  return isInside;
};

export function withDynamicScrollerFabric<P extends JSX.IntrinsicAttributes>(
  params: TWithDynamicScrollerParams,
): (
  Component: React.ComponentType<P & TWithDynamicScrollerProps>,
) => (props: P & TWithProps) => JSX.Element {
  const { gap } = params;
  return function withDynamicScroller(
    Component: React.ComponentType<P & TWithDynamicScrollerProps>,
  ) {
    return function DynamicScroller(props: P & TWithProps) {
      const { setListContainerRef: setParentListContainerRef, isLoading } = props;
      const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
      const [listContainerRef, setListContainerRef] =
        useState<React.RefObject<HTMLDivElement> | null>(null);
      const updateStatus = useCallback(() => {
        const node = listContainerRef?.current;
        const isInside = isNodeScrolledToEnd(node, gap);
        setIsScrolledToEnd(isInside);
      }, [listContainerRef]);
      // Update state when loading finished
      useEffect(updateStatus, [isLoading, updateStatus]);
      useEffect(() => {
        if (setParentListContainerRef) {
          setParentListContainerRef(listContainerRef);
        }
        if (listContainerRef) {
          updateStatus();
        }
      }, [listContainerRef, setParentListContainerRef, updateStatus]);
      useEffect(() => {
        hasDocument && document.addEventListener('scroll', updateStatus);
        hasWindow && window.addEventListener('resize', updateStatus);
        return () => {
          hasDocument && document.removeEventListener('scroll', updateStatus);
          hasWindow && window.removeEventListener('resize', updateStatus);
        };
      });
      return (
        <Component
          {...props}
          isScrolledToEnd={isScrolledToEnd}
          setListContainerRef={setListContainerRef}
        />
      );
    };
  };
}
