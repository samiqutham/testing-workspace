"use client";

import Link from "next/link";
import React from "react";

const PromotionDetail = () => {
  const title = "US Open - Take On The Big Three";

  const related = [
    {
      img: "/promotion/card-1.avif",
      title: "Stake's Daily Races",
      blurb: "$100,000 every 24 hours!",
      time: "7:00 PM",
      date: "11/29/2025",
    },
    {
      img: "/promotion/card-2.avif",
      title: "Stake's Weekly Raffle",
      blurb: "$75,000 Weekly Raffle!",
      time: "5:59 PM",
      date: "12/31/2025",
    },
  ];

  return (
    <div className="w-full h-[100%]">
      <div className="flex flex-row gap-2  pt-[5px]">
        <Link
          prefetch={true}
          href="/"
          aria-label="Back to promotions"
          className="inline-flex relative items-center justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] bg-[#0F212E] text-white  py-[0.9375rem] px-[1.25rem] rounded-[4px] shadow-none"
        >
          <svg
            viewBox="0 0 64 64"
            fill="#B1BAD3"
            className="w-[14px] h-[14px]"
            style={{ transform: "scale(1.25)" }}
            aria-hidden="true"
          >
            <path d="M36.998 53.996 16 32.998 36.998 12l6.306 6.306L28.61 33l14.694 14.694L36.998 54z" />
          </svg>
        </Link>

        <button
          type="button"
          className="inline-flex relative items-center h-[48px] gap-2 justify-center font-semibold whitespace-nowrap transition active:scale-[0.98] bg-[#0F212E] text-[#B1BAD3]  text-sm leading-none py-[0.9375rem] px-[1.25rem] rounded-[4px] shadow-none"
        >
          <span className="truncate" style={{ maxWidth: 200 }} title={title}>
            {title}
          </span>
        </button>
      </div>

      {/* ===== SECTION 2: HERO + DATE + H1 ===== */}
      <article>
        <img
          className="block w-full h-auto mt-4 rounded-[4px] select-none"
          alt="Promotional Content"
          src="/promotion/main-card.avif"
          draggable={false}
        />

        <span className="block mt-[22px] text-[12px] text-[#B1BAD3]">
          August 19, 2025 - September 10, 2025
        </span>

        <h1 className="mt-6 text-white font-semibold text-[28px] leading-[120%]">
          US Open - Take On The Big Three
        </h1>

        {/* ===== CONTENT BLOCK ===== */}
        <div className="content-wrap w-full mt-6">
          <div className="content-block">
            <p className="mt-0">
              <span className="text-[16px] leading-[150%] text-[#B1BAD3]">
                The US Open always brings chaos and excitement in New York.
                Alcaraz and Sinner are leading the next generation, while
                Djokovic is still proving he’s the man to beat.
              </span>
            </p>

            <p className="mt-4">
              <span className="text-[16px] leading-[150%] text-[#B1BAD3]"></span>
            </p>

            <p className="mt-6">
              <span className="text-[16px] leading-[150%] text-[#B1BAD3]">
                Back any player to beat Sinner, Alcaraz or Djokovic and if they
                manage to win two sets but lose the match, we’ll pay you out as
                a winner up to $100!
              </span>
            </p>

            <p className="mt-4">
              <span className="text-[16px] leading-[150%] text-[#B1BAD3]"></span>
            </p>

            <h2 className="mt-[34px] text-white font-semibold text-[20px]">
              <span id="Terms_and_Conditions">Terms and Conditions</span>
            </h2>

            <ul className="mt-[11px] list-disc pl-[32px]">
              {[
                "Pre-match single bets on Alcaraz, Sinner and Djokovic's opponents",
                "Payout will be awarded if your selection wins 2 sets but loses the match",
                "Promotion is not valid when they play against one another as well as the final",
                "First bet per match, per customer, per household, per specific market.",
                "Bets must be placed before the scheduled time indicated on Stake.com.",
                "No cashed out or voided bets will be eligible.",
                "Minimum Stake: $5.",
                "Maximum Payout: $100.",
                "Retirements and defaults do not qualify as a resulted match.",
                "Backing both sides in any related market will result in disqualification from the promotion.",
                "Please allow up to 48 hours for winnings to be processed and credited.",
                "Stake reserves the right to disqualify any user due to promotion or account abuse, which may also result in a permanent ban.",
                "Any user deemed to have a conflict of interest such as a professional association with Stake will also be disqualified.",
                "In fiat currency view, crypto values use live exchange rates and may differ from your original bet amount. This may impact your eligibility for promotions.",
              ].map((t) => (
                <li key={t} className="mt-1 marker:text-[#B1BAD3]">
                  <p className="inline-text">
                    <span className="text-[16px] leading-[150%] text-[#B1BAD3]">
                      {t}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* ===== CENTERED CTA ===== */}
      <div className="mt-11 mb-[39px] flex justify-center">
        <p className="inline-flex relative items-center gap-2 justify-center rounded-[4px] font-semibold whitespace-nowrap transition active:scale-[0.98] bg-[#1475E1] text-white  focus-visible:outline-white text-sm leading-none shadow-md py-[0.9375rem] px-[1.25rem]">
          <span>Bet Now!</span>
        </p>
      </div>

      {/* ===== OTHER POPULAR ARTICLES (2-card grid) ===== */}
      <section className="px-[8px] pb-[49px] pt-[32px]">
        <h2 className="text-white font-semibold text-[16px]">
          Other Popular Articles
        </h2>
        <hr className="mt-[14px] mb-6 border-t-2 border-[#2F4553]" />

        <div
          data-testid="article-preview-list"
          className="w-full grid"
          style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}
        >
          {related.map((a, i) => (
            <div
              key={`${a.title}-${a.date}-${i}`}
              className="card-grid-card flex flex-col bg-[#0F212E] rounded-[4px] overflow-hidden"
            >
              {/* image */}
              <p className="block">
                <img
                  src={a.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                  style={{ aspectRatio: "1.90476 / 1" }}
                />
              </p>

              {/* body */}
              <div className="h-full flex flex-col gap-2 py-3 px-4 bg-[#264653]">
                <div className="h-full">
                  <div className="h-full flex flex-col gap-4 justify-between">
                    <div className="flex flex-col">
                      <div>
                        <span className="text-white font-semibold text-[16px]">
                          {a.title}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#B1BAD3] text-[14px] leading-[1.5] inline-block">
                          {a.blurb}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[#B1BAD3] text-[14px]">
                        Ends at
                      </span>
                      <span className="text-white font-semibold text-[14px]">
                        {a.time} {a.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ===== /OTHER POPULAR ARTICLES ===== */}
    </div>
  );
};

export default PromotionDetail;
