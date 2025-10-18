"use client";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";
import { useRef, useState, useEffect } from "react";

export default function MarketTabs({
  tabList,
  selectedMarket,
  setSelectedMarket,
  loading,
}: {
  tabList: { id: string; label: string; time: string }[];
  selectedMarket: string;
  setSelectedMarket: (id: string) => void;
  loading: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(
    tabList.findIndex((t) => t.id === selectedMarket) || 0
  );

  useEffect(() => {
    setSelectedMarket(tabList[0]?.id);
  }, [tabList]);

  const goTo = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= tabList.length) return;
    setCurrentIndex(newIndex);
    setSelectedMarket(tabList[newIndex].id);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: newIndex * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Jab bhi selectedMarket change ho → us slide par move karo
  useEffect(() => {
    const index = tabList.findIndex((t) => t.id === selectedMarket);
    if (index !== -1 && scrollRef.current) {
      setCurrentIndex(index);
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [selectedMarket, tabList]);

  return (
    <div className="relative bg-[#0E212E] h-[42] border-t border-[#0E212E]">
      {/* Left Arrow */}
      <button
        onClick={() => goTo(currentIndex - 1)}
        disabled={currentIndex === 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#0E212E] shadow-md rounded-full disabled:opacity-40"
      >
        <Icon name="leftSlide" className="h-[20px] w-[20px]" />
      </button>

      {/* Carousel Container */}
      <div ref={scrollRef} className="overflow-hidden w-full">
        <ul
          className="flex transition-transform duration-500 ease-in-out"
          style={{ width: `${tabList.length * 100}%` }}
        >
          {loading ? (
            <div className="flex pl-14 pt-1 flex-col gap-2">
              <Skeleton
                className="h-3 w-[86px]"
                style={{ background: "#213843" }}
              />
              <Skeleton
                className="h-3 w-[120px]"
                style={{ background: "#213843" }}
              />
            </div>
          ) : (
            tabList?.map((t, idx) => {
              return (
                <li
                  key={t.id}
                  className="w-full flex justify-center items-center"
                >
                  <button
                    id={`market-tab-${t.id}`}
                    onClick={() => goTo(idx)}
                    className={cn(
                      "text-sm flex flex-col justify-center text-left h-[42] font-semibold transition-all w-3/4"
                    )}
                  >
                    <span>{t?.time}</span>
                    <span className="text-xs">{t?.label}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => goTo(currentIndex + 1)}
        disabled={currentIndex === tabList.length - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#0E212E] shadow-md rounded-full disabled:opacity-40"
      >
        <Icon name="rightSlide" className="h-[20px] w-[20px]" />
      </button>
    </div>
  );
}
