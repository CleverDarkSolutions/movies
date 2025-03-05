import axios from 'axios';
import { API_URL, BEARER_TOKEN } from '../constants';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: BEARER_TOKEN,
  },
};

export const fetchMovieById = async (id: string) => {
  axios
    .get(`${API_URL}/movie/${id}`, options)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};
