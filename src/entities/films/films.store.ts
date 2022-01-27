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
            //console.log('requests2',requests2)
            let test: any = []

            Promise.all(requests)
                .then(responses => Promise.all(responses.map(r => {
                    r.data.results.map((film: IFilm) => {
                        test = [...test, film.id]
                    })
                    //test = [...test, r.data.results]
                })))
                .then(() => {
                    //let merged = [].concat.apply([], test);
                    this.films = test
                    console.log('merged', test.flat(Infinity))
                    //this.fetchDetails()
                })


            //console.log('test results: ', this.test);

            /*


            Promise.all(requests)
                .then(responses => {
                    // все промисы успешно завершены
                    for(let response of responses) {
                        alert(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
                    }

                    return responses;
                })
                // преобразовать массив ответов response в response.json(),
                // чтобы прочитать содержимое каждого
                .then(responses => Promise.all(responses.map(r => r.json())))
                // все JSON-ответы обработаны, users - массив с результатами
                .then(users => users.forEach(user => alert(user.name)));*/





            /*const results = await Promise.all([
                api.getTopRated(1),
                api.getTopRated(2)
            ])

            console.log(results)*/





/*            const responseData1 = response1.data.results.map(
                (film: IFilm) => {
                    return film.id
                }
            )*/

            /*const response2 = await api.getTopRated(2);

            const responseData2 = response2.data.results.map(
                (film: IFilm) => {
                    return film.id
                }
            )

            this.filmsID = [...responseData1, ...responseData2];
            */
             /*this.films = responseData1*/

            //this.fetchDetails()

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
            //console.log(toJS(this.filmsID))
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