import React, { FC } from 'react';
import Films from 'entities/films';

import { Typography } from "antd";
const { Title } = Typography;



const HomePage: FC = () => {

    return (
        <div>
            <Title>
                Welcome to Films Duration
            </Title>


            <Films />

        </div>
    );
};

export default HomePage;