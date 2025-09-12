import { axiosInstance } from "./axios.js";

export const signUp = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completeOnboarding = async (onboardData) => {
  const response = await axiosInstance.post("/auth/onboard",onboardData);
  return response.data;
};
