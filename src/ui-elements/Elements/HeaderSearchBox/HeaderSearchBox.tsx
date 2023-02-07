/** @module HeaderSearchBox
 *  @since 2023.01.27, 17:33
 *  @changed 2023.02.02, 02:05
 */

// TODO 2023.02.02, 02:05 -- To capture ESC keypress?

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';

import styles from './HeaderSearchBox.module.scss';

interface THeaderSearchBoxProps {
  className?: string;
  query: string;
  setQuery: (text: string) => void;
}

interface TMemo {
  show: boolean;
  text: string;
  query: string;
}

const hasDocument = typeof document !== 'undefined';

export function HeaderSearchBox(props: THeaderSearchBoxProps): JSX.Element {
  const { className, query, setQuery } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memo = useMemo<TMemo>(() => ({ show: false, text: query, query }), []);
  const [show, setShow] = useState(false);
  const [text, setText] = useState<string>(query);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isVisible = !!(show || text);
  const onOutsideClick = useCallback(() => {
    const { show, query } = memo;
    // Hide if clicked outside...
    if (show) {
      setShow(false);
      // Restore query...
      setText(query);
      memo.text = query;
    }
  }, [memo]);
  useEffect(() => {
    // Aquire externally changed query
    if (query !== memo.text) {
      setText(query);
      memo.text = query;
    }
    memo.query = query;
  }, [memo, query]);
  useEffect(() => {
    const prevShow = memo.show;
    memo.show = show;
    if (show && !prevShow && hasDocument) {
      // Register callback on body
      setTimeout(() => {
        // Delay for avoid instant handler invoking
        document.addEventListener('click', onOutsideClick);
      }, 0);
      return () => {
        document.removeEventListener('click', onOutsideClick);
      };
    }
    memo.show = show;
  }, [memo, show, onOutsideClick]);
  const onClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { show } = memo;
      if (show) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      if (!show) {
        setShow(true);
        if (inputRef?.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }
    },
    [memo, inputRef],
  );
  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = ev.target;
      if (memo.text !== value) {
        setText(value);
        memo.text = value;
      }
    },
    [memo],
  );
  const onSubmit = useCallback(
    (ev?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>) => {
      ev?.preventDefault(); // Disable html form submission!
      const { text, show } = memo;
      if (show) {
        setQuery(text);
      }
      return false;
    },
    [memo, setQuery],
  );
  return (
    <div
      onClick={onClick}
      className={classnames(className, styles.container, isVisible && styles.visible)}
    >
      <div className={classnames(styles.fieldWrapper)}>
        <form onSubmit={onSubmit} className={classnames(styles.form)}>
          <input
            ref={inputRef}
            className={classnames(styles.field)}
            value={text}
            onChange={onChange}
            placeholder="Search all the news"
          />
        </form>
      </div>
      <div
        onClick={onSubmit}
        className={classnames(styles.icon)}
        title={isVisible ? 'Apply search' : 'Search all the news'}
      />
    </div>
  );
}
