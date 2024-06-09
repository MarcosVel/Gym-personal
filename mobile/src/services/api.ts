import axios, { AxiosError, AxiosInstance } from "axios";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "../storage/storageAuthToken";
import { AppError } from "../utils/AppError";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.0.71:3333",
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.onFailure(error);
    } else if (token) {
      prom.onSuccess(token);
    }
  });
  failedQueue = [];
};

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const responseError = error.response;

      if (responseError?.status === 401) {
        if (
          responseError.data?.message === "token.expired" ||
          responseError.data?.message === "token.invalid"
        ) {
          console.log("Token expired or invalid. Attempting to refresh token.");

          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            console.log("No refresh token available. Signing out.");
            signOut();
            return Promise.reject(error);
          }

          const originalRequestConfig = error.config;

          if (isRefreshing) {
            console.log("Already refreshing token. Adding request to queue.");
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers.Authorization = `Bearer ${token}`;
                  resolve(api(originalRequestConfig));
                },
                onFailure: (err: AxiosError) => {
                  reject(err);
                },
              });
            });
          }

          isRefreshing = true;

          try {
            const { data } = await api.post("/sessions/refresh-token", {
              refresh_token,
            });
            console.log("Token refreshed successfully.");

            await storageAuthTokenSave(data.token, data.refresh_token);

            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.token}`;

            processQueue(null, data.token);

            originalRequestConfig.headers.Authorization = `Bearer ${data.token}`;
            console.log("Retrying original request with new token.");
            return api(originalRequestConfig);
          } catch (err) {
            console.error("Error refreshing token:", err);
            processQueue(err, null);
            signOut();
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        }

        console.log(
          "Token issue not related to expiration or invalidity. Signing out."
        );
        signOut();
      }

      // error not related to token
      if (responseError && responseError.data) {
        return Promise.reject(new AppError(responseError.data.message));
      } else {
        return Promise.reject(error);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
