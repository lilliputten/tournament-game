/** @module Select
 *  @since 2023.02.02, 06:43
 *  @changed 2023.02.02, 06:43
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import classnames from 'classnames';

import styles from './Select.module.scss';

export interface TSelectOption<T> {
  id: T;
  text: string;
}
export type TSelectOptions<T> = TSelectOption<T>[];

interface TSelectProps<T> {
  className?: string;
  options: TSelectOptions<T>;
  defaultSelected?: T;
  selected?: T;
  onChange?: (id: T) => void;
}

interface TMemo {
  isOpen: boolean;
}

const hasDocument = typeof document !== 'undefined';

export function Select<T = string>(props: TSelectProps<T>): JSX.Element {
  const { className, options, selected, defaultSelected, onChange } = props;
  const [currentId, setCurrentId] = useState<T | undefined>(selected || defaultSelected);
  useEffect(() => {
    setCurrentId(selected);
  }, [selected]);
  const text = useMemo(() => {
    const found = options.find(({ id }) => id === currentId);
    return found?.text;
  }, [currentId, options]);
  const memo = useMemo<TMemo>(() => ({ isOpen: false }), []);
  const [isOpen, setOpen] = useState(false);

  const setCurrentIdHandler = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { currentTarget } = ev;
      const id = currentTarget.id as T;
      setCurrentId(id);
      if (onChange) {
        onChange(id);
      }
    },
    [onChange],
  );

  const optionsContent = useMemo(() => {
    return options.map(({ id, text }) => {
      const key = String(id);
      return (
        <div
          key={key}
          id={key}
          className={classnames(styles.item, id === currentId && styles.selected)}
          onClick={setCurrentIdHandler}
        >
          {text}
        </div>
      );
    });
  }, [options, currentId, setCurrentIdHandler]);

  const onOutsideClick = useCallback(() => {
    const { isOpen } = memo;
    // Hide if clicked outside...
    if (isOpen) {
      setOpen(false);
    }
  }, [memo]);

  useEffect(() => {
    const prevOpen = memo.isOpen;
    memo.isOpen = isOpen;
    if (isOpen && !prevOpen && hasDocument) {
      // Register callback on body
      setTimeout(() => {
        // Delay for avoid instant handler invoking
        document.addEventListener('click', onOutsideClick);
      }, 0);
      return () => {
        document.removeEventListener('click', onOutsideClick);
      };
    }
    memo.isOpen = isOpen;
  }, [memo, isOpen, onOutsideClick]);

  const toggle = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      if (isOpen) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      setOpen(!isOpen);
    },
    [isOpen],
  );

  const resultedClassName = classnames(className, styles.container, isOpen && styles.open);

  return (
    <div className={resultedClassName}>
      <div onClick={toggle} className={styles.control}>
        <span className={styles.controlValue}>{text}</span>
        <span className={styles.controlIcon}>
          <span className={styles.controlIconTriangle} />
        </span>
      </div>
      <div className={styles.dropdown}>{optionsContent}</div>
    </div>
  );
}
