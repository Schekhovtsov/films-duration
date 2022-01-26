import React, { FC } from 'react';
import {observer} from "mobx-react";
import {filmsStore, IFilm} from "./films.store";
import {toJS} from "mobx";
import { Table } from 'antd';
import { FilmsTable } from 'features/table';

const Films: FC = () => {

    const { fetchTopRated, films, isLoading} = filmsStore;

    //const test = films.filter((f: IFilm) => f.vote_count > 10000)


    const columns: any = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Rate',
            dataIndex: 'rate_value',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.rate_value - b.rate_value,
        },
        {
            title: 'Rate count',
            dataIndex: 'rate_count',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.rate_count - b.rate_count,
        },
        {
            title: 'Runtime',
            dataIndex: 'runtime',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.runtime - b.runtime,
        },
    ];

    const newData: any = films.map((film: IFilm, index: number) => ({
        key: `${film}_${index}`,
        title: film.title,
        rate_value: film.vote_average,
        rate_count: film.vote_count,
        runtime: film.runtime,
    }))

    return (


        <div>

            {
                (!isLoading && films) && <FilmsTable columns={columns} data={newData} />
            }

        </div>
    );
};

export default observer(Films);