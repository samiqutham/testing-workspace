import MEvent from "@exchange_s/components/m-view/m-event";
import React from "react";

const EventPage = async ({
  params,
}: {
  params: Promise<{ id: string; eventId: string }>;
}) => {
  const param = await params;
  return (
    <div>
      <MEvent sportName={param.id} eventId={param.eventId} />
    </div>
  );
};

export default EventPage;
