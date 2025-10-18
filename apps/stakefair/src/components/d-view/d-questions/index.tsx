"use client";
import { useIsTab } from "@workspace/ui/hooks/use-tab";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";
import React, { useState } from "react";

const DQuestions = () => {
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([
    "Who is StakeFair?",
  ]);
  const isTablet = useIsTab();
  const toggleAccordion = (item: string) => {
    setExpandedAccordions((prev) =>
      prev.includes(item)
        ? prev.filter((accordion) => accordion !== item)
        : [...prev, item]
    );
  };

  const faqs = [
    {
      question: "Who is StakeFair?",
      answer: `Leading the online gambling industry since 2017, stakefair.com offers a wide variety of online casino and sports betting options, operating globally in 15 different languages.<br><br>
With a reputable and secure platform, StakeFair Casino is home to worldwide local currencies and crypto betting options for online slot games, StakeFair Originals and live casino games. StakeFair Sportsbook offers unbeatable odds on all major sporting events including a range of eSport leagues.<br><br>
We host regular bet bonuses and promotions and offer an exclusive VIP Club experience – all with a simple-to-use deposit process on our licensed platform.`,
    },
    {
      question: "Is StakeFair Licensed?",
      answer: `stakefair.com is licensed by gaming authorities in Curacao, providing a safe and secure betting platform. StakeFair is operated by Medium Rare N.V. which is licensed by the Curacao Gaming Authority under license number OGL/2024/4510/918.<br><br>
StakeFair is a Crypto Gambling Foundation verified operator with strong policies around Anti-Money Laundering. StakeFair promotes responsible gambling with a robust self-exclusion policy and various StakeFair Smart resources.`,
    },
    {
      question: "Is Betting on StakeFair Safe?",
      answer: `StakeFair is committed to providing a safe environment for our community. We pride ourselves in offering the most up-to-date and accessible smarter gambling resources. Our responsible gambling guidelines paired with our monthly budget calculator have been developed to help our players set appropriate betting limits.<br><br>
When betting with local and crypto currencies, players can be sure their funds are securely stored using our StakeFair Vault feature.`,
    },
    {
      question: "What Currencies Can I Bet With?",
      answer: `Alongside supporting local currencies, stakefair.com is the world's leading cryptocurrency casino and sportsbook, supporting 20 cryptocurrencies from Bitcoin (BTC) to Polygon (MATIC). Discover the complete list of supported crypto at stakefair.com for more details.`,
    },
    {
      question: "What Types of Casino Games Can I Play?",
      answer: `Browse our wide variety of popular casino games and enjoy a fair and fun online gaming experience. StakeFair's online casino platform features a range of game categories including slot games, live casino games and many classic table games like Blackjack, Roulette, Poker, and Baccarat, right from your browser. StakeFair brings you the best gameplay from esteemed iGaming providers like Pragmatic Play, Hacksaw Gaming, Twist Gaming and Evolution Gaming.<br><br>
Our exclusive StakeFair Originals games also offer players of all skill levels a fun and easy to play experience ranging from classic table games such as Blackjack and Baccarat to crowd favourite games such as Plinko, Mines, & Crash. There'll always be a little something for everyone as our team is always adding new and exciting titles to the StakeFair Originals selection with unique gameplay and features in popular games such as Darts, Bars, & Packs.`,
    },
    {
      question: "What Sports Can I Bet On?",
      answer: `From major football and basketball leagues to Dota 2 and CS:GO action, we cover all bases for sports and eSports markets. We offer industry leading odds and tailored betting resources including expert picks and predictions on our StakeFair News Blog.<br><br>
You can bet on all major upcoming sporting events, place live bets and live stream all the biggest sporting events for free on StakeFair Sportsbook.`,
    },
    {
      question: "How Do I Watch Live Streams?",
      answer: `stakefair.com is the perfect place for official sports streams, with comprehensive coverage of most popular sporting events and major tournaments, from tennis matches to MMA fights.<br><br>
To live stream the latest sporting events, click on the live stream icon at the top right-hand corner of StakeFair Sportsbook. For full details, check out our comprehensive guide to live streaming your favourite sports on stakefair.com.`,
    },
  ];

  return (
    <div className="max-w-[1200] w-full mx-auto">
      <div
        className={cn(
          "flex items-center gap-2 mb-[1.3rem]",
          isTablet && "relative bottom-[1px]"
        )}
      >
        <Icon name="questions" className="w-[16px] h-[16px]" fill="#b1bad3ff" />
        <h3
          className={cn(
            "text-white text-[16px] font-semibold leading-[27px]",
            isTablet && "relative bottom-[1px]"
          )}
        >
          Still Have Questions?
        </h3>
      </div>

      {/* Accordion Items */}
      <div className="space-y-2 mb-6">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border-none rounded overflow-hidden bg-[#213743ff]"
            style={{
              boxShadow:
                "rgba(0,0,0,0.2) 0px 1px 3px 0px, rgba(0,0,0,0.12) 0px 1px 2px 0px, rgba(255,255,255,0.04) 0px 1px 0px 0px inset",
            }}
          >
            <button
              onClick={() => toggleAccordion(item.question)}
              className="w-full flex items-center cursor-pointer justify-between p-4 text-left rounded"
            >
              <span className="text-white font-bold leading-[21px]  text-sm">
                {item.question}
              </span>
              <Icon
                name="arrow"
                width={16}
                height={16}
                className={cn(
                  "transition-transform duration-300 text-[#d5dcebff]",
                  expandedAccordions.includes(item.question)
                    ? "rotate-180"
                    : "rotate-0",
                  isTablet && "relative top-[1px]"
                )}
              />
            </button>
            {expandedAccordions.includes(item.question) && (
              <div className="p-4 !pt-0">
                <div
                  className="text-sm text-[#b1bad3ff] leading-[21px] [&>p]:mt-3 first:[&>p]:mt-0 cursor-default"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DQuestions;
