import axios from "axios";
import Movie from "../models/Movie";
import RatingMovie from "../models/RatingMovie";
import { toast } from "react-toastify";
import i18n from "i18next";



export default class MovieService {
  baseURL = import.meta.env.VITE_BASE_URL;
  async index() {
    return axios
      .get(`${this.baseURL}/api/movie-list`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  async store(data: RatingMovie) {
    return axios
      .post(`${this.baseURL}/api/movie-list`, data)
      .then((response) => {
        toast.success(i18n.t("Movie added to the list"), {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          autoClose: 1000,
        });
        return response.data;
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          console.log(error);
          toast.error(i18n.t("This movie is already in your list"), {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            autoClose: 1000,
          });
        } else {
          console.log(error);
          toast.error(i18n.t("Record failed"), {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            autoClose: 1000,
          });
        }
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
