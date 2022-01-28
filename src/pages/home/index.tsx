import React, { FC } from 'react';
import Films from 'entities/films';

import {Divider, Typography} from "antd";
import styled from 'styled-components';
const { Title } = Typography;



const HomePage: FC = () => {

    const MenuWrapper = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    `;

    const Block = styled.div`
        margin: 0 10px 0 0;
        padding: 10px;
        width: 350px;
        height: 400px;
        background-color: azure;
        border: 3px solid azure;
    `;

    return (
        <div>
            <Title>
                Welcome to Films Duration
            </Title>

            <Title level={4}>
                On this site you can find out the duration of the films
            </Title>

            <Divider dashed />

            <MenuWrapper>
                <Block>123</Block>
                <Block>123</Block>
                <Block>123</Block>
            </MenuWrapper>


            <Films />

        </div>
    );
};

export default HomePage;