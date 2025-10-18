"use client";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Icon from "@workspace/ui/icons/icons";
import { getTimeDifference } from "@workspace/ui/lib/utils";
import { useAppStore } from "@workspace/ui/store/store";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MHorseRacing = () => {
  const allRacingEvents = useAppStore((state) => state.allRacingEvents);
  const [racingEvent, setRacingEvent] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    if (allRacingEvents?.events) {
      let eventsList = [];

      eventsList = [].concat(
        ...allRacingEvents.events
          .filter((element: any) => element?.eventType?.id == "7")
          .map((element: any) => {
            const tournamentName = element?.event?.name;
            return element?.eventData?.map((event: any) => ({
              ...event,
              tournamentName,
            }));
          })
      );

      // console.log(eventsList, 'eventsList');

      // Filter events where eventTime is greater than 5 minutes from the current time
      const currentTime = new Date();
      const halfHourLater = new Date(currentTime.getTime() + 30 * 60000);

      // Filter events within the next 30 minutes
      eventsList = eventsList.filter((event: any) => {
        const eventTime = new Date(event?.marketStartTime);
        return eventTime >= currentTime && eventTime <= halfHourLater;
      });

      // Optional: Sort the filtered events by time (ascending)
      eventsList.sort((a: any, b: any) => {
        const dateA = new Date(a.marketStartTime);
        const dateB = new Date(b.marketStartTime);
        return dateA.getTime() - dateB.getTime();
      });
      setRacingEvent(eventsList[0]);
      console.log(eventsList[0], "00000");
    }
  }, [allRacingEvents]);
  return (
    <div className="w-full">
      {/* market header */}
      <div className="p-[8px_12px] bg-[#071824] w-full">
        <div className="text-[14px] leading-[16.8px] font-bold">
          Horse Racing
        </div>
      </div>
      {/* market header */}

      {!racingEvent ? (
        <div className="flex justify-between py-2">
          <Skeleton
            className="w-[140] h-4"
            style={{
              background: "#213843",
            }}
          />
          <Skeleton
            className="w-[140] h-4"
            style={{
              background: "#213843",
            }}
          />
        </div>
      ) : (
        <Link
          href={"/exchange/horse-racing-details"}
          prefetch
          className="p-[11.5px_5px_11.5px_10px] flex items-center justify-between w-full border-b border-[#304553] bg-[#213743]"
        >
          <div className="text-[12px] leading-[16px]">
            {moment(racingEvent?.marketStartTime).format("h:mm")}{" "}
            {racingEvent?.eventName} ({racingEvent?.tournamentName})
          </div>
          <div className="flex gap-3 justify-items-center">
            {!racingEvent?.inPlay && (
              <div className="flex items-center">
                <span className="me-2">
                  <img
                    src="/transparent-login.gif"
                    className="h-[18px] w-[16px] bg-no-repeat bg-[length:1280px_1024px] bg-[-149px_-765px] bg-[url('/stackfairexch_sprites_new.1a1cb7e9691c7fe9.svg')]"
                  />
                </span>
                <span className="startingSoon text-[9px] leading-[16px]">
                  Going to be live in{" "}
                  {getTimeDifference(racingEvent?.marketStartTime)}
                </span>
              </div>
            )}
            <div>
              <Icon name="rightSlide" className="h-[17px] w-[17px]" />
            </div>
          </div>
        </Link>
      )}

      <div className="p-[10px_5px_10px_10px] flex items-center justify-between w-full border-b border-[#304553] bg-[#213743]">
        <div className="text-[12px] leading-[16px]">Today's Card</div>
        <div>
          <Icon name="rightSlide" className="h-[17px] w-[17px]" />
        </div>
      </div>

      <div className="p-[10px_5px_10px_10px] flex items-center justify-between w-full border-b border-[#304553] bg-[#213743]">
        <div className="text-[12px] leading-[16px]">See all Horse Racing</div>
        <div>
          <Icon name="rightSlide" className="h-[17px] w-[17px]" />
        </div>
      </div>
    </div>
  );
};

export default MHorseRacing;
