"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";
import { useAppStore } from "@workspace/ui/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";

export const exchangeNavData = {
  navMain: [
    {
      title: "My Markets",
      url: "#",
      sprite: "bg-[-147px_-150px]",
    },
    { title: "Cricket", url: "#", sprite: "bg-[-265px_-109px]" },
    { title: "Soccer", url: "#", sprite: "bg-[-88px_-109px]" },
    { title: "Tennis", url: "#", sprite: "bg-[-206px_-109px]" },
    { title: "Horse Racing", url: "#", sprite: "bg-[-863px_-109px]" },
    { title: "Greyhound Racing", url: "#", sprite: "bg-[-624px_-109px]" },
    { title: "Alpines Skiing", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "Athlentics", url: "#", sprite: "bg-[-625px_-150px]" },
    { title: "AUDL", url: "#", sprite: "bg-[-206px_-150px]" },
    { title: "Badminton", url: "#", sprite: "bg-[-88px_-150px]" },
    { title: "Bandy", url: "#", sprite: "bg-[-265px_-150px]" },
    { title: "Basketball 3X3", url: "#", sprite: "bg-[-500px_-109px]" },
    { title: "Beach Volleyball", url: "#", sprite: "bg-[-1164px_-109px]" },
    { title: "Biathlon", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "Bowls", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "Chess", url: "#", sprite: "bg-[-625px_-150px]" },
    {
      title: "Cross-countrying Skiing",
      url: "#",
      sprite: "bg-[-206px_-150px]",
    },
    { title: "Curling", url: "#", sprite: "bg-[-88px_-150px]" },
    { title: "E-Games", url: "#", sprite: "bg-[-265px_-150px]" },
    { title: "Equine Sports", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "Floorball", url: "#", sprite: "bg-[-625px_-150px]" },
    { title: "Formula 1", url: "#", sprite: "bg-[-206px_-150px]" },
    { title: "Futsal", url: "#", sprite: "bg-[-88px_-150px]" },
    { title: "Hockey", url: "#", sprite: "bg-[-265px_-150px]" },
    { title: "Hurling", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "Indy", url: "#", sprite: "bg-[-625px_-150px]" },
    { title: "Kabbadi", url: "#", sprite: "bg-[-206px_-150px]" },
    { title: "Lacross", url: "#", sprite: "bg-[-88px_-150px]" },
    { title: "Lottery", url: "#", sprite: "bg-[-265px_-150px]" },
    { title: "MotoGP", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "Motorbikes", url: "#", sprite: "bg-[-625px_-150px]" },
    { title: "Nascar", url: "#", sprite: "bg-[-206px_-150px]" },
    { title: "Netball", url: "#", sprite: "bg-[-88px_-150px]" },
    { title: "Olympics", url: "#", sprite: "bg-[-265px_-150px]" },
    { title: "Padel", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "Ski Jumping", url: "#", sprite: "bg-[-625px_-150px]" },
    { title: "Softball", url: "#", sprite: "bg-[-206px_-150px]" },
    { title: "Speedway", url: "#", sprite: "bg-[-88px_-150px]" },
    { title: "Squash", url: "#", sprite: "bg-[-265px_-150px]" },
    { title: "Sumo", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "Supercars", url: "#", sprite: "bg-[-625px_-150px]" },
    { title: "Sufring", url: "#", sprite: "bg-[-206px_-150px]" },
    { title: "Table Tennis", url: "#", sprite: "bg-[-88px_-150px]" },
    { title: "Triathlon", url: "#", sprite: "bg-[-265px_-150px]" },
    { title: "Trotting", url: "#", sprite: "bg-[-561px_-109px]" },
    { title: "TV-Games", url: "#", sprite: "bg-[-625px_-150px]" },
    { title: "Virtual Sports", url: "#", sprite: "bg-[-206px_-150px]" },
    { title: "Waterpolo", url: "#", sprite: "bg-[-88px_-150px]" },
    { title: "Weather", url: "#", sprite: "bg-[-265px_-150px]" },
    { title: "Next Horse Race", url: "#", sprite: "bg-[-863px_-109px]" },
    { title: "Sport on TV", url: "#", sprite: "bg-[-625px_-150px]" },
    { title: "Responsible Gambling", icon: "privacy", url: "#" },
    { title: "Live Support", icon: "support", url: "#" },
    {
      title: "Language: English",
      icon: "language",
      url: "#",
      items: [],
    },
  ],
};

