import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { toast } from "sonner";

const fetchUrls = async () => {
  const token = Cookies.get("accessToken");
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/account/urls`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const MyUrls = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myUrls"],
    queryFn: fetchUrls,
  });
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  };
  const isEmpty = data && Array.isArray(data) && data.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-8">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error fetching URLs</div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12">
            <img src="/empty-state.svg" alt="Empty state" />
            <p className="text-gray-600 text-lg">
              No URLs found. Create your first short URL!
            </p>
          </div>
        ) : (
          data.map(
            (url: {
              id: string;
              slug: string;
              originalUrl: string;
              shortUrl: string;
            }) => (
              <motion.div
                key={url.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Card>
                  <CardContent className="pt-4 flex items-end justify-between">
                    <div>
                      <div className="font-medium">
                        {url.shortUrl ||
                          `${import.meta.env.VITE_API_URL}/${url.slug}`}
                      </div>
                      <div className="text-sm text-gray-600">
                        {url.originalUrl}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          url.shortUrl ||
                            `${import.meta.env.VITE_API_URL}/${url.slug}`
                        )
                      }
                    >
                      Copy
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default MyUrls;
