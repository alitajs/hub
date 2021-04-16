import type { ConnectProps } from 'umi';
import { Link } from 'umi';
import React from 'react';
import logo from '@/assets/playstore.png';
import styles from './UserLayout.less';

export type UserLayoutProps = {} & Partial<ConnectProps>;

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Umi Hub</span>
            </Link>
          </div>
          <div className={styles.desc}>这里需要一句很牛的介绍语，如果你有想法，请告诉我</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
