import axios from "axios";
import config from "./config.json";
import { errorMessage } from "../utils/messages";

export const http = axios.create({ baseURL: config.baseURL });
http.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(null, (error) => {
   const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

   !expectedErrors && errorMessage("مشکلی از سمت سرور رخ داده");
   return Promise.reject(error);
});

export const getErrorType = (error) => {
   if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
         error: true,
         errorType: "response",
         errorBody: error.response,
      };
   } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return { error: true, errorType: "request", errorBody: error.request };
   } else {
      // Something happened in setting up the request that triggered an Error
      return { error: true, errorBody: error.message };
   }
};

export const showErrorMessage = (result) => {
   switch (result.errorType) {
      case "request":
         errorMessage("دسترسی به اینترنت را چک کنید");
         break;
      case "response":
         result.errorBody.data.message ?
            errorMessage(result.errorBody.data.message)
            :
            errorMessage(result.errorBody.data);
         break;
      default:
         errorMessage(result.errorBody);
         break;
   }
};
