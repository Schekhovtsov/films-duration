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

            const response1 = await api.getTopRated(1);

            const responseData1 = response1.data.results.map(
                (film: IFilm) => {
                    return film.id
                }
            )

            const response2 = await api.getTopRated(2);

            const responseData2 = response2.data.results.map(
                (film: IFilm) => {
                    return film.id
                }
            )

            this.filmsID = [...responseData1, ...responseData2];

            this.fetchDetails()

/*            if (this.filmsID.length > 0) {
                const newBatch = [...this.filmsID, responseData];
                this.filmsID = [].concat.apply([], newBatch);
            }   else    {
                this.filmsID = responseData;
            }*/

            //this.films = this.films.filter((film: IFilm) => film.vote_count > 20000)

            //if (!response) return console.log('Response was empty')
        }   catch (e) {
            console.log(e)
        }   finally {
            console.log(toJS(this.filmsID))
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