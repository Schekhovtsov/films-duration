import { Table } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Preloader from 'shared/Preloader';
import styled from 'styled-components';
import { useStore } from '../../app/hooks/use-store';
import { IFilm } from './films.store';

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
      onCell: ({ runtime }: any) => ({
        style: {
          background:
            runtime.substring(0, 3) > 160
              ? '#ffd6d6'
              : runtime.substring(0, 3) <= 100
                ? '#e2ffd8'
                : '#fdebcc',
        },
      }),
    },
  ];

  const data: any = films.map((film: IFilm, index: number) => ({
    key: `${film}_${index}`,
    title: (
      <FilmTitleWrapper>
        <PosterWrapper>
          <Poster
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`}
            alt=""
          />
        </PosterWrapper>
        <InfoWrapper>
          <FilmTitle>
            <Link to={`/film/${film.id}`}>{film.title}</Link>
          </FilmTitle>
          <div>
            {film.release_date.substring(0, 4)}
            ,&nbsp;
            <FilmGenres>
              {film.genres.map((genre: any) => `${genre.name} `)}
            </FilmGenres>
          </div>
        </InfoWrapper>
      </FilmTitleWrapper>
    ),
    rate_value: film.vote_average,
    runtime: `${film.runtime} minutes`,
  }));

  return (
    <div>
      {isLoading && <Preloader />}

      {!isLoading && films && (
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      )}
    </div>
  );
});

const FilmTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PosterWrapper = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;

const Poster = styled.img`
  width: 40px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 800px) {
    margin-left: 20px;
  }
`;

const FilmTitle = styled.div`
  font-size: 14pt;
`;

const FilmGenres = styled.span`
  color: ##807f7f;
  font-style: italic;
`;
