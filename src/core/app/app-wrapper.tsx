/** @module app-wrapper
 *  @since 2023.01.28, 21:01
 *  @changed 2023.01.29, 21:31
 */

import { TReactContent } from '@/utils/react-types';
import { ArticlesControlNode } from '@/features/articles';
import { ArticleControlNode } from '@/features/article';

interface AppWrapperProps {
  children?: TReactContent;
}

export default function AppWrapper(props: AppWrapperProps): JSX.Element {
  const { children } = props;
  return (
    <>
      <ArticlesControlNode />
      <ArticleControlNode />
      {children}
    </>
  );
}
