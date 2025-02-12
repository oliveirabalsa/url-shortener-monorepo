import axios from "axios";

type Response = {
  accessToken: string;
};

type Credentials = {
  email: string;
  password: string;
};

export const authService = {
  signup: async (credentials: Credentials): Promise<Response> => {
    const response = await axios.post<Response>(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      credentials
    );
    return response.data;
  },
  login: async (credentials: Credentials): Promise<Response> => {
    const response = await axios.post<Response>(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      credentials
    );
    return response.data;
  },
};
