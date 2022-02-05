import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "app/hooks/use-store";
import { Divider, Typography, List, Card, Input } from "antd";
import { IFilm } from "entities/films/films.store";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
const { Title, Paragraph } = Typography;

export const FilmPage: FC = observer(() => {

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
  `;

  const MovieTitle = styled.div`
    font-size: 24pt;
    font-weight: bold;
    padding-bottom: 20px;
      @media (max-width: 720px) {
        font-size: 18pt;
        
      }
  `;


  let params = useParams();
  const { fetchDetails, film, isLoading } = useStore();

  const filmID: number = Number(params.filmID);

  useEffect(() => {
    fetchDetails("page", filmID);
  }, []);

  const minToHours = (mins: number) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + " hours " + minutes + " min";
  };

  return (
    <div>
      {film && (
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
                <div>
                  Runtime: {film.runtime} minutes ({minToHours(film.runtime)})
                </div>
              </InfoWrapper>
            </BodyWrapper>
          </Content>
        </FilmWrapper>
      )}
    </div>
  );
});
