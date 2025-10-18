"use client";

import React, { useEffect, useState } from "react";
import DOffers from "@workspace/ui/common/components/d-view/d-settings/d-offers";

const offers = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <>{<DOffers />}</>
      ) : (
        <>
          <DOffers />
        </>
      )}
    </>
  );
};

export default offers;
