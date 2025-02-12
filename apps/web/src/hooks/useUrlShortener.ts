import { useMutation } from "@tanstack/react-query";
import { urlService } from "@/services/url";
import { toast } from "sonner";
import Cookies from "js-cookie";
import axios from "axios";

export const useUrlShortener = () => {
  const token = Cookies.get("accessToken");

  const urlMutation = useMutation({
    mutationFn: (originalUrl: string) =>
      urlService.shortenUrl({
        originalUrl,
        token,
      }),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate URL");
    },
  });

  const shortenUrl = (url: string) => {
    if (!/^https?:\/\/.+\..+/.test(url)) {
      toast.error("Invalid URL provided");
      return;
    }
    urlMutation.mutate(url);
  };

  const fetchUrls = async () => {
    const token = Cookies.get("accessToken");
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/account/urls`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  };

  return {
    shortenUrl,
    shortUrl: urlMutation.data?.shortUrl,
    isLoading: urlMutation.isPending,
    reset: () => urlMutation.reset(),
    fetchUrls,
  };
};
