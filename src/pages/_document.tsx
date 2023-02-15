/** @module _document.ts
 *  @see https://nextjs.org/docs/advanced-features/custom-document
 *  @since 2023.01.26, 22:26
 *  @changed 2023.01.26, 22:26
 */

import { Html, Head, Main, NextScript } from 'next/document';

import * as siteConfig from '@/config/site';
import * as buildConfig from '@/config/build';

export default function Document(): JSX.Element {
  const {
    siteUrl,
    title,
    descr,
    keywords,
    // opImageUrl,
    // opImageWidth,
    // opImageHeight,
    // faviconUrl,
    // faviconPngUrl,
    // faviconSvgUrl,
  } = siteConfig;
  const { buildTag } = buildConfig;
  // @see https://developers.facebook.com/docs/sharing/webmasters
  // @see https://developers.facebook.com/tools/debug/
  return (
    <Html lang="ru">
      <Head>
        <noscript dangerouslySetInnerHTML={{ __html: `<!-- @build ${buildTag} -->` }} />
        {/*
        <link rel="icon" type="image/svg+xml" href={faviconSvgUrl} />
        <link rel="icon" type="image/png" href={faviconPngUrl} />
        <link rel="icon" type="image/x-icon" href={faviconUrl} />
        */}
        <meta name="title" content={title} />
        <meta name="description" content={descr} />
        <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={siteUrl} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={descr} />
        {/*
        <meta name="og:image" content={opImageUrl} />
        <meta name="og:image:width" content={String(opImageWidth)} />
        <meta name="og:image:height" content={String(opImageHeight)} />
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
