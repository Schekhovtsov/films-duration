import {makeAutoObservable, runInAction, autorun } from "mobx";
import { api } from "shared/api/";



class Store {

    counter = 0;
    isLoading = false
    films = []

    test = [
        {id: 1, name: 'test 1'},
        {id: 2, name: 'test 2'}
    ]

    constructor() {
        this.films = []
        makeAutoObservable(this)
    }


    fetchTopRated = async () => {
        try {

            this.isLoading = true

            const response = await api.getTopRated();

            runInAction(() => {
                this.films = response.data.results;
            });

            if (!response) return console.log('Response was empty')

        }   catch (e) {
            console.log(e)
        }   finally {
            this.isLoading = false;
        }
    }

}



export const filmsStore = new Store()

autorun(() => {
    filmsStore.fetchTopRated()
})