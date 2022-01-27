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

    fetchTopRatedIDs = async (page = 1) => {



        try {
            this.isLoading = true

            let names = [1, 2, 3];

            let requests = names.map(page => api.getTopRated(page));

            let temp: any = []

            let response = await Promise.all(requests)
            response.map((r) => {
                r.data.results.map((film: IFilm) => {
                    temp = [...temp, film.id]
                })
            })

            this.filmsID = temp
            console.log('merged', temp.flat(Infinity))

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

        }   catch (e) {
            console.log(e)
        }   finally {
            this.isLoading = false;
            this.films.map((film: IFilm) => console.log(film.title))
        }
    }
}

export const filmsStore = new FilmsStore()

autorun(() => {
    filmsStore.fetchTopRatedIDs(1);

});