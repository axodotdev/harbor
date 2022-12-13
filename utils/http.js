import axios from "axios";

export const http = {
  get: async (url) => {
    const { data } = await axios.get(url, {
      headers: useRequestHeaders(["cookie"]),
    });
    return data;
  },
  post: async (url, body) => {
    const { data } = await axios.post(url, body);
    return data;
  },

  put: async (url, body) => {
    const { data } = await axios.put(url, body);
    return data;
  },
};
