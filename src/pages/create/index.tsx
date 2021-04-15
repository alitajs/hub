import React, { useState } from 'react';
import type { FC } from 'react';
import { useRequest, Helmet } from 'alita';
import { Button, Row, Col, List, Card, Form, Input } from 'antd';
import { EditOutlined, EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';
import FooterToolbar from '@/components/FooterToolbar';

import styles from './index.less';

const { Meta } = Card;

interface CreatePageProps {}

const CreatePage: FC<CreatePageProps> = () => {
  const [form] = Form.useForm();
  const [selectItem, setSelectItem] = useState<any>({});
  const data = [
    {
      title: 'Aliat',
    },
    {
      title: 'Umi',
    },
    {
      title: 'Dumi',
    },
    {
      title: 'Ant Design Pro',
    },
  ];
  return (
    <div className={styles.center}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>使用 Umi Hub 创建新项目</title>
      </Helmet>
      <Row>
        <Col span={16} className={styles.left}>
          <p>模版</p>
          <List
            className={styles.list}
            grid={{ gutter: 16, column: 3 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                onClick={() => setSelectItem(item)}
                style={{
                  border: selectItem.title === item.title ? '1px solid rgb(24, 144, 255)' : '',
                }}
              >
                <Card
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                >
                  <Meta title={item.title} description="This is the description" />
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={8} className={styles.right}>
          <p>设置</p>
          <Form form={form} layout="vertical" requiredMark>
            <Form.Item label="项目名称" required tooltip="This is a required field">
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              label="路径"
              required
              tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
            >
              <Input placeholder="请选择项目新建路径" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <FooterToolbar>
        <Button
          key="1"
          style={{ marginRight: '10px', width: '95px' }}
          onClick={() => {
            window.close();
          }}
        >
          取消
        </Button>
        <Button
          key="2"
          style={{ width: '95px' }}
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          创建
        </Button>
      </FooterToolbar>
    </div>
  );
};

export default CreatePage;
