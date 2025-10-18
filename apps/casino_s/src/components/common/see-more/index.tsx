"use client";
import React, { useState } from "react";

export default function SeeMore() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`mt-6 mb-8 mx-auto relative rounded-sm bg-[rgb(15,33,46)] overflow-hidden transition-all duration-500 
    ${open ? "max-h-full" : "max-h-[250px]"} 
    w-full max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1200px]`}
      >
        <div
          className={`p-4 relative 
      ${
        open
          ? "max-h-full"
          : "max-h-[250px] before:w-full before:h-full before:content-[''] before:z-[1] before:absolute before:top-0 before:left-0 before:bg-[linear-gradient(0deg,rgb(15,33,46)_0%,rgba(15,33,46,0)_100%)]"
      }`}
        >
          <div className="break-before-avoid gap-y-6">
            <div className="flex flex-col w-full">
              <h1 className="inline-block text-[1.5rem] w-full mb-2 text-white leading-[132%] text-left font-semibold items-center">
                <span>
                  Online Casino Games at Stake Casino - Best Online Gambling
                  Games
                </span>
              </h1>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Since 2017, Stake.com has offered the best online casino gaming
                experience, compatible with local currencies, Bitcoin and other
                crypto on the web.
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Starting with Stake Originals, our first-party casino games
                developed here at Stake, the online casino gaming platform has
                grown to host over 3000 casino games from the best providers in
                the iGaming industry. Players come back to{" "}
                <span className="text-white">Stake.com</span> time and time
                again for our high-quality and dynamic and immersive live casino
                games.
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Every month, we wrap up the biggest and best wins by our Stake
                community on our most popular games. Get the latest player stats
                and casino{" "}
                <span
                  className="text-[#b1bad3] transition-colors hover:text-white
                "
                >
                  trends for July 2025
                </span>
                !
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span>
                  We recently reached 8 years of Stake.com! Celebrate{" "}
                </span>
                <a className="relative items-center gap-2 justify-center rounded-[0.25rem] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden inline">
                  <span>Stake's birthday</span>
                </a>
                <span className="mx-1">
                  with our recap of the last 8 years for even more huge wins and
                  hot games. Take a look back at the year with our{" "}
                </span>
                <a className="relative items-center gap-2 justify-center rounded-[0.25rem] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden inline">
                  <span>2024 wrap up and recap</span>
                </a>
                <span>.</span>
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span>
                  Discover the year's biggest wins and best casino games!
                  Stake's team of experts are always working hard to improve our
                  unbeatable service and ensure the best casino gaming
                  experience online for all users is offered worldwide. We'll
                  introduce you to some of our favourite games, how to deposit &
                  withdraw funds and our top software providers.
                </span>
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span>
                  With weekly drops of additional new release games added to our
                  platform, it is easier than ever to hit the ground running and
                  place bets on the best online games on our world-famous online
                  casino! Read our
                </span>
                <a className="relative items-center gap-2 justify-center rounded-[0.25rem] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden inline">
                  <span className="mx-1">weekly Stake blog</span>
                </a>
                <span className="mx-1">
                  to keep up to date with the latest news as well as our list of
                  new and trending games!
                </span>
              </p>

              <h2 className="inline-block text-[1.25rem] w-full mb-2 text-white leading-[132%] text-left font-semibold items-center">
                Types of Casino Games To Play Online
              </h2>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">
                  Browse our wide variety of popular casino games on Stake and
                  enjoy
                </span>
                <a className="relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:text-white inline">
                  provably fair
                </a>
                <span className="mx-1">
                  {" "}
                  and fun online gambling experiences. Stake's online casino
                  gaming platform features a variety of fair game categories
                  such as slot games,
                </span>
                <a className="relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:text-white inline">
                  live casino games
                </a>
                <span className="mx-1">, </span>
                <a className="relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:text-white inline">
                  table games
                </a>
                <span className="mx-1">
                  , casual games, and many more classic casino games, powered by
                </span>
                <a className="relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:text-white inline">
                  random number generator
                </a>
                <span className="mx-1"> (RNG), right from your browser.</span>
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span>We also offer a range of</span>
                <a className="relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:text-white inline">
                  {" "}
                  how-to guides{" "}
                </a>
                <span className="mx-1">
                  so you can learn the basic rules and strategies of your
                  favourite games, perfectly tailored to
                </span>
                <a className="relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition active:scale-[0.98] bg-transparent text-[rgb(177,186,211)] hover:text-white inline">
                  online casino beginners
                </a>
                <span className="mx-1"> as well as experienced players!</span>
              </p>

              <h3 className="inline-block text-[1rem] w-full mb-2 text-white leading-[132%] text-left font-semibold items-center">
                <span>Stake Original Casino Games</span>
              </h3>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                We also have our famous
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Stake Originals
                </span>
                - the first-party casino games that put Stake.com on the map.
                This includes favourites such as
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Dice
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Plinko
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Mines
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Crash
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Limbo
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Hilo
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Keno
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Wheel
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Diamonds
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Dragon Tower
                </span>
                , and
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Slide
                </span>
                . We also recommend
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Blue Samurai
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Scarab Spin
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Pump
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Cases
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Flip
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Rock Paper Scissors
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Snakes
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Darts
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Bars
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Packs
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Prime Dice
                </span>{" "}
                and
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white transition-colors">
                  Tome of Life
                </span>
                . Dive deeper into the details of each game and learn how to
                play our Stake Original games with the following guides:
              </p>

              <ul className="list-disc pl-8 mb-4 leading-[128%] marker:text-[rgb(177,186,211)]">
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    How to play Plinko
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    How to play Blue Samurai
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Hilo
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Limbo
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Slide
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Diamonds
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Scarab Spin
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Crash
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Dragon Tower
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Tome of Life
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to play Mines
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Pump
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Cases
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Flip
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Rock Paper Scissors
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Snakes
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Darts
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Bars
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Packs
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Dice
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Blackjack
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Wheel
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Keno
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Roulette
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Baccarat
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Video Poker
                  </p>
                </li>
                <li>
                  <p className="text-[rgb(177,186,211)] transition-colors  hover:text-white">
                    How to Play Prime Dice
                  </p>
                </li>
              </ul>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Stake Originals were designed to be easy to use, fun to play and
                provide a fair casino betting game experience. Other titles in
                Stake Originals include table game classics like our original
                Blackjack game, Roulette game, Baccarat casino game and the
                popular Video Poker. We also have a ton of Stake Exclusives that
                are only available on Stake.com. These games are packed with
                free spins, unique themes and bonus rounds! Read more about our
                exclusive game features and mechanics over on our blog.
              </p>

              <h3 className="inline-block text-[1rem] w-full mb-2 text-white leading-[132%] text-left font-semibold items-center">
                <span>Slot Games</span>
              </h3>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Online slot games are by far the biggest category on Stake, with
                over 3000 slot games available on our gaming platform. Video
                slots are fun online games of chance, often packed full of
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  bonus features
                </a>
                such as free spins,
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  progressive jackpots
                </a>
                , and
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  multiplier wins
                </a>
                . Players set their bet before spinning the reels and hitting
                symbols in a winning payline to receive a payout. Read about
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  slot machine symbols
                </a>
                and the special bonus features they offer when triggered.
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">
                  We offer classic slots with a huge variety of{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  popular game themes
                </a>
                <span className="mx-1">
                  , including Greek Empire, party, horror, sea, fishing, gold,
                  Easter and much more, so you can be sure to find your
                  favourite casino games from our range of recommended slots!
                </span>
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">
                  Our online casino is packed with fun creations, including{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  Gonzo’s Quest
                </a>
                <span className="mx-1">, </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  Battle of Gods
                </a>
                <span className="mx-1">
                  , and plenty of other Vegas-style slot machines. We also have
                  Megaways slots, buy bonus slot games, and so much more! Dip
                  into progressive jackpot slots, and you could be walking away
                  with huge rewards.
                </span>
              </p>

              <h4 className="inline-block text-sm w-full mb-2 text-white leading-[132%] text-left font-semibold items-center">
                How to Play Slot Games
              </h4>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">Be sure to read our blog on </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  how to play slots online
                </a>
                <span className="mx-1">
                  {" "}
                  if you're a beginner at a casino online. You can also try out
                  our free play in{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  demo versions
                </a>
                <span className="mx-1">
                  {" "}
                  to play around before playing for real. At Stake online
                  casino, we're constantly updating our slot game library with
                  weekly new releases to ensure players get the best slot
                  experience.
                </span>
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">
                  Some online slot machines feature cascades, known as tumble
                  features, where winning symbols are replaced with brand new
                  symbols to chain wins together. Another popular game mechanic
                  is the{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  cluster pays mechanism
                </a>
                <span className="mx-1">
                  , where payouts are awarded when groups of matching symbols
                  land on the game matrix.
                </span>
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">
                  Traditional slot machine games have a fixed number of
                  paylines, whilst online slot games can vary, with some games
                  like{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  Sweet Bonanza
                </a>
                <span className="mx-1">
                  {" "}
                  featuring a 'Win All Ways' where symbols pay anywhere if there
                  are 8 or more in the field of play. We have more information
                  about{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  how slot paylines work
                </a>
                <span className="mx-1"> and information about </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  slot volatility
                </a>
                <span className="mx-1">
                  {" "}
                  over on our blog. Gameplay mechanics and features of slot
                  games typically include hitting multipliers, aligning{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  scatter symbols
                </a>
                <span className="mx-1">
                  {" "}
                  to trigger bonus rounds, and many online slot games have
                  special features like{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  bonus-buy feature options,
                </a>
                <span className="mx-1">
                  {" "}
                  expanding reel modifiers, level up mechanics, free spins,{" "}
                </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  wild symbols
                </a>
                <span className="mx-1">, </span>
                <a className="text-[rgb(177,186,211)] hover:text-white">
                  hold &amp; win mechanics
                </a>
                <span className="mx-1"> and more.</span>
              </p>

              <h4 className="inline-block text-sm w-full mb-2 text-white leading-[132%] text-left font-semibold items-center">
                Browse by Categories
              </h4>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">
                  Take a look at the many different game categories available at{" "}
                  <strong>Stake Casino</strong> and choose your favourite to
                  find a wide range of titles with many different features!
                </span>
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">Core Game Mechanics</span>
              </p>

              <ul className="list-disc pl-8 mb-4 leading-[128%] marker:text-[rgb(177,186,211)]">
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Bonus Buy
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Slots
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Cascading
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Megaways
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Respin
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    3 Reels
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Multi Ways
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Volatility Switch
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Enhanced RTP
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Stake Engine
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Mines
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Puzzle Games
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Multiplayer
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Jackpot Slots
                  </a>
                </li>
              </ul>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                <span className="mx-1">Top Features &amp; Collections</span>
              </p>

              <ul className="list-disc pl-8 mb-4 leading-[128%] marker:text-[rgb(177,186,211)]">
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Recommended Games
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Featured Slots
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Stake Exclusives
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    New Releases
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Early Access
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Eddie’s Favourites
                  </a>
                </li>
              </ul>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Promotional Games
              </p>

              <ul className="list-disc pl-8 mb-4 leading-[128%] marker:text-[rgb(177,186,211)]">
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Drops &amp; Wins
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Stake vs Eddie
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    The Level Up
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Reel Rumble
                  </a>
                </li>
                <li>
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Conquer the Casino
                  </a>
                </li>
              </ul>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Visual Themes
              </p>

              <ul className="list-disc pl-8 mb-4 leading-[128%] marker:text-[rgb(177,186,211)]">
                <li className="level-1 text-[rgb(177,186,211)] leading-[150%]">
                  Mythology &amp; History
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Egyptian
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Greek
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Ancient
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Romans
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Vikings
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Aztec
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    History
                  </a>
                </li>

                <li className="level-1 text-[rgb(177,186,211)] leading-[150%]">
                  Regional Themes
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Oriental
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Japanese
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Arabian
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Latino
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    African
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Indian
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    International
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Travel
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Irish
                  </a>
                </li>

                <li className="level-1 text-[rgb(177,186,211)] leading-[150%]">
                  Natural &amp; Seasonal
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Animals
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Nature
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Sea
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Jungle
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Farm
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Fishing
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Winter
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Summer
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Halloween
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Christmas
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Easter
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Lunar New Year
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Oktoberfest
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Seasonal
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Carnaval Brasil
                  </a>
                </li>

                <li className="level-1 text-[rgb(177,186,211)] leading-[150%]">
                  Fantasy &amp; Adventure
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Fantasy
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Dragons
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Magic
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Adventure
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Fairy
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Horror
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Space
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Wild West
                  </a>
                </li>

                <li className="level-1 text-[rgb(177,186,211)] leading-[150%]">
                  Pop Culture &amp; Fun Themes
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Party
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Music
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Joker
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Candy
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Comic
                  </a>
                </li>

                <li className="level-1 text-[rgb(177,186,211)] leading-[150%]">
                  Wealth & Rewards
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Money
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Gold
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Gems
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    777
                  </a>
                </li>
                <li className="[list-style-type:circle] level-2 ml-[18px]">
                  <a className="text-[rgb(177,186,211)] transition-colors hover:text-white">
                    Vegas
                  </a>
                </li>
              </ul>

              <h3 className="inline-block text-[1rem] w-full mb-2 text-white leading-[132%] text-left font-semibold items-center">
                <span className="mx-1">Table Games</span>
              </h3>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                The thrill of playing traditional casino table games is
                available online on Stake Casino. Everything from European
                roulette to exciting blackjack and
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  poker games
                </span>
                are ready to entertain you.
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Many popular table game classics include
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  {" Blackjack games"}
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  Baccarat games
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  Roulette games
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  card games
                </span>
                ,
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  Stake Poker
                </span>
                and more, which are popular due to their advantageous
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  house edge
                </span>
                and big win opportunities. Learn all there is to know about
                dealer options and how to play casino classic table games with
                our ultimate
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  guide to table games
                </span>
                .
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Electronic table games provide not only the convenience of
                playing for real payouts in the convenience of your device, but
                also provide additional features, flexibility in betting and
                often a higher
                <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                  Return to Player
                </span>
                payout rate percentage than that of physical games on the casino
                floor.
              </p>

              <p className="mb-5 text-[rgb(177,186,211)] text-[1rem] leading-[150%] inline">
                Casino Table Games
              </p>

              <ul className="list-disc pl-8 mb-4 leading-[128%] marker:text-[rgb(177,186,211)]">
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Live Casino
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Game Shows
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Baccarat
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Blackjack
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Poker
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Roulette
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Cards
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Table Games
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Video Poker
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    Stake Table Games
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-[rgb(177,186,211)] hover:text-white mx-1">
                    First Person
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky bottom-6 z-10 w-full flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#2f4553] text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem] cursor-pointer"
          >
            {open ? "Show Less" : "See More"}
          </button>
        </div>
      </div>
    </>
  );
}
