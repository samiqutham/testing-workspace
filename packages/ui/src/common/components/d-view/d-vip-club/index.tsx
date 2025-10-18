"use client";

import clubimg from "@workspace/ui/assets/vip-club/boost.webp";
import VIPModal from "@workspace/ui/common/modal/vip-modal/index";
import Icon from "@workspace/ui/icons/icons";
import { useEffect, useRef, useState } from "react";
import LiveSupport from "@workspace/ui/common/components/live-support/index";
import { useAppStore } from "@workspace/ui/store/store";
const benefits = [
  {
    title: "Boost",
    desc: "Every week and every month, expect a fresh bonus based on your recent games. The more you play, the higher the bonuses.",
    img: "/vip-club/boost.webp",
  },
  {
    title: "Dedicated VIP Host",
    desc: "Receive your own dedicated VIP host who will support and cater to your betting needs.",
    img: "/vip-club/host.webp",
  },
  {
    title: "Recent Play Bonuses",
    desc: "Having a rough streak of luck? Stake offers money back on losses every time you level up.",
    img: "/vip-club/cashback.webp",
  },
  {
    title: "Level-Ups",
    desc: "Reach a new level and get paid. The level-ups get better the higher you go.",
    img: "/vip-club/levelup.webp",
  },
  {
    title: "Bespoke benefits",
    desc: "Work with your dedicated VIP host to tailor benefits to your gaming needs.",
    img: "/vip-club/bespoke.webp",
  },
];
const vipTiers = [
  {
    title: "Bronze",
    amount: "$10k",
    perks: [
      "Monthly bonuses",
      "Level Up bonuses",
      "Rakeback",
      "Weekly bonuses",
    ],
    icon: <Icon className="h-[25px] w-[28px]" name={"starBronze"} />,
    color: "bg-[#C79C6E] text-black",

    iconColor: "#C79C6E",
  },

  {
    title: "Silver",
    amount: "$50k",
    perks: [
      "Monthly bonuses",
      "Level Up bonuses",
      "Rakeback",
      "Weekly bonuses",
      "Bonus growth",
    ],
    icon: <Icon className="h-[25px] w-[25px]" name={"starSilver"} />,
    color: "bg-[#B2CBCB] text-black",
    iconColor: "#bdbdbd",
  },
  {
    title: "Gold",
    amount: "$100k",
    perks: [
      "Monthly bonuses",
      "Level Up bonuses",
      "Rakeback",
      "Weekly bonuses",
      "Bonus growth",
    ],
    icon: <Icon className="h-[25px] w-[25px]" name={"starGold"} />,
    color: "bg-[#FED100] text-black",
    iconColor: "#FED100",
  },
  {
    title: "Platinum I-III",
    amount: "$250k - $1M",
    perks: [
      "Monthly bonuses",
      "Level Up bonuses",
      "Rakeback",
      "Weekly bonuses",
      "Bonus growth",
      "Daily bonuses / Reload",
    ],
    icon: <Icon className="h-[25px] w-[25px]" name={"star1"} />,
    color: "bg-[#6EDEE7] text-black",
    iconColor: "#6EDEE7",
  },
  {
    title: "Platinum IV-VI",
    amount: "$2.5M - $10M",
    perks: [
      "Bonus from VIP host in currency of your choice",
      "Weekly & Monthly bonuses",
      "Renewable Reloads",
      "Level Up bonuses",
      "Rakeback",
    ],
    icon: <Icon className="h-[25px] w-[25px]" name={"starPlatinum2"} />,
    color: "bg-[#6EDEE7] text-black",
    iconColor: "#6EDEE7",
    special: true,
  },
  {
    title: "Diamond I-V",
    amount: "$25M",
    perks: [
      "Bonus from VIP host in currency of your choice",
      "Weekly & Monthly bonuses",
      "Renewable Reloads",
      "Level Up bonuses",
      "Rakeback",
    ],
    icon: <Icon className="h-[25px] w-[25px]" name={"starDiamond"} />,
    color: "bg-[#6EDEE7] text-black",

    iconColor: "#6EDEE7",
    special: true,
  },
];

