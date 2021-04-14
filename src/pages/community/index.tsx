import React, { FC } from 'react';
import { PageHeader, List, Image } from 'antd';
import styles from './index.less';

interface CommunityPageProps {}

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const CommunityPage: FC<CommunityPageProps> = () => {
  return (
    <div className={styles.center}>
      <PageHeader title="社区"></PageHeader>
      <List
        style={{ backgroundColor: '#FFF' }}
        itemLayout="horizontal"
        dataSource={data}
        size="large"
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Image
                  width={125}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              }
              title={
                <a href="https://ant.design" target="_blank">
                  {item.title}
                </a>
              }
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommunityPage;
