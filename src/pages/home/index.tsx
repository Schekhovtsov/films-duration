import { Card, Divider, Input, List, Typography } from 'antd';
import { useStore } from 'app/hooks/use-store';
import { observer } from 'mobx-react';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { FilmsPage } from '../films';

const { Title } = Typography;
const { Search } = Input;

export const HomePage: FC = observer(() => {
  const { getFilmsBySearch } = useStore();
  const [wasSearched, setWasSearched] = useState(false);

  const onSearch = (title: string) => {
    getFilmsBySearch(title);
    setWasSearched(true);
  };

  return (
    <div>
      <Title>Welcome to Films Duration</Title>

      <TextBig>
        On this site you can find out the duration of the films
      </TextBig>

      <Divider dashed />

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={[
          {
            title: 'Search the movie by title',
            content: (
              <Search
                placeholder="Godfather"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            ),
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Card style={{ height: '150px' }} title={item.title}>
              {item.content}
            </Card>
          </List.Item>
        )}
      />

      {wasSearched && <FilmsPage mode="search" />}
    </div>
  );
});

const TextBig = styled.div`
  font-size: 16pt;
`;
