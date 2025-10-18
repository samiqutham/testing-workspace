import { useEffect, useState } from "react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { bannersListOnetime } from "@workspace/ui/services/onetime-api.service";

export default function MBanner() {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const banners = await bannersListOnetime.getList();
        if (banners.length > 0 && banners[0].url) {
          setBannerUrl(banners[0].url);
        }
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // When still loading → show skeleton
  if (loading) {
    return (
      <div className="relative w-full min-h-[105.15px]">
        <Skeleton
          className="w-full h-full"
          style={{
            minHeight: 105,
            background: "#213843",
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[105.15px]">
      <img
        src={bannerUrl ?? "./mbanner/m-banner.jpg"}
        alt="Ball by Ball Banner"
        className="object-cover w-full"
      />
    </div>
  );
}
