// "use client";
// import { Skeleton } from "@workspace/ui/components/skeleton";
// import { useAppStore } from "@workspace/ui/store/store";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// // Format  date and time
// const formatDateTime = (dateStr: string) => {
//   const date = new Date(dateStr);
//   const now = new Date();

//   const isToday = date.toDateString() === now.toDateString();
//   const time = `${date.getHours().toString().padStart(2, "0")}:${date
//     .getMinutes()
//     .toString()
//     .padStart(2, "0")}`;

//   if (isToday) return `Today ${time}`;
//   return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
// };

// export default function DQuickLinks() {
//   const top21Events = useAppStore((state) => state.top21Events);
//   const quickLinks = top21Events?.slice(6, 21);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (quickLinks.length > 0) {
//       setLoading(false);
//     }
//   }, [quickLinks]);

//   return (
//     <>
//       <div className="mb-2.5 gap-[1px] flex">
//         {loading ? (
//           [...Array(4)].map((_, i) => (
//             <Skeleton
//               key={i}
//               className="w-full !rounded-none mb-[2px]"
//               style={{ height: 40, background: "#213843" }}
//             />
//           ))
//         ) : (
//           <div className="flex-auto">
//             {/* Header */}
//             <div className="flex justify-between items-center h-6 text-[12px] bg-[#071824ff] border-b border-[#071824ff] pl-2.5 pr-6">
//               <div className="px-0 py-[2.5px] text-[12px] font-semibold text-[#fff]">
//                 Quick Links
//               </div>
//             </div>

//             {/* Events */}
//             <div className="bg-[#2f4553ff]">
//               {quickLinks?.map((item: any, idx: number) => {
//                 const eventName = item.eventType.name;

//                 return (
//                   <Link
//                     key={idx}
//                     href={`/market-details/${eventName.toLowerCase()}/${item.event.id}`}
//                     className="flex justify-between items-center cursor-pointer border-b border-[#b1bad3] text-[#212529ff]">
//                     {/* Left side (icon + names) */}
//                     <div className="flex items-center gap-4">
//                       <div
//                         className={`flex flex-col items-center justify-center px-[9px] w-[60px] h-[42px] text-[10px] ${
//                           item?.inplay
//                             ? "bg-[#20a052] text-[#fff] font-bold  "
//                             : "text-[#b1bad3] bg-[#2f4553ff]"
//                         }`}>
//                         <div>
//                           {item?.inplay
//                             ? "In-Play"
//                             : formatDateTime(item.marketStartTime)}
//                         </div>
//                       </div>

//                       {/* Event Names */}
//                       <div className="flex flex-col justify-center h-[42px] font-bold text-[12px] text-[#fff]">
//                         <span className="leading-[16px]">
//                           {item?.event?.name}
//                         </span>
//                         <span className="leading-[16px] font-normal text-[#b1bad3]">
//                           {item?.competition?.name}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Right side (matched + arrow) */}
//                     <div className="flex items-center">
//                       <div className="hidden min-[1200px]:block w-[64.64px]">
//                         <div className="flex">
//                           <span className="text-[11px] text-[#b1bad3] leading-[16px]">
//                             {item?.event?.matched}
//                           </span>
//                           <div className="px-2 tv-icon"></div>
//                         </div>
//                       </div>
//                       {/* <Icon name="rightSlide" className="h-[17px] w-[17px]" /> */}
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import Icon from "@workspace/ui/icons/icons";
import React, { useEffect, useState } from "react";
import { PlayGames } from "../d-play-games";
import "./d-quicklink.css";
import Image from "next/image";

import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";
import { useAppStore } from "@workspace/ui/store/store";

// Define the QuickLink type if not imported

