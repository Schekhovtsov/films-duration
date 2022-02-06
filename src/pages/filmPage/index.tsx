import { Typography } from "antd";
import { useStore } from "app/hooks/use-store";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const FilmPage: FC = observer(() => {
  let params = useParams();
  const { fetchDetails, film, films, getHumanRuntime, fetchTopRatedIDs } = useStore();

  const filmID: number = Number(params.filmID);

  useEffect(() => {
    fetchDetails("page", filmID);
  }, [filmID]);

  return (
    <div>
      {film && film.poster_path != undefined && (
        <FilmWrapper>
          <Content>
            <MovieTitle>{film.title}</MovieTitle>
            <BodyWrapper>
              <PosterWrapper>
                <img
                  src={
                    `https://www.themoviedb.org/t/p/w220_and_h330_face` +
                    film.poster_path
                  }
                />
              </PosterWrapper>
              <InfoWrapper>
                <div>Title: {film.title}</div>
                <div>Release date: {film.release_date}</div>
                <div>&nbsp;</div>
                <div>Runtime: {getHumanRuntime}</div>
              </InfoWrapper>
            </BodyWrapper>
          </Content>
        </FilmWrapper>
      )}
    </div>
  );
});

const FilmWrapper = styled.div`
  width: 100%;
  background-color: white;
`;

const Content = styled.div`
  padding: 30px;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const PosterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14pt;
  padding: 0 20px;
  @media (max-width: 720px) {
    padding: 10px 0;
  }
`;

const MovieTitle = styled.div`
  font-size: 24pt;
  font-weight: bold;
  padding-bottom: 20px;
  @media (max-width: 720px) {
    font-size: 18pt;
  }
`;
