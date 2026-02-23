import axios from "axios";
import { useSessionStore, useUserStore } from "./store";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use((config) => {
  const token = useSessionStore.getState().session?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function flushQueue(error: unknown, token: string | null) {
  pendingQueue.forEach((p) => (token ? p.resolve(token) : p.reject(error)));
  pendingQueue = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error?.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    const refreshToken = useSessionStore.getState().session?.refreshToken;

    if (!refreshToken) {
      useUserStore.getState().clearUser();
      useSessionStore.getState().clearSession();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const res = await axios.post("http://localhost:3000/v1/auth/refresh", {
        refreshToken,
      });

      const { session, user } = res.data;
      useSessionStore.getState().setSession(session);
      useUserStore.getState().setUser(user);

      flushQueue(null, session.accessToken);
      original.headers.Authorization = `Bearer ${session.accessToken}`;
      return axiosInstance(original);
    } catch (refreshError) {
      flushQueue(refreshError, null);
      useUserStore.getState().clearUser();
      useSessionStore.getState().clearSession();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
