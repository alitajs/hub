import React, { FC } from 'react';
import { useRequest } from 'alita';
import { Space, Avatar, Menu, PageHeader, List, Card, Tabs } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import styles from './index.less';

interface LearnPageProps {}

const { TabPane } = Tabs;
const { Meta } = Card;

function callback(key) {
  console.log(key);
}
const listData = [] as any;
for (let i = 0; i < 23; ) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
  i += 1;
}
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const renderTabs = (data: any) => (
  <>
    <List
      className={styles.list}
      grid={{ gutter: 16, column: 3 }}
      dataSource={[...data].splice(0, 3)}
      renderItem={(item) => (
        <List.Item>
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
    <List
      style={{ backgroundColor: '#FFF' }}
      itemLayout="vertical"
      size="large"
      // pagination={{
      //   onChange: page => {
      //     console.log(page);
      //   },
      //   pageSize: 3,
      // }}
      dataSource={data}
      footer={
        <div>
          浏览更多资源，请访问我们的官网
          <a href="https://www.alitajs.com" target="_blank">
            https://www.alitajs.com
          </a>
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  </>
);
const LearnPage: FC<LearnPageProps> = () => {
  return (
    <div className={styles.center}>
      <PageHeader title="学习"></PageHeader>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="项目" key="1" className={styles.tabPanel}>
          {renderTabs(listData)}
        </TabPane>
        <TabPane tab="教程" key="2" className={styles.tabPanel}>
          {renderTabs(listData)}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LearnPage;
