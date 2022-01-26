import {makeAutoObservable, runInAction, autorun, computed, toJS } from "mobx";
import { api } from "shared/api/";

export interface IFilm {
    id: number,
    title: string,
    vote_average: number,
    vote_count: number,
    poster_path: string,
    release_date: string,
    runtime: number,
    popularity: number
}

class FilmsStore {

    isLoading = false
    filmsID: any = []
    films: any = []

    constructor() {
        makeAutoObservable(this)
    }

    fetchTopRated = async () => {
        try {
            this.isLoading = true
            const response = await api.getTopRated();

            this.filmsID = response.data.results.map(
                (film: IFilm) => {
                    return film.id
                }
            );

            for await (let id of this.filmsID) {
                const response = await api.getSpecificFilm(id);
                this.films = [...this.films, response.data];
            }

            //this.films = this.films.filter((film: IFilm) => film.vote_count > 20000)

            if (!response) return console.log('Response was empty')
        }   catch (e) {
            console.log(e)
        }   finally {
            this.isLoading = false;
        }
    }

    get getSortedFilms() {
        //return this.films = this.films.filter((film: IFilm) => film.vote_count > 20000)
        return this.films = []
    }

}

export const filmsStore = new FilmsStore()

autorun(() => {
    filmsStore.fetchTopRated();
})