import React, { FC, useEffect } from 'react';
import { IndexModelState, ConnectProps, connect, GlobalModelState } from 'alita';
import { Button, Dropdown, Menu, PageHeader, Table, Modal, Popconfirm } from 'antd';
import { MoreOutlined, QuestionOutlined } from '@ant-design/icons';
import moment from 'moment';
import { callRemote } from '@/services/socket';

import styles from './index.less';

const { confirm } = Modal;
interface PageProps extends ConnectProps {
  index: IndexModelState;
  global: GlobalModelState;
}

const IndexPage: FC<PageProps> = ({ index, dispatch }) => {
  const { list } = index;
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch?.({
      type: 'index/initList',
    });
  }, []);

  const menu = (data: any) => (
    <Menu
      onClick={({ key }) => {
        switch (key) {
          case '1':
            confirm({
              title: `在编辑器中打开项目${data.name}?`,
              icon: <QuestionOutlined />,
              content: data.key,
              okText: '确定',
              cancelText: '取消',
              onOk() {
                callRemote({
                  type: 'openInEditor',
                  payload: {
                    path: data.key,
                  },
                });
              },
            });
            break;
          case '2':
            callRemote({
              type: 'openPath',
              payload: {
                path: data.key,
              },
            });
            break;
          case '4':
            //
            break;
          default:
            break;
        }
      }}
    >
      <Menu.Item key="1">在编辑器中打开</Menu.Item>
      <Menu.Item key="2">在 Finder 中显示</Menu.Item>
      <Menu.Item key="3">修改标签</Menu.Item>
      <Menu.Item key="4">
        <Popconfirm
          title="确定将此项目从列表中移除吗？项目文件依旧保留在硬盘上，并不会被移除。"
          okText="确认"
          cancelText="取消"
          // visible={visible}
          onConfirm={() => dispatch?.({ type: 'index/deleteList', payload: data })}
          // okButtonProps={{ loading: confirmLoading }}
          // onCancel={handleCancel}
        >
          从列表中移除
        </Popconfirm>
      </Menu.Item>
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
          <span>{data.key}</span>
          <span>备注:{data.remarks}</span>
        </div>
      ),
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '最后修改',
      dataIndex: 'mtimeMs',
      key: 'mtimeMs',
      sorter: (a, b) => a.mtimeMs - b.mtimeMs,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    // {
    //   title: '标签',
    //   key: 'keywords',
    //   dataIndex: 'keywords',
    //   render: (tags) => (
    //     <>
    //       {tags &&
    //         tags.map((tag) => {
    //           let color = tag.length > 5 ? 'geekblue' : 'green';
    //           if (tag === 'loser') {
    //             color = 'volcano';
    //           }
    //           return (
    //             <Tag color={color} key={tag}>
    //               {tag.toUpperCase()}
    //             </Tag>
    //           );
    //         })}
    //     </>
    //   ),
    // },
    {
      title: '操作',
      key: 'action',
      width: '60px',
      render: (text, record) => (
        <Dropdown overlay={menu(record)} placement="bottomRight" arrow>
          {}
          <MoreOutlined style={{ fontSize: '24px' }} />
          {}
        </Dropdown>
      ),
    },
  ];

  return (
    <div className={styles.center}>
      <PageHeader
        title="项目"
        extra={[
          <Button
            key="1"
            style={{ marginRight: '10px', width: '95px' }}
            onClick={async () => {
              const data = await callRemote({
                type: 'selectAlitaPackage',
                payload: {
                  type: 'openDirectory',
                },
              });
              dispatch?.({ type: 'index/addList', payload: data });
            }}
          >
            添加
          </Button>,
          <Button
            key="2"
            style={{ width: '95px' }}
            type="primary"
            onClick={async () => {
              await callRemote({
                type: 'openWindos',
                payload: {
                  path: '/#/create',
                },
              });
            }}
          >
            新建
          </Button>,
        ]}
      ></PageHeader>
      <Table columns={columns} dataSource={list} scroll={{ y: 290 }} />
    </div>
  );
};

export default connect(
  ({ index, global }: { index: IndexModelState; global: GlobalModelState }) => ({ index, global }),
)(IndexPage);
