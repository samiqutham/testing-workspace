"use client";

import Icon from "@workspace/ui/icons/icons";
import { useAppStore } from "@workspace/ui/store/store";
import { useEffect, useRef, useState } from "react";
interface User {
  name: string;
  avatar: string;
  alt: string;
}

interface HelpCard {
  id: number;
  title: string;
  subtitle: string;
  height: number;
}

const LiveSupport = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { isLiveSupportOpen, closeLiveSupport } = useAppStore();
  const [nextStep, setNextStep] = useState(1);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [selectedStep, setSelectedStep] = useState<any>(null);
  const [stepHistory, setStepHistory] = useState<number[]>([1]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const percent =
        (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrolled(percent >= 10);
    };

    el.addEventListener("scroll", onScroll);
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, [activeTab, isLiveSupportOpen]);

  const users: User[] = [
    {
      name: "user1",
      avatar: "/helpbg/default-avatar.png",
      alt: "Profile image for user1",
    },
    {
      name: "user2",
      avatar: "/helpbg/default-avatar.png",
      alt: "Profile image for user2",
    },
    {
      name: "user3",
      avatar: "/helpbg/default-avatar.png",
      alt: "Profile image for user3",
    },
  ];

  const helpCards: HelpCard[] = [
    {
      id: 1,
      title: "INR: How to Deposit?",
      subtitle:
        "Go to the deposit page, select INR, and enter the deposit amount…",
      height: 74,
    },
    {
      id: 2,
      title: "Bank Transfer Deposit: Processing Time and Troubleshooting",
      subtitle:
        "Troubleshooting: If you have not received your deposit even after 24 hours…",
      height: 116,
    },
    {
      id: 3,
      title: "INR: How to Withdraw Money",
      subtitle:
        "To withdraw funds in INR on Stake, follow the instructions provided…",
      height: 95,
    },
    {
      id: 4,
      title: "Bank Transfer Withdrawal: Processing Time and Troubleshooting",
      subtitle: "Processing time varies depending on your payment method…",
      height: 116,
    },
    {
      id: 5,
      title: "Proof of Identity for India: Acceptable Documentation",
      subtitle:
        "Please note that Stake's compliance team reserves the right to…",
      height: 116,
    },
    {
      id: 6,
      title: "What is the Stake Affiliate Program?",
      subtitle: "Learn everything about our affiliate program, commission,…",
      height: 95,
    },
    {
      id: 7,
      title: "Crypto: Help with Deposits",
      subtitle: "Common questions about crypto deposits",
      height: 74,
    },
    {
      id: 8,
      title: "What is the Stake VIP Program?",
      subtitle: "The VIP program and everything you need to know about it.",
      height: 95,
    },
  ];

  const tabs: any[] = [
    {
      id: "home",
      label: "Home",
      current: activeTab === "home",
      icon: (
        <Icon
          name={`${activeTab === "home" ? "home" : "unActiveHome"}`}
          className="h-6 w-6"
        />
      ),
    },
    {
      id: "messages",
      label: "Messages",
      current: activeTab === "messages",
      icon: (
        <Icon
          name={`${activeTab === "messages" ? "noMessageSvg" : "messages"}`}
          className="h-6 w-6"
          fill="blue"
        />
      ),
    },
    {
      id: "help",
      label: "Help",
      current: activeTab === "help",
      icon: (
        <Icon
          name={`${activeTab === "help" ? "activeHelp" : "help"}`}
          className="h-6 w-6"
        />
      ),
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const UserAvatarStack = () => {
    return (
      <div className="flex -space-x-2">
        {users.map((user, index) => (
          <div key={index} className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
              <img
                src={user.avatar}
                alt={user.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const HelpCardComponent = ({ card }: { card: HelpCard }) => {
    return (
      <div
        className=" bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer"
        style={{ height: `${card.height}px` }}>
        <div className="h-full flex flex-col justify-center p-4">
          <div className="flex items-center group">
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600">
                {card.title}
              </div>
              <div className="text-[14px] text-[#6c6f74] line-clamp-2">
                {card.subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const TabBar = () => {
    return (
      <div className="flex bg-white rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center px-[3px] py-[18px] h-[80px] text-sm relative top-[1px] transition-colors duration-200 focus:outline-none
            ${
              tab.current
                ? "text-blue-600 "
                : "text-[#6c6f74] hover:text-blue-600"
            }
          `}
            role="tab"
            aria-selected={tab.current}>
            <div className="w-6 h-6 mb-2">{tab.icon}</div>
            <span className="leading-[14px] font-normal">{tab.label}</span>
          </button>
        ))}
      </div>
    );
  };

  const collections: any[] = [
    {
      id: 1,
      title: "Getting Started",
      articles: 8,
      steps: [{ title: "Verifying Your Account", description: "8 articles" }],
    },
    {
      id: 2,
      title: "Account",
      articles: 11,
      steps: [
        { title: "Managing Your Account", description: "8 articles" },
        { title: "Troubleshooting", description: "2 articles" },
        { title: "Stake Chat", description: "1 article" },
      ],
    },
    {
      id: 3,
      title: "Stake Smart",
      articles: 8,
      steps: [
        { title: "Self Exclusion", description: "5 articles" },
        { title: "Gambling limits", description: "2 articles" },
        { title: "Other", description: "1 article" },
      ],
    },
    {
      id: 4,
      title: "Payments",
      articles: 25,
      steps: [
        { title: "Local Currency", description: "9 articles" },
        { title: "Crypto", description: "16 articles" },
      ],
    },
    {
      id: 5,
      title: "Casino",
      articles: 21,
      steps: [
        { title: "How to Play", description: "Learn casino basics..." },
        { title: "Bonus & Promotions", description: "All casino bonuses..." },
      ],
    },
    {
      id: 6,
      title: "Sports",
      articles: 9,
      steps: [
        { title: "Placing Bets", description: "Guide to sports betting..." },
        { title: "Live Betting", description: "How to bet live..." },
      ],
    },
    {
      id: 7,
      title: "Bonuses & Promotions",
      articles: 29,
      steps: [
        { title: "Placing Bets", description: "Guide to sports betting..." },
        { title: "Live Betting", description: "How to bet live..." },
      ],
    },
    {
      id: 8,
      title: "Loyalty Programs",
      articles: 10,
      steps: [
        { title: "Placing Bets", description: "Guide to sports betting..." },
        { title: "Live Betting", description: "How to bet live..." },
      ],
    },
  ];

  // navigation helpers
  const goToStep = (step: number) => {
    setNextStep(step);
    setStepHistory((prev) => [...prev, step]);
  };

  const goBack = () => {
    setStepHistory((prev) => {
      if (prev.length > 1) {
        const updated = prev.slice(0, -1);
        const previousStep = updated[updated.length - 1] ?? 1;

        setNextStep(previousStep);

        // 🔹 Reset selectedCollection when going back to main collection list
        if (previousStep === 1) {
          setSelectedCollection(null);
        }

        return updated;
      }

      // Already at the first step
      setNextStep(1);
      setSelectedCollection(null);
      return prev;
    });
  };

  if (!isLiveSupportOpen) return null;

  return (
    <div
      className={`fixed z-[9999] bottom-5  right-5 w-[400px] h-[704px] max-[1200px]:h-[649px]  bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
      max-[450px]:w-full max-[450px]:top-0 max-[450px]:left-0 max-[450px]:right-0 max-[450px]:h-full max-[450px]:rounded-none
       origin-bottom-right
      animate-[popupOpen_0.3s_ease-out]
    `}>
      <div className="bg-[url('@workspace/ui/assets/helpbg/helpbg.png')] bg-noRepeat bg-center h-[270] w-full -z-50 absolute top-0"></div>

      <div className="flex-1 h-auto overflow-hidden flex flex-col">
        {/* Main Content */}

        {activeTab === "home" && (
          <main
            ref={scrollRef}
            className="flex-1 overflow-x-hidden overflow-y-auto h-full [overscroll-behavior:contain] [scrollbar-color:#090e1566_transparent] [scrollbar-width:thin]">
            <div className="px-5 ">
              {/* Logo and User Avatars */}
              <div className="text-center pb-[60px] px-5 pt-8 flex gap-18 items-center ">
                <div className="mb-4">
                  <Icon
                    name={"logo"}
                    className="w-[105px] h-[32.47px]"
                    fill="white"
                  />
                </div>

                <div className=" mb-4">
                  <UserAvatarStack />
                </div>

                <button
                  onClick={closeLiveSupport}
                  className={`absolute top-[32px] right-[20px] w-9 h-9 flex justify-center items-center rounded-[10px] transition-colors duration-300 !z-50 cursor-pointer hover:bg-[#090e1533]
                ${scrolled ? "bg-[#090e1533]" : ""}`}
                  aria-label="Close chat">
                  <Icon
                    name={"closeChat"}
                    className="w-4 h-4 text-white"
                    fill="white"
                  />
                </button>
              </div>

              <div className="text-[28px] leading-[34px] font-semibold break-words px-5 pb-[20px]">
                <p className="text-[#fafafa] opacity-60 [text-shadow:0_0_30px_rgba(255,255,255,0.3)]">
                  Hey User👋
                </p>
                <p className="text-[#fafafa]  [text-shadow:0_0_30px_rgba(255,255,255,0.3)]">
                  How can we help?
                </p>
              </div>

              {/* Search Button */}
              <div className="mb-[12px] ">
                <button
                  onClick={() => setActiveTab("help")}
                  className="bg-white font-semibold  w-full flex items-center justify-between text-[14px] py-[18px] px-[20px]  rounded-lg text-black hover:text-blue-600 shadow-[0_4px_28px_0_rgba(9,14,21,0.06),_0_1px_4px_0_rgba(9,14,21,0.06)]">
                  Search for help
                  <Icon name={"searchHelp"} className="text-blue-600 h-4 w-4" />
                </button>
              </div>

              {/* Help Cards */}
              <div className="space-y-[10px]">
                {helpCards.map((card) => (
                  <HelpCardComponent key={card.id} card={card} />
                ))}
              </div>

              {/* Send Message Button */}
              <div
                role="button"
                className="flex items-center justify-between w-full max-w-sm p-4 px-5 h-[53px] my-[10px] bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 focus:outline-none">
                {/* Left Section */}
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Send us a message
                    </div>
                  </div>
                </div>

                {/* Right Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full text-blue-600">
                  <Icon name={"sendMessage"} className="h-4 w-[17px]" />
                </div>
              </div>
            </div>
          </main>
        )}

        {activeTab === "messages" && (
          <div className="flex flex-col w-full h-[704px]  border-b border-[#f5f5f5] shadow bg-white">
            {/* Header */}
            <div className="h-fit">
              <nav className="flex items-center justify-center h-[52.8px] px-[13px] py-2  ">
                <div className="flex  flex-grow flex-row items-center justify-between gap-[2px] text-[18px] text-[#14161A]">
                  <div className="pr-1 flex flex-1 justify-start w-full"></div>
                  <h1 className="text-lg font-semibold text-center">
                    Messages
                  </h1>
                  <div className="w-9 h-9 flex flex-1 justify-end">
                    <button
                      onClick={closeLiveSupport}
                      className={`p-[10px]  rounded-[10px] transition-colors duration-300 cursor-pointer hover:bg-[#090e1533]
                ${scrolled ? "bg-[#090e1533]" : ""}`}
                      aria-label="Close chat">
                      <Icon
                        name={"closeChat"}
                        className="w-[16px] h-[16px] text-[#6c6f74]"
                        fill="#6c6f74"
                      />
                    </button>
                  </div>
                </div>
              </nav>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 overflow-hidden relative">
              <div className="flex-1 w-full max-h-full overflow-y-scroll [overscroll-behavior:contain] [scrollbar-color:#090e1566_transparent] [scrollbar-width:thin]">
                <div className="flex flex-col items-center justify-center gap-[20px] mx-[35px] min-h-full text-[rgb(20,22,26)]">
                  <Icon name={"noMessageSvg"} className="h-8 w-[33px]" />
                  <h2 className="text-lg font-semibold text-black">
                    No messages
                  </h2>
                  <span className="text-sm text-[#14161a] ">
                    Messages from the team will be shown here
                  </span>
                  <button className="flex items-center gap-[16px] px-4 leading-[20px] py-[10px] text-sm font-semibold text-[#fafafa] bg-[#1475e1] absolute bottom-5 shadow hover:bg-[#3a8fee] transition rounded-[10px] cursor-pointer">
                    Send us a message
                    <Icon name={"sendMessage"} className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "help" && (
          <div>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col w-full h-[625px] shadow bg-white">
                {/* Header */}
                <div className="h-fit">
                  <nav className="flex items-center justify-center h-[52.8px] px-[13px] py-2  ">
                    <div className="flex  flex-grow flex-row items-center justify-between gap-[2px] text-[18px] text-[#14161A]">
                      <div className="pr-1 flex flex-1 justify-start w-full">
                        {/* Back button */}
                        {nextStep > 1 && (
                          <button
                            aria-label="Go back"
                            onClick={goBack}
                            className="absolute left-[10px] top-[8px] w-9 h-9 flex justify-center items-center rounded-[10px] hover:bg-[#090e1533] transition-colors duration-300">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-gray-700">
                              <path
                                d="M10.85 3.99984C10.85 4.21984 10.77 4.43984 10.6 4.59984L7.20005 7.99984L10.6 11.3998C10.93 11.7298 10.93 12.2698 10.6 12.5998C10.27 12.9298 9.73005 12.9298 9.40005 12.5998L4.80005 7.99984L9.40005 3.39984C9.73005 3.06984 10.27 3.06984 10.6 3.39984C10.77 3.56984 10.85 3.77984 10.85 3.99984Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                      <h1 className="text-lg font-semibold text-center">
                        Help
                      </h1>
                      <div className="w-9 h-9 flex flex-1 justify-end">
                        <button
                          onClick={closeLiveSupport}
                          className={`p-[10px]  rounded-[10px] transition-colors duration-300 cursor-pointer hover:bg-[#090e1533]
                ${scrolled ? "bg-[#090e1533]" : ""}`}
                          aria-label="Close chat">
                          <Icon
                            name={"closeChat"}
                            className="w-[16px] h-[16px] text-[#6c6f74]"
                            fill="#6c6f74"
                          />
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>

                {/* Search */}
                <div className="px-[13px] pt-0 pb-[8px] ">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for help"
                      className="w-full rounded-lg py-[11.5px] pr-[5px] pl-[10px] bg-[#F5F5F5] text-black placeholder:text-black font-normal text-sm focus:outline-none placeholder:font-normal text-[14px]"
                    />
                    <Icon
                      name={"helpSearch"}
                      className="text-blue-600 absolute right-[10px] top-[13px] w-4 h-4"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1  py-4 overflow-y-scroll [overscroll-behavior:contain] [scrollbar-color:#090e1566_transparent] [scrollbar-width:thin] ">
                  {/* STEP 1: show all collections */}
                  {nextStep === 1 && (
                    <>
                      <div className="font-semibold text-black mb-3 px-5">
                        {collections.length} collections
                      </div>
                      <ul className="divide-y max-h-[621px] overflow-hidden ">
                        {collections.map((col, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setSelectedCollection(col);
                              goToStep(2);
                            }}
                            className="flex items-center justify-between py-[16px] cursor-pointer px-5 hover:bg-blue-100 group text-sm">
                            <div className="flex flex-col gap-[6px] ">
                              <p className=" text-gray-800 font-semibold group-hover:text-blue-600">
                                {col.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {col.articles} articles
                              </p>
                            </div>
                            <Icon
                              name={"rightArrowHelp"}
                              className="text-blue-600 w-4 h-4"
                            />
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* STEP 2: show selected collection's steps */}
                  {nextStep === 2 && selectedCollection && (
                    <ul className="divide-y max-h-[621px]  overflow-hidden">
                      {selectedCollection.steps.map((step: any, k: any) => (
                        <li
                          key={k}
                          onClick={() => {
                            setSelectedStep(step);
                            goToStep(3);
                          }}
                          className="flex items-center justify-between py-[16px] px-5 cursor-pointer hover:bg-blue-100 group text-sm">
                          <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold text-gray-800 group-hover:text-blue-600">
                              {step.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {step.description}
                            </p>
                          </div>
                          <Icon
                            name={"rightArrowHelp"}
                            className="text-blue-600 w-4 h-4"
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* STEP 3: show individual article details */}
                  {nextStep === 3 && selectedStep && (
                    <div className="flex flex-col px-5 gap-3">
                      <h2 className="font-semibold text-black mb-2">
                        {selectedStep.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedStep.description} — Full content of this help
                        article would be displayed here with rich text or
                        markdown support.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Bar */}
        <div
          className={`${activeTab === "help" ? "fixed w-[400px]  max-[450px]:w-full  max-[450px]:bottom-0 bottom-5" : ""} `}>
          <TabBar />
        </div>
      </div>
    </div>
  );
};

export default LiveSupport;
