"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import moment from "moment";
import { useAppStore } from "@workspace/ui/store/store";
import Icon from "@workspace/ui/icons/icons";

type Odd = {
  value: string;
  amount: string;
  available: boolean;
};

type Odds = {
  back: Odd[];
  lay: Odd[];
};

type Match = {
  id: number;
  time: string;
  players: string[];
  odds: Odds;
  suspended: boolean;
};

type Section = {
  date: string;
  matches: Match[];
};

type CompetitionData = {
  tournament: { name: string; icon: string };
  sections: Section[];
};

interface MCompetitionProps {
  id: string;
  sportName: string;
}

const MCompetition: React.FC<MCompetitionProps> = ({ id, sportName }) => {
  const setEventName = useAppStore((state) => state.setEventName);

  const [apiData, setApiData] = useState<any>();
  const [tournmentName, setTournmentName] = useState<any>();
  const [sportId, setSportId] = useState<any>();
  const [competitions, setCompetitions] = useState<any>();
  const allSportsList = useAppStore((state) => state.AllSportList);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    runtimeApiService.competetionMarketList(id).then((data) => {
      const rearrangeData = rearrangingData(data?.data);
      setApiData(rearrangeData);
      if (rearrangeData?.length > 0) {
        setTournmentName(rearrangeData[0]?.data[0]?.complete?.name);
        setSportId(rearrangeData[0]?.data[0]?.eventType?.name);
      }
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!allSportsList?.competitions) return;

    const filtered = allSportsList.competitions.filter(
      (comp: any) =>
        comp?.eventType?.name?.toLowerCase() === sportName?.toLowerCase()
    );

    setCompetitions(filtered || []);
  }, [allSportsList, sportName]);

  const sportsList = [
    { name: "In-Play", sprite: "bg-[-312px_-590px]" },
    { name: "Cricket", sprite: "bg-[-266px_-109px]" },
    { name: "Soccer", sprite: "bg-[-89px_-109px]" },
    { name: "Tennis", sprite: "bg-[-207px_-109px]" },
    { name: "Horse Racing", sprite: "bg-[-862px_-22px]" },
    { name: "Greyhound Racing", sprite: "bg-[-622px_-22px]" },
  ];

  const rearrangingData = (data: any) => {
    const uniqueSportsArray = data?.reduce((acc: any, item: any) => {
      // Extract date from eventTime
      const eventDate = item?.event?.openDate.split("T")[0];

      // Check if the date is already in the accumulator
      const existingDate = acc.find(
        (group: any) => group.eventDate === eventDate
      );

      if (!existingDate) {
        // If the date is not found, add it to the accumulator
        acc.push({
          eventDate,
          data: [item],
        });
      } else {
        // If the date is found, add the current item to its 'data' array
        existingDate.data.push(item);
      }

      return acc;
    }, []);

    return uniqueSportsArray;
  };

  const getSprite = (name: string) => {
    const found = sportsList.find((s) => s.name === name);
    return found?.sprite || "";
  };

  const renderOddsButton = (odd: any, type: "back" | "lay") => {
    const baseClasses =
      "text-[#303030] rounded-[2px] align-top overflow-hidden w-[53px] h-10 border-none p-0 m-0";
    const bgClass =
      type === "back"
        ? odd
          ? "bg-[#a6d8ff]"
          : "bg-[#e7eff5] text-[#aec0cd]"
        : odd
          ? "bg-[#fac9d1]"
          : "bg-[#f4e7e9] text-[#cabfc1]";

    return (
      <button className={`${baseClasses} ${bgClass}`}>
        <span className="font-bold text-[13px] leading-[15px] block">
          {odd ? odd?.price : "-"}
        </span>
        <span className="text-[10px] block leading-[11px] w-full">
          {odd ? odd?.size : "-"}
        </span>
      </button>
    );
  };

  const router = useRouter();
  const navigateToMarket = (sport: string, id: string, eventName: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("eventName", eventName);
    }

    setEventName(eventName);
    router.push(`/exchange/${sport}/market/event/${id}`);
  };

  const renderMatch = (market: any) => {
    // const [dayLabel, timeLabel] = match.time.split("\n");

    return (
      <div
        key={market?.event?.id}
        className="flex items-center w-full bg-[#213743] mb-px"
      >
        {/* Match Info */}
        <div
          className="w-full min-w-0"
          onClick={() =>
            navigateToMarket(sportName, market?.event?.id, market?.event.name)
          }
        >
          <div className="flex justify-between items-center mr-2">
            <div className="w-full min-w-0">
              <section className="font-arial">
                <div className="flex items-center h-[60px] bg-[#213743]">
                  {/* Time/Status Column */}
                  {!apiData ? (
                    <Skeleton
                      className="w-2xs h-5"
                      style={{
                        background: "#213843",
                      }}
                    />
                  ) : (
                    <div className="flex w-[42px] min-w-[42px] h-full text-[10px] leading-[13px]">
                      <div className="inline-table h-full w-[42px]">
                        <div className="table-cell text-center align-middle overflow-hidden text-ellipsis max-w-[38px] px-[2px] text-white bg-[#3b4d57] h-[60px]">
                          <span className="text-[10px]">
                            {market?.inPlay ? (
                              "In-Play"
                            ) : (
                              <>
                                {moment(market?.event?.openDate).format("ddd")}
                                <br />
                                {moment(market?.event?.openDate).format("h:mm")}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Players */}

                  <div className="flex flex-col ml-[10px] min-w-0 flex-grow">
                    <div className="text-white text-[11px] leading-[13px]">
                      <div className="text-[11px] leading-[17px]">
                        {market?.event?.name
                          ?.split(" v ")
                          ?.map((player: string, idx: number) => (
                            <div
                              key={idx}
                              className="whitespace-nowrap overflow-hidden text-ellipsis relative"
                            >
                              {player}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Betting Buttons */}
        <div
          className={`flex flex-shrink-0 justify-start relative w-[179px] ${
            market.status == "SUSPENDED" || market.status == "CLOSED"
              ? "min-[500px]:w-auto overflow-hidden min-[500px]:mr-[10px]"
              : "overflow-x-scroll min-[500px]:w-auto min-[500px]:mr-[10px] min-[500px]:overflow-x-visible [&::-webkit-scrollbar]:!hidden [-ms-overflow-style]:!none [scrollbar-width]:!none"
          }`}
        >
          {/* Back buttons */}
          {[0, 2, 1].map((runnerIndex: number, idx: number) => (
            <div
              key={`back-${runnerIndex}-${idx}`}
              className={idx === 0 ? "" : "ml-[5px]"}
            >
              {renderOddsButton(
                market.runners[runnerIndex]?.ex.availableToBack[0],
                "back"
              )}
            </div>
          ))}

          {/* Lay buttons */}
          {[0, 2, 1]?.map((runnerIndex: number, idx: number) => (
            <div key={`lay-${runnerIndex}-${idx}`} className="ml-[5px]">
              {renderOddsButton(
                market.runners[runnerIndex]?.ex.availableToLay[0],
                "lay"
              )}
            </div>
          ))}

          {/* SUSPENDED overlay */}
          {(market?.status == "SUSPENDED" || market?.status == "CLOSED") && (
            <div
              role="status"
              aria-label="Market suspended"
              onWheel={(e) => e.preventDefault()}
              className="absolute inset-0 z-10 flex items-center justify-center text-center w-full bg-white/75 border-[2px] border-[#d54d4d] text-[#d54d4d] uppercase font-bold font-sans text-[13px] pointer-events-auto touch-none select-none"
            >
              SUSPENDED
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Tournament Header */}
      <div className="h-8 bg-[#071824] flex items-center px-3">
        {!apiData ? (
          <div className="flex gap-2.5 items-center">
            <Skeleton
              className="w-5 h-5 rounded-full"
              style={{
                background: "#213843",
              }}
            />
            <Skeleton
              className="w-2xs h-5"
              style={{
                background: "#213843",
              }}
            />
          </div>
        ) : (
          <div className="flex items-center flex-grow overflow-hidden">
            <div className="w-4 h-4 mr-[10px] flex-shrink-0">
              <span className="relative">
                <img
                  src={"/transparent-login.gif"}
                  className={cn(
                    "h-[17px] min-w-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]",
                    getSprite(sportId)
                  )}
                />
              </span>
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
              <h1 className="text-white text-[14px] font-bold truncate mb-0">
                {tournmentName}
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Market Header with 1, X, 2 - Responsive */}
      <div className="h-[27px] px-[10px] bg-[#213743] border-b border-[#213743] flex items-center justify-between">
        <div className="text-white text-[11px] font-bold truncate" />
        <div className="flex items-center justify-between">
          <div className="text-white text-[11px] font-bold w-[53px] text-center ml-[5px] min-[500px]:w-[111px]">
            1
          </div>
          <div className="text-white text-[11px] font-bold w-[53px] text-center ml-[5px] min-[500px]:w-[111px]">
            X
          </div>
          <div className="text-white text-[11px] font-bold w-[53px] text-center ml-[5px] min-[500px]:w-[111px]">
            2
          </div>
        </div>
      </div>

      {/* Sections */}
      {loading ? (
        [...Array(3)].map((_, idx) => (
          <React.Fragment key={`skeleton-${idx}`}>
            {/* Date Section Skeleton */}
            <Skeleton
              className="w-2xs h-5 mb-2"
              style={{ background: "#213843" }}
            />

            {/* Matches Skeleton */}
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center w-full bg-[#213743] mb-px h-[60px]"
              >
                <Skeleton
                  className="w-[42px] h-full"
                  style={{ background: "#213843" }}
                />
                <div className="flex flex-col ml-[10px] flex-grow">
                  <Skeleton
                    className="h-[13px] w-[120px] mb-[4px]"
                    style={{ background: "#213843" }}
                  />
                  <Skeleton
                    className="h-[13px] w-[80px]"
                    style={{ background: "#213843" }}
                  />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))
      ) : apiData?.length > 0 ? (
        apiData?.map((item: any, idx: number) => {
          const eventDate = moment(item?.eventDate).isSame(moment(), "day")
            ? "Today"
            : moment(item?.eventDate).isSame(moment().add(1, "day"), "day")
              ? "Tomorrow"
              : moment(item?.eventDate).format("ddd, DD MMM");
          return (
            <React.Fragment key={`section-${idx}`}>
              {/* Date Section */}
              <div className="h-8 bg-[#071824] flex items-center px-3">
                <div className="flex flex-col flex-grow overflow-hidden">
                  <h2 className="text-white text-[14px] font-bold leading-4 truncate mb-0">
                    {eventDate}
                  </h2>
                </div>
              </div>

              {/* Matches */}
              {item?.data?.map((m: any) => renderMatch(m))}
            </React.Fragment>
          );
        })
      ) : (
        <div className="text-white h-[128] flex justify-center items-center bg-[#213743]">
          There are no events available
        </div>
      )}
      <>
        {/* Date Section */}
        {!competitions ? (
          <Skeleton
            className="w-2xs h-5"
            style={{
              background: "#213843",
            }}
          />
        ) : (
          competitions?.length > 0 && (
            <div className="h-8 bg-[#071824] flex items-center px-3">
              <div className="flex flex-col flex-grow overflow-hidden">
                <h2 className="text-white text-[14px] font-bold leading-4 truncate mb-0">
                  Competetions
                </h2>
              </div>
            </div>
          )
        )}

        {/* Matches */}
        {/* {!competitions ? (
          [...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-full !rounded-none mb-[2px]"
              style={{ height: 40, background: "#213843" }}
            />
          ))
        ) : (
          <div className="w-full">
            {competitions?.map(
              (comp: any, index: number) =>
                comp?.competition?.id !== id && (
                  <Link
                    key={comp?.competition?.id}
                    href={`/exchange/${sportName}/market/competition/${comp?.competition?.id}`}
                  >
                    <div
                      className={`flex items-center justify-between w-full bg-[#213743] cursor-pointer hover:bg-[#1C313D] ${
                        index !== competitions.length - 1
                          ? "border-b border-[#304553]"
                          : ""
                      }`}
                    >
                      <div className="text-[12px] leading-[16px] py-[10.5px] px-[10px]">
                        {comp.competition.name}
                      </div>
                      <Icon name="rightSlide" className="h-[17px] w-[17px]" />
                    </div>
                  </Link>
                )
            )}
          </div>
        )} */}
        {/* Matches */}
        {loading ? (
          [...Array(competitions?.length || 6)].map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-between w-full bg-[#213743] ${
                i !== (competitions?.length || 6) - 1
                  ? "border-b border-[#304553]"
                  : ""
              }`}
            >
              {/* Left side skeleton (competition name placeholder) */}
              <Skeleton
                className="h-[16px] w-[120px] ml-[10px] my-[10px] !rounded-sm"
                style={{ background: "#304553" }}
              />

              {/* Right side skeleton (icon placeholder) */}
              <Skeleton
                className="h-[17px] w-[17px] mr-[10px] !rounded-full"
                style={{ background: "#304553" }}
              />
            </div>
          ))
        ) : (
          <div className="w-full">
            {competitions?.map(
              (comp: any, index: number) =>
                comp?.competition?.id !== id && (
                  <Link
                    prefetch={true}
                    key={comp?.competition?.id}
                    href={`/exchange/${sportName}/market/competition/${comp?.competition?.id}`}
                  >
                    <div
                      className={`flex items-center justify-between w-full bg-[#213743] cursor-pointer hover:bg-[#1C313D] ${
                        index !== competitions.length - 1
                          ? "border-b border-[#304553]"
                          : ""
                      }`}
                    >
                      <div className="text-[12px] leading-[16px] py-[10.5px] px-[10px]">
                        {comp.competition.name}
                      </div>
                      <Icon name="rightSlide" className="h-[17px] w-[17px]" />
                    </div>
                  </Link>
                )
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default MCompetition;
