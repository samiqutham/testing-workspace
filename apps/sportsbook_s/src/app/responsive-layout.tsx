"use client";

import { useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import DesktopLayout from "@workspace/ui/common/layout/d-layout/index";
import MobileLayout from "@workspace/ui/common/layout/m-layout/index";
import { useAppStore } from "@workspace/ui/store/store";
import { useDisableTouchGestures } from "@workspace/ui/hooks/use-disable-touch-gestures";
import { trendingListOnetime } from "@workspace/ui/services/onetime-api.service";
import { usePathname } from "next/navigation";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";

export default function ResponsiveLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<any>(null); // start with null to avoid flicker
  const setTrendingList = useAppStore((state) => state.setTrendingList);
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const setUserBalance = useAppStore((state) => state.setUserBalance);
  const pathname = usePathname();

  useDisableTouchGestures();

  useEffect(() => {
    trendingListOnetime.getList().then((data: any) => {
      setTrendingList(data);
    });
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthUser(true);
    }
    runtimeApiService
      .userBalanceAPI({})
      .then((response) => {
        // ✅ Handle success
        setUserBalance(response?.data);
        console.log("User balance:", response?.data);
      })
      .catch((error) => {
        // ❌ Handle error
        console.error("Error fetching user balance:", error);
      });
  }, []);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    Cookies.set("isMobile", mobile.toString());

    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      setIsMobile(isMobileNow);
      Cookies.set("isMobile", isMobileNow.toString());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Wait until we know the device type
  if (isMobile === null) return null;

  return pathname === "/chat" ? (
    <>{children}</>
  ) : isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
