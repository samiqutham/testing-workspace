
import React from "react";

const MDefaultBrowse = React.lazy(() =>
  import(
    "@workspace/ui/common/components/m-view/m-footer-navbar/m-default-browse/index"
  ).then((mod) => ({ default: mod.MDefaultBrowse }))
);

const MCasinoBrowse = React.lazy(() =>
  import(
    "@workspace/ui/common/components/m-view/m-footer-navbar/m-casino-browse/index"
  )
);

const MSportsBrowse = React.lazy(() =>
  import(
    "@workspace/ui/common/components/m-view/m-footer-navbar/m-sportbook-browse/index"
  )
);

export function getBrowseComponent() {
  if (typeof window === "undefined") {
    return MDefaultBrowse; // safe default for SSR
  }

  const { hostname, port, origin } = window.location;

  switch (true) {
    case hostname === "localhost" && port === "3001":
      return MDefaultBrowse;
    case hostname === "localhost" && port === "3002":
      return MCasinoBrowse;
    case hostname === "localhost" && port === "3005":
      return MSportsBrowse;

    case origin.includes("stakefair.yourdesign.live"):
      return MDefaultBrowse;
    case origin.includes("stakefair-casino.yourdesign.live"):
      return MCasinoBrowse;
    case origin.includes("stakefair-sportsbook.yourdesign.live"):
      return MSportsBrowse;

    default:
      return MDefaultBrowse;
  }
}
