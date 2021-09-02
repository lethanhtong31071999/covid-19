import axiosClient from "./axiosClient";

const countriesApi = {
  getAll() {
    const url = "/countries";
    return axiosClient.get(url);
  },

  getReportByCountry(countryName) {
    const url = `/dayone/country/${countryName}`;
    return axiosClient.get(url);
  },
};

export default countriesApi;
