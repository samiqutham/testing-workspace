"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PromotionDetail from "../components/m-view/m-promotions";

export default function PromotionPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <div className="px-[3vw] py-[11px]">
          <PromotionDetail />
        </div>
      ) : (
        <div className="px-[3vw] py-8 max-w-[1100px] mx-auto">
          <PromotionDetail />
        </div>
      )}
    </div>
  );
}
