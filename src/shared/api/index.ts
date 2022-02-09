import axios from 'axios';

export const API_DEFAULT_PARAMS = {
  api_key: 'a81d483beac43413cccb26601a9febdd',
  language: 'en-US',
  region: 'US',
};

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const api = {

  getTopRated(page = 1) {
    return instance.get<any>(
      '/movie/top_rated',
      {
        params: {
          ...API_DEFAULT_PARAMS,
          page,
        },
      },
    );
  },

  getFilmByID(id: number) {
    return instance.get<any>(
      `/movie/${id}`,
      {
        params: {
          ...API_DEFAULT_PARAMS,
        },
      },
    );
  },

  getFilmByTitle(title: string) {
    return instance.get<any>(
      '/search/movie',
      {
        params: {
          ...API_DEFAULT_PARAMS,
          query: title,
        },
      },
    );
  },

};
