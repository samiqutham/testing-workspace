"use client";
import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";

const MLiveEvents = () => {
  type EventItem = { label: string; count?: number; live?: boolean };

  const ITEMS: EventItem[] = [
    { label: "Soccer", count: 22 },
    { label: "Tennis", count: 17 },
    { label: "Rugby", count: 1 },
    { label: "Cricket", count: 3 },
    { label: "Table Tennis", count: 4 },
    { label: "Soccer", count: 22 },
    { label: "Tennis", count: 17 },
    { label: "Rugby", count: 1 },
    { label: "Cricket", count: 3 },
    { label: "Table Tennis", count: 4 },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  // Winner enable/disable (via the equal button)
  const [winnerEnabled, setWinnerEnabled] = useState(true);

  // Dropdown state/refs
  const [menuOpen, setMenuOpen] = useState(false);
  const winnerBtnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Selected market & "has selection" for blue state
  const [selectedMarket, setSelectedMarket] = useState<
    "Winner" | "Total" | "Overtime"
  >("Winner");
  const [hasSelection, setHasSelection] = useState(false); // turns pill blue after first choose

  // Tabs rail centering
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, ITEMS.length);
  }, []);
  useEffect(() => {
    const center = () => {
      const el = btnRefs.current[activeIndex];
      const wrap = containerRef.current;
      if (!el || !wrap) return;
      const w = wrap.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      const offset = b.left - w.left - w.width / 2 + b.width / 2;
      wrap.scrollTo({ left: wrap.scrollLeft + offset, behavior: "smooth" });
    };
    center();
    const ro = new ResizeObserver(center);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [activeIndex]);

  // Close menu on outside click / Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || winnerBtnRef.current?.contains(t))
        return;
      setMenuOpen(false);
    };
    const onEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

  const ids = useMemo(() => ITEMS.map((_, n) => `event-tab-${n}`), []);

  // pill color when a selection has been made
  const pillBlue = hasSelection;

  // dropdown items
  const MENU_ITEMS: Array<"Total" | "Overtime" | "Winner"> = [
    "Total",
    "Overtime",
    "Winner",
  ];

  const handlePick = (label: (typeof MENU_ITEMS)[number]) => {
    setSelectedMarket(label);
    setHasSelection(true);
    setMenuOpen(false);
  };
  return (
    <div className="w-full pt-[30.5px]">
      {/* Header */}
      <div className="flex items-center justify-between relative bottom-[0.5px] mb-[14px]">
        <div className="flex items-center gap-2">
          <Icon
            name={"startPlaying"}
            className="w-[16px] h-[16px]"
            fill="#b1bad3"
          />
          <span className="text-[1.125rem] font-[600]">Live Events</span>
        </div>

        <div className="flex items-center ">
          {/* dots when enabled, equal when disabled */}
          <button
            type="button"
            aria-label={winnerEnabled ? "Disable Winner" : "Enable Winner"}
            aria-pressed={!winnerEnabled}
            onClick={() => {
              setWinnerEnabled((v) => {
                const next = !v;
                if (!next) setMenuOpen(false); // close menu if disabling
                return next;
              });
            }}
            className="inline-flex items-center justify-center p-[0px_20px] rounded-[6px]  transition"
          >
            <Icon
              name={winnerEnabled ? "dots" : "equal"}
              className="w-[14px] h-[14px]"
              fill="#b1bad3"
            />{" "}
          </button>

          {/* Winner pill + dropdown */}
          <div className="relative">
            <button
              ref={winnerBtnRef}
              type="button"
              disabled={!winnerEnabled}
              onClick={() => winnerEnabled && setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="winner-menu"
              className={[
                "inline-flex items-center gap-2 h-[40px]  px-4 rounded font-semibold transition text-white text-[14px]",
                "bg-[#0F212E]",
                !winnerEnabled && "opacity-50 cursor-not-allowed",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>{selectedMarket}</span>
              <Icon
                name="ChevronDown"
                className={`w-[14px] h-[14px] ${menuOpen ? "rotate-180" : ""}`}
                fill="#b1bad3"
              />
            </button>

            {menuOpen && winnerEnabled && (
              <div
                id="winner-menu"
                ref={menuRef}
                role="menu"
                className="absolute left-[50%] translate-x-[-50%] mt-[12px] w-[83.67px] h-[122px] rounded-[4px] bg-white shadow-lg py-1 text-[#2F4553] top-[38px] z-20"
              >
                {/* caret */}
                <span className="absolute -top-[5.5px] left-[50%] translate-x-[-50%]  w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-b-white border-l-transparent border-r-transparent" />
                {MENU_ITEMS.map((label) => {
                  const isActive = selectedMarket === label;
                  return (
                    <button
                      key={label}
                      role="menuitem"
                      onClick={() => handlePick(label)}
                      className={[
                        "inline-flex items-center gap-2 max-h-[38px] text-[14px] font-semibold w-full text-left p-3 ",
                        isActive && "text-[#1475E1]",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs rail */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden bg-[#06222E] tabs-scrollbar rounded-[6px]"
        role="tablist"
        aria-label="Events Menu"
      >
        <ul className="flex items-center px-[8px] pt-[32px] pb-[18px] h-[98px] min-w-max">
          {ITEMS.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={ids[index]}
                id={ids[index]}
                onClick={() => setActiveIndex(index)}
                className="inline-flex relative justify-center items-center w-[66px] h-[48px] rounded-[0.25rem] font-semibold transition active:scale-[0.98] bg-transparent text-[#B1BAD3] text-xs leading-none"
              >
                {isActive && (
                  <span className="absolute bottom-[74px] h-[12px] w-[12px] rounded-[4px] bg-[#1475E1] pointer-events-none" />
                )}
                <div className="relative flex flex-col items-center justify-center gap-[8px] h-full">
                  <Icon
                    name="soccer"
                    className={`w-[28px] h-[28px] ${
                      isActive ? "text-white" : ""
                    }`}
                  />
                  <span
                    className={`truncate max-w-[6ch] ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-[39px] left-[22px] pointer-events-none inline-flex items-center justify-center h-4 min-w-[16px] rounded-full text-[12px] px-[8px] ${
                      isActive
                        ? "bg-[#4391E7] text-[#04172D]"
                        : "bg-[#001824] text-[#B1BAD3]"
                    }`}
                  >
                    {item.count}
                  </span>
                </div>
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MLiveEvents;
