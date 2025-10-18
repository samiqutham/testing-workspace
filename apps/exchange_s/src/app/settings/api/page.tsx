"use client";

import React, { useEffect, useState } from "react";
import DApi from "@workspace/ui/common/components/d-view/d-settings/d-api";
// import Msecurity from "@workspace/ui/common/components/m-view/m-settings/m-security";

const api = () => {
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
        <>{<DApi />}</>
      ) : (
        <>
          <DApi />
        </>
      )}
    </>
  );
};

export default api;
