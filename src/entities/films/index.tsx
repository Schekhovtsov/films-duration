import React, { FC } from 'react';
import {observer} from "mobx-react";
import {filmsStore, IFilm} from "./films.store";
import { FilmsTable } from 'features/table';

const Films: FC = () => {

    const {films, isLoading} = filmsStore

    return (

        <div>
            { (!isLoading && films) && <FilmsTable films={films} /> }
        </div>
    );
};

export default observer(Films);