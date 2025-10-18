"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";
import { useAppStore } from "@workspace/ui/store/store";
import { useParams } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";
import moment from "moment";
import Link from "next/link";

export default function MPickMeeting({
  children,
  meetingData,
  timeData,
}: {
  children: React.ReactNode;
  meetingData?: any;
  timeData?: any;
}) {
  const [activeTab, setActiveTab] = useState(1);
  const params = useParams();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showOverlay={false}
        className="p-0 overflow-hidden drawer overflow-y-auto h-[calc(100dvh-58px)] min-[500px]:!min-w-[100vw] bg-[#1A2C38] top-0 left-0 translate-x-[0%] translate-y-[0%] !gap-0 !border-0 !max-w-lg !rounded-none shadow-lg [&>button]:hidden  "
      >
        <DialogHeader className="hidden">
          <DialogTitle className="font-bold text-sm">
            Pick a meeting
          </DialogTitle>
          <DialogClose asChild>
            <button className="text-xl leading-none cursor-pointer">
              <Icon name={"close"} className="w-[22px] h-[22px]" />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="outline-none w-full">
          <div className="sticky top-0 z-[4]">
            <div className="flex !flex-row  h-[44px]  justify-between items-center bg-[#071824] text-white px-3">
              <p className="font-bold text-sm">Pick a meeting</p>
              <DialogClose asChild>
                <button className="text-xl leading-none cursor-pointer">
                  <Icon name={"close"} className="w-[22px] h-[22px]" />
                </button>
              </DialogClose>
            </div>
            <div className="flex justify-between items-center h-[40px] px-3 bg-[#213743] border-b border-[#304553] ">
              <div className="font-bold text-[14px] text-white">
                {" "}
                Today's Racing{" "}
              </div>
              <div className="text-[#303030] text-[12px] font-sans block">
                <button
                  className={cn(
                    "min-w-[70px] px-[10px] py-[6px] text-white rounded-l-[2px] focus:font-bold",
                    activeTab == 1 ? "bg-[#557086] font-bold" : "bg-[#2f4553]"
                  )}
                  onClick={() => setActiveTab(1)}
                >
                  Meeting
                </button>
                <button
                  className={cn(
                    "min-w-[70px] px-[10px] py-[6px] text-white rounded-r-[2px] ",
                    activeTab == 2 ? "bg-[#557086] font-bold" : "bg-[#2f4553]"
                  )}
                  onClick={() => setActiveTab(2)}
                >
                  Time
                </button>
              </div>
            </div>
          </div>
          {activeTab === 1 ? (
            <div className="overflow-y-auto">
              {meetingData?.length > 0 ? (
                meetingData?.map((tour: any, idx: number) => (
                  <Fragment key={idx}>
                    <div className="h-[32px] flex items-center px-3 bg-[#071824]">
                      <span className="text-[14px] font-bold">
                        {tour?.competition?.name}
                      </span>
                    </div>
                    {tour?.groupedEvents?.map((group: any, index: number) => (
                      <Link
                        prefetch={true}
                        href={`/exchange/horse-racing-details/${group?.slots[0]?.eventId}/${params.sportId}`}
                        key={index}
                        className={cn(
                          "pt-[1px] px-3 py-2 flex flex-col justify-center w-full text-sm",
                          index > 0 && "border-t-2 border-[#2f4553]"
                        )}
                      >
                        <p>{group?.eventName}</p>
                        <p>
                          {group?.slots?.length} races - next{" "}
                          {moment(group?.slots[0]?.marketStartTime).format(
                            "H:mm"
                          )}
                        </p>
                      </Link>
                    ))}
                  </Fragment>
                ))
              ) : (
                <div className="text-white h-[128] flex justify-center items-center bg-[#213743]">
                  There are no events available
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-y-auto">
              {timeData?.length > 0 ? (
                timeData?.map((time: any, idx: number) => (
                  <Link
                    prefetch={true}
                    href={`/exchange/horse-racing-details/${time?.eventId}/${params.sportId}`}
                    key={idx}
                    className={cn(
                      "pt-[1px] px-3 py-2 flex flex-col justify-center w-full text-sm",
                      idx > 0 && "border-t-2 border-[#2f4553]"
                    )}
                  >
                    <p>
                      {moment(time?.eventTime).format("HH:mm")}{" "}
                      {time?.eventName}
                    </p>
                  </Link>
                ))
              ) : (
                <div className="text-white h-[128] flex justify-center items-center bg-[#213743]">
                  There are no events available
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
