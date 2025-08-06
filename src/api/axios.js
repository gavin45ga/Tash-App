import axios from "axios";
import { baseUrl } from "../config";
import { store } from "shared/store/store";
import { setLoader, resetStore } from "shared/store/actions";

const client = axios.create({
  baseURL: `${baseUrl}/api`,
  responseType: "json",
});

client.interceptors.request.use((request) => {
  const auth = store.getState().auth;
  store.dispatch(setLoader(true));
  if (auth.token) {
    request.headers.Authorization = "Bearer " + auth.token;
  }
  return request;
});

client.interceptors.response.use(
  (response) => {
    store.dispatch(setLoader(false));
    return response;
  },
  (err) => {
    store.dispatch(setLoader(false));
    if (err.response) {
      if (err.response.status === 401 || err.response.status === "401") {
        store.dispatch(resetStore());
      }
    }
    return Promise.reject(err);
  }
);

export const postRequest = (path, data) => {
  return new Promise((resolve, reject) => {
    client
      .post(path, data, { headers: { "Content-Type": "application/json" } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getRequest = (path, params = {}) => {
  return new Promise((resolve, reject) => {
    client
      .get(path, { headers: { "Content-Type": "application/json" } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
