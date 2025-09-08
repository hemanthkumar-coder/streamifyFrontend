import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnBoardPage from "./pages/OnBoardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "./lib/axios.js";
const App = () => {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: async () => {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  //     return res.data;
  //   },
  // });
  // console.log(data);
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("http://localhost:5000/api/auth/me");
      return res.data;
    },
  });

  console.log(data);

  return (
    <div className=" h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/onboard" element={<OnBoardPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/notifications" element={<NotificationsPage />}></Route>
        <Route path="chat" element={<ChatPage />}></Route>
        <Route path="/call" element={<CallPage />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
