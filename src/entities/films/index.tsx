import React, { FC } from 'react';
import {observer} from "mobx-react";
import {filmsStore} from "./films.store";
import {toJS} from "mobx";

interface IResponse {
    original_title: string
}

const Films: FC = () => {

    const { films, fetchTopRated } = filmsStore;

    return (
        <div>

            {
                (films) && films.map((obj: IResponse) =>
                        <div>
                            {obj.original_title}
                        </div>

                )
            }

        </div>
    );
};

export default observer(Films);