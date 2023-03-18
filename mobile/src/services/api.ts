import axios, { AxiosInstance } from "axios";
import { storageAuthTokenGet } from "../storage/storageAuthToken";
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
    async requestError => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }
        }

        signOut();
      }

      // error not related to token
      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(inteceptTokenManager);
  };
};

export { api };
