import React, { FC, useEffect } from 'react';
import { IndexModelState, ConnectProps, connect } from 'alita';
import { Space, Button, Dropdown, Menu, PageHeader, Table, Tag } from 'antd';
import { CaretDownOutlined, MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import is from 'electron-is';
import styles from './index.less';
import yayImg from '@/assets/yay.jpg';

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const IndexPage: FC<PageProps> = ({ index, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch?.({
      type: 'index/query',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = index;
  const createAppMenu = (
    <Menu>
      <Menu.Item key="1">alita</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item key="1">在 Finder 中显示</Menu.Item>
      <Menu.Item key="2">修改备注</Menu.Item>
      <Menu.Item key="3">修改标签</Menu.Item>
      <Menu.Item key="4">从列表中移除</Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, data) => (
        <div className={styles.tableItem}>
          <p>{text}</p>
          <span>{data.address}</span>
          <span>备注:{data.remarks}</span>
        </div>
      ),
    },
    {
      title: 'Umi 版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '最后修改',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time - b.time,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          {}
          <MoreOutlined style={{ fontSize: '24px' }} />
          {}
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'MyUmiApp',
      version: '1.2.3',
      time: 1617957548256,
      tags: ['nice', 'developer'],
      address: '/Users/xiaohuoni/MyUmiApp',
      remarks: '大数据',
    },
    {
      key: '2',
      name: 'MyUmiApp1',
      version: '2.2.3',
      time: 1617957548356,
      tags: ['nice', 'developer'],
      address: '/Users/xiaohuoni/MyUmiApp',
      remarks: '大数据',
    },
    {
      key: '3',
      name: 'umiApp3',
      version: '3.2.3',
      time: 1617957548259,
      tags: ['nice', 'developer'],
      address: '/Users/xiaohuoni/MyUmiApp',
      remarks: '大数据',
    },
  ];

  return (
    <div className={styles.center}>
      <PageHeader
        title="项目"
        extra={[
          <Button key="1" style={{ marginRight: '10px', width: '95px' }}>
            添加
          </Button>,
          <Button key="2" style={{ width: '95px' }} type="primary">
            新建
          </Button>,
        ]}
      ></PageHeader>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(IndexPage);
