import React, { FC } from 'react';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { HomeOutlined, ScheduleOutlined, CommentOutlined, SettingFilled } from '@ant-design/icons';
import styles from './index.less';
import logoImg from '@/assets/playstore.png';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MenuLayout: FC = ({ children }) => {
  return (
    <Layout className={styles.center}>
      <Header>
        <div className={styles.logo}>
          <img src={logoImg} />
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
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="1">
              项目
            </Menu.Item>
            <Menu.Item icon={<ScheduleOutlined />} key="2">
              学习
            </Menu.Item>
            <Menu.Item icon={<CommentOutlined />} key="3">
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
