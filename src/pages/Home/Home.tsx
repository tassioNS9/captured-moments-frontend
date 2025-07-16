import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Navabar } from "../../components/Navbar";

export const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  // Busca das informações de usuário
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return <Navabar userInfo={userInfo} />;
};
