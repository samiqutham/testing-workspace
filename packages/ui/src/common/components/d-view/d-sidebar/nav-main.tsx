"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import Icon from "@workspace/ui/icons/icons";
import { Separator } from "@workspace/ui/components/separator";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useAppStore } from "@workspace/ui/store/store";
import { AnimatePresence, motion } from "framer-motion";
const COOKIE_NAME = "googtrans";
export function NavMain({
  items,
}: {
  items: {
    title?: string;
    url?: string;
    icon?: string;
    isActive?: boolean;
    divider?: boolean;
    name?: string;
    badge?: number | string;
    items?: {
      title: string;
      url: string;
      icon: string;
      name?: string;
    }[];
  }[];
}) {
  const { open, isTablet, openTab, setOpenTab, setOpen } = useSidebar();
  const [selectedLanguage, setSelectedLanguage] = useState<any>("English");
  const [selectedTitle, setSelectedtitle] = useState<any>("English");
  const setActiveSubMenu = useAppStore((state) => state.setActiveSubMenu);
  const activeSubMenu = useAppStore((state) => state.activeSubMenu);

  useEffect(() => {
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue: any;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = globalThis.__GOOGLE_TRANSLATION_CONFIG__?.defaultLanguage;
    }
    const languageTitle =
      globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages?.find(
        (lang) => lang.name === languageValue
      )?.title || languageValue;
    if (languageValue) {
      setSelectedLanguage(languageValue);
      setSelectedtitle(languageTitle);
    }
  }, []);

  const onClickSubMenu = (item: string) => {
    if (activeSubMenu === item) {
      console.log("if");
      setActiveSubMenu(""); // dobara click par close
    } else {
      console.log("else");
      setActiveSubMenu(item); // jo click hua wahi open
    }

    // Sidebar ko kholna
    if (isTablet) {
      !openTab && setOpenTab(true);
    } else {
      !open && setOpen(true);
    }
  };

  // const handleSelectLanguage = (lang: any, name: any) => {
  //   setSelectedLanguage(name);
  //   const cookieValue = `/auto/${name}`;
  //   setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });
  //   window.location.reload();
  // };
  const handleSelectLanguage = (lang: any, name: any) => {
    setSelectedLanguage(name);
    // setOpen(false);

    // Expire old googtrans cookie
    const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

    document.cookie = `googtrans=; ${expire}; path=/;`;
    document.cookie = `googtrans=; ${expire}; domain=.vercel.app; path=/;`;

    // Set new googtrans cookie
    const cookieValue = `/auto/${name}`;
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; domain=.vercel.app; path=/;`;

    // Also store in your app’s cookie (if you want)
    setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });

    // Refresh to apply translation
    window.location.reload();
  };

  return (
    <SidebarGroup
      className={cn(
        (isTablet ? openTab : open)
          ? "p-4"
          : "overflow-y-auto scroll-width-none"
      )}
    >
      <SidebarMenu
        className={cn(
          (isTablet ? openTab : open)
            ? "bg-[#1a2c38] rounded-[4px] gap-0"
            : "gap-2"
        )}
      >
        {items.map((item: any, index) =>
          item?.items ? (
            <Collapsible
              id={`menu-${item.title}`}
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              open={activeSubMenu === item.title}
              className="group/collapsible"
            >
              <SidebarMenuItem
                className={cn(
                  "rounded-sm",
                  (isTablet ? !openTab : !open) && "flex justify-center"
                )}
              >
                <CollapsibleTrigger
                  asChild
                  className="p-0 px-4 py-[13] h-10 cursor-pointer"
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => onClickSubMenu(item?.title)}
                    className={cn(
                      "!rounded-sm [&>svg]:text-current text-[#b1bad3] leading-none hover:text-white relative",
                      (isTablet ? !openTab : !open) && "!h-11 !w-11"
                    )}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        className={cn(
                          "!w-[14px] !h-[14px]",
                          (isTablet ? !openTab : !open) && "ml-[3px]"
                        )}
                      />
                    )}
                    {(isTablet ? !openTab : !open) && (
                      <Icon
                        name={"arrow"}
                        width={12}
                        height={12}
                        className={`transition-transform !h-[9px] relative -left-[8px] -rotate-90`}
                      />
                    )}
                    {(isTablet ? openTab : open) && (
                      <span className="font-semibold text-white">
                        {item.title.startsWith("Language")
                          ? `Language: ${selectedTitle}`
                          : item.title}
                      </span>
                    )}
                    <Icon
                      name={"arrow"}
                      width={12}
                      height={12}
                      className={`ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 !h-[12px] `}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent forceMount>
                  <AnimatePresence initial={false}>
                    {activeSubMenu === item.title && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <SidebarMenuSub className="ml-[23px] mr-0 gap-0 px-1">
                          {item.items?.map((subItem: any, idx: number) => (
                            <SidebarMenuSubItem key={idx}>
                              <SidebarMenuSubButton
                                asChild
                                translate="no"
                                className="px-[13px] py-[16px] [&>svg]:text-current rounded-none cursor-pointer h-10 text-[#b1bad3] hover:text-white"
                              >
                                {item.title === "Language: English" ? (
                                  <label
                                    htmlFor={subItem.title}
                                    className="flex custom-label  justify-between cursor-pointer w-full"
                                  >
                                    <span className="font-semibold text-sm text-white">
                                      {subItem.title}
                                    </span>

                                    <label
                                      className="inline-flex items-center relative"
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <input
                                        id={subItem.title}
                                        type="radio"
                                        value={subItem.name}
                                        checked={
                                          selectedLanguage === subItem.name
                                        }
                                        onChange={() =>
                                          handleSelectLanguage(
                                            subItem.title,
                                            subItem.name
                                          )
                                        }
                                        className="peer hidden"
                                      />

                                      <span
                                        className="
                                    w-6 h-6 flex-shrink-0 rounded-full border-2 border-[#2f4553] 
                                    bg-center bg-no-repeat transition
                                    peer-checked:bg-[#2f4553]
                                      custom-radio
                                    bg-[length:0%] peer-checked:bg-[length:75%]
                                  "
                                        style={{
                                          backgroundImage: "var(--radio-img)",
                                        }}
                                      ></span>
                                    </label>
                                  </label>
                                ) : (
                                  <a href={subItem.url}>
                                    <Icon
                                      name={subItem.icon}
                                      className="!w-[14px] !h-[14px]"
                                    />
                                    <span className="font-semibold text-white">
                                      {subItem.title}
                                    </span>
                                  </a>
                                )}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : item?.divider ? (
            <Separator
              key={index}
              className={cn(
                "bg-[#2f4553] !h-0.5",
                (isTablet ? openTab : open)
                  ? "mx-auto my-2.5 !w-[92%]"
                  : "mx-auto my-2.5 !w-[64%]"
              )}
            />
          ) : item?.isLabel ? (
            (isTablet ? openTab : open) && (
              <div
                key={item.title}
                className={cn(
                  "leading-none px-4 py-[11] hover:bg-sidebar-accent rounded-sm cursor-pointer text-sm h-auto text-white",
                  item.className
                )}
              >
                {item.title}
              </div>
            )
          ) : (
            <SidebarMenuItem
              className={cn(
                (isTablet ? !openTab : !open) && "flex justify-center items-end"
              )}
              key={item.title}
            >
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  "leading-none rounded-sm [&>svg]:text-current px-4 py-[13] h-auto",
                  item.disabled
                    ? "opacity-50 pointer-events-none text-[#b1bad3]" // disabled state
                    : "text-[#b1bad3] hover:text-white cursor-pointer" // normal hover state
                )}
              >
                {item.icon && (
                  <Icon
                    name={item.icon}
                    className={cn(
                      "!w-[14px] !h-[14px]",
                      item.disabled ? "text-[#b1bad3]" : "", // icon stays gray if disabled
                      (isTablet ? !openTab : !open) && "ml-[3px]",
                      item.iconClass
                    )}
                  />
                )}
                {item.sprite && (
                  <div
                    className={cn(
                      "h-[16px] w-[17px] bg-[url('@workspace/ui/assets/sprite/exchange_sprites.svg')] bg-[length:1280px_1024px] bg-no-repeat ",
                      item.sprite
                    )}
                  />
                )}
                {(isTablet ? openTab : open) && (
                  <span
                    className={cn(
                      "font-semibold",
                      item.disabled ? "text-[#b1bad3]" : "text-white"
                    )}
                  >
                    {item.title}
                    {item.badge && (
                      <span className="ml-2 px-[0.5em] absolute right-[16px] py-0 min-w-[1.8em] rounded-full bg-[#4391e7] text-xs font-bold text-[#04172d]">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
