import MarketDetail from "@exchange_s/components/d-view/d-market-detail";
import DRacingMarketDetail from "@exchange_s/components/d-view/d-racingmarket-detail";

interface MarketDetailPageProps {
  params: Promise<{ sportId: string; eventId: string }>;
}

export default async function MarketDetailPage({
  params,
}: MarketDetailPageProps) {
  const { sportId, eventId } = await params;

  // Check if sportId is 7 for racing details, otherwise show market details
  if (sportId === "7" || sportId === "4339") {
    return <DRacingMarketDetail sportId={sportId} eventId={eventId} />;
  }

  return <MarketDetail sportId={sportId} eventId={eventId} />;
}
