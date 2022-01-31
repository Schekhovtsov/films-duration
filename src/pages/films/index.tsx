import React, {FC, useEffect} from 'react';
import Films from 'entities/films';
import {Input, Typography} from "antd";
import {filmsStore, IFilm} from "../../entities/films/films.store";
import { useStore } from 'app/hooks/use-store';

const { Title, Paragraph } = Typography;
const { Search } = Input;

interface IFilmsPageProps {
    mode: string
}

const FilmsPage: FC<IFilmsPageProps> = ( {mode} ) => {

    const { fetchTopRatedIDs } = useStore();

    useEffect(() => {
        if (mode === 'top') {
            fetchTopRatedIDs(3)
        }
        if (mode === 'search') {
            alert('це поиск дядь')
        }
    }, [])

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