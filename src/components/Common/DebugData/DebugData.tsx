/** @module DebugData
 *  @since 2023.01.31, 23:16
 *  @changed 2023.01.31, 23:16
 */

import React, { useMemo } from 'react';
import classnames from 'classnames';

import styles from './DebugData.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TData = any;

interface TDebugDataProps extends JSX.IntrinsicAttributes {
  className?: string;
  padded?: boolean;
  data?: TData | string;
}

interface DebugDataItemProps {
  id: string;
  value?: string | number | boolean;
}
function DebugDataItem({ id, value }: DebugDataItemProps): JSX.Element {
  return (
    <div className={styles.dataItem}>
      <span className={styles.dataItemLabel}>{id}:</span>{' '}
      <span className={styles.dataItemValue}>{value}</span>
    </div>
  );
}

interface TDebugDataContentProps {
  data: TData;
}

function DebugDataContent({ data }: TDebugDataContentProps): JSX.Element {
  const { id } = data;
  const keys = data && (Object.keys(data) as string[]);
  const items =
    keys &&
    keys.map((key: string) => {
      const value = data[key as keyof TData] as string | boolean | number | undefined;
      return !!value && <DebugDataItem key={id + ':' + key} id={key} value={value} />;
    });
  return <>{items}</>;
}

export function DebugData(props: TDebugDataProps): JSX.Element {
  const { className, padded, data } = props;
  const content = useMemo(() => {
    if (!data) {
      // TODO: Throw an error?
      return 'No data data object passed';
    } else if (typeof data === 'string') {
      return data;
    } else {
      return <DebugDataContent data={data} />;
    }
  }, [data]);
  // prettier-ignore
  return (
    <div className={classnames(className, styles.container, padded && styles.padded)}>
      {content}
    </div>
  );
}
