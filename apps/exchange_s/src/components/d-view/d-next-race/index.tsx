"use client";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Icon from "@workspace/ui/icons/icons";
import React, { useState, useEffect } from "react";

type DNextRaceProps = {
  events: any[];
};

export const DNextRace = ({ events }: DNextRaceProps) => {
  const [active, setActive] = useState("GB & Ireland");
  const buttons = ["GB & Ireland", "All Races"];
  const [Loading, setLoading] = useState(true);


  // --- map helper
  const mapToRace = (ev: any) => ({
    id: ev.event?.id,
    time: new Date(ev.marketStartTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    place: ev.event?.name || "Unknown",
    prize: ev.competition?.name || "—",
    date: new Date(ev.marketStartTime).toLocaleDateString([], {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
    countryCode: ev.event?.countryCode || "GB",
  });

  // --- split sets
  const gbIrelandEvents = events.filter(
    (ev) => ev.event?.countryCode === "GB" || ev.event?.countryCode === "IE"
  );
  const allRacesEvents = events; // ⚡ keep all, don’t filter

  // --- switch tabs
  const selectedEvents =
    active === "GB & Ireland" ? gbIrelandEvents : allRacesEvents;

  // --- sort + future only + first 3
  const races = selectedEvents
    .filter((ev) => new Date(ev.marketStartTime) > new Date())
    .sort(
      (a, b) =>
        new Date(a.marketStartTime).getTime() -
        new Date(b.marketStartTime).getTime()
    )
    .slice(0, 3)
    .map(mapToRace);

  // --- responsive (2 items if < 1024px)
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const visibleRaces = isSmall ? races.slice(0, 2) : races;
  useEffect(()=>{
    if(visibleRaces.length > 0){
      setLoading(false)
    }
  },[visibleRaces])
  return (
    <div className="shadow-sm overflow-hidden mb-2.5">
      <div className="flex items-center justify-between bg-[#071824] px-3 py-2">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4">
            <svg
              className="w-4 h-4"
              data-icon="horse-racing"
              data-style="card-header_icon"
              viewBox="0 0 100 100"
            >
              <path
                fill="white"
                d="M79.946,66.745L100,46.776l-6.313-6.285L73.593,60.483L79.946,66.745z M31.283,9.376h-9.371l-6.244,6.253v9.376l12.489-12.5  L31.283,9.376z M15.668,25.006H6.3l-6.25,6.25v9.374l12.494-12.5L15.668,25.006z M27.559,22.485L0.05,50.012h55.016L27.559,22.485z   M0,56.21v32.396L11.389,100l43.678-43.762L0,56.21z M37.523,12.506l-5.919,5.93l7.929,7.932L59.507,6.371L59.393,6.25h-9.375  L43.773,0H31.817l9.101,9.115l-0.271,0.261L37.523,12.506z M63.925,10.791L43.947,30.795l25.251,25.271l19.979-19.993L63.925,10.791  z M65.637,31.256h-9.372l9.372-9.376V31.256L65.637,31.256z"
              ></path>
            </svg>
          </span>
          <h2 className="text-white text-sm font-semibold">Next Races</h2>
        </div>
        <div className="flex">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => setActive(btn)}
              className={`capitalize rounded-[2px] cursor-pointer px-4 font-bold h-7 text-[11px] ml-[5px] text-[#1e1e1e] ${
                active === btn ? "bg-white" : "bg-[#bfbfbf]"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>


        {Loading ? (
                  [...Array(4)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="w-full !rounded-none mb-[2px]"
                      style={{ height: 40, background: "#213843" }}
                    />
                  ))
                ) : (
                  <>

      <div className="grid grid-cols-2 lg:grid-cols-3 shadow-md">
        {visibleRaces.length === 0 ? (
          <div className="col-span-3 p-3 text-center text-white text-sm">
            No upcoming races
          </div>
        ) : (
          visibleRaces.map((race) => (
            <div
              key={race.id}
              className="flex items-center justify-between p-3 py-2 border-r last:border-r-0 border-[#ffffff1c] bg-[#213743] h-[58px]"
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-3 w-5"
                  src={`flags/${race.countryCode}.svg`}
                  alt={race.countryCode}
                />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {race.time} {race.place}
                  </div>
                  <div className="flex items-center gap-2 text-[#B1BAD3] text-xs">
                    <div className="text-[11px] text-[#B1BAD3]">
                      {race.prize}
                    </div>
                    <span>
                      <svg
                        className="w-[10px] h-[10px]"
                        data-icon="on-tv"
                        viewBox="0 0 100 100"
                      >
                        <path
                          fill="grey"
                          d="M0 13v68.75h25V88h50v-6.25h25V13H0zm87.5 56.25h-75V25.5h75v43.75z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-[9px] text-[#B1BAD3] gap-1.5">
                {race.date}{" "}
                <Icon name="rightSlide" className="w-3 h-3" fill="white" />
              </div>
            </div>
          ))
        )}
      </div>
      </>
    )}
    </div>
  );
};
