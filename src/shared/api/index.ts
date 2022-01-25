import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';

export const api = {

    getTopRated() {
        return axios.get<any>(`${BASE_URL}/movie/top_rated`,
            {
                params: {
                    api_key: 'a81d483beac43413cccb26601a9febdd',
                    language: 'en-US',
                    region: 'US'
                },
            });
    },

    getSpecificFilm(id: number) {
        return axios.get<any>(`${BASE_URL}/movie/${id}`,
            {
                params: {
                    api_key: 'a81d483beac43413cccb26601a9febdd',
                    language: 'en-US',
                    region: 'US',
                },
            });
    }

}