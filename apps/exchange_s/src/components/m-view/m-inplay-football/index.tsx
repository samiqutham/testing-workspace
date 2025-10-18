import React, { useEffect, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";
import Icon from "@workspace/ui/icons/icons";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@workspace/ui/store/store";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";

const MFootballInplay = () => {
  const [activeTab, setActiveTab] = useState("4");
  const inplaySports = useAppStore((state) => state.inplaySports);

  const [apiData, setApiData] = useState<any>();
  const [marketEvents, setMarketEvents] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mergedMap = new Map();

    inplaySports?.data?.forEach((item: any) => {
      if (item?.sportId === "7" || item?.sportId === "4339") return;

      if (!mergedMap?.has(item?.sportId)) {
        mergedMap?.set(item?.sportId, {
          sportId: item?.sportId,
          sportName: item?.sportName,
          data: [...item?.data], // make a copy of data array
        });
      } else {
        const existing = mergedMap?.get(item.sportId);
        existing?.data.push(...item.data); // merge data arrays
      }
    });

    setApiData(Array.from(mergedMap.values()));

    const priorityOrder = ["Cricket", "Soccer", "Tennis", "Horse Racing"];
    const sortedData = Array.from(mergedMap?.values())?.sort(
      (a: any, b: any) => {
        const aIndex = priorityOrder.indexOf(a?.sportName);
        const bIndex = priorityOrder.indexOf(b?.sportName);

        return aIndex - bIndex;
      }
    );
    setApiData(sortedData);

    if (sortedData?.length) {
      onChangeTab(sortedData[0]?.sportId, sortedData);
    }
    setLoading(false);
  }, [inplaySports]);

  const onChangeTab = (tab: any, dataFromEffect?: any[]) => {
    console.log(tab);
    setActiveTab(tab);
    const source = dataFromEffect || apiData;
    const filterData = source?.filter((item: any) => {
      if (item?.sportId == tab) {
        // console.log("object");
        if (item?.data) {
          const marketData = rearrangingData(item?.data);
          console.log(marketData, "marketData");
          setMarketEvents(marketData);
        }
      }
    });
    console.log(filterData);
    // setApiData(filterData);
  };
  const rearrangingData = (data: any) => {
    const uniqueSportsArray = data?.reduce((acc: any[], item: any) => {
      const existingTournament = acc?.find(
        (t: any) => t?.competitionId === item?.competition?.id
      );

      if (existingTournament) {
        existingTournament?.data?.push(item);
      } else {
        acc.push({
          competitionId: item?.competition?.id,
          competitionName: item?.competition?.name,
          data: [item],
        });
      }

      return acc;
    }, []);
    uniqueSportsArray.forEach((tournament: any) => {
      tournament.data.sort((a: any, b: any) => {
        const matchedA = a?.oddsData?.totalMatched ?? a?.totalMatched ?? 0;
        const matchedB = b?.oddsData?.totalMatched ?? b?.totalMatched ?? 0;
        return matchedB - matchedA;
      });
    });

    return uniqueSportsArray;
  };
  const sportsList = [
    { name: "In-Play", sprite: "bg-[-312px_-590px]" },
    { name: "Cricket", sprite: "bg-[-266px_-109px]" },
    { name: "Soccer", sprite: "bg-[-89px_-109px]" },
    { name: "Tennis", sprite: "bg-[-207px_-109px]" },
    { name: "Horse Racing", sprite: "bg-[-862px_-22px]" },
    { name: "Greyhound Racing", sprite: "bg-[-622px_-22px]" },
  ];

  const router = useRouter();

  const getSprite = (name: string) => {
    const found = sportsList.find((s) => s.name === name);
    return found?.sprite || "";
  };

  return (
    <div>
      <header>
        <div className="flex gap-2.5  items-center h-[32px] px-3 bg-[#071824]">
          <div className="w-[16px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-119px_-734px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"></div>
          <div className=" font-bold text-[14px] text-white overflow-hidden text-ellipsis  whitespace-nowrap capitalize w-full">
            In-Play
          </div>
        </div>
      </header>
      <div className="mt-[5px] h-full">
        <div className="h-[59px] overflow-x-auto w-full ">
          <ul className="flex bg-[#0D212E] h-[55px]">
            {loading
              ? // <-- Skeleton for tabs
                [...Array(6)].map((_, i) => (
                  <li key={i} className="flex-[1_0_auto] h-full px-2 py-2">
                    <Skeleton className="w-full h-[52px] skeleton-dark" />
                  </li>
                ))
              : apiData?.map((tab: any, index: number) => (
                  <li
                    key={index}
                    className={`flex-[1_0_auto] border-t-[2px] h-full  ${activeTab == tab?.sportId ? "border-white bg-[#314653]" : "border-transparent bg-transparent"}`}
                    onClick={() => onChangeTab(tab?.sportId)}
                  >
                    <button className="text-white w-full ">
                      <div className="h-[52px] w-full flex items-center flex-col  p-[7px_5px_5px] min-w-[60px] text-center whitespace-nowrap">
                        <div
                          className={cn(
                            "w-[17px] h-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-266px_-109px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]",
                            getSprite(tab?.sportName)
                          )}
                        >
                          <span className="bg-[#20a052] float-left ml-3 mt-[-1px] leading-[11px] rounded-[2px] w-[20px] border border-[#20a052] text-[10px]">
                            {tab?.data?.length}
                          </span>
                        </div>

                        <div className="py-[2px] text-[12px] leading-[18px] max-h-[18px] font-bold">
                          {tab?.sportName}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center h-[27px] border-b border-[#2f4553] px-[10px]">
          <div></div>
          <div className="flex justify-between items-center">
            {["1", "X", "2"].map((item) => (
              <div
                key={item}
                className="w-[53px] min-[500px]:w-[111px] text-center ml-[5px] font-bold text-[11px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {loading
          ? // <-- Skeleton for events
            [...Array(3)].map((_, tIndex) => (
              <div key={tIndex} className="border-t-[5px] border-[#2f4553] p-2">
                <Skeleton className="h-[38px] w-full mb-2 skeleton-dark" />{" "}
                {/* Tournament Header */}
                {[...Array(2)].map((_, eIndex) => (
                  <Skeleton
                    key={eIndex}
                    className="h-[60px] w-full mb-2 skeleton-dark"
                  /> // Event Row
                ))}
              </div>
            ))
          : marketEvents?.map((tournament: any, tIndex: number) => (
              <div
                key={tIndex}
                className={`${tIndex === 0 ? "" : "border-t-[5px] border-[#2f4553] "}`}
              >
                {/* Tournament */}

                <Link
                  href={`/exchange/${activeTab == "1" ? "soccer" : activeTab == "4" ? "cricket" : "tennis"}/market/competition/${tournament?.competitionId}`}
                  className="flex items-center justify-between h-[38px] px-[10px] border-b border-[#2f4553]"
                  prefetch
                >
                  <span className="text-[12px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {tournament?.competitionName}
                  </span>
                  <Icon name="rightSlide" className="h-[17px] w-[17px]" />
                </Link>

                {/* Events */}
                <div>
                  {tournament?.data?.map((event: any) => (
                    <Link
                      href={`/exchange/${event?.eventType?.name?.toLowerCase()}/market/event/${event?.event?.id}`}
                      key={event?.event?.id}
                      className={`flex items-center  min-[500px]:pr-[10px] ${event?.eventType?.id === 1 ? "" : " border-t border-[#2f4553]"}`}
                    >
                      {/* Left Side */}
                      <div className="w-full  min-w-0">
                        <div className=" mr-2">
                          <div className="flex items-center h-[60px]">
                            {/* Status */}
                            <div className="w-[42px] min-w-[42px] h-full text-[10px]">
                              <div className="w-[42px] h-[60px] px-[2px] bg-[#20a052] text-white">
                                <div className="max-w-[38px] h-full flex justify-center items-center text-center">
                                  {event?.inplay
                                    ? "In-Play"
                                    : event?.event?.openDate}
                                </div>
                              </div>
                            </div>

                            {/* Players */}

                            <div className="flex flex-col ml-[10px] min-w-0">
                              <div className="text-[11px] font-normal">
                                {event?.event?.name
                                  ?.split(" v ")
                                  ?.map((player: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                                    >
                                      <span>{player}</span>
                                    </div>
                                  ))}

                                {/* <div className="overflow-hidden text-ellipsis whitespace-nowrap mt-[2px] hidden min-[500px]:block ">
                              <span>{event.score}</span>
                            </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Odds */}
                      <div
                        className={`flex justify-start  w-[179px]  min-w-[179px] min-[500px]:min-w-[343px] scrollbar-hidden relative ${event?.status === "SUSPENDED" || event?.status === "CLOSED" ? "overflow-x-hidden" : "overflow-x-auto"}`}
                      >
                        {/* Back buttons */}
                        {[0, 2, 1]?.map((odd, idx: number) => {
                          const isDisabled = !event?.runners?.[odd];
                          return (
                            <div
                              key={`back-${idx}`}
                              className="ml-[5px]"
                            >
                              <button
                                disabled={isDisabled}
                                className={`rounded-[2px] w-[53px] h-10 text-center flex flex-col justify-center items-center ${
                                  isDisabled
                                    ? "bg-[#bde0fa] text-[#aec0cd] "
                                    : "bg-[#a6d8ff] text-[#303030]"
                                }`}
                              >
                                <span className="font-bold text-[13px]">
                                  {event?.runners?.[odd]?.ex
                                    ?.availableToBack?.[0]?.price ??
                                    (odd === 2 ? "-" : "0")}
                                </span>
                                <span className="text-[10px]">
                                  {event?.runners?.[odd]?.ex
                                    ?.availableToBack?.[0]?.size
                                    ? event.runners[odd].ex.availableToBack[0]
                                        .size
                                    : odd === 2
                                      ? "-"
                                      : "0"}
                                </span>
                              </button>

                              {event?.status === "SUSPENDED" && (
                                <div className="w-full bg-white/28 border-2 border-[#d54d4d] font-bold text-[13px] font-sans text-[#d54d4d] uppercase text-center absolute z-10 right-0 top-0 bottom-0 flex justify-center items-center">
                                  Suspended
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Lay buttons */}
                        {[0, 2, 1]?.map((odd, idx: number) => {
                          const isDisabled = !event?.runners?.[odd];
                          return (
                            <div key={`lay-${idx}`} className="ml-[5px]">
                              <button
                                disabled={isDisabled}
                                className={`rounded-[2px] w-[53px] h-10 flex flex-col justify-center items-center ${
                                  isDisabled
                                    ? "bg-[#f4e7e9] text-[#aec0cd] "
                                    : "bg-[#fac9d1] text-[#303030]"
                                }`}
                              >
                                <span className="font-bold text-[13px]">
                                  {event?.runners?.[odd]?.ex
                                    ?.availableToLay?.[0]?.price ??
                                    (odd === 2 ? "-" : "0")}
                                </span>
                                <span className="text-[10px]">
                                  {event?.runners?.[odd]?.ex
                                    ?.availableToLay?.[0]?.size
                                    ? event.runners[odd].ex.availableToLay[0]
                                        .size
                                    : odd === 2
                                      ? "-"
                                      : "0"}
                                </span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MFootballInplay;
