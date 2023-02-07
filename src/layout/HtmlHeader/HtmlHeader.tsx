/** @module HtmlHeader
 *  @desc Renders parameters for `head` page part (title, meta-data, etc).
 *  @since 2023.01.26, 23:51
 *  @changed 2023.01.26, 23:51
 */

import * as React from 'react';
import Head from 'next/head';

import * as siteConfig from '@/config/site';

export interface THtmlHeaderProps {
  title?: string;
  descr?: string;
  keywords?: string | string[];
}

/** getPropValue -- Get value from props or site config
 * @param {string} id
 * @param {object} props
 * @return {string}}
 */
function getPropValue(id: keyof THtmlHeaderProps, props: THtmlHeaderProps): string {
  let val: unknown = props[id]; // Later will be converted to string
  if (val == null) {
    val = siteConfig[id];
  }
  if (val && Array.isArray(val)) {
    val = val.join(', ');
  }
  return String(val);
}

export default function HtmlHeader(props: THtmlHeaderProps): JSX.Element {
  const title = getPropValue('title', props);
  const descr = getPropValue('descr', props);
  const keywords = getPropValue('keywords', props);
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={descr} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
}
