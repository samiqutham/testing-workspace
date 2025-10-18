import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@workspace/ui/icons/icons";
const TABS = [
  { tabName: "Live & Upcoming" },
  { tabName: "Outrights" },
  { tabName: "All Tennis" },
];
const MMatchDetails = () => {
  const [active, setActive] = useState<string>("Live & Upcoming");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [winnerEnabled, setWinnerEnabled] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const winnerBtnRef = useRef<HTMLButtonElement | null>(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<
    "Winner" | "Total" | "Overtime"
  >("Winner");

  const MENU_ITEMS: Array<"Total" | "Overtime" | "Winner"> = [
    "Total",
    "Overtime",
    "Winner",
  ];
  // keep refs in sync
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, TABS.length);
  }, []);

  // center active tab
  useEffect(() => {
    const centerActive = () => {
      const idx = TABS.findIndex((t) => t.tabName === active);
      if (idx === -1) return;
      const tab = tabRefs.current[idx];
      const container = containerRef.current;
      if (!tab || !container) return;

      const cRect = container.getBoundingClientRect();
      const tRect = tab.getBoundingClientRect();
      const offset =
        tRect.left - cRect.left - cRect.width / 2 + tRect.width / 2;

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: "smooth",
      });
    };

    centerActive();

    const ro = new ResizeObserver(centerActive);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [active]);

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

  const ids = useMemo(
    () =>
      TABS.map(
        (t, i) => `tab-${t.tabName.replace(/\s+/g, "-").toLowerCase()}-${i}`
      ),
    []
  );

  const handlePick = (label: (typeof MENU_ITEMS)[number]) => {
    setSelectedMarket(label);
    setHasSelection(true);
    setMenuOpen(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* top section */}
      <div className="inline-flex w-full items-center justify-start">
        <div className="mr-[calc(.25rem*3)]">
          <div className="inline-flex relative bg-[#0E212E] hover:bg-[#071824] cursor-pointer items-center gap-2 justify-center font-semibold whitespace-nowrap  transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-700 text-white hover:bg-grey-900 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.9375rem] px-[1.25rem] shadow-none rounded-(--ds-radius-md,0.25rem)">
            <Icon name="backArrow" className="h-[14px] w-[14px] fill-white " />
          </div>
        </div>
        <div className="p-[16px_20px] flex justify-center items-center max-h-[44px] bg-[rgb(15,33,46)] rounded">
          <div className="inline-flex mx-2  relative text-white items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent  hover:bg-transparent  focus-visible:outline-hidden text-sm leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white">
            US Open Men Singles
          </div>
        </div>
      </div>
      {/* top section */}

      {/* tab Section */}
      <div className="mt-[calc(.25rem*6)]">
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden leading-[133%] tabs-scrollbar"
          role="tablist"
          aria-label="MBet Tabs"
        >
          <div className="flex w-fit bg-[#0F212E] rounded-[3rem] p-[5px] pl-[4px] pr-[6px] flex-shrink-0 min-w-max h-14 ">
            {TABS.map((tab, index) => {
              const activeState = active === tab.tabName;
              return (
                <button
                  id={ids[index]}
                  key={tab.tabName}
                  ref={(el: HTMLButtonElement | null) => {
                    tabRefs.current[index] = el;
                  }}
                  role="tab"
                  aria-selected={activeState}
                  aria-controls={`${ids[index]}-panel`}
                  onClick={() => setActive(tab.tabName)}
                  className={[
                    "inline-flex cursor-pointer relative items-center gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98]",
                    "px-5 py-[15px] text-sm leading-none rounded-full pt-[2px] pb-[2px] mt-[1px] mb-[1px] hover:bg-[#304553] hover:text-white",
                    activeState ? "!bg-[#2F4553] !text-white" : "text-white",
                    index > 0 ? "ml-[6px]" : "first:ml-[2px]",
                    tab.tabName === "Starting Soon"
                      ? "!text-[#fff] !opacity-100"
                      : "",
                  ].join(" ")}
                >
                  <span className="relative">{tab.tabName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* tab Section */}

      <div className="flex items-center justify-between relative   mt-[26px]">
        <div className="flex items-center gap-2 max-[320px]:max-w-[49%] max-w-[calc(100%-158px)]">
          <Icon name={"tennis"} className="w-[16px] h-[16px]" fill="#b1bad3" />

          <span className="text-[1.125rem] font-[600] truncate">
            US Open Men Singles
          </span>
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
                "inline-flex items-center gap-2 h-[40px]   px-4 rounded font-semibold transition text-white text-[14px]",
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
                fill="#B1BAD3"
              />
            </button>

            {menuOpen && winnerEnabled && (
              <div
                id="winner-menu"
                ref={menuRef}
                role="menu"
                className="absolute left-[50%] translate-x-[-50%] mt-[10px] w-[83.66px] rounded bg-white shadow-lg py-1 text-[#2F4553] z-20"
              >
                {/* caret */}
                <span className="absolute -top-[6px] left-[50%] translate-x-[-50%]  w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-b-white border-l-transparent border-r-transparent" />
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
    </div>
  );
};

export default MMatchDetails;
