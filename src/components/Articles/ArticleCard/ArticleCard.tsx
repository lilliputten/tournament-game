/** @module ArticleCard
 *  @since 2023.01.29, 22:45
 *  @changed 2023.02.02, 04:03
 */

import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import { TArticle, TArticleId } from '@/core/types';
import { useArticleFromListById } from '@/core/app/app-reducer';

import styles from './ArticleCard.module.scss';

// TODO: Move to types?
const articleCardTypes = [
  'large', // 540x425
  'medium', // 350x350
  'small', // 255x255
  'smallText', // 255x138
] as const;
export type TArticleCardType = (typeof articleCardTypes)[number];
export const defaultArticleCardType: TArticleCardType = 'medium';

const defaultThumbnailUrl = '/images/assets/Logo_White.png';

/* article data sample:
 * id: us-news/2023/jan/29/us-utilities-shut-off-power-to-millions-amid-record-profits
 * type: article
 * sectionId: us-news
 * sectionName: US news
 * webPublicationDate: 2023-01-30T05:01:08Z
 * webTitle: US utilities shut off power to millions amid record corporate profits – report
 * webUrl: https://www.theguardian.com/us-news/2023/jan/29/us-utilities-shut-off-power-to-millions-amid-record-profits
 * apiUrl: https://content.guardianapis.com/us-news/2023/jan/29/us-utilities-shut-off-power-to-millions-amid-record-profits
 * pillarId: pillar/news
 * pillarName: News
 * headline: US utilities shut off power to millions amid record corporate profits – report
 * standfirst: <p>Largest utilities spent billions on stock buybacks, dividend payments to shareholders and executive salaries, analysis finds</p>
 * trailText: Largest utilities spent billions on stock buybacks, dividend payments to shareholders and executive salaries, analysis finds
 * byline: Tom Perkins
 * body: <p>Some of America’s largest utilities cut power to millions of struggling customers in recent years even as they spent billions of dollars on...
 * publication: theguardian.com
 * shortUrl: https://www.theguardian.com/p/n8d2d
 * thumbnail: https://media.guim.co.uk/d78e50b932ec3118f3c17522a09250a29882ddd1/0_167_3000_1800/500.jpg
 */

interface TBasicDetailsProps {
  cardType?: TArticleCardType;
}
interface TArticleCardDetailsProps {
  article: TArticle;
  basicCardProps: TBasicDetailsProps;
}

function ArticleCardThumbnail({ article }: TArticleCardDetailsProps): JSX.Element {
  const {
    thumbnail, // https://media.guim.co.uk/d78e50b932ec3118f3c17522a09250a29882ddd1/0_167_3000_1800/500.jpg
  } = article;
  const noImage = !thumbnail;
  const url = noImage ? defaultThumbnailUrl : thumbnail;
  const className = classnames(styles.thumbnail, noImage && styles.thumbnailNoImage);
  const style = { backgroundImage: 'url(' + url + ')' };
  return <span className={className} style={style} />;
}

