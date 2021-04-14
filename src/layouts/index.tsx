import React from 'react';
import type { FC } from 'react';
import type { ConnectProps } from 'alita';
import BlankLayout from './BlankLayout';
import BasicLayout from './BasicLayout';

const MenuLayout: FC<ConnectProps> = (props) => {
  const { location } = props;
  const { pathname } = location;
  const hasLayout = pathname === '/' || pathname === '/learn' || pathname === '/community';
  if (!hasLayout) {
    return <BlankLayout {...props} />;
  }
  return <BasicLayout {...props} />;
};

export default MenuLayout;
