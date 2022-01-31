import React, { FC } from 'react';
import {observer} from "mobx-react";
import {IFilm} from "./films.store";
import {Table} from "antd";
import {useStore} from "../../app/hooks/use-store";
import Preloader from 'shared/Preloader';

const Films: FC = () => {

    const { films, isLoading } = useStore();

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
                                    : runtime.substring(0, 3) <= 100 ? '#e2ffd8' : '#fdebcc' }
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
        runtime: film.runtime + ' minutes',
    }))

    const topPaginator = 'topLeft';
    const bottomPaginator = 'bottomRight';

    return (

        <div>

            {isLoading && <Preloader />}
            

            {
                (!isLoading && films) &&

                <div>
                    <Table columns={columns}
                           dataSource={data}
                           pagination={{ position: [topPaginator, bottomPaginator] }}
                    />
                </div>
            }
        </div>
    );
};

export default observer(Films);