function FrequentlyAskedQuestions() {
  const [activeLink, setActiveLink] = useState<any>("General");
  const links = ["General", "Benefits", "VIP Hosts"];
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [language, setLanguage] = useState("English");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = ["English", "Español", "Deutsch", "Français"];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const generalFaqs = [
    {
      id: "why-vip-best",
      title: "Why is StakeFair’s VIP program the best?",
      content: (
        <>
          <span className=" mb-2">
            StakeFair’s VIP program is often rated as one of the best online
            casino experiences due to the amount of bonuses we give out to
            players.
          </span>
          <p>
            Additionally, our award winning support team is online 24/7 to
            answer any questions you have. We have the highest customer
            satisfaction rate out of many online casinos where we have amassed a
            community of some of the most passionate gamblers across the globe.
          </p>
        </>
      ),
    },
    {
      id: "bonuses-given",
      title: "How much has StakeFair given out in bonuses?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-2">
            We have given over $1 Billion in bonuses. This is primarily the
            reason we have the best VIP program online.
          </p>
          <p className="text-[#D5DCEB]">
            We truly believe in rewarding our players for their gameplay and
            loyalty.
          </p>
        </>
      ),
    },
    {
      id: "weekly-raffle",
      title: "How do I enter the $75,000 weekly raffle?",
      content: (
        <p className="text-[#D5DCEB]">
          To get one ticket to enter the raffle, you must wager $1000 on
          StakeFair.com. The more you wager, the more tickets you get, which
          increases your chances of winning.
        </p>
      ),
    },
    {
      id: "telegram-channel",
      title: "Where can I find the StakeFair Telegram Channel?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-2">
            The StakeFair Telegram channel is (@StakeFair).
          </p>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-solid decoration-[0.08em] underline-offset-4 text-white hover:text-white transition hover:decoration-[14%]">
            Click here to join if you have already downloaded Telegram.
          </a>
        </>
      ),
    },
    {
      id: "vip-telegram-channel",
      title: "Where can I find the StakeFair VIP Telegram channel?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-2">
            Once you reach Bronze, you can ask live support to be added to the
            StakeFair VIP Telegram Channel.
          </p>
          <p className="text-[#D5DCEB]">
            Alternatively, you can find more information about this by joining
            the StakeFair Telegram channel (@StakeFairCasino).
          </p>
        </>
      ),
    },
  ];

  const benefitsFaqs = [
    {
      id: "gameplay-bonus",
      title: "What is a recent gameplay bonus?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-2">
            This is a bonus given to you by the discretion of your host or VIP
            manager and is based on significant player wagers and luck.
          </p>
        </>
      ),
    },
    {
      id: "rakeback",
      title: "What is rakeback?",
      content: (
        <p className="text-[#D5DCEB]">
          Rakeback is a percentage of a player's rake (house edge) refunded to
          you.
        </p>
      ),
    },
    {
      id: "reload",
      title: "What is a reload? How do I claim my reload?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-1">
            Reload is a bonus which is calculated on the basis of a player's
            recent activity. A player is eligible to choose between either a
            Daily, Hourly or 10 Minute reload intervals.
          </p>
          <p className="text-[#D5DCEB] mb-1">
            Go to the user panel on the top right hand side of the screen and
            click on VIP. A modal will appear. Click on the reload tab and click
            on the reload button to claim your reload.
          </p>
          <p className="text-[#D5DCEB]">
            Having a host is dependable on your gameplay.
          </p>
        </>
      ),
    },
    {
      id: "monthly-bonus",
      title: "When is the Monthly bonus scheduled for?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-1">
            The monthly bonus is distributed once a month. The date is generally
            around the 15th. In some instances it can be a little later or even
            earlier. This is why it’s one of the most anticipated bonuses on
            StakeFair. When it’s released, you will be notified via email. To
            ensure you do not miss out on a bonus, please check your spam folder
            in your email.
          </p>
          <p className="text-[#D5DCEB]">
            Bronze, Silver & Gold players will receive the bonus in the form of
            a daily reload, whilst Platinum and Diamond players get their bonus
            in the form of a one time bonus claim.
          </p>
        </>
      ),
    },
    {
      id: "vip-progress",
      title:
        "How do I calculate the amount I need to wager to move to the next level?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-1">
            Firstly, view the percentage left in your VIP progress bar in your
            account page on the top right hand corner. Multiply the percentage
            number left to the full 100% bar with the wager requirement you need
            to meet to unlock the new level.
          </p>

          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-solid decoration-[0.08em] underline-offset-4 text-white hover:text-white transition hover:decoration-[14%]">
            Click here to learn more.
          </a>
        </>
      ),
    },
    {
      id: "level-rewards",
      title: "What rewards do I get when I level up?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-1">
            Level Up Bonuses: These are fixed bonuses that get larger every time
            you level up. However we add extra on top in the form of a recent
            gameplay bonus depending on your profit/loss between levels.
          </p>
          <p className="text-[#D5DCEB] mb-1">
            Weekly/Monthly Bonuses: These are calculated with a base amount
            based on your VIP level. You will then receive extra for every
            $1,000 you wager in the corresponding time period.
          </p>
          <p className="text-[#D5DCEB]">
            Daily bonuses: Reloads are renewed with your VIP host once they
            expire.
          </p>
        </>
      ),
    },
    {
      id: "bonus-calc",
      title: "How do you calculate bonuses?",
      content: (
        <>
          <p className="text-[#D5DCEB] ">
            Bonuses are calculated as a mix between both your wagered amount and
            profit. We believe that players should always be rewarded regardless
            of whether you're winning or losing. It'd be unfair to only reward
            losing players. However, if you are unlucky, we'll be adding extra
            on top!
          </p>
        </>
      ),
    },
  ];

  const vipHostFaqs = [
    {
      id: "vip-host-help",
      title: "What can my VIP Host do for me?",
      content: (
        <>
          <p className="text-[#D5DCEB]">
            Your VIP Host is there to ensure you are being rewarded for your
            gaming experiences. They assist with reload renewals, guide you
            through your level-up progression, review sports limits, assess
            extra bonuses when available and address any issues faced by a user
            on the site.
          </p>
        </>
      ),
    },
    {
      id: "reload-benefit",
      title:
        "When I’m assigned a VIP host, does my Reload become a continuous or renewable benefit?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-1">
            When you reach Platinum IV and get assigned a host, you start
            receiving weekly reloads that are renewable. Once your weekly reload
            expires, you can contact your host who can renew your reload for the
            following 7 day period.
          </p>
          <p className="text-[#D5DCEB]">
            Your reload amount is based on your weekly gaming activity, aiming
            to give extra on top if you’ve had an unlucky week in terms of
            profit.
          </p>
        </>
      ),
    },
    {
      id: "vip-vs-support",
      title:
        "What is the job of a VIP host and how does it differ from regular Live Support assistance?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-1">
            VIP hosts are only given to players in Platinum IV and beyond. They
            are there to answer your queries about the VIP program and to ensure
            that you are collecting all the bonuses you are entitled to. VIP
            hosts have the ability to send more frequent and larger bonuses to
            players whilst ensuring the bonuses are befitting to your needs.
          </p>
          <p className="text-[#D5DCEB]">
            Live Support is there to help you with any technical issues you
            encounter on the platform.
          </p>
        </>
      ),
    },
    {
      id: "get-vip-host",
      title: "When do I get a VIP host?",
      content: (
        <>
          <p className="text-[#D5DCEB] ">
            VIP hosts are given to a player when they reach Platinum IV. They
            will be your dedicated support member who will help you with all of
            your queries and help guide your gaming experience. Eligibility is
            also subject to recent activity.
          </p>
        </>
      ),
    },
    {
      id: "host-vacation",
      title: "What can I do if my VIP host is on vacation?",
      content: (
        <>
          <p className="text-[#D5DCEB] mb-1">
            Make sure you ask your VIP host for a link to their unique VIP
            hosting channel. If you’ve missed out on doing so, you can send a
            message to live support and you will be given a VIP backup link.
            This backup host will be temporary until your host comes back.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto ">
      <div className="text-center pt-[32px] md:pt-[50px] md:pb-[30px] pb-[14px]">
        <h2 className="text-[20px] font-bold text-white mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-[#b1bad3] text-base relative top-[-1px]">
          Reach out to our award winning support team
        </p>
      </div>
      <div className="">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col [@media(min-width:915px)]:flex-row gap-2 [@media(min-width:915px)]:gap-6">
            {/* <div className="sticky top-6 h-fit self-start min-w-[180px] max-w-full bg-[rgb(15,33,46)] text-grey-100 rounded-md hidden [@media(min-width:915px)]:block">
              <div className="py-2 w-full">
                {links.map((item) => (
                  <div key={item} onClick={() => setActiveLink(item)}>
                    <div>
                      <div
                        className={`py-[10px] w-full px-5 cursor-pointer transition-colors font-normal text-white hover:bg-[#071824]
                          ${
                            activeLink === item
                              ? "border-l-[2.5px] border-blue-500"
                              : ""
                          }`}
                      >
                        {item}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Sidebar for large screens */}
            <div className="sticky top-6 h-fit self-start min-w-[180px] max-w-full bg-[rgb(15,33,46)] text-grey-100 rounded-md hidden [@media(min-width:915px)]:block">
              <div className="py-2 w-full">
                {links.map((item) => (
                  <div key={item} onClick={() => setActiveLink(item)}>
                    <div
                      className={`py-[10px] w-full px-5 cursor-pointer border-l-[2.5px]  transition-colors font-normal text-white hover:bg-[#071824]
              ${activeLink === item ? "border-blue-500" : "border-[rgb(15,33,46)]"}`}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top buttons for small screens */}
            <div className="flex justify-center  [@media(min-width:915px)]:hidden">
              <div className="flex  bg-[#0f212e] p-[6px] rounded-full">
                {links.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => setActiveLink(item)}
                    className={`px-4 py-2  rounded-full text-nowrap text-base font-semibold transition 
                        ${index !== 0 ? "ml-[6px]" : ""}
            ${activeLink === item
                        ? "bg-[#2f4553] text-white shadow-md"
                        : "text-[#fff] hover:text-white"
                      }`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/*  Content */}
            <div className="relative rounded-md bg-[#0f212eff] w-full h-full p-6">
              {activeLink === "General" && (
                <div className="space-y-2 cursor-pointer">
                  {generalFaqs.map((faq) => {
                    const isOpen = openItems.includes(faq.id);
                    return (
                      <div
                        key={faq.id}
                        className="bg-[#213843] rounded-md text-white">
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full flex justify-between items-center px-4 py-3  ">
                          <span className="font-semibold text-white cursor-pointer text-left ">
                            {faq.title}
                          </span>
                          <div>
                            <Icon
                              height={20}
                              width={20}
                              name="arrowDown"
                              className={`!w-5 !h-5 text-[#d5dceb] transition-transform ${isOpen ? "-rotate-180" : ""
                                }`}
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="border-t-[2px] border-[#2f4553] py-4 px-5">
                            <div className="text-[#D5DCEB]">{faq.content}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {activeLink === "Benefits" && (
                <div className="space-y-2 cursor-pointer">
                  {benefitsFaqs.map((faq) => {
                    const isOpen = openItems.includes(faq.id);
                    return (
                      <div
                        key={faq.id}
                        className="bg-[#213843] rounded-md text-white">
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full flex justify-between items-center px-4 py-3">
                          <span className="font-semibold text-white cursor-pointer text-left">
                            {faq.title}
                          </span>
                          <div>
                            <Icon
                              height={20}
                              width={20}
                              name="arrowDown"
                              className={`!w-5 !h-5 text-[#d5dceb] transition-transform ${isOpen ? "-rotate-180" : ""
                                }`}
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="border-t border-[#2F4652] p-4">
                            <div className="text-[#D5DCEB]">{faq.content}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {activeLink === "VIP Hosts" && (
                <div className="space-y-2 cursor-pointer">
                  {vipHostFaqs.map((faq) => {
                    const isOpen = openItems.includes(faq.id);
                    return (
                      <div
                        key={faq.id}
                        className="bg-[#213843] rounded-md text-white">
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full flex justify-between items-center px-4 py-3">
                          <span className="font-semibold text-white cursor-pointer text-left ">
                            {faq.title}
                          </span>
                          <div>
                            <Icon
                              height={20}
                              width={20}
                              name="arrowDown"
                              className={`!w-5 !h-5 text-[#d5dceb] transition-transform ${isOpen ? "-rotate-180" : ""
                                }`}
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="border-t border-[#2F4652] p-4">
                            <div className="text-[#D5DCEB]">{faq.content}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const VipClub = () => {
  const { openLiveSupport } = useAppStore();
  const [language, setLanguage] = useState("English");
  const languages = ["English", "Español", "Deutsch", "Français"];

  const [isVipOpen, setIsVipOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="relative w-full h-[16rem]  md:h-[284.05px]  px-[3vw] flex items-center">
        {/* Background Image */}
        <img
          src="/vip-club/vip-header.webp"
          alt="VIP Header"
          className="absolute inset-0 md:w-full min-w-[1200px] h-[16rem] md:max-h-[284.05px] md:h-full md:min-w-[1200px] object-cover" />

        <div className="absolute inset-0 "></div>

        <div className="max-w-[1200px]  w-[100%] mx-auto">
          <div className="w-[100%]">
            <div className=" flex  rounded-[8px]  relative  max-w-96 p-2 mb-0  bg-gradient-to-b from-[#213743] to-[#0f212e] h-auto aspect-[16/9]  md:h-[216px] max-[1024]:mx-auto">
              <div className="flex flex-col justify-center rounded-[8px] w-full bg-[#0F212E]/90 border-2 border-[#2f4553]">
                <div className="flex flex-col justify-between px-6 py-5 z-10 h-full">
                  <div className="flex justify-between mb-6">
                    <span className="text-sm text-white text-[20px] font-semibold">
                      UserName
                    </span>
                    {/* star svg */}
                    <Icon
                      className=" h-[22px] w-[22px] relative top-[1px] right-[0.2px]"
                      name={"starlightSilver"}
                    />
                  </div>

                  {/* progress section */}
                  <div className="w-full">
                    <div className="flex justify-between items-end gap-5">
                      <div
                        onClick={() => setIsVipOpen(true)}
                        className="text-[16px] flex font-semibold text-nowrap text-white">
                        Your VIP Progress
                        <div className="ml-2">
                          {" "}
                          <Icon
                            className="w-[20px] h-[20px] mt-[2px]"
                            name={"ChevronRight"}
                          />
                        </div>
                      </div>
                      <div className="text-md flex gap-1 items-center">
                        <span className="text-sm font-semibold text-white">
                          0.00%
                        </span>
                        <Icon
                          onClick={() => setOpen(!open)}
                          className="h-[20px] w-[20px] text-[#b1bad3]"
                          name={"Info"}
                        />

                        {open && (
                          <div className="absolute z-10  bg-white text-[#1A2C38] text-[14px] rounded-[8px] shadow-lg px-4 py-3 top-[20px] md:top-[10%] -right-[14px] md:-right-[127px]">
                            <p className="max-w-[300px]">
                              All settled sports and racing bets contribute to
                              progression at a 3× rate, while Casino bets
                              progress at a 1× rate. Voided bets are excluded.
                            </p>

                            {/* Tooltip arrow */}
                            <div className="absolute -bottom-[4px] md:right-[50%] right-[16%] w-3 h-3 bg-white rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* progress bar */}
                    <div className="relative w-full my-2 overflow-hidden rounded-full bg-[#2F4553] h-2.5">
                      <div
                        className="h-full w-0 shadow-lg rounded-full bg-green-400"
                        style={{ width: "0%" }}></div>
                    </div>

                    {/* levels */}
                    <div className="flex justify-between w-full">
                      <div className="flex items-center gap-1 text-sm text-[#B1BAD3]">
                        <Icon
                          className="h-[14.5px] w-[14.5px] mr-[1px]"
                          name={"starlightSilver"}
                        />
                        <div className="ml-[2px]"> None</div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[#B1BAD3]">
                        <Icon
                          className="h-[14px] w-[14px] mr-[3px]"
                          name={"starBronze"}
                        />
                        Bronze
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[3vw]">
        {" "}
        <section className="bg-[#1A2C38]    max-w-[1200px] mx-auto  text-white mt-4  pt-12 md:mt-12">
          <div className=" ">
            <h2 className="text-center text-xl font-bold mb-[24px] md:mb-10">
              Stake VIP ranking system
            </h2>
            <div className="grid overflow-y-hidden  px-0 grid-flow-col auto-cols-[calc(65%)] min-[500px]:auto-cols-[calc(40%)] md:auto-cols-[calc(23.8%)]  gap-4 overflow-x-auto scrollbar-hidden">
              {vipTiers.map((tier, i) => (
                <div className="flex flex-col gap-[32px]" key={i}>
                  {" "}
                  <div className="flex gap-3 w-full items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#213843]">
                      {tier.icon}
                    </div>

                    <div className="  w-[105%] flex-1 -mr-2 h-[4.8px] rounded-md bg-[#213843]"></div>
                  </div>
                  <div className="flex flex-col flex-1 w-full bg-[#213843] h-[20rem] rounded-[8px] gap-4 p-5 shadow-lg">
                    <span
                      className={`${tier.color} px-1 py-[2px] rounded-md text-[16px] font-[500] w-fit`}>
                      {tier.title}
                    </span>

                    <div>
                      <h3 className="md:text-[32px] text-[28px] font-bold leading-[36px] md:leading-[40px]">
                        {tier.amount}
                      </h3>
                      <span className="text-[16px] text-[#B1BAD3]">
                        Wager amount
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {tier.perks.map((perk, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-[16px]">
                          <div
                            className="h-4 min-w-4 flex items-center justify-center rounded-[50%]"
                            style={{ backgroundColor: tier.iconColor }}>
                            <Icon
                              className="text-black w-3 h-3"
                              name={"check"}
                            />
                          </div>
                          {perk}
                        </li>
                      ))}
                    </ul>

                    {tier.special ? (
                      <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        width="16"
                        height="16"
                        className="inline-block shrink-0 text-current"
                      >
                        <path
                          fill="#B1BAD3"
                          d="M15.65 1.775h-.3l-3.4 1.2-3.4-1.2c-.6-.2-1.3.2-1.4.9v2.5c0 .7.6 1.2 1.2 1.2h.3l3.3-1.5 3.4 1.5c.7.2 1.3-.2 1.5-.9v-2.5c0-.7-.6-1.2-1.2-1.2m-5.4 18.9-4.5-15c-.3-.6-.9-.9-1.6-.7l-1.5.5c-.5.1-.8.6-.8 1.1l-.9 14.4c0 .7.5 1.2 1.1 1.3h7c.7 0 1.2-.5 1.2-1.2.1-.1 0-.3 0-.4m11.8-14.1c0-.5-.3-.9-.8-1.1l-1.5-.6c-.6-.2-1.3.1-1.5.7l-4.5 15c-.2.6.2 1.3.8 1.5.1 0 .2.1.4.1h6.9c.7 0 1.2-.5 1.2-1.2z"
                        />
                      </svg>
                      <span className="text-white text-[16px] ml-2">Dedicated VIP host</span>
                    </div>
                    ): ("")}

                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="bg-[#1A2C38] w-full  text-white py-8 md:py-12">
            <h2 className="text-center text-[20px] font-bold mb-6 md:mb-10">
              Stake VIP Club Benefits
            </h2>

            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 ">
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start md:gap-[24px] gap-[16px] bg-[#213843] p-4 rounded-[8px]">
                  {/* Image */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="min-w-[74px] h-[74px] object-contain"
                  />

                  {/* Text */}
                  <div className="flex gap-1 flex-col h-full justify-center">
                    <h3 className="font-bold text-[16px]">{item.title}</h3>
                    <p className="text-[#B1BAD3] text-[16px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <FrequentlyAskedQuestions />
          </section>
          <section className="bg-[#213843] p-[24px] md:p-[32px_40px] mb-[64px]  text-white rounded-[8px] grid gap-4 md:gap-20 md:grid-cols-[1fr_auto] items-center">
            
            <div>
              <h2 className="text-xl font-bold ">
                Live, 24-hour customer support
              </h2>
              <p className="text-[#B1BAD3] pr-0 lg:pr-20">
                Real support from real people. We’re available through instant
                live chat and email to help you.
              </p>
            </div>

            <div className="grid gap-3 w-full max-w-[352px] md:w-auto md:grid-cols-[auto_auto] md:justify-end">
              <div className="relative w-full md:w-[220px]" ref={dropdownRef}>
                <label className="block text-[#B1BAD3] text-[16px] mb-1">
                  Preferred language
                </label>

        
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center active:scale-[.98] justify-between bg-[#0F212E] rounded-md px-5 md:px-4 py-[10px] text-white cursor-pointer select-none w-full">
                  <span className="font-semibold">{language}</span>
                  <Icon
                    name="ChevronRight"
                    className={`w-[20px] h-[20px] transition-transform duration-200 ${
                      open ? "rotate-[270deg]" : "rotate-[90deg]"
                    }`}
                  />
                </div>

             
                {open && (
                  <div className="absolute top-[110%] left-[35%] bg-white rounded-md shadow-lg w-[103px]  py-2 text-[#1A2C38] z-20">
                    <div className="absolute -top-[3px] left-12 w-3 h-3 bg-white rotate-45"></div>

                    {languages.map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setOpen(false);
                        }}
                        className={`px-4 py-2 text-[16px] font-semibold cursor-pointer ${
                          lang === language
                            ? "text-[#1A73E8] font-semibold"
                            : ""
                        } ${lang === language ? "hover:bg-white": "hover:bg-[#B1BAD3]"}`}>
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

           
              <button onClick={openLiveSupport} className="bg-[#1A73E8] text-nowrap hover:bg-[#1a63c0] text-white font-[500] px-5 py-[10px] rounded-md transition mt-1 md:mt-[28px] w-full md:w-auto cursor-pointer">
                Chat with us
              </button>
            </div>
    </section>
        </section>
      </div><LiveSupport/>

      {isVipOpen && (
        <VIPModal open={isVipOpen} onClose={() => setIsVipOpen(false)} />
      )}
    </div>
  );
};

export default VipClub;
