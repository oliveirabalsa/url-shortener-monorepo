import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const { user } = useUser();
  const token = Cookies.get("accessToken");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^https?:\/\/.+\..+/.test(originalUrl)) {
      toast.error("Invalid URL provided");
      return;
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL,
        { originalUrl },
        user ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setShortUrl(res.data.shortUrl);
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to generate URL");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Header />}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <Card className="w-full max-w-lg p-8">
          <CardTitle className="text-center text-3xl mb-6">
            URL Shortener
          </CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Enter URL"
              />
              <Button type="submit" className="w-full">
                Shorten URL
              </Button>
            </form>
            {shortUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex items-center space-x-3"
              >
                <span className="font-medium">Short URL:</span>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {shortUrl}
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Copy
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
        {!user && (
          <div className="mt-4">
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>{" "}
            to save your URLs.
          </div>
        )}
      </motion.div>
    </div>
  );
};
export default Home;
