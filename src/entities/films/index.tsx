import React, { FC } from 'react';
import {observer} from "mobx-react";
import {IFilm} from "./films.store";
import {Pagination, Table} from "antd";
import {useStore} from "../../app/hooks/use-store";
import Preloader from 'shared/Preloader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Films: FC = observer(() => {

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
            onCell: ({runtime}: any) => {
                return {
                   
                        style: {
                            background:
                                runtime.substring(0, 3) > 160 ? '#ffd6d6'
                                    : runtime.substring(0, 3) <= 100 ? '#e2ffd8' : '#fdebcc' }
                    
                   
                };
            }
        },
    ];

    const FilmTitleWrapper = styled.div`
        display: flex;
        flex-direction: row;
    `;

    const InfoWrapper = styled.div`
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    `;

    const FilmTitle = styled.div`
        font-size: 14pt;
    `;

    const FilmGenres = styled.span`
        color: ##807f7f;
        font-style: italic;
    `;

    const Poster = styled.img`
        width: 40px;
    `;

    const data: any = films.map((film: IFilm, index: number) => ({
        key: `${film}_${index}`,
        title:  <FilmTitleWrapper>
                    <div>
                        <Poster src={`https://www.themoviedb.org/t/p/w220_and_h330_face`+film.poster_path} alt='' />
                    </div>
                    <InfoWrapper>
                        <FilmTitle>
                            <Link to={`/film/${film.id}`}>{film.title}</Link>
                        </FilmTitle>
                        <div>{film.release_date.substring(0, 4)}
                        ,&nbsp;
                        <FilmGenres>
                        { film.genres.map((genre: any, index: number) => genre.name + ' ') }
                        </FilmGenres> 
                        
                        </div>
                    </InfoWrapper>
                </FilmTitleWrapper>,
        rate_value: film.vote_average,
        runtime: film.runtime + ' minutes',
    }))

/*     const topPaginator = "topLeft";
    const bottomPaginator = "bottomRight"; */

    return (

        <div>

            {isLoading && (<Preloader />)}
            

            {
                (!isLoading && films) &&

                <div>
                    <Table columns={columns}
                           dataSource={data}
                           /* pagination={{ position: [topPaginator, bottomPaginator] }} */
                    />
                </div>
            }
        </div>
    );
})