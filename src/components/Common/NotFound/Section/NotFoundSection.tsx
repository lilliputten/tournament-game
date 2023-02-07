/** @module NotFoundSection
 *  @since 2022.02.08, 22:44
 *  @changed 2023.01.31, 22:43
 */

import React from 'react';
import classnames from 'classnames';
import NotFoundContent from '../Content/NotFoundContent';

interface TNotFoundSectionProps {
  className?: string;
}

export default function NotFoundSection(props: TNotFoundSectionProps): JSX.Element {
  const { className } = props;
  // TODO: Wrap with section, title etc...
  return (
    <div className={classnames(className)}>
      <NotFoundContent />
    </div>
  );
}
