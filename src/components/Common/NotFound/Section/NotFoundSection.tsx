/** @module NotFoundSection
 *  @since 2022.02.08, 22:44
 *  @changed 2023.01.31, 22:43
 */

import React from 'react';
import classnames from 'classnames';
import { Box } from '@mui/material';

import NotFoundContent from '../Content/NotFoundContent';
import { PageSectionWrapper } from '@/ui-elements';

interface TNotFoundSectionProps {
  className?: string;
}

export default function NotFoundSection(props: TNotFoundSectionProps): JSX.Element {
  const { className } = props;
  // TODO: Wrap with section, title etc...
  return (
    <PageSectionWrapper className={classnames(className)} flex flexVertical fullSizeFlexChild flexCenter>
      <NotFoundContent />
    </PageSectionWrapper>
  );
}
