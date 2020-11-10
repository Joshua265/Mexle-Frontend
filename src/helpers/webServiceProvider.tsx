import axios from "axios";
const API_SERVER = "http://localhost:3001/";

const webServiceProvider = {
  get: async (url: string, params?: object) => {
    if (params) {
      const response = await axios.get(API_SERVER! + url, params);
      return response.data;
    } else {
      const response = await axios.get(API_SERVER! + url);
      return response.data;
    }
  },
  post: async (url: string, params?: object) => {
    if (params) {
      const response = await axios.post(API_SERVER! + url, params);
      return response.data;
    } else {
      const response = await axios.post(API_SERVER! + url);
      return response.data;
    }
  },
};

export default webServiceProvider;

/*
const webServiceProvider = {
  get: async (url: string, params?: string) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    if (params) {
      await xhr.send(JSON.stringify({ params }));
      return xhr.response;
    } else {
      xhr.send();
      return xhr.response;
    }
  },
  post: async (url: string, params?: string) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    if (params) {
      xhr.send(JSON.stringify({ params }));
      return xhr.response;
    } else {
      xhr.send();
      return xhr.response;
    }
  },
};

export default webServiceProvider;
*/