export const DQuickLinks = ({
  // links,
  active,
  // onSelect,
}: {
  // links: any;
  active: string;
  // onSelect: (id: string) => void;
}) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
  
    const games = [
      { id: 1, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
      { id: 2, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
      {
        id: 3,
        img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg",
        play: true,
      },
      { id: 4, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
      { id: 5, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
      { id: 6, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
      { id: 7, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
      { id: 8, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
      { id: 9, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
      { id: 10, img: "/Z4Dqt5bqstJ99TYD_3978012_3_Lucky_Gators_flat.jpg" },
    ];
    
    const [showAll, setShowAll] = useState(false);
      const visibleGames = showAll ? games : games.slice(0, 6);

  const top21Events = useAppStore((state) => state.top21Events);
  const inplaySports = useAppStore((state) => state.inplaySports);
  console.log(inplaySports, "inplay");
  // const quickLinks = top21Events?.slice(6, 21);

  const inplayLinks = top21Events?.filter((link: any) => link.inplay);
  const [loading, setLoading] = useState(true);
  const setSideBarTabs = useAppStore((state) => state.setSideBarTabs) || {};

  useEffect(() => {
    if (inplayLinks.length > 0) {
      setLoading(false);
    }
  }, [inplayLinks]);

  // console.log("DQuickLinks links:", links);
  // const quickLinks: QuickLink[] = [
  //   { id: 1, label: "In-Play Now", count: 2, highlight: true, url: "/inplay" },
  //   {
  //     id: 2,
  //     label: "Man City v Man Utd",
  //     spriteClass: "bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1095px_857px] bg-no-repeat bg-[-85px_-19px]",
  //     url: "/markets/man-city-v-man-utd",
  //   }
  // ];

  return (
    <>
      <section className="hidden md:block w-[212px] min-[1149px]:w-[270px] ml-auto">
        <div className="shadow-[1px_1px_2px_#0000004d] mb-2 w-full">
          <div className="py-1.5 px-2 bg-[#071824] flex justify-between">
            <span className="text-xs font-bold text-white leading-[16px]">
              Quick Links
            </span>
          </div>

          {/* In-play Now */}
          <button
            onClick={() => setSideBarTabs("inplay")}
            className={`bg-[#20a052] cursor-pointer items-center relative flex text-[12px] w-full ${
              active === "inplay" ? "opacity-90" : ""
            }`}
          >
            <span className="bg-[#fff3] block py-[7px] pl-2 pr-[7px] text-white leading-[1rem] font-bold">
              {inplaySports?.totalEvent || 0}
            </span>
            <div className="pl-3 w-full flex items-center justify-between">
              <span className="font-bold text-[12px] text-white">
                In-play Now
              </span>
              <span className="relative">
                <Icon name="rightSlide" className="w-4 h-4 mr-2" fill="white" />
              </span>
            </div>
          </button>

          {/* Remaining Links */}
          {loading ? (
            [...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="w-full !rounded-none mb-[2px]"
                style={{ height: 40, background: "#213843" }}
              />
            ))
          ) : (
            <>
              {top21Events?.map((link: any, idx: number) => {
                const sportName =
                  link.eventType?.name?.toLowerCase() || "unknown";
                const eventId = link.event?.id ?? idx;

                return (
                  <Link
                    prefetch
                    key={eventId}
                    href={`/market-details/${sportName}/${eventId}`}
                    className="relative cursor-pointer text-xs max-h-[31px] block"
                  >
                    <div className="flex items-center justify-between bg-[#213743] hover:bg-[#2137437a] border-b border-[#213743] max-h-[31px]">
                      <div className="py-[7px] px-2.5 flex items-center max-w-full truncate">
                        <div
                          className={`w-[17px] h-4 bg-[length:1095px_857px] bg-no-repeat bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] ${link.eventType.name || ""}`}
                        ></div>
                        <span className="truncate text-white leading-[14px] max-w-[calc(100%-32px)] mx-2">
                          {link.event?.name}
                        </span>
                      </div>
                      <div className="py-2 pr-1">
                        <Icon
                          name="rightSlide"
                          className="w-5 h-5"
                          fill="white"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </div>
              <div className="w-full max-w-md mb-6">
  <div className="shadow-lg">
    <div className="bg-[#213843] flex text-white text-[12px] font-bold px-[10px] rounded-tl-[2px] rounded-tr-[2px] py-[5px]">
      Play Games
    </div>

    <div className="grid grid-cols-2 gap-1">
      {visibleGames.map((game) => (
        <div key={game.id} className="relative cursor-pointer group">
          <Image
            src={game.img}
            alt=""
            width={300}
            height={87}
            className="w-full h-[87px] object-cover"
          />
      {game.play && (
                        <button className="absolute inset-0 flex items-center justify-center bg-black/60">
                          <span className="bg-yellow-400 text-[10px] h-[25px] text-black font-semibold px-3 min-w-[76%] rounded-[2px] leading-[25px]">
                            Play
                          </span>
                        </button>
                      )}
          {game && (
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="bg-yellow-400 text-black text-[10px] font-semibold h-[25px] px-[11px]  min-w-[76%] rounded-[2px] leading-[25px]">
                Play
              </span>
            </button>
          )}
        </div>
      ))}
    </div>

    <div className="text-center flex justify-end px-2 py-2 ">
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-sm text-white flex cursor-pointer items-center hover:underline"
      >
        {showAll ? "Show less" : "Show more"}
        <Icon
          name="questionArrow"
          className={`h-3 w-3 ml-1 transition-transform duration-300 ${
            showAll ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </div>
  </div>
</div>

        {/* <PlayGames /> */}
      </section>
    </>
  );
};
