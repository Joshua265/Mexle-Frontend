import axios from "axios";
import Cookie from "universal-cookie";

const API_SERVER: string = process.env.REACT_APP_API_SERVER || "";

const cookie = new Cookie();

const webServiceProvider = {
  get: async (url: string, params?: object, token?: string) => {
    if (!token) {
      token = cookie.get("token") || "";
    }
    if (params) {
      const response = await axios.get(API_SERVER + url, {
        ...params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } else {
      const response = await axios.get(API_SERVER + url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  },
  post: async (url: string, params?: object, token?: string) => {
    console.log(process.env);
    if (!token) {
      token = cookie.get("token") || "";
    }
    if (params) {
      const response = await axios.post(
        String.prototype.concat(API_SERVER, url),
        params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } else {
      const response = await axios.post(
        String.prototype.concat(API_SERVER, url),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
