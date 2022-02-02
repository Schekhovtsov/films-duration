import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'app/hooks/use-store';
import {Divider, Typography, List, Card, Input} from "antd";
import { IFilm } from 'entities/films/films.store';
const { Title, Paragraph } = Typography;

export const FilmPage: FC = () => {

    let params = useParams();
    const { fetchDetails, film, isLoading } = useStore();
    
    const filmID: number = Number(params.filmID);


    useEffect(() => {
        fetchDetails( 'search' , filmID)
        // Попробовать сделать отдельный экшен
    }, []);


    return (
      <div>
        {film && (
          <div>
              <h1>{filmID}</h1>
            <Title>{film.title}</Title>
          </div>
        )}
      </div>
    );
}
