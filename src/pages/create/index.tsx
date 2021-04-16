import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'alita';
import { Button, Row, Col, List, Card, Form, Input, Select, Spin, Radio } from 'antd';
import FooterToolbar from '@/components/FooterToolbar';
import data from '@/services/data.json';
import useNpmClients from '@/hooks/useNpmClients';
import styles from './index.less';
import DirectoryForm from '@/components/DirectoryForm';
import { callRemote } from '@/services/socket';

const { Meta } = Card;
const { Option } = Select;

const { createAppTpl } = data;

interface CreatePageProps {}

const CreatePage: FC<CreatePageProps> = () => {
  const [form] = Form.useForm();
  const [selectItem, setSelectItem] = useState<any>(createAppTpl[0]);
  const { npmClient, loading } = useNpmClients();
  const [config, setConfig] = useState<any>(null);

  const init = async () => {
    if (config && config.baseDir) {
      form.setFieldsValue({
        baseDir: config.baseDir,
      });
      return;
    }
    const configData = await callRemote({ type: '@@storage/getUmiHubConfig', payload: {} });
    if (configData && configData?.baseDir) {
      setConfig(configData);
      form.setFieldsValue({
        baseDir: configData?.baseDir,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (Array.isArray(npmClient) && npmClient.length > 0) {
      form.setFieldsValue({
        npmClient: npmClient[0],
      });
    }
  }, [npmClient]);
  const handleFinish = (value) => {
    console.log(value);
  };
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
            dataSource={createAppTpl}
            renderItem={(item: any) => (
              <List.Item
                onClick={() => setSelectItem(item)}
                style={{
                  border: selectItem.name === item.name ? '1px solid rgb(24, 144, 255)' : '',
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
                  <Meta title={item?.name} description="This is the description" />
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={8} className={styles.right}>
          <p>设置</p>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              name="name"
              label="项目名称"
              rules={[
                {
                  required: true,
                  message: '请输入项目名称',
                },
              ]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              name="baseDir"
              label="项目新建路径"
              rules={[
                {
                  required: true,
                  message: '请选择项目新建路径',
                },
              ]}
            >
              <DirectoryForm />
            </Form.Item>
            <Form.Item
              name={['args', 'language']}
              label="语言"
              rules={[
                {
                  required: true,
                  message: '请选择语言',
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="JavaScript">JavaScript</Radio.Button>
                <Radio.Button value="TypeScript">TypeScript</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="npmClient"
              label="包管理"
              rules={[
                {
                  required: true,
                  message: '请选择包管理器',
                },
              ]}
            >
              <Select
                placeholder="请选择包管理器"
                notFoundContent={
                  loading ? <Spin size="small" /> : !npmClient.length && <p>未找到包管理器</p>
                }
              >
                {Array.isArray(npmClient) &&
                  npmClient.map((client) => (
                    <Option key={client} value={client}>
                      {client}
                    </Option>
                  ))}
              </Select>
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
