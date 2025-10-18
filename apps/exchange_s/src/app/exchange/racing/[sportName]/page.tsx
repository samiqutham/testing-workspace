import MGreyhoundRacing from "@exchange_s/components/m-view/m-greyhound-racing";
import React from "react";

const RacingRoute = async ({
  params,
}: {
  params: Promise<{ sportName: string }>;
}) => {
  const param = await params;
  return <MGreyhoundRacing sportName={param.sportName} />;
};

export default RacingRoute;
