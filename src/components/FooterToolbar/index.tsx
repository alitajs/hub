import React from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface FooterToolbarProps {
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const FooterToolbar: FC<FooterToolbarProps> = (props) => {
  const { children, className, extra, ...restProps } = props;

  return (
    <div className={classNames(className, styles.toolbar)} {...restProps}>
      <div className={styles.left}>{extra}</div>
      <div className={styles.right}>{children}</div>
    </div>
  );
};

export default FooterToolbar;
