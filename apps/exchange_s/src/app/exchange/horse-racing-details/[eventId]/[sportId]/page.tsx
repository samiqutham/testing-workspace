import RacingEventDetail from "@exchange_s/components/m-view/m-racing-event-detail";

export default function Page({
  params,
}: {
  params: { eventId: string; sportId: string };
}) {
  const { eventId, sportId } = params;
  return <RacingEventDetail eventId={eventId} sportId={sportId} />;
}
