import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import type { ConnectProps } from 'alita';
import { HomeOutlined, ScheduleOutlined, CommentOutlined, SettingFilled } from '@ant-design/icons';
import styles from './index.less';
import { callRemote } from '@/services/socket';

const { Header, Content, Sider } = Layout;

interface PageProps extends ConnectProps {}

const MenuLayout: FC<PageProps> = ({ children, location, history }) => {
  const { pathname } = location;

  const [config, setConfig] = useState<any>({});
  const init = async () => {
    if (config && config.name) return;
    const data = await callRemote({ type: '@@storage/getUmiHubConfig', payload: {} });
    if (data && data.name) {
      setConfig(data);
    } else {
      history.push('/register');
    }
  };
  useEffect(() => {
    init();
  }, [pathname]);

  return (
    <Layout className={styles.center}>
      <Header>
        <div className={styles.logo}>
          <img src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg" />
          Umi Hub
        </div>
        <div className={styles.user}>
          <SettingFilled style={{ fontSize: '18px', marginRight: '15px' }} />
          <Avatar src={`https://avatars.githubusercontent.com/${config?.githubid}`} />
          {/* <span style={{ marginLeft: '15px' }}>{config?.name || 'dev'}</span> */}
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
