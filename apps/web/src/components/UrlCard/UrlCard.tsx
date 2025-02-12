import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Url } from "@/types/url";
import { toast } from "sonner";

export const UrlCard = (url: Url) => {
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  };

  return (
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
              Short URL:{" "}
              <a
                href={
                  url.shortUrl || `${import.meta.env.VITE_API_URL}/${url.slug}`
                }
                target="_blank"
                className="underline"
              >
                {url.shortUrl || `${import.meta.env.VITE_API_URL}/${url.slug}`}
              </a>
            </div>
            <div className="text-sm text-gray-600">
              Original URL:{" "}
              <a href={url.originalUrl} target="_blank" className="underline">
                {url.originalUrl}
              </a>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleCopy(
                url.shortUrl || `${import.meta.env.VITE_API_URL}/${url.slug}`
              )
            }
          >
            Copy
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
