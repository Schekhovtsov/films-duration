import React, {FC} from 'react';
import {Table} from 'antd';
import {filmsStore, IFilm} from "../../entities/films/films.store";

interface ITableProps {
    films: any
}

export const FilmsTable: FC <ITableProps> = ( {films} ) => {

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
            render(runtime: any) {
                return {
                    props: {
                        style: {
                            background:
                                    runtime.substring(0, 3) > 160 ? '#ffd6d6'
                                    : runtime.substring(0, 3) > 120 ? '#fdebcc'
                                    : runtime.substring(0, 3) > 90 ? '#e2ffd8' : '' }
                    },
                    children: <div>{runtime}</div>
                };
            }
        },
    ];

    const minToHours = (mins: number) => {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + ' hours ' + minutes + ' min';
    }

    const data: any = films.map((film: IFilm, index: number) => ({
        key: `${film}_${index}`,
        title: `${film.title} (${film.release_date.substring(0, 4)})` ,
        rate_value: film.vote_average,
        rate_count: film.vote_count,
        runtime: film.runtime + ' minutes',
    }))

    const topPaginator = 'topLeft';
    const bottomPaginator = 'bottomRight';

    return (
        <div>
            <Table columns={columns}
                   dataSource={data}
                   pagination={{ position: [topPaginator, bottomPaginator] }}
            />
        </div>
    );
};