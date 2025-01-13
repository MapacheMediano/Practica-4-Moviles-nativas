import axios from 'axios';

const API_URL = "https://api.tvmaze.com";

export const getMovies = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search/shows?q=${query}`);

    return response.data;
  } catch (error) {
    console.error("Error al buscar películas:", error.response ? error.response.data : error.message);
    throw error;
  }
}