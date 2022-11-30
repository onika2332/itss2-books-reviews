import axios from "axios";
import { API_PATHS } from "../../config/api-paths";

export const test = (params) => {
  const url = API_PATHS.login;
  axios
    .get(url, { params })
    .then((response) => {
      console.log(
        "😜😜😜 ~ file: service.js ~ line 18 ~ .then ~ response",
        response
      );
      // return Promise.resolve(response);
    })
    .catch((error) =>
      // Promise.reject(error.message)
      console.log(error)
    );
};

export const test1 = (params) => {
  const url = API_PATHS.login;
  return axios.post(url, params);
  // .then((res) => {
  //   console.log(res);
  // });
};
