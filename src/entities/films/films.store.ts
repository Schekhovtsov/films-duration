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
    filmsID = []
    films = []

    constructor() {
        //this.films = []
        makeAutoObservable(this)
    }


    fetchTopRated = async () => {
        try {
            this.isLoading = true
            const response = await api.getTopRated();
            runInAction(() => {
                this.filmsID = response.data.results.map(
                    (film: IFilm) => {
                        return film.id
                    }
                );

                //debugger

                let filmsArray: any = this.filmsID.map(async id => {
                        const response = await api.getSpecificFilm(id);
                        runInAction(() => {

                            this.films = this.films.concat(response.data);

                            /*this.films.sort(function(a: any, b: any) {
                                return b.runtime - a.runtime
                            })*/

                        })

                    }
                )

                runInAction(() => {

                    this.films = filmsArray.sort(function(a: any, b: any) {
                        return b.runtime - a.runtime
                    })

                    let test = this.films
                        .filter((film: IFilm) => {
                            return film.runtime > 150
                        })
                        ;
                    debugger
                    this.films = test;

                   console.log(toJS(this.films))
                    debugger

                })


            });
            if (!response) return console.log('Response was empty')
        }   catch (e) {
            console.log(e)
        }   finally {
            this.isLoading = false;
        }
    }

    // есть массив [123, 456, 56]
    // Нужно на каждую итерацию массива выполнить запрос на сервер

    getSort = () => {



        debugger
    }


    sort = () => {

        this.films
/*            .sort(function (a: any, b: any) {
                return a.vote_count.localeCompare(b.vote_count);
            })*/
            .forEach((film: IFilm) => {
                if (film.vote_count > 10000) {
                    console.log(film.title)
                }
            });

    }

}



export const filmsStore = new FilmsStore()

autorun(() => {

    filmsStore.fetchTopRated()
    debugger
})