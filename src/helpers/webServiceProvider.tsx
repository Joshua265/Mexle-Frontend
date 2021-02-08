import axios from "axios";
import Cookie from "universal-cookie";

const API_SERVER: string = process.env.REACT_APP_API_SERVER || "";

const cookie = new Cookie();

const serialize = (obj: object) => {
  var str: string[] = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(`${p}=${obj[p]}`);
    }
  return str.join("&");
};

const webServiceProvider = {
  get: async (url: string, params?: object, token?: string) => {
    if (!token) {
      token = cookie.get("token") || "";
    }
    if (params) {
      const response = await axios.get(
        `${API_SERVER}${url}?${serialize(params)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(API_SERVER + url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  },
  post: async (url: string, params?: object, token?: string) => {
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
