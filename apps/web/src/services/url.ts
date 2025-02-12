import axios from "axios";

type ShortenUrlResponse = {
  shortUrl: string;
};

type ShortenUrlRequest = {
  originalUrl: string;
  token?: string;
};

export const urlService = {
  shortenUrl: async ({
    originalUrl,
    token,
  }: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
    const response = await axios.post<ShortenUrlResponse>(
      `${import.meta.env.VITE_API_URL}/api`,
      { originalUrl },
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    return response.data;
  },
};
