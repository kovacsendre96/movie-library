import axios from "axios";
import Movie from "../models/Movie";

export default class MoiveService {
  baseURL = "http://localhost:8000";

  async index() {
    return axios
      .get(`${this.baseURL}/api/movie-list`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  async store(data: Movie) {
    return axios
      .post(`${this.baseURL}/api/movie-list`, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  async update(data: Movie) {
    return axios
      .put(`${this.baseURL}/api/movie-list`, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  async show(id: number) {
    return axios
      .get(`${this.baseURL}/api/movie-list/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  async destroy(id: number) {
    return axios
      .delete(`${this.baseURL}/api/movie-list/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
