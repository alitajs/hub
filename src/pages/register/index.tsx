import { Form, Button, Input, Popover } from 'antd';
import type { FC } from 'react';
import React, { useState } from 'react';
import DirectoryForm from '@/components/DirectoryForm';
import UserLayout from './layout';
import styles from './index.less';
import { callRemote } from '@/services/socket';

const FormItem = Form.Item;

const RegisterPage: FC = ({ history }) => {
  const [github, setGithub] = useState<string>('');
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [submitting, setSubmitting]: [boolean, any] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: Record<string, any>) => {
    setSubmitting(true);
    const data = await callRemote({ type: '@@storage/setUmiHubConfig', payload: values });
    setSubmitting(false);
    if (data.success) {
      history.goBack();
    }
  };

  const checkGitHubId = (_: any, value: string) => {
    const promise = Promise;
    setGithub(value);
    if (!visible) {
      setvisible(!!value);
    }
    return promise.resolve();
  };

  return (
    <UserLayout>
      <div className={styles.main}>
        <Form form={form} name="UserRegister" onFinish={onFinish}>
          <FormItem
            name="name"
            rules={[
              {
                required: true,
                message: '请输入昵称！',
              },
            ]}
          >
            <Input size="large" placeholder="昵称，用于系统对你的称呼" />
          </FormItem>
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            content={
              visible && (
                <div style={{ padding: '4px 0' }}>
                  <img
                    style={{ height: '60px', width: '60px', borderRadius: '30px' }}
                    src={`https://avatars.githubusercontent.com/${github}`}
                  />
                </div>
              )
            }
            overlayStyle={{ width: 100 }}
            placement="right"
            visible={visible}
          >
            <FormItem
              name="githubid"
              rules={[
                {
                  required: true,
                  message: '请输入github ID！',
                },
                {
                  validator: checkGitHubId,
                },
              ]}
            >
              <Input size="large" placeholder="github ID，用于创建项目时的作者信息" />
            </FormItem>
          </Popover>
          <FormItem
            name="mail"
            rules={[
              {
                required: true,
                message: '请输入邮箱地址！',
              },
              {
                type: 'email',
                message: '邮箱地址格式错误！',
              },
            ]}
          >
            <Input size="large" placeholder="邮箱，用于创建项目时的作者信息" />
          </FormItem>
          <Form.Item
            name="baseDir"
            rules={[
              {
                required: true,
                message: '请选择应用的工作空间',
              },
            ]}
          >
            <DirectoryForm placeholder="请选择应用的工作空间" size="large" />
          </Form.Item>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              录入
            </Button>
          </FormItem>
        </Form>
      </div>
    </UserLayout>
  );
};
export default RegisterPage;
