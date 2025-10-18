"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@workspace/ui/store/store";
import Icon from "@workspace/ui/icons/icons";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { cn } from "@workspace/ui/lib/utils";
import { useIsTab } from "@workspace/ui/hooks/use-tab";
import { usePort } from "@workspace/ui/hooks/use-port";
import { useExchangeTab } from "@workspace/ui/hooks/use-exchange-tab";

import { Button } from "@workspace/ui/components/button";
import fr from "@workspace/ui/assets/flags/fr.png";
import de from "@workspace/ui/assets/flags/de.png";
import tr from "@workspace/ui/assets/flags/tr.png";
import pt from "@workspace/ui/assets/flags/pt.png";
import hi from "@workspace/ui/assets/flags/in.png";
import ph from "@workspace/ui/assets/flags/ph.png";
import jp from "@workspace/ui/assets/flags/jp.png";
import pl from "@workspace/ui/assets/flags/pl.png";
import th from "@workspace/ui/assets/flags/th.png";
import no from "@workspace/ui/assets/flags/no.png";
import ru from "@workspace/ui/assets/flags/ru.png";
import vn from "@workspace/ui/assets/flags/vn.png";
import kr from "@workspace/ui/assets/flags/kr.png";
import es from "@workspace/ui/assets/flags/es.png";
import fi from "@workspace/ui/assets/flags/fi.png";
import ae from "@workspace/ui/assets/flags/ae.png";
import pk from "@workspace/ui/assets/flags/pk.png";
import id from "@workspace/ui/assets/flags/id.png";
import ng from "@workspace/ui/assets/flags/ng.png";
import zh from "@workspace/ui/assets/flags/cn.png";
import ChatRulesModal from "@workspace/ui/common/modal/chat-rules/index";

const menuItems = [
  { label: "English" },
  { label: "Sports" },
  { label: "Challenges" },
  { label: "India" },
  { label: "Suomen" },
];

type ChatMessage = {
  user: string;
  message: string;
  mentions?: string[];
  icon?: string;
};

