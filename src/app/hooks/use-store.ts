import React from 'react';
import { filmsStore } from '../../entities/films/films.store';

export const StoreContext = React.createContext(filmsStore);

export const useStore = () => React.useContext(StoreContext);
