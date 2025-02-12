import { useQuery } from "@tanstack/react-query";
import { Header, UrlCard } from "@/components";
import { Url } from "@/types/url";
import { useUrlShortener } from "@/hooks/useUrlShortener";

const MyUrls = () => {
  const { fetchUrls } = useUrlShortener();
  const { data, isLoading, error } = useQuery<Url[]>({
    queryKey: ["myUrls"],
    queryFn: fetchUrls,
  });
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
          data?.map((url: Url) => <UrlCard key={url.id} {...url} />)
        )}
      </div>
    </div>
  );
};

export default MyUrls;
