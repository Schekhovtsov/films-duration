import React, { FC } from 'react';
import {observer} from "mobx-react";
import {filmsStore} from "./films.store";

const Films: FC = () => {

    const { counter, increaseCounter } = filmsStore;

    return (
        <div>
            {counter}
            <button onClick={increaseCounter}>Increase</button>
        </div>
    );
};

export default observer(Films);