const spriteMapping: Record<string, string> = {
  Cricket: "bg-[-265px_-109px]",
  Soccer: "bg-[-88px_-109px]",
  Tennis: "bg-[-206px_-109px]",
  "Alpines Skiing": "bg-[-561px_-109px]",
  Athlentics: "bg-[-625px_-150px]",
  AUDL: "bg-[-206px_-150px]",
  Badminton: "bg-[-88px_-150px]",
  Bandy: "bg-[-265px_-150px]",
  "Basketball 3X3": "bg-[-500px_-109px]",
  "Beach Volleyball": "bg-[-1164px_-109px]",
  Biathlon: "bg-[-561px_-109px]",
  Bowls: "bg-[-561px_-109px]",
  Chess: "bg-[-625px_-150px]",
  "Cross-countrying Skiing": "bg-[-206px_-150px]",
  Curling: "bg-[-88px_-150px]",
  "E-Games": "bg-[-265px_-150px]",
  "Equine Sports": "bg-[-561px_-109px]",
  Floorball: "bg-[-625px_-150px]",
  "Formula 1": "bg-[-206px_-150px]",
  Futsal: "bg-[-88px_-150px]",
  "Greyhound Racing": "bg-[-624px_-109px]",
  Hockey: "bg-[-265px_-150px]",
  "Horse Racing": "bg-[-863px_-109px]",
  Hurling: "bg-[-561px_-109px]",
  Indy: "bg-[-625px_-150px]",
  Kabbadi: "bg-[-206px_-150px]",
  Lacross: "bg-[-88px_-150px]",
  Lottery: "bg-[-265px_-150px]",
  MotoGP: "bg-[-561px_-109px]",
  Motorbikes: "bg-[-625px_-150px]",
  Nascar: "bg-[-206px_-150px]",
  Netball: "bg-[-88px_-150px]",
  Olympics: "bg-[-265px_-150px]",
  Padel: "bg-[-561px_-109px]",
  "Ski Jumping": "bg-[-625px_-150px]",
  Softball: "bg-[-206px_-150px]",
  Speedway: "bg-[-88px_-150px]",
  Squash: "bg-[-265px_-150px]",
  Sumo: "bg-[-561px_-109px]",
  Supercars: "bg-[-625px_-150px]",
  Sufring: "bg-[-206px_-150px]",
  "Table Tennis": "bg-[-88px_-150px]",
  Triathlon: "bg-[-265px_-150px]",
  Trotting: "bg-[-561px_-109px]",
  "TV-Games": "bg-[-625px_-150px]",
  "Virtual Sports": "bg-[-206px_-150px]",
  Waterpolo: "bg-[-88px_-150px]",
  Weather: "bg-[-265px_-150px]",
};

const fallbackSprite = "bg-[-147px_-150px]";

const NextCompetition = ({
  sportName,
  onBack,
}: {
  sportName: string;
  onBack: () => void;
}) => {
  const [show, setShow] = useState(true);
  const [selectedSportName, setSelectedSportName] = useState<any>(sportName);
  const allSportsList = useAppStore((state) => state.AllSportList);
  const [competition, setCompetition] = useState<any[]>([]);
  const allEventsList = useAppStore((state) => state.allEventsList) || {};
  const setSideBarTabs = useAppStore((state) => state.setSideBarTabs) || {};
  const { open, openTab } = useSidebar();

  useEffect(() => {
    if (!allSportsList?.competitions) return;

    // Use the prop sportName first, then fallback to localStorage
    const currentSportName = sportName || localStorage.getItem("sportName");
    const id = localStorage.getItem("sportId");

    if (currentSportName) {
      setSelectedSportName(currentSportName);
      setSideBarTabs(id);

      const filtered = allSportsList.competitions.filter(
        (comp: any) =>
          comp?.eventType?.name?.toLowerCase() ===
          currentSportName?.toLowerCase()
      );
      setCompetition(filtered || []);
    }
  }, [open, openTab, allSportsList, setSelectedSportName, sportName]);

  const handleBack = () => {
    setShow(false);
    onBack();
    setSideBarTabs("home");
  };

  const [sportsSubChildData, setSportsSubChildData] = useState<any[]>([]);
  const [eventSportName, setEventSportName] = useState<string>("");

  const goToCompetitionPage = (
    tournamentId: string,
    tournamentName: string
  ) => {
    // save to localStorage
    setEventSportName(tournamentName);
    localStorage.setItem("leftsidebarturnamentId", tournamentId);
    localStorage.setItem("leftsidebarturnamentName", tournamentName);

    // filter related competitions from allEventsList
    const sportId = localStorage.getItem("sportId");
    if (sportId && allEventsList[sportId]) {
      const getDataFromId = allEventsList[sportId];
      const filteredArray = getDataFromId.filter(
        (item: any) => item?.competition?.id === tournamentId
      );
      setSportsSubChildData(filteredArray);
    }

    setShow(false);
  };

  const handleSportNameClick = () => {
    setShow(true);
    const id = localStorage.getItem("sportId");
    localStorage.setItem("itemId", id || "");
    setSideBarTabs(id);
  };

  return (
    <div className="text-[10px]  bg-[#1A2C38] text-white">
      <div className="flex flex-col text-sm">
        <Link
          href="/"
          onClick={() => handleBack()}
          className="px-4 bg-[#1A2C38] hover:bg-[#304553] cursor-pointer text-[10px] py-2 text-white text-left"
        >
          All Sports
        </Link>

        {show && (
          <>
            <Link
              href="/"
              className="px-4 text-[10px] py-2 hover:bg-[#304553] cursor-pointer font-bold"
              onClick={() => handleSportNameClick()}
            >
              {selectedSportName}
            </Link>

            <div className="bg-[#334B5B] text-white px-4 py-1 text-[10px] tracking-wide">
              Competitions
            </div>

            {competition.map((item: any, index) => (
              <div
                onClick={() =>
                  goToCompetitionPage(
                    item?.competition?.id,
                    item?.competition?.name
                  )
                }
                key={`${item.competition.id}-${index}`}
                className="px-4 py-2 border-t last:border-b border-gray-200 hover:bg-[#304553] text-[10px] text-white block cursor-pointer"
              >
                {item?.competition?.name}
              </div>
            ))}
          </>
        )}
        {sportsSubChildData.length > 0 && (
          <>
            <Link
              href="/"
              className="px-4 text-[10px] py-2 hover:bg-[#304553] cursor-pointer font-bold"
              onClick={() => handleSportNameClick()}
            >
              {selectedSportName}
            </Link>
            <div className="px-4 text-[10px] py-2 hover:bg-[#304553] cursor-pointer font-bold">
              {eventSportName}
            </div>

            {sportsSubChildData.map((item: any, index) => (
              <Link
                href={`/market-details/${item?.eventType?.name?.toLowerCase()}/${item?.event?.id}`}
                key={`${item?.competition?.id}-${index}`}
                className="px-4 py-2 border-t last:border-b border-gray-200 hover:bg-[#304553] text-[10px] text-white block cursor-pointer"
              >
                {item?.event?.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export const ExchangeOpenNavMain = ({
  items,
}: {
  items: {
    title?: string;
    url?: string;
    sprite?: string;
    isLabel?: boolean;
    disabled?: boolean;
    className?: string;
  }[];
}) => {
  const { open, isTablet, openTab, setOpen, setOpenTab } = useSidebar();
  const allSportList = useAppStore((state) => state.AllSportList);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const setSideBarTabs = useAppStore((state) => state.setSideBarTabs) || {};
  const setIsLoginOpen = useAppStore((state) => state.setIsLoginOpen);
  const sideBarTabs = useAppStore((state) => state.sideBarTabs);

  const isOpen = isTablet ? openTab : open;
  const allRacingEvents = useAppStore((state) => state.allRacingEvents);
  const [racingoneEvent, setRacingoneEvent] = useState<any>();

  useEffect(() => {
    if (allRacingEvents?.events) {
      let eventsList = [];
      eventsList = [].concat(
        ...allRacingEvents.events
          .filter(
            (element: any) =>
              element?.eventType?.id == "7" || element?.eventType?.id == "4"
          ) // Include both horse and greyhound racing
          .map((element: any) => {
            const tournamentName = element?.event?.name;
            return element?.eventData?.map((event: any) => ({
              ...event,
              tournamentName,
              eventTypeId: element?.eventType?.id, // Add eventType id to determine sport
              eventTypeName: element?.eventType?.name, // Add eventType name
            }));
          })
      );

      // Filter events where eventTime is greater than 5 minutes from the current time
      const currentTime = new Date();
      const halfHourLater = new Date(currentTime.getTime() + 30 * 60000);

      // Filter events within the next 30 minutes
      eventsList = eventsList.filter((event: any) => {
        const eventTime = new Date(event?.marketStartTime);
        return eventTime >= currentTime && eventTime <= halfHourLater;
      });

      // Sort the filtered events by time (ascending)
      eventsList.sort((a: any, b: any) => {
        const dateA = new Date(a.marketStartTime);
        const dateB = new Date(b.marketStartTime);
        return dateA.getTime() - dateB.getTime();
      });

      setRacingoneEvent(eventsList[0]);
    }
  }, [allRacingEvents]);

  useEffect(() => {
    if (isTablet ? openTab : open) {
      // Check if sideBarTabs corresponds to a sport that should show submenu
      if (sideBarTabs && allSportList?.eventTypes) {
        const currentSport = allSportList.eventTypes.find(
          (sport: any) => String(sport.eventType.id) === String(sideBarTabs)
        );

        if (
          currentSport &&
          [
            "Cricket",
            "Soccer",
            "Tennis",
            "Horse Racing",
            "Greyhound Racing",
          ].includes(currentSport.eventType.name)
        ) {
          setSelectedSport(currentSport.eventType.name);
          // Update localStorage to keep it in sync
          localStorage.setItem("sportName", currentSport.eventType.name);
          localStorage.setItem("sportId", String(currentSport.eventType.id));
        } else {
          // For any sport NOT in the expandable list -> show All Sports
          setSelectedSport(null);
          localStorage.setItem("sportName", "");
          localStorage.setItem("sportId", "");
        }
      } else {
        setSelectedSport(null);
      }
    } else {
      localStorage.setItem("sportName", "");
      setSelectedSport(null);
    }
  }, [open, openTab, sideBarTabs, allSportList]);

  const getRacingSportUrl = () => {
    if (!racingoneEvent?.eventTypeId || !racingoneEvent?.event?.id) return null;
    return `/market-details/${racingoneEvent.eventTypeId.toLowerCase()}/${racingoneEvent.event.id}`;
  };

  return (
    <SidebarGroup
      className={cn(
        isOpen
          ? "p-4 flex flex-col relative h-[calc(100vh-400px)]"
          : "overflow-hidden"
      )}
    >
      <SidebarMenu
        className={cn(
          isOpen
            ? "bg-[#1a2c38] rounded-[4px] gap-0 flex flex-col h-full"
            : "gap-2"
        )}
      >
        {/* 🔹 Top Fixed (first 2 items) */}
        <div>
          {items.slice(0, 1).map((item) =>
            item?.isLabel ? (
              isOpen && (
                <div
                  key={item.title}
                  className={cn(
                    "leading-none px-4 py-[11px] hover:bg-sidebar-accent rounded-sm cursor-pointer text-sm h-auto text-white",
                    item.className
                  )}
                >
                  {item.title}
                </div>
              )
            ) : (
              <SidebarMenuItem
                key={item.title}
                className={cn(!isOpen && "flex justify-center items-end")}
              >
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => {
                    if (item.title === "My Markets") {
                      setIsLoginOpen(true);
                    }
                  }}
                  className={cn(
                    "leading-none rounded-sm px-4 py-[13px] h-auto",
                    item.disabled
                      ? "opacity-50 pointer-events-none text-[#b1bad3]"
                      : "text-[#b1bad3] hover:text-white cursor-pointer"
                  )}
                >
                  {item.sprite && (
                    <div
                      className={cn(
                        "h-[16px] w-[17px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat ",
                        item.sprite
                      )}
                    />
                  )}
                  {isOpen && (
                    <span
                      className={cn(
                        "font-semibold",
                        item.disabled ? "text-[#b1bad3]" : "text-white"
                      )}
                    >
                      {item.title}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </div>

        {/* 🔹 Scrollable Dynamic Sports List OR NextCompetition */}
        <div
          className={cn(
            "overflow-y-auto",
            (open || openTab) && "h-[calc(92vh-168px)]"
          )}
        >
          {selectedSport ? (
            <NextCompetition
              sportName={selectedSport}
              onBack={() => {
                setSelectedSport(null);
                setSideBarTabs("home");
                localStorage.setItem("sportName", "");
                localStorage.setItem("sportId", "");
              }}
            />
          ) : (
            allSportList?.eventTypes?.map((sport: any, index: number) => {
              const spriteClass =
                spriteMapping[sport.eventType.name] || fallbackSprite;

              const id = sport.eventType.id;
              const isActive = id != null ? String(sideBarTabs) === id : false;
              return (
                <SidebarMenuItem
                  key={`${sport.eventType.name}-${index}`}
                  className={cn(
                    !isOpen &&
                      "flex justify-center items-end mt-2 mb-2 first:mt-0"
                  )}
                >
                  <SidebarMenuButton
                    tooltip={sport.eventType.name}
                    className={cn(
                      "leading-none rounded-sm px-4 py-[13px] h-auto cursor-pointer",
                      isActive
                        ? "bg-[hsla(0,0%,96.5%,.15)] text-white"
                        : "text-[#b1bad3] hover:text-white"
                    )}
                    onClick={() => {
                      const name = sport.eventType.name;

                      if (
                        [
                          "Cricket",
                          "Soccer",
                          "Tennis",
                          "Horse Racing",
                          "Greyhound Racing",
                        ].includes(name)
                      ) {
                        isTablet ? setOpenTab(true) : setOpen(true);
                        setSideBarTabs(sport.eventType.id);
                        setSelectedSport(name);
                        localStorage.setItem("sportName", name);
                        localStorage.setItem("sportId", sport.eventType.id);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "h-[16px] w-[17px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat",
                        spriteClass
                      )}
                    />
                    {isOpen && (
                      <span className="font-semibold text-white flex items-center gap-1">
                        {sport.eventType.name}
                        {sport.showCount && (
                          <span className="text-xs text-[#20a052] font-bold">
                            {sport.showCount}
                          </span>
                        )}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })
          )}
        </div>

        {/* 🔹 Bottom Fixed (last 3 items) */}
        <div className="sticky bottom-0 bg-[#1a2c38]">
          {items.slice(-2).map((item) => {
            const racingUrl = getRacingSportUrl();
            const isNextRace = item.title === "Next Horse Race";

            return (
              <SidebarMenuItem
                key={item.title}
                className={cn(!isOpen && "flex justify-center items-end")}
              >
                {isNextRace && racingUrl ? (
                  <Link href={racingUrl} className="w-full">
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="leading-none rounded-sm px-4 py-[13px] h-auto text-[#b1bad3] hover:text-white cursor-pointer w-full"
                    >
                      {item.sprite && (
                        <div
                          className={cn(
                            "h-[16px] w-[17px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat",
                            item.sprite
                          )}
                        />
                      )}
                      {item.sprite && (
                        <Icon
                          name={item.sprite}
                          className="h-4 w-4 text-[#b1bad3] group-hover:text-white"
                        />
                      )}

                      {isOpen && (
                        <span className="font-semibold text-white">
                          {item.title}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </Link>
                ) : (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="leading-none rounded-sm px-4 py-[13px] h-auto text-[#b1bad3] hover:text-white cursor-pointer"
                  >
                    {item.sprite && (
                      <div
                        className={cn(
                          "h-[16px] w-[17px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat",
                          item.sprite
                        )}
                      />
                    )}
                    {item.sprite && (
                      <Icon
                        name={item.sprite}
                        className="h-4 w-4 text-[#b1bad3] group-hover:text-white"
                      />
                    )}

                    {isOpen && (
                      <span className="font-semibold text-white">
                        {item.title}
                      </span>
                    )}
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
};