function ArticleCardText({ article, basicCardProps }: TArticleCardDetailsProps): JSX.Element {
  const { cardType } = basicCardProps;
  const {
    // id, // us-news/2023/jan/29/us-utilities-shut-off-power-to-millions-amid-record-profits
    // type, // article
    // sectionId, // us-news
    // sectionName, // US news
    // webPublicationDate, // 2023-01-30T05:01:08Z
    webTitle, // US utilities shut off power to millions amid record corporate profits – report
    // webUrl, // https://www.theguardian.com/us-news/2023/jan/29/us-utilities-shut-off-power-to-millions-amid-record-profits
    // apiUrl, // https://content.guardianapis.com/us-news/2023/jan/29/us-utilities-shut-off-power-to-millions-amid-record-profits
    // pillarId, // pillar/news
    // pillarName, // News
    // headline, // US utilities shut off power to millions amid record corporate profits – report
    // standfirst, // <p>Largest utilities spent billions on stock buybacks, dividend payments to shareholders and executive salaries, analysis finds</p>
    // trailText, // Largest utilities spent billions on stock buybacks, dividend payments to shareholders and executive salaries, analysis finds
    // byline, // Tom Perkins
    body, // <p>Some of America’s largest utilities cut power to millions of struggling customers in recent years even as they spent billions of dollars on stock buybacks, dividend payments to shareholders and executive salaries, a <a href="https://www.biologicaldiversity.org/programs/energy-justice/pdfs/Powerless-in-the-US_Report.pdf">new analysis</a> of industry data has found.</p> <p>The report also reveals that companies could use just a tiny fraction of their investor and executive spending to forgive debt at all households where power was cut.</p> <p>The shutoffs disproportionately affect low income and customers from communities of color, and the “harrowing” situation is driven by corporate profiteering, said Selah Goodson Bell, a study co-author and energy justice campaigner with the Center For Biological Diversity.</p> <p>Losing power has an often devastating impact on a household, including in terms of health and safety. “Shutoffs allow corporate utilities to punish customers’ economic precarity while guaranteeing record profits and massive payouts for themselves and their investors,” the authors wrote in the report. It was compiled with utility industry analyst Energy and Policy Institute and BailoutWatch.</p> <p>In the 30 states where shut off data was available, utilities cut service 1.5m times during the first 10 months of 2022, and an estimated 4.2m times nationwide. The report also reveals the issue is worsening: the number of electric shutoffs jumped by nearly one-third and gas shutoffs spiked by 76% between 2021 and the first 10 months of 2022.</p> <p>Illinois posted the highest number of shutoffs during that time period at over 500,000, and it was followed by Pennsylvania, Georgia, Michigan and Ohio. Exelon Corp, the parent company to utility giants like ComEd in Illinois and Peco in Pennsylvania, reported 648,000 shutoffs. It was followed by The Southern Co, DTE Energy, Ameren and FirstEnergy.</p> <p>Some of the companies that likely have the highest totals aren’t included. Between 2020-2021, Florida utilities shut off power 1.4m times, a “staggering” figure largely driven by NextEra’s Florida Light and Power division. But Florida no longer requires utilities to keep track of disconnections.</p> <p>The report highlighted how little utilities would need to cut into dividends, stock buybacks and executive salaries to forgive customer debt. It examined financial filings from 12 large utilities responsible for 86% of the shutoffs between January 2020 and October 2022.</p> <p>On average each spent about $4bn on dividends, and customer debt from their collective 4.9m shutoffs totaled about 1% of their dividend spending.</p> <p>“That was one of the data points that really hit home because that’s just such a small scrape of the amount of money that utilities are shelling out to shareholders that could really change lives in millions of households,” Goodson Bell said.</p> <p>FirstEnergy, which serves Maryland, Pennsylvania and Ohio, shut off power about 240,000 times for customer debts totalling about $25m. Meanwhile, the company paid $2.3bn in dividends.</p> <p>The 12 companies collectively paid about 70 top executives $1.2bn, or about $5.9m annually per executive.</p> <p>NextEra, which cut power most frequently before it was no longer required to report data, is much more generous to its executives and shareholders. The company paid the highest average pay-per-executive at $11.2m, and spent the second highest on dividends at $8.1bn.</p> <p>Increasing gas and electricity prices are partly driving the number of shutoffs, but so are regulatory decisions to allow companies to almost always pass on increased costs to customers. Utilities also continue investing in capital-intensive projects that in many cases are good for their investors but not cost effective for consumers, who could benefit from community solar, rooftop solar, or other distributed energy sources.</p> <p>As climate change creates more extreme hot and cold, more pressure is put on low income customers who can’t afford the extra use of a furnace or air conditioner.</p> <p>The authors say addressing the situation would require including uniform federal record keeping, a halt on new fossil fuel investment, and a ban on punitive billing practices. States could tax utility profits to pay off customer debt, design more effective debt relief programs, eliminate consumer debt, and develop a percentage-of-income-based payment plan.</p> <p>But the clearest solution, Goodson Bell said, is a ban on shutoffs.</p> <p>“Since we see energy as a human right and shut offs are not something that the utility industry needs to do to financially operate, we’re calling for a permanent ban,” he said.</p>
    // publication, // theguardian.com
    // shortUrl, // https://www.theguardian.com/p/n8d2d
    thumbnail, // https://media.guim.co.uk/d78e50b932ec3118f3c17522a09250a29882ddd1/0_167_3000_1800/500.jpg
  } = article;
  const noImage = !thumbnail;
  const className = classnames(styles.text, noImage && styles.noImage);
  const showBody = cardType === 'large' && !!body;
  const bodyPlain =
    showBody &&
    body
      .replace(/<[^<>]*>/g, ' ')
      .replace(/\s\s+/g, ' ')
      .trim();
  return (
    <span className={className}>
      <span className={styles.textTitle}>{webTitle}</span>
      {showBody && <span className={styles.textBody}>{bodyPlain}</span>}
    </span>
  );
}

function ArticleCardContent({ article, basicCardProps }: TArticleCardDetailsProps): JSX.Element {
  const { cardType } = basicCardProps;
  // NOTE: All card types except `smallText` has image preview.
  const hasThumbnail = cardType !== 'smallText';
  return (
    <>
      {hasThumbnail && <ArticleCardThumbnail article={article} basicCardProps={basicCardProps} />}
      <ArticleCardText article={article} basicCardProps={basicCardProps} />
      {/* TODO: To fetch and pass parameters to customize color bar color (Using `ArticleCardColorBar` component)? */}
      <span className={styles.colorBar} />
    </>
  );
}

interface TArticleCardProps extends TBasicDetailsProps {
  className?: string;
  article?: TArticle | string;
}

interface TArticleByCardProps extends TBasicDetailsProps {
  className?: string;
  id: TArticleId;
}

export function ArticleCard(props: TArticleCardProps): JSX.Element {
  const { className: passedClassName, article, ...basicCardProps } = props;
  const { cardType = defaultArticleCardType } = basicCardProps;
  const className = classnames(passedClassName, styles.container, styles['cardType_' + cardType]);
  if (!article || typeof article === 'string') {
    return <span className={className}>{article || 'Article data is not defined'}</span>;
  }
  const { id } = article;
  const hasLink = !!id;
  const content = <ArticleCardContent article={article} basicCardProps={basicCardProps} />;
  // Create link or static span element
  if (hasLink) {
    return (
      <Link className={className} href={{ pathname: '/article', query: { id } }}>
        {content}
      </Link>
    );
  } else {
    return <span className={className}>{content}</span>;
  }
  // const href = id && '/article/' + id;
  // const attrs = { href, className };
  // return React.createElement(href ? Link : 'span', attrs, content);
}

export function EmptyArticleCard(props: Omit<TArticleCardProps, 'article'>): JSX.Element {
  return <ArticleCard {...props} article="" />;
}

// Wrap bare (based on straght data) article renderer with data fetcher by id.
export function ArticleCardById(props: TArticleByCardProps): JSX.Element {
  const { className, id, cardType = defaultArticleCardType } = props;
  const article = useArticleFromListById(id) || 'No article data found for id ' + id;
  return <ArticleCard className={className} cardType={cardType} article={article} />;
}
