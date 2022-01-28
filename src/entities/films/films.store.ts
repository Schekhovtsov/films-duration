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
    popularity: number,
}

class FilmsStore {

    isLoading = false
    filmsID: any = []
    films: any = []

    constructor() {
        makeAutoObservable(this)
    }

    fetchTopRatedIDs = async (pages = 1) => {

        try {
            this.isLoading = true

            let pagesArray: number[] = []

            for (let i = 1; i <= pages; i++) {
                pagesArray.push(i)
            }

            let requests = pagesArray.map(page => api.getTopRated(page));

            let temp: any = []

            let response = await Promise.all(requests)
            response.map((r) => {
                r.data.results.map((film: IFilm) => {
                    temp = [...temp, film.id]
                })
            })

            this.filmsID = temp

            this.fetchDetails()

            if (!response) return console.log('Response was empty')
        }   catch (e) {
            console.log(e)
        }
    }

    fetchDetails = async () => {

        try {

            for await (let id of this.filmsID) {
                const response = await api.getSpecificFilm(id);
                this.films = [...this.films, response.data];
            }

            this.films = this.films
                .filter((film: IFilm) => film.vote_count > 5000)
                .sort(function (a: IFilm, b: IFilm) {
                    return a.vote_average - b.vote_average || a.vote_count - b.vote_count;
                });

        }   catch (e) {
            console.log(e)
        }   finally {
            this.isLoading = false;
        }
    }
}

export const filmsStore = new FilmsStore()

autorun(() => {
    filmsStore.fetchTopRatedIDs(3);
});