/** @module HeaderExtraBlock
 *  @since 2023.02.02, 07:34
 *  @changed 2023.02.02, 07:34
 */

// TODO 2023.02.02, 02:05 -- To capture ESC keypress?

import React, { useCallback } from 'react';
import classnames from 'classnames';

import { useAppDispatch } from '@/core/app/app-store';
import { Select, TSelectOptions } from '@/ui-elements/Forms';
import { TSortMode } from '@/features/articles';
import { setCardType, setSortMode } from '@/features/articles/reducer';
import { useArticlesSearchParams } from '@/core';
import { TArticleCardType } from '@/components';

import styles from './HeaderExtraBlock.module.scss';

interface THeaderExtraBlockProps {
  className?: string;
}

const sortModeOptions: TSelectOptions<TSortMode> = [
  { id: 'newest', text: 'Newest first' },
  { id: 'oldest', text: 'Oldest first' },
];

const cardTypePrefix = 'Card: ';
const cardTypeOptions: TSelectOptions<TArticleCardType> = [
  { id: 'large', text: cardTypePrefix + 'Large' },
  { id: 'medium', text: cardTypePrefix + 'Medium' },
  { id: 'small', text: cardTypePrefix + 'Small' },
  { id: 'smallText', text: cardTypePrefix + 'SmallText' },
];

export function HeaderExtraBlock(props: THeaderExtraBlockProps): JSX.Element {
  const { className } = props;
  const dispatch = useAppDispatch();
  // DEBUG: Allow to change article preview card type for demonstration purposes.
  const { sortMode, cardType } = useArticlesSearchParams();
  const changeSortMode = useCallback(
    (sortMode: TSortMode) => {
      dispatch(setSortMode(sortMode));
    },
    [dispatch],
  );
  const changeCardType = useCallback(
    (cardType: TArticleCardType) => {
      dispatch(setCardType(cardType));
    },
    [dispatch],
  );
  // prettier-ignore
  return (
    <div className={classnames(className, styles.container)}>
      <Select<TSortMode>
        options={sortModeOptions}
        selected={sortMode}
        onChange={changeSortMode}
      />
      <Select<TArticleCardType>
        options={cardTypeOptions}
        selected={cardType}
        onChange={changeCardType}
      />
    </div>
  );
}
