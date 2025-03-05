import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDI5MGEyNTczNTQ5OWJhMDIyM2VlZmMyYzlkMDhiNCIsIm5iZiI6MTc0MTExMDYwMS4xMjQsInN1YiI6IjY3YzczZDQ5ODRkYTIxMTMzZWFjOTBjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5DZnyBAnKXQIk3UkPA693pM0tlsFynffJ6yJwy5OYqw';
const API_KEY = 'cd290a25735499ba0223eefc2c9d08b4';

const api = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    accept: 'application/json',
    Authorization: BEARER_TOKEN,
  },
});

export default api;
