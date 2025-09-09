import { axiosInstance } from "./axios.js";

export const signUp = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
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
