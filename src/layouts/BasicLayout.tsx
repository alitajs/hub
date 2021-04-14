import React from 'react';
import type { FC } from 'react';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import type { ConnectProps } from 'alita';
import { HomeOutlined, ScheduleOutlined, CommentOutlined, SettingFilled } from '@ant-design/icons';
import styles from './index.less';
import logoImg from '@/assets/playstore.png';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface PageProps extends ConnectProps {}

const MenuLayout: FC<PageProps> = ({ children, location, history }) => {
  const { pathname } = location;

  return (
    <Layout className={styles.center}>
      <Header>
        <div className={styles.logo}>
          <img src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg" />
          Umi Hub
        </div>
        <div className={styles.user}>
          <SettingFilled style={{ fontSize: '18px', marginRight: '15px' }} />
          <span>陈小聪</span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className={styles.siteLayoutBackground}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={({ key }) => {
              history.push(`${key}`);
            }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              项目
            </Menu.Item>
            <Menu.Item icon={<ScheduleOutlined />} key="/learn">
              学习
            </Menu.Item>
            <Menu.Item icon={<CommentOutlined />} key="/community">
              社区
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MenuLayout;
