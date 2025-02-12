import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useUser } from "./useUser";
import { AxiosError } from "axios";

type Credentials = {
  email: string;
  password: string;
};

type ErrorResponse = {
  message: {
    message: string;
  };
};

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data, variables) => {
      Cookies.set("accessToken", data.accessToken, { expires: 1 });
      setUser({
        name: variables.email,
      });
      navigate("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message?.message || "Signup failed");
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data, variables) => {
      Cookies.set("accessToken", data.accessToken, { expires: 1 });
      setUser({
        name: variables.email,
      });
      navigate("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message?.message || "Login failed");
    },
  });

  return {
    signup: (credentials: Credentials) => signupMutation.mutate(credentials),
    login: (credentials: Credentials) => loginMutation.mutate(credentials),
    isLoading: signupMutation.isPending || loginMutation.isPending,
  };
};
