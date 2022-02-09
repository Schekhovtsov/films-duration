import { makeAutoObservable } from 'mobx';
import { api } from 'shared/api/';

export type IFilm = {
    id: number,
    title: string,
    vote_average: number,
    vote_count: number,
    poster_path: string,
    release_date: string,
    runtime: number,
    popularity: number,
    genres: object[]
}

class FilmsStore {
  isLoading = false;
  filmsID: any = [];
  films: IFilm[] = [];
  film: any;
  filmRuntime: number;
  isInit = false;
  wasSearched = false;

  constructor() {
    makeAutoObservable(this);
    this.filmRuntime = 0;
  }

  fetchTopRatedIDs = async (pages = 1): Promise<void> => {
    try {
      this.isLoading = true;
      this.filmsID = [];
      this.films = [];
      this.film = {};

      const pagesArray: number[] = [];

      for (let i = 1; i <= pages; i += 1) {
        pagesArray.push(i);
      }

      const requests = pagesArray.map((page) => api.getTopRated(page));

      const temp: any[] = [];

      const response = await Promise.all(requests);
      response.forEach((r) => {
        r.data.results.forEach((film: IFilm) => {
          temp.push(film.id);
        });
      });

      this.filmsID = temp;

      this.fetchDetails('top');
    } catch (e) {
      console.log(e);
    }
  };

  fetchDetails = async (mode: string, id?: number) => {
    try {
      if (id === undefined) {
        // eslint-disable-next-line no-restricted-syntax
        for await (const filmId of this.filmsID) {
          const response = await api.getFilmByID(filmId);
          this.films.push(response.data);
        }
      } else {
        const response = await api.getFilmByID(id);
        this.film = response.data;
        this.filmRuntime = this.film.runtime;
      }

      if (mode === 'top') {
        this.films = this.films
          .filter((film: IFilm) => film.vote_count > 5000)
          .sort((a: IFilm, b: IFilm) => a.vote_average - b.vote_average
          || a.vote_count - b.vote_count);
      }

      if (mode === 'search') {
        this.films = this.films
          .sort((a: IFilm, b: IFilm) => a.vote_average - b.vote_average
          || a.vote_count - b.vote_count);
      }

      if (mode === 'page') {
        // Do nothing
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (this.wasSearched) {
        this.isInit = false;
      } else {
        this.isInit = true;
      }
      this.wasSearched = false;
      this.isLoading = false;
    }
  };

  getFilmsBySearch = async (title: string) => {
    try {
      this.isLoading = true;
      this.filmsID = [];
      this.films = [];

      const response = await api.getFilmByTitle(title);

      let temp: any = [];

      response.data.results.forEach((film: IFilm) => {
        temp = [...temp, film.id];
      });

      this.filmsID = temp;

      this.fetchDetails('search');

      this.wasSearched = true;
    } catch (e) {
      console.log(e);
    }
  };

  get getHumanRuntime(): string {
    const hours = Math.trunc(this.filmRuntime / 60);
    const minutes = this.filmRuntime % 60;
    return `${hours} hours ${minutes} min`;
  }
}

export const filmsStore = new FilmsStore();
