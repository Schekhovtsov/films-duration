import React, { FC, useState } from 'react';
import {Films} from 'entities/films';
import styled from 'styled-components';

import {Divider, Typography, List, Card, Input} from "antd";
import { Link } from 'react-router-dom';
import {filmsStore} from "../../entities/films/films.store";
import { FilmsPage } from "../films";
import { useStore } from 'app/hooks/use-store';
import { observer } from 'mobx-react-lite';
const { Title, Paragraph } = Typography;
const { Search } = Input;



export const HomePage: FC = observer(() => {


    const Text_Big = styled.div`
      font-size: 16pt;
    `;

    const Text_Small = styled.div`
      font-size: 14pt;
      padding: 10px 0;
    `;

    const { getFilmsBySearch } = useStore();
    const [wasSearched, setWasSearched] = useState(false);

    const onSearch = (title: string) => {
        getFilmsBySearch(title)
        setWasSearched(true)
    }

    return (
        <div>
            <Title>
                Welcome to Films Duration
            </Title>

            <Text_Big>
                On this site you can find out the duration of the films
            </Text_Big>

            <Divider dashed />

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={[
                    {
                        title: 'Find out the duration of the movie',
                        content: <Search
                            placeholder="Enter the name of the movie"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                        />,
                    },
                ]}
                renderItem={item => (
                    <List.Item>
                        <Card style={{height: '150px'}}
                              title={item.title}>{item.content}</Card>
                    </List.Item>
                )}
            />

            {
                wasSearched && <FilmsPage mode='search' />
            }

        </div>
    );
})
