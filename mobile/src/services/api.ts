import axios, { AxiosInstance } from "axios";
import { AppError } from "../utils/AppError";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInteceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.56.1:3333",
}) as APIInstanceProps;

api.registerInteceptTokenManager = signOut => {
  const inteceptTokenManager = api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
      } else {
        return Promise.reject(error);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(inteceptTokenManager);
  };
};

export { api };
