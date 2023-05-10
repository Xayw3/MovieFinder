import axios, { ParamsSerializerOptions } from 'axios';
import queryString from 'query-string';
import movieApi from './movieApi';

const axiosMovieClient = axios.create({
  baseURL: movieApi.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    encode: (params: ParamsSerializerOptions) => queryString.stringify({ ...params, api_key: movieApi.apiKey }),
  },
});

axiosMovieClient.interceptors.request.use(async (config) => config);

axiosMovieClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  throw error;
});

export default axiosMovieClient;
