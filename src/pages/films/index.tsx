import React, {FC, useEffect} from 'react';
import {Films} from 'entities/films';
import {Input, Typography} from "antd";
import {filmsStore, IFilm} from "../../entities/films/films.store";
import { useStore } from 'app/hooks/use-store';
import { observer } from 'mobx-react-lite';

const { Title, Paragraph } = Typography;
const { Search } = Input;

interface IFilmsPageProps {
    mode: string
}

export const FilmsPage: FC<IFilmsPageProps> = observer(( {mode} ) => {

    const { fetchTopRatedIDs, isInit, wasSearched } = useStore();

    useEffect(() => {
        if (mode === 'top' && !isInit && !wasSearched) {
            fetchTopRatedIDs(3)
        }
    }, [])

    return (
        <div>

            <Title>
                { (mode === 'top') && 'TOP Films duration' }
                { (mode === 'search') && '' }
            </Title>

            <Films />

        </div>
    );
})