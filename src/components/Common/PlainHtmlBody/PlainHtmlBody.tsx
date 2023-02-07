/** @module PlainHtmlBody
 *  @since 2023.02.01, 00:10
 *  @changed 2023.02.02, 09:36
 */

import classnames from 'classnames';

import styles from './PlainHtmlBody.module.scss';

interface TPlainHtmlBodyProps extends JSX.IntrinsicAttributes {
  className?: string;
  padded?: boolean;
  body: string;
}

export function PlainHtmlBody(props: TPlainHtmlBodyProps): JSX.Element {
  const { className, padded, body } = props;
  // Parse links etc...
  // NOTE: Use internal nextjs links?
  const parsedBody = body.replace(/"https:\/\/www.theguardian.com\//g, '"/article?id=');
  // prettier-ignore
  return (
    <div
      className={classnames(className, styles.container, padded && styles.padded)}
      dangerouslySetInnerHTML={{ __html: parsedBody }}
    />
  );
}
