import {makeAutoObservable} from "mobx";

class Store {

    counter = 0;

    constructor() {
        makeAutoObservable(this)
    }

    increaseCounter = () => {
        this.counter++;
    }

}

export const filmsStore = new Store()