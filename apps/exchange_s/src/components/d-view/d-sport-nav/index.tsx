"use client";
import React, { useEffect, useState } from "react";
import { DSettingMenu } from "../d-settings-menu";
import { useAppStore } from "@workspace/ui/store/store";
import { useSidebar } from "@workspace/ui/components/sidebar";

export type MenuItem = { id: string; name: string };

function DSportNav({
  onSelect,
}: {
  onSelect: (id: string) => void;
  active?: string;
}) {
  const allSportList = useAppStore((s) => s.AllSportList);
  const sideBarTabs = useAppStore((s) => s.sideBarTabs);
  const setSideBarTabs = useAppStore((s) => s.setSideBarTabs);
  const [active, setActive] = useState<string | undefined>(undefined);

  const { setOpen, setOpenTab, isTablet } = useSidebar();

  useEffect(() => {
    setActive(sideBarTabs);
  }, [sideBarTabs]);

  const sports: MenuItem[] = Array.isArray(allSportList?.eventTypes)
    ? allSportList.eventTypes.map((s: any, i: number) => {
        const id = String(
          s?.eventType?.id ??
            s?.eventType?.lSportId ??
            s?.lSportId ??
            s?.id ??
            i
        );
        const name = s?.eventType?.name ?? s?.name ?? `Sport ${i}`;
        return { id, name };
      })
    : [];

  const menuItems: MenuItem[] = [
    { id: "home", name: "Home" },
    { id: "inplay", name: "In-Play" },
    ...sports,
  ];

  const handleClick = (item: MenuItem) => {
    const id = String(item.id);
    const sportName = item.name;

    // Check if this is a sport that should open the sidebar with submenu
    if (
      [
        "Cricket",
        "Soccer",
        "Tennis",
        "Horse Racing",
        "Greyhound Racing",
      ].includes(sportName)
    ) {
      // Open sidebar (same logic as in ExchangeOpenNavMain)
      isTablet ? setOpenTab(true) : setOpen(true);

      setSideBarTabs(id);
      localStorage.setItem("sportName", sportName);
      localStorage.setItem("sportId", id);
    } else {
      setSideBarTabs(id);
      localStorage.setItem("itemId", id);
    }
    onSelect?.(id);
  };
  return (
    <nav className="text-white sticky top-0 z-30">
      <div className="flex items-center h-[30px] font-[Arial,Helvetica,sans-serif]">
        <div className="flex w-full overflow-x-auto no-scrollbar bg-[#071824]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`px-[10px] m-0 py-[6px] cursor-pointer first:border-l border-r-[1px] border-[#303030] text-[12px] font-semibold whitespace-nowrap bg-[#071824] hover:bg-[hsla(0,0%,96.5%,.1)]
                ${String(active) === String(item.id) ? "bg-[hsla(0,0%,96.5%,.15)]" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="min-w-[215px] min-[1149px]:min-w-[266px] bg-[#071824]">
          <div className="ml-auto cursor-pointer text-[12px] bg-[#071824] hover:[hsla(0,0%,96.5%,.1)] whitespace-nowrap w-fit">
            <DSettingMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DSportNav;
