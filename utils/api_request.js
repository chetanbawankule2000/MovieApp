import axios from 'axios';
import {MOVIE_DB_API} from '@env';

const TRENDING_MOVIES = 'https://api.themoviedb.org/3/trending/movie/week';
const POPULAR_MOVIES = 'https://api.themoviedb.org/3/movie/popular';
const SEARCH_MOVIES = 'https:api.themoviedb.org/3/search/movie';
const MOVIE_BY_ID = 'https://api.themoviedb.org/3/movie';
export const movie_details = async () => {
  try {
    let response = await axios.get(POPULAR_MOVIES, {
      params: {
        api_key: MOVIE_DB_API,
        language: 'en-US',
        region: 'in',
      },
    });
    return response.data;
  } catch (error) {}
};

export const trending = async () => {
  try {
    let response = await axios.get(TRENDING_MOVIES, {
      params: {
        api_key: MOVIE_DB_API,
      },
    });
    return response.data;
  } catch (error) {}
};

export const movie_search = async keywords => {
  try {
    let response = await axios.get(SEARCH_MOVIES, {
      params: {
        api_key: MOVIE_DB_API,
        language: 'en-US',
        query: keywords,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {}
};

export const movie_detail_by_id = async movie_id => {
  try {
    let response = await axios.get(`${MOVIE_BY_ID}/${movie_id}`, {
      params: {
        api_key: MOVIE_DB_API,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {}
};
export const movie_cast = async movie_id => {
  try {
    let response = await axios.get(`${MOVIE_BY_ID}/${movie_id}/credits`, {
      params: {
        api_key: MOVIE_DB_API,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {}
};