export default function MChat({
  initialAnimation,
  animateTo,
}: {
  initialAnimation: any;
  animateTo: any;
}) {
  const { closeDrawer, activeDrawer } = useAppStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTab();
  const exchangeTab = useExchangeTab();

  const { hostPort, origin } = usePort();
  const [chatPopup, setChatPopup] = useState(false);
  const menuItems = [
    { title: "Challenges", icon: "chalenges" },
    { title: "Français", img: fr },
    { title: "Deutsch", img: de },
    { title: "Türkçe", img: tr },
    { title: "Português", img: pt },
    { title: "India", img: hi },
    { title: "Filipino", img: ph },
    { title: "日本語", img: jp },
    { title: "Polski", img: pl },
    { title: "ประเทศไทย", img: th },
    { title: "Norway", img: no },
    { title: "Русский", img: ru },
    { title: "Tiếng Việt", img: vn },
    { title: "한국어", img: kr },
    { title: "Español", img: es },
    { title: "Suomi", img: fi },
    { title: "العربية", img: ae },
    { title: "Pakistan", img: pk },
    { title: "Indonesian", img: id },
    { title: "Nigeria", img: ng },
    { title: "中文", img: zh },
  ] as any;

  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState("");

  const [selectedItem, setSelectedItem] = useState<any>(menuItems[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      user: "CanIGitAHoYa",
      message: "wtf high roller is claimed in seconds at 100k",
      icon: "bronze",
    },
    {
      user: "AstraBitcoins",
      message: "yes @JimmyFin hit me with the doozy please",
      icon: "silver",
    },
    { user: "esh1236", message: "@kcristine99 hey mate 👋", icon: "gold" },
    {
      user: "quillL",
      message: "hello there @kcristine99 how are you mate?",
      icon: "one",
    },
    {
      user: "Vojkan",
      message: "@Xifeng Making room for E and O.",
      icon: "two",
    },
    { user: "G553", message: "dont jinx it", icon: "three" },
    {
      user: "Jimmy8888",
      message:
        "@AstraBitcoins U gotta put yourself first dear.always yourself 1st",
      icon: "four",
    },
  ]);
  const [msg, setMsg] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showChatRules, setShowChatRules] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedItem]);

  // Auto-scroll on new message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpen = () => {
    // Yeh nayi Chrome window/tab me sirf chat section open karega
    setChatPopup(true);
    window.open("/chat", "ChatWindow", "width=400,height=700");
  };

  const sendMessage = () => {
    if (!msg.trim()) return;
    setChatMessages([
      ...chatMessages,
      { user: "Anonymous", message: msg, icon: "silver" },
    ]);
    setMsg("");
  };

  const wrapMentions = (text: string) =>
    text.replace(
      /(@\w+)/g,
      `<span class="bg-[#0f212e] text-[#b1bad3] font-semibold px-1">$1</span>`
    );

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // reset
      el.style.height = el.scrollHeight + "px"; // grow
    }
  };

  return (
    <motion.div
      initial={initialAnimation}
      animate={animateTo}
      exit={initialAnimation}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex flex-col h-full relative bg-[#0f212e] text-white",
        path === "/chat"
          ? "w-full"
          : isMobile ||
              (exchangeTab &&
                (hostPort === "3003" ||
                  origin === "stakefair-exchange.vercel.app"))
            ? "w-full"
            : isTablet
              ? "w-[320px]"
              : !isMobile && !isTablet && "w-[370px]"
      )}>
      {/* Header */}
      <div className="flex z-40 items-center justify-between pl-4 pr-1.5 py-0 h-[60px] relative shadow-[0_10px_15px_-3px_rgba(0,0,0,.2),_0_4px_6px_-2px_rgba(0,0,0,.1)]">
        {/* Left side: Stake + dropdown */}
        <div
          ref={menuRef}
          className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          {selectedItem?.icon ? (
            <Icon
              name={selectedItem.icon}
              className="!w-[20px] !h-[20px] relative top-[-1px]"
            />
          ) : (
            <img
              src={selectedItem.img.src}
              width={20}
              height={20}
              alt="flags"
              loading="lazy"
            />
          )}
          <span className="font-semibold leading-[14px] text-base relative bottom-[1px]">
            {selectedItem.title}
          </span>

          {isOpen ? (
            <Icon
              name={"ChevronDown"}
              className="h-[14px] w-[14px] "
              style={{ transform: "rotate(180deg)" }}
              fill="#fff"></Icon>
          ) : (
            <Icon
              name={"ChevronDown"}
              className="h-[14px] w-[14px] -mt-[1px]"
              fill="#fff"></Icon>
          )}
        </div>

        {/* Right side: close btn */}
        <div className={cn("flex items-center", path === "/chat" && "hidden")}>
          <button
            className={cn(
              "text-slate-400 max-[1000px]:hidden cursor-pointer hover:text-white p-3",
              chatPopup && "hidden"
            )}
            onClick={handleOpen}>
            <Icon name={"openNew"} className="h-5 w-5" fill="#b1bad3"></Icon>
          </button>
          <button
            onClick={closeDrawer}
            className="text-slate-400 cursor-pointer hover:text-white p-3">
            <Icon name={"closeIcon"} className="h-5 w-5" fill="#b1bad3"></Icon>
          </button>
        </div>
        {isOpen && (
          <div
            ref={menuRef}
            className="absolute top-13 left-0 py-1 w-[137px] bg-white text-[#1f2937] rounded-lg shadow-lg z-50">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-white"></div>
            <div className="overflow-y-auto max-h-[410px] scroll-width-none">
              {menuItems.map((item: any, i: number) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedItem(item);
                    setIsOpen(false);
                  }}
                  className={`flex gap-2 rounded-lg items-center px-3 py-3 cursor-pointer ${
                    selectedItem.title === item.title
                      ? "text-[#005aff] font-semibold"
                      : "text-[#374151]"
                  } hover:bg-gray-100`}>
                  {item?.icon ? (
                    <Icon
                      name={item.icon}
                      className="!w-[20px] !h-[20px] relative top-[-1px]"
                    />
                  ) : (
                    <img
                      src={item.img.src}
                      width={20}
                      height={20}
                      alt="flags"
                    />
                  )}
                  <span className="text-base">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        ref={chatContainerRef}
        className={`flex-1 flex flex-col  overflow-y-auto px-4
              pb-[130px] scrollbar-thin scrollbar-thumb-slate-600
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
        {/* Skeleton loader when loading */}
        {isLoading && (
          <div className="space-y-2">
            {/* Date skeleton */}
            <div className="flex justify-between pt-[5px]">
              <div className="h-3 w-16 bg-[#213743] rounded animate-pulse"></div>
              <div className="h-3 w-12 bg-[#213743] rounded animate-pulse"></div>
            </div>

            {/* Message skeletons */}
            {[...Array(6)].map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="bg-[#213743] rounded py-2 px-4 first:mt-[6px] mt-2 text-base flex items-center gap-2 animate-pulse">
                {/* Message content skeleton */}
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-32 bg-[#B1BAD3] rounded"></div>
                  <div className="h-3 w-full bg-[#B1BAD3] rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actual content */}
        {!isLoading && (
          <>
            <div className="flex justify-between text-base text-[#b1bad3] pt-[5px]">
              <p>Thursday</p>
              <p>3:10 PM</p>
            </div>

            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-[#213743] rounded py-2 px-4 first:mt-[6px] mt-2 text-base flex items-center gap-2">
                {/* user icon */}
                {msg.icon && (
                  <Icon
                    name={msg.icon}
                    className="w-[14px] h-[14px]"
                    fill="rgb(177,186,211)"
                  />
                )}
                {/* user + message */}
                <div>
                  <span className="text-[#b1bad3] font-semibold mr-2">
                    {msg.user}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: wrapMentions(msg.message),
                    }}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Input Area (fixed) */}
      <div
        className={cn(
          "fixed right-0",
          path === "/chat"
            ? "w-full left-0 bottom-0 "
            : isMobile ||
                (exchangeTab &&
                  (hostPort === "3003" ||
                    origin === "stakefair-exchange.vercel.app"))
              ? "left-0 bottom-[4px]"
              : isTablet
                ? "w-[320] bottom-0"
                : !isMobile && !isTablet && "w-[370] bottom-0"
        )}>
        <div className="bg-[#213743] py-[16px] p-4 flex flex-col gap-2 ">
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            ref={textareaRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
            onInput={handleInput}
            maxLength={160}
            placeholder="Type your message"
            className="bg-[#0f212e] text-white scroll-width-none leading-[1.5] h-[44px] shadow-[0_1px_3px_0_rgba(0,0,0,0.2),_0_1px_2px_0_rgba(0,0,0,0.12)] rounded-[8px] border-2 border-[#2f4553] px-2 max-sm:py-2 py-2 text-sm resize-none placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#557086] placeholder-[#54646e] font-semibold"
          />

          <div className="flex justify-between items-center">
            <span className="online-dot">
              <span className="inline-block w-2 h-2 rounded-full z-[1] bg-[#1fff20]"></span>
              <span className="font-[500] leading-[18px] text-[12px]  text-[#b1bad3] ml-2">
                <span>Online: </span>
                <span className="font-[500] leading-[18px] text-[12px] text-[#b1bad3]  ">
                  47,940
                </span>
              </span>
            </span>

            <div className="flex items-center gap-3">
              <span className="leading-[18px] text-[#b1bad3] text-sm  font-[500]">
                {160 - (msg.length || 0)}
              </span>
              <button
                onClick={() => setShowChatRules(true)}
                className="bg-[#2f4553] cursor-pointer shadow-md hover:bg-[#557086] px-4 py-[8px] rounded-[8px] text-base">
                <Icon name="rule" className="w-[20px] h-[20px]" fill="white" />
              </button>

              {showChatRules && (
                <ChatRulesModal
                  open={showChatRules}
                  onClose={() => setShowChatRules(false)}
                />
              )}

              <button
                onClick={sendMessage}
                className="inline-flex cursor-pointer relative items-center gap-2 justify-center rounded-[8px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50  active:scale-[0.98] bg-[#00e701] text-black hover:bg-green-400 hover:text-black focus-visible:outline-white text-base leading-none shadow-2xl py-[0.8125rem] px-[1rem]">
                <span className="relative top-[0.5px]">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {chatPopup ? (
        <div className="absolute inset-0 bg-[#0f212e] flex justify-center items-center flex-col gap-2">
          <p className="text-[#b1BaD3] font-semibold">Chat is hidden</p>
          <Button
            onClick={() => setChatPopup(false)}
            className="bg-[#1475E1] h-11 font-semibold cursor-pointer hover:bg-[#105eb4] py-2.5 px-5 text-base text-white rounded-sm">
            Show Chat
          </Button>
        </div>
      ) : (
        <></>
      )}
    </motion.div>
  );
}
