import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Icon from "@workspace/ui/icons/icons";
import { useState } from "react";

const VIPModal = ({ open, onClose }: any) => {
  const tiers = [
    {
      name: "Bronze",
      type: "starBronze",
      color: "#D1A773",
      icon: "VIPBronze",
      features: [
        "Bonus from Support in currency of your choice",
        "Rakeback enabled",
        "Weekly bonuses",
        "Monthly bonuses",
        "VIP Telegram channel access",
      ],
    },
    {
      name: "Silver",
      type: "starSilver",
      color: "#BDBDBD",
      icon: "VIPSilver",
      features: [
        "Bonus from Support in currency of your choice",
        "Monthly bonus increased",
      ],
    },
    {
      name: "Gold",
      type: "starGold",
      color: "#FFB947",
      icon: "VIPGold",
      features: [
        "Bonus from Support in currency of your choice",
        "Monthly bonus increased",
      ],
    },
    {
      name: "Platinum I - III",
      type: "starPlatinum1",
      color: "#8B8BFF",
      icon: "VIPPlatinum",
      features: [
        "Bonus from Support in currency of your choice",
        "Monthly bonus increased",
        "14 - 42 day, daily bonus (Reload)",
      ],
    },
    {
      name: "Platinum IV - VI",
      type: "starPlatinum2",
      color: "#6666FF",
      icon: "VIPPlatinum",
      features: [
        "Dedicated VIP host",
        "Unlimited Reloads while maintaining a VIP host",
        "Bonus from VIP host in currency of your choice",
        "Weekly & monthly bonuses increased",
      ],
    },
    {
      name: "Diamond I - V",
      type: "starDiamond",
      color: "#00CFFF",
      icon: "VIPDiamond",
      features: [
        "Bonus from VIP host in currency of your choice",
        "Exclusively customised benefits",
        "Weekly & monthly bonuses increased",
      ],
    },
  ];

  const vipHost = {
    title: "VIP Host benefits",
    description:
      "Reach Platinum IV or above and receive your own dedicated VIP host who will support and cater to your betting needs.",
    details:
      "VIP Hosts cater to your needs and ensure your time at Stake is safe, entertaining and rewarding. Enjoy:",
    benefits: [
      "Your personal point of contact at Stake",
      "Tailored bonuses and sports betting limits",
      "Insight into gameplay statistics",
      "Exclusive promotions and events",
    ],
  };

  const rewardsData = [
    {
      title: "Rakeback",
      type: "rakeback",
      description: "Unlocked at Bronze VIP.",
    },
    {
      title: "Weekly Boost",
      type: "weeklyBoost",
      description: "Unlocked at Bronze VIP.",
    },
    {
      title: "Reload",
      type: "reload",
      description: "Unlocked at Platinum VIP.",
    },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [openDropdowns, setDropdown] = useState<{ [key: string]: boolean }>({});
  const [openCollapsible, setOpenCollapsible] = useState(false);
  const toggleDrop = (key: string) => {
    setDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onClose}>
        {open && (
          <div className="fixed inset-0 bg-[#0000008c] z-40" />
        )}
        <DialogContent
          showCloseButton={false}
          className="p-0 overflow-visible min-w-[200px] w-[500px]  max-h-auto border-0 bg-[#1a2c38] rounded-[8px]  gap-0 animate-modal-popover">
          <DialogHeader className="flex !flex-row h-[60px] justify-between items-center !bg-[#1A2C38] text-white !p-4 !border-none !outline-none !shahdow-none">
            <DialogTitle className="font-bold text-[18px] leading-[28px] !min-h-[28px] flex items-center gap-2">
              <Icon
                name={"vip"}
                width={20}
                height={20}
                fill="#b1bad3"
                className="inline-block shrink-0 text-[#b1bad3]"
              />
              <div className="text-white !min-h-[28px]">VIP</div>
            </DialogTitle>
            <DialogClose asChild>
              <button className="text-xl leading-none cursor-pointer outline-0">
                <Icon
                  name={"closeIcon"}
                  className="w-5 h-5 hover:fill-[white]"
                  fill="#b1bad3"
                />
              </button>
            </DialogClose>
          </DialogHeader>
          <div className="overflow-y-auto overflow-visible max-h-[calc(100vh-150px)] bg-[#1A2C38] scrollbar-hide">
            <div className="flex flex-col flex-1 relative gap-0">
              <div className="flex flex-col px-4 pb-4 gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex w-full">
                    <div className="flex flex-grow shrink-0  rounded-[3rem] p-[6px] bg-[#0F212E]">
                      <div className="flex flex-grow gap-2">
                        <button
                          onClick={() => setActiveTab("overview")}
                          className={`inline-flex relative items-center justify-center whitespace-nowrap hover:bg-[#2F4553]= text-white py-2 px-4 outline-none rounded-full flex-1 text-[16px] font-semibold cursor-pointer ${activeTab === "overview" ? "bg-[#2F4553]" : "bg-transparent"}`}>
                          Overview
                        </button>

                        <button
                          onClick={() => setActiveTab("rewards")}
                          className={`inline-flex relative items-center justify-center whitespace-nowrap flex-1 text-[16px] font-semibold  text-white  py-2 px-4 rounded-full hover:bg-[#2F4553] outline-none  cursor-pointer ${activeTab === "rewards" ? "bg-[#2F4553]" : "bg-transparent"}`}>
                          Rewards
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {activeTab === "overview" && (
                <div className="flex flex-col flex-1 gap-4 pb-4 px-4 overflow-auto scrollbar-hide">
                  <div className="flex flex-col flex-1 justify-between scrollbar-hide">
                    <div className="flex flex-col gap-4">
                      <div className="-mx-4 h-full">
                        <div className=" bg-cover p-4 bg-[url('@workspace/ui/assets/vip-modal/bg.png')]">
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex justify-center rounded-[8px] relative w-full max-w-96 p-2 bg-gradient-to-b from-[#203642] to-[#0f212e] h-[205px]  md:h-[216px]">
                              <div className="flex flex-col justify-center rounded-lg w-full bg-[#0F212E] border-2 border-[#2f4553]">
                                <div className="flex flex-col justify-between px-6 py-5 z-10 h-full">
                                  <div className="flex justify-between mb-6">
                                    <span className="text-sm text-white text-[20px] font-semibold">
                                      UserName
                                    </span>
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      className="inline-block shrink-0">
                                      <path
                                        fill="#829BAE"
                                        d="m12 4.376 1.946 3.595a3.13 3.13 0 0 0 2.214 1.615l4.09.733-2.84 2.944a3.16 3.16 0 0 0-.893 2.198q-.015.22 0 .438l.564 4.054-3.589-1.726a3.45 3.45 0 0 0-3.004-.006l-3.569 1.718.564-4.053a4 4 0 0 0 0-.425 3.16 3.16 0 0 0-.894-2.198L3.75 10.32l4.043-.733a3.13 3.13 0 0 0 2.255-1.602zm0-2.862a1.2 1.2 0 0 0-1.052.623L8.336 7.033a1.23 1.23 0 0 1-.84.609l-5.5.986A1.204 1.204 0 0 0 1 9.806c-.002.306.116.6.33.821l3.857 4.006c.215.22.336.514.337.821q.004.1 0 .199l-.75 5.478a.7.7 0 0 0 0 .164 1.18 1.18 0 0 0 .733 1.1q.22.09.457.091h.041c.173-.008.342-.055.495-.137l4.902-2.355c.197-.094.414-.143.633-.144.222 0 .44.051.639.15l4.812 2.356c.158.086.336.131.516.13h.048a1.19 1.19 0 0 0 1.19-1.184 1 1 0 0 0 0-.171l-.75-5.478a1 1 0 0 1 0-.171 1.14 1.14 0 0 1 .337-.815l3.843-4.04a1.182 1.182 0 0 0-.646-1.985l-5.5-.986a1.2 1.2 0 0 1-.846-.63L13.066 2.13A1.2 1.2 0 0 0 12 1.514"></path>
                                    </svg>
                                  </div>
                                  <div className="w-full">
                                    <div className="flex justify-between items-end gap-5">
                                      <span className="text-[16px] font-semibold text-white">
                                        Your VIP Progress
                                      </span>
                                      <span className="text-md flex gap-1 items-center">
                                        <span className=" text-[16px] font-semibold text-white">
                                          0.00%
                                        </span>
                                        <span>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Icon
                                                className="h-[20px] w-[20px] text-[#b1bad3]"
                                                name={"Info"}
                                              />
                                            </TooltipTrigger>
                                            <TooltipContent
                                              side="top"
                                              className="bg-white text-[#0F212E] text-[14px] font-normal px-4 py-2 rounded-[4px] w-[350px] shadow-lg z-[9999999999]"
                                              sideOffset={6}>
                                              <p>All settled sports and racing bets contribute to
                                                progression at a 3× rate, while Casino bets
                                                progress at a 1× rate. Voided bets are excluded.</p>
                                            </TooltipContent>
                                          </Tooltip>

                                        </span>
                                      </span>
                                    </div>

                                    <div className="relative w-full my-2 overflow-hidden rounded-full bg-[#2F4553] h-[9px]">
                                      <div
                                        className="h-full w-full shadow-lg rounded-full relative"
                                        style={{
                                          right: "100%",
                                          backgroundColor: "var(--green-400)",
                                        }}></div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                      <div className="flex items-center gap-[6px] text-sm text-[#b1bad3]">
                                        <Icon name={"VIPNone"} />
                                        None
                                      </div>
                                      <div className="flex items-center gap-[6px] text-sm text-[#b1bad3]">
                                        <Icon name={"bronzeStar"} />
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

                      {/* Accordions  */}
                      <div className="flex gap-2.5 flex-col-reverse">
                        {/* first Dropdown */}
                        <div>
                          <div
                            className={`flex flex-col w-full rounded-t-lg bg-[#213743] ${openDropdowns["host"] ? "rounded-b-none border-b-2 border-[#2f4553]" : "rounded-b-lg border-0"}`}>
                            <button
                              type="button"
                              onClick={() => toggleDrop("host")}
                              className="flex w-full justify-between items-center gap-4 transition-all p-4 cursor-pointer">
                              <div className={`flex items-center gap-4`}>
                                <span className="text-md font-semibold text-[#d5dceb]">
                                  VIP Host
                                </span>
                              </div>
                              <span
                                className={`transition-transform duration-100 ${openDropdowns["host"] ? "rotate-180" : "rotate-0"}`}>
                                <Icon
                                  name={"ChevronDown"}
                                  fill="#b1bad3"
                                  className={`w-[16px] h-[16px] mr-[2px]`}
                                />
                              </span>
                            </button>
                          </div>
                          {openDropdowns["host"] && (
                            <div className="flex flex-col gap-4 px-4 pt-4 rounded-b-lg pb-4 bg-[#213743]">
                              <p className="text-gray-400">
                                {vipHost.description}
                              </p>
                              <div className="bg-[#2f4553] w-full h-0.5"></div>

                              <div className="flex flex-col gap-2">
                                <h3 className="font-bold text-white">
                                  {vipHost.title}
                                </h3>
                                <p className="text-gray-400">{vipHost.details}</p>

                                <div className="flex flex-col">
                                  {vipHost.benefits.map((b, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2 text-[#2f4553]">
                                      <Icon name={"check"} />
                                      <span className="text-white">{b}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* second Dropdown */}
                        <div>
                          <div
                            className={`flex flex-col w-full rounded-t-lg bg-[#213743] ${openDropdowns["benefits"] ? "rounded-b-none border-b-2 border-[#2f4553]" : "rounded-b-lg border-0"}`}>
                            <button
                              type="button"
                              onClick={() => toggleDrop("benefits")}
                              className="flex w-full justify-between items-center gap-4 transition-all p-4 cursor-pointer">
                              <div className={`flex items-center gap-4`}>
                                <span className="text-md font-semibold text-[#d5dceb]">
                                  VIP Benefits
                                </span>
                              </div>
                              <span
                                className={`transition-transform duration-100 ${openDropdowns["benefits"] ? "rotate-180" : "rotate-0"}`}>
                                <Icon
                                  name={"ChevronDown"}
                                  fill="#b1bad3"
                                  className={`w-[16px] h-[16px] mr-[2px]`}
                                />
                              </span>
                            </button>
                          </div>

                          {openDropdowns["benefits"] && (
                            <div className="flex flex-col gap-4 px-4 pb-4 pt-4 bg-[#213743] rounded-b-lg">
                              {tiers.map((tier, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                  <div className="flex items-center gap-2">
                                    <Icon
                                      name={tier.type}
                                      width={20}
                                      height={20}
                                      className="w-[18px] h-[18px]"
                                    />
                                    <span className="font-[600] text-[#ffffff]">{tier.name}</span>
                                  </div>
                                  <div className="flex flex-col gap-1 px-2">
                                    {tier.features.map((f, j) => (
                                      <div key={j} className="flex items-center">
                                        <span className="min-w-[4px] min-h-[4px] rounded-full bg-white mr-2"></span>
                                        <span>{f}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {i !== tiers.length - 1 && (
                                    <div className="bg-[#2f4553] w-full h-0.5"></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center pt-4">
                      <a className="inline-flex items-center gap-2 justify-center rounded-md font-bold whitespace-nowrap transition text-sm underline underline-offset-4 text-[#b1bad3] hover:text-white cursor-pointer">
                        Learn more about being a Stake VIP
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "rewards" && (
                <div>
                  <div className="flex flex-col flex-1 gap-[10px] pb-4 px-4 overflow-y-auto">
                    {/* Monthly Bonus Collapsible */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col w-full rounded-lg bg-[#213743]">
                        <button
                          type="button"
                          onClick={() => setOpenCollapsible(!openCollapsible)}
                          className="flex w-full justify-between items-center gap-4 p-4 transition-all [&[data-state=open]>svg]:rotate-180"
                          data-state={openCollapsible ? "open" : "closed"}>
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <Icon name={"monthlyBonus"} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white text-left font-semibold">
                                Monthly Bonus
                              </span>
                              <span className="text-sm text-left">
                                Released once a month.
                              </span>
                            </div>
                          </div>
                          <Icon
                            name={"arrowDown"}
                            className={`w-[20px] h-[20px]`}
                          />
                        </button>

                        {openCollapsible && (
                          // <div className="p-4 border-t border-gray-600 text-sm text-neutral-300">
                          //   Details about Monthly Bonus go here.
                          // </div>
                          <div className="px-4 pb-4">
                            <div className="border-solid border-t-1 border-[#2f4553] pt-4">
                              <span className="text-sm">
                                The Monthly Bonus is randomly released. Eligible
                                players will be notified via email. Your bonus is
                                based on your game play throughout the month. The
                                more you play, the bigger the bonus.
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      {rewardsData.map((reward, index) => (
                        <div
                          key={index}
                          className="flex p-4 rounded-lg bg-[#213743] gap-2.5 items-center">
                          <div className="flex w-full justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col">
                                <Icon name={reward.type} />
                              </div>
                              <div className="flex flex-col">
                                <span className="ds-body-md-strong font-semibold">
                                  {reward.title}
                                </span>
                                <span className="text-sm">
                                  {reward.description}
                                </span>
                              </div>
                            </div>
                            <Icon name={"lock"} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default VIPModal;