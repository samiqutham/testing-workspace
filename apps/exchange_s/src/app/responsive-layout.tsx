"use client";

import { useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import DesktopLayout from "@workspace/ui/common/layout/d-layout/index";
import MobileLayout from "@workspace/ui/common/layout/m-layout/index";
import TabLayout from "@workspace/ui/common/layout/t-layout/index";
import { useAppStore } from "@workspace/ui/store/store";
import { useDisableTouchGestures } from "@workspace/ui/hooks/use-disable-touch-gestures";
import {
  allEventsListOnetime,
  trendingListOnetime,
  allSportList,
  racingEventListOnetime,
} from "@workspace/ui/services/onetime-api.service";
import { CONFIG } from "@workspace/ui/config/config";
import { usePathname } from "next/navigation";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";

export default function ResponsiveLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<any>(null); // start with null to avoid flicker
  const [isTab, setIsTab] = useState<any>(null); // start with null to avoid flicker
  const setTrendingList = useAppStore((state) => state.setTrendingList);
  const setallEventsList = useAppStore((state) => state.setallEventsList);
  const setAllSportList = useAppStore((state) => state.setAllSportList);
  const setAllRacingEvents = useAppStore((state) => state.setAllRacingEvents);
  const setInplaySports = useAppStore((state) => state.setInplaySports);
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const setUserBalance = useAppStore((state) => state.setUserBalance);
  const pathname = usePathname();

  useDisableTouchGestures();

  useEffect(() => {
    allEventsListOnetime.getList().then((data: any) => {
      setallEventsList(data);
      filterInplaySports(data);
    });

    const filterInplaySports = (record: any) => {
      let eventsList: any = [];

      Object?.entries(record).map((entry) => {
        let value: any = entry[1];
        eventsList.push(...value);
      });
      // removing greyhound and horseracing from inplay list by there ids
      let inplayRecords = eventsList?.filter(
        (item: any) =>
          item?.inplay === true &&
          item?.sportId != "7" &&
          item?.sportId != "4339"
      );

      const uniqueSportsArray = inplayRecords?.reduce((acc: any, item: any) => {
        // Check if the sport is already in the accumulator
        const existingSport = acc.find(
          (sport: any) => sport?.sportName === item?.sportName
        );
        // If the sport is not found, add it to the accumulator
        if (!existingSport) {
          acc.push({
            sportId: item?.eventType?.id,
            sportName: item?.eventType?.name,
            data: [item], // Start the 'data' array with the current item
          });
        } else {
          // If the sport is found, add the current item to its 'data' array
          existingSport.data.push(item);
        }
        return acc;
      }, []);

      setInplaySports({
        data: uniqueSportsArray,
        totalEvent: inplayRecords?.length,
      });
    };
  }, []);

  useEffect(() => {
    allSportList.getList(false, { key: CONFIG.siteKey2 }).then((data: any) => {
      setAllSportList(data);
    });
  }, []);

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
    racingEventListOnetime
      .getList(false, {
        key: CONFIG.siteKey2,
        eventTypeId: ["7", "4339"],
      })
      .then((data: any) => {
        setAllRacingEvents(data);
      });
  }, []);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const tab = window.innerWidth >= 768 && window.innerWidth < 1023;
    setIsTab(tab);
    setIsMobile(mobile);
    Cookies.set("isMobile", mobile.toString());
    Cookies.set("isTab", tab.toString());

    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      const isTabNow = window.innerWidth >= 768 && window.innerWidth < 1023;
      setIsMobile(isMobileNow);
      setIsTab(isTabNow);
      Cookies.set("isMobile", isMobileNow.toString());
      Cookies.set("isTab", isTabNow.toString());
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
  ) : isTab ? (
    <TabLayout>{children}</TabLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
