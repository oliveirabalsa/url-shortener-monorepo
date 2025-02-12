import React, { useState, useCallback } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { useUrlShortener } from "@/hooks/useUrlShortener";
import { Header } from "@/components";
import { urlSchema } from "@/lib/schemas";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [lastShortenedUrl, setLastShortenedUrl] = useState("");
  const { user } = useUser();
  const { shortenUrl, shortUrl, isLoading } = useUrlShortener();
  const [urlError, setUrlError] = useState("");

  const isValidUrl = useCallback((url: string) => {
    const result = urlSchema.safeParse({ url });
    if (!result.success) {
      setUrlError(result.error.errors[0].message);
      return false;
    }
    setUrlError("");
    return true;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (originalUrl === lastShortenedUrl) {
      return;
    }

    if (!isValidUrl(originalUrl)) {
      return;
    }

    shortenUrl(originalUrl);
    setLastShortenedUrl(originalUrl);
  };

  const handleReset = useCallback(() => {
    setOriginalUrl("");
    setLastShortenedUrl("");
  }, []);

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
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                value={originalUrl}
                onChange={(e) => {
                  setOriginalUrl(e.target.value);
                  if (e.target.value) {
                    isValidUrl(e.target.value);
                  } else {
                    setUrlError("");
                  }
                }}
                placeholder="Enter URL"
                disabled={isLoading}
                className={urlError ? "border-red-500" : ""}
              />
              {urlError && (
                <p className="text-red-500 text-sm mb-4">{urlError}</p>
              )}
              <div className="flex gap-2 mt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading || !originalUrl}
                >
                  {isLoading ? "Shortening..." : "Shorten URL"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={!originalUrl && !shortUrl}
                >
                  Reset
                </Button>
              </div>
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
