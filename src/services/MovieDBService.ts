import axios from "axios";



export default class ApiService {
  baseURL = "https://api.themoviedb.org/3/search/movie";
  token = "02406a5eb63a0335773be986542f933e";
  
  async search(query:String, locale:String) {
    const localeString = locale === "hu"? `${locale}-HU`:`${locale}-EN`
    return axios
      .get(
        `${this.baseURL}?api_key=${this.token}&query=${query}&language=${localeString}`
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
