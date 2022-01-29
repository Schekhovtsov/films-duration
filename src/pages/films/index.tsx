import React, {FC} from 'react';
import Films from 'entities/films';
import {Input, Typography} from "antd";

const { Title, Paragraph } = Typography;
const { Search } = Input;

interface IFilmsPageProps {
    mode: string
}

const FilmsPage: FC<IFilmsPageProps> = ( {mode} ) => {


    return (
        <div>

            <Title>
                { (mode === 'top') && 'TOP-250 Films duration' }
                { (mode === 'search') && 'Search results' }
            </Title>

            <Films />

        </div>
    );
};

export default FilmsPage;