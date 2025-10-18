'use client';
import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";



export default function DPopularEsportsEvents() {
  const referrer = typeof document !== 'undefined' ? document.referrer : '';

    const blogArticles = [
        {
            title: "Popular Esports Events & Tournaments",
            description:
                "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
            image: "/blog/articalimg.png",
            href: "",
            date: "October 2, 2025",
        },
        {
            title: "Popular Esports Events & Tournaments",
            description:
                "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
            image: "/blog/articalimg.png",
            href: "",
            date: "October 2, 2025",
        },
        {
            title: "Popular Esports Events & Tournaments",
            description:
                "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
            image: "/blog/articalimg.png",
            href: "",
            date: "October 2, 2025",
        },
        {
            title: "Popular Esports Events & Tournaments",
            description:
                "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
            image: "/blog/articalimg.png",
            href: "",
            date: "October 2, 2025",
        },
    ];
         const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/'; // fallback if no previous page
    }
  };
    return (
        <>
            <div className="w-full flex flex-col items-center px-[3vw] py-0">
                <div className="w-full max-w-[1200px] self-center">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col w-full max-w-[650px] mx-auto my-4 items-start text-white">
                            <div className="flex flex-row gap-2 max-w-full">
                                {/* Link */}
                                <a onClick={goBack} className="inline-flex items-center gap-2 justify-center font-semibold whitespace-nowrap bg-[#0f212e] text-white hover:bg-[#071824] py-2.5 px-5 rounded-md">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="#b1bad3"
                                        className="inline-block shrink-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M14.293 5.293a1 1 0 1 1 1.414 1.414L10.414 12l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-6-6a1 1 0 0 1 0-1.414z" />
                                    </svg>
                                </a>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 justify-center font-semibold whitespace-nowrap bg-[#0f212e] text-white hover:[#071824] py-2.5 px-5 rounded-md transition overflow-hidden"
                                >
                                    <span className="truncate font-bold">Popular Esports Events & Tournaments</span>
                                </button>
                            </div>

                            <h1 className="text-[24px] mt-4 font-bold leading-[36px]">
                                Popular Esports Events & Tournaments
                            </h1>

                            <div className="flex items-center justify-between gap-4 w-full mt-4 pb-4">
                                <span className="text-sm text-[#b1bad3]">
                                    Stake - October 2, 2025
                                </span>
                                <span className="flex gap-4">
                                    <a className="inline-flex items-center gap-2 justify-center font-semibold whitespace-nowrap bg-[#0f212e] text-white hover:bg-[#071824] py-2.5 px-5 rounded-full w-[44px] h-[44px]">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="#b1bad3"
                                            className="inline-block shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M20.8 1H3.2C1.99 1 1 1.99 1 3.2v17.6c0 1.21.99 2.2 2.2 2.2h10.373v-7.249a.55.55 0 0 0-.55-.55h-1.595a.56.56 0 0 1-.55-.55v-1.903c0-.297.253-.55.55-.55h1.595c.297 0 .55-.242.55-.55v-1.65c0-1.232.308-2.167 1.012-2.871s1.628-1.056 2.816-1.056c.671 0 1.287.022 1.815.077a.54.54 0 0 1 .484.55v1.606c0 .297-.253.55-.55.55h-1.045q-.858 0-1.188.396-.264.396-.264 1.056v1.342c0 .308.253.55.55.55h1.87a.55.55 0 0 1 .539.627l-.253 1.892a.546.546 0 0 1-.539.484h-1.617a.55.55 0 0 0-.55.55V23H20.8c1.21 0 2.2-.99 2.2-2.2V3.2c0-1.21-.99-2.2-2.2-2.2"></path>
                                        </svg>
                                    </a>
                                    <a className="inline-flex items-center gap-2 justify-center font-semibold whitespace-nowrap bg-[#0f212e] text-white hover:bg-[#071824] py-2.5 px-5 rounded-full w-[44px] h-[44px]">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="#b1bad3"
                                            className="inline-block shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M18.38 2h3.37l-7.4 8.49L23 22h-6.79l-5.31-7-6.08 7H1.44l7.84-9.08L1 2h6.96l4.8 6.39zM17.2 20.01h1.87L6.97 3.92H4.96z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>


                            <img src="https://cdn.sanity.io/images/tdrhge4k/stake-com-production/edcc770043c7c342a66625fb9dc91267fdc24a03-1200x630.png?q=80&auto=format"
                                alt="News Content"
                                className="w-full max-w-full h-auto object-cover rounded-md mb-4"
                            />

                            {/* Article  */}
                            <div className="text-white min-h-screen pt-4">
                                {/* Header Section */}
                                <div className="max-w-6xl mx-auto text-[#b1bad3] ">
                                    <h1 className="text-[20px] font-bold text-white mb-2">
                                        Most Popular Competitive Esports Tournaments - Bet on Global Esports Events
                                    </h1>

                                    <p className="mb-6">
                                        Electronic Sports, better known as Esports, are competitive video games, featuring the best players and teams from all over the world. You can{' '}
                                        <a className="text-[#b1bad3] hover:text-white underline font-semibold [text-underline-offset:25%]">
                                            bet on Esports
                                        </a>{' '}
                                        here at{' '}
                                        <a className="text-[#b1bad3] hover:text-white underline font-semibold [text-underline-offset:25%]">
                                            Stake Sportsbook
                                        </a>
                                        , with all major games including{' '}
                                        <a className="text-[#b1bad3] hover:text-white underline font-semibold [text-underline-offset:25%]">
                                            Counter-Strike 2
                                        </a>
                                        ,{' '}
                                        <a className="text-[#b1bad3] hover:text-white underline font-semibold [text-underline-offset:25%]">
                                            Valorant
                                        </a>
                                        ,{' '}
                                        <a className="text-[#b1bad3] hover:text-white underline font-semibold [text-underline-offset:25%]">
                                            League of Legends
                                        </a>{' '}
                                        and{' '}
                                        <a className="text-[#b1bad3] hover:text-white underline font-semibold [text-underline-offset:25%]">
                                            Dota 2
                                        </a>
                                        , covered. You can bet on your favourite Esports at{' '}
                                        <a className="text-white hover:text-white underline font-semibold [text-underline-offset:25%]">
                                            Stake.com
                                        </a>{' '}
                                        now or read on to discover the most popular Esports tournaments.
                                    </p>

                                    {/* What are Esports Tournaments */}
                                    <section className="mb-6">
                                        <h2 className="text-xl mt-6 mb-2 font-bold text-white">What are Esports Tournaments?</h2>
                                        <p className="">
                                            Esports tournaments are competitive gaming events in which qualified teams battle against each other for titles and prize money. Esports tournaments range from online games to massive offline events, held in arenas with thousands of fans in attendance, just like a regular sporting event. These offline events use local area network (LAN) connections to ensure opposing teams can compete against one another.
                                        </p>
                                    </section>
                                    <section className="mb-6">
                                        <h2 className="text-xl mt-6 mb-2 font-bold text-white">History of Competitive Esports</h2>
                                        <p className=" mb-3">
                                            It's believed that the first competitive video game event took place at Stanford University in 1972. Students could participate in an event to beat other teams or players in Spacewar! During the 70s, video games began to take off for the first time, with arcades offering players the chance to set and break high scores.
                                        </p>
                                        <p className=" mb-3">
                                            In 1974, Sega held the All Japan TV Game Championships, with local tournaments held at arcades all over Japan. 16 finalists then competed in the final elimination rounds, in a format that has inspired many Esports tournaments today.
                                        </p>
                                        <p className=" mb-3">
                                            Space Invaders popularised a persistent high score for all players, and in 1980, the Space Invaders Championship saw over 10,000 people attend from across the United States. Esports continued to grow as video games created new forms of gameplay, including direct player-vs-player (PVP) contests.
                                        </p>
                                        <p className=" mb-3">
                                            Although competitive video gaming continued to grow through the 90s, it wasn't until the year 2000 that the term Esports was first used. The term is credited to South Korea's Minister of Culture, Sports and Tourism, Park Jie-won, at the opening ceremony of the Korean Esports Association.
                                        </p>
                                        <p className="">
                                            Since then, Esports have continued to grow all over the world, and new games have helped create more excitement and action for players and fans to enjoy.
                                        </p>
                                    </section>
                                    <section className="mb-6">
                                        <h2 className="text-xl font-bold text-white mb-[33px] md:mb-6">Major Esports Tournaments</h2>

                                        {/* Counter-Strike 2 */}
                                        <div className="mb-8">
                                            <h3 className="text-[18px] mt-6 mb-2 font-bold text-white">Counter-Strike 2</h3>
                                            <ul className="list-disc pt-[0.5px] pl-8 mb-4">
                                                <li className="my-1">
                                                    <span>ESL Pro League</span> - The <a className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%]">
                                                        ESL Pro League
                                                    </a>{' '} Features 24 teams competing for $1 million in prize money every season. 2 seasons run every year, each with 3 stages to determine the champions. The first team to win 4 S-tier ESL events during the season will win the ESL Grand Slam.
                                                </li>
                                                <li className="my-1">
                                                    <span>Majors</span> - The Counter-Strike Major Championships, known simply as majors, are the most prestigious events in Counter-Strike Esports. There are usually 2 Majors per year, with prize pools of $1.25 million offered at each event. These tournaments are held all over the world, with the {" "}
                                                    <a className="text-[#b1bad3] hover:text-white inline-flex items-center gap-1 cursor-pointer [text-underline-offset:25%]">
                                                        BLAST.tv Austin Major <Icon name={"linkIcon"} /></a>{' '} is one of the most recent examples.
                                                </li>
                                                <li className="my-1">
                                                    <span>IEM</span> - The Intel Extreme Masters events are part of the ESL Masters events, featuring the world's best teams. Some IEM events are designated as Majors, while others are regular tournaments. They take place all over the world, including Katowice, Cologne, Dallas and Chengdu.

                                                </li>
                                                <li className="my-1">
                                                    <span>BLAST Premier</span> - BLAST organises the BLAST Bounty, <a className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] cursor-pointer"> BLAST Open </a> and BLAST Rivals tournaments each season. Bounty tournaments feature 32 teams which compete to win bounties by defeating opponents. Open tournaments are modelled on IEM events, and Rivals tournaments feature the very best teams.
                                                </li>
                                            </ul>
                                        </div>

                                        {/* League of Legends */}
                                        <div className="mb-8">
                                            <h3 className="text-[18px] mt-6 mb-2 font-bold text-white">League of Legends</h3>
                                            <ul className="list-disc pt-[0.2px] pl-8 mb-4 leading-[24px]">
                                                <li className="my-1">
                                                    <span>LCK</span> - {""}The
                                                    <a className="text-[#b1bad3] hover:text-white underline cursor-pointer [text-underline-offset:25%]"> League of Legends Champions Korea </a> (LCK) is the regional LoL competition for South Korea. This is the strongest regional league in the world, as LCK teams have won 9 League of Legends World Championship Esports titles.
                                                </li>
                                                <li className="my-1">
                                                    <span>LCS</span> - The <a className="text-[#b1bad3] hover:text-white underline cursor-pointer [text-underline-offset:25%]">League Championship Series </a> is the regional league for North America and Latin America. Although it was merged with the CBLOL and LLA to form LTA in 2025, it will return in 2026.
                                                </li>
                                                <li className="my-1">
                                                    <span>LPL</span> - The Chinese regional competition for League of Legends is known as the <a className="text-[#b1bad3] hover:text-white underline cursor-pointer [text-underline-offset:25%]">League of Legends Pro League. </a>There have been 3 World Champion teams from the LPL.
                                                </li>
                                                <li className="my-1">
                                                    <span>MSI</span> - The <a className="text-[#b1bad3] hover:text-white underline cursor-pointer [text-underline-offset:25%]">Mid-Season Invitational </a>is an annual League of Legends tournament that takes place halfway through the season. Teams qualify based on their regional league split performance.
                                                </li>
                                                <li className="my-1">
                                                    <span>Worlds</span> - The <a className="text-[#b1bad3] hover:text-white underline cursor-pointer [text-underline-offset:25%]">LoL World Championships </a>take place every year after the second half of the regional league seasons have concluded. 17 teams enter, but only one can be crowned world champion.
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Dota 2 */}
                                        <div className="mb-8">
                                            <h3 className="text-[18px] mt-6 mb-[12px] font-bold text-white">Dota 2</h3>

                                            <ul className="list-disc pl-8 mb-4 leading-[24px] space-y-2">
                                                <li className="my-1">
                                                    <span>BLAST Slam</span> - The BLAST Slam series takes place throughout the season, featuring 10 of the world’s best teams. $1 million in prize money is up for grabs as teams play through the group stage and single-elimination playoffs.
                                                </li>

                                                <li className="my-1">
                                                    <a
                                                        href="/sports/dota-2/esl-dota2"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        ESL Pro Tour
                                                    </a>{" "}
                                                    - An open circuit where teams compete across multiple tournaments for a chance to play in the Championship event at the Esports World Cup.
                                                </li>

                                                <li className="my-1">
                                                    <span>DreamLeague</span> - The{" "}
                                                    <a
                                                        href="/sports/dota-2/international-2/dreamleague-season-26"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        DreamLeague
                                                    </a>{" "}
                                                    forms a major part of the Dota 2 ESL Pro Tour. These tournaments feature 24 teams and a prize pool of $1 million. The format is a best-of-3 Swiss system leading into double-elimination playoffs.
                                                </li>

                                                <li className="my-1">
                                                    <span>The International</span> - The biggest and most prestigious Dota 2 event is{" "}
                                                    <a
                                                        href="/blog/dota-2-the-international-picks-predictions"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        The International
                                                    </a>
                                                    , which has also historically offered some of the biggest prize pools in Esports. The format was recently updated to feature a Swiss system, which leads to the knockout playoffs. In 2025, teams can win a share of more than $2 million.
                                                </li>
                                            </ul>


                                        </div>

                                        {/* Valorant */}
                                        <div className="mb-8">
                                            <h3 className="!text-[18px] mt-6 mb-[12px] font-bold text-white">Valorant</h3>
                                            <ul className="list-disc pl-8 mb-4 leading-[24px] space-y-2">
                                                <li className="my-1">
                                                    VCT - The Valorant Champions Tour (VCT) is the global circuit of regional and international tournaments that leads up to the Valorant Champions event. Teams compete in one of the four regional leagues around the world, earning points for their chance to compete in the top international tournaments, including the Masters and Champions.
                                                </li>

                                                <li className="my-1">
                                                    Valorant Masters - The{" "}
                                                    <a
                                                        href="/sports/valorant/international-13/valorant-masters-toronto-2025"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        Masters tournaments
                                                    </a>{" "}
                                                    are part of the VCT and feature the 12 best teams from around the world. Current Valorant Masters events offer $1 million in prize money.
                                                </li>

                                                <li className="my-1">
                                                    Valorant Game Changers - The Game Changers Championship offers opportunities to women and marginalised genders, creating a more inclusive environment. Like the VCT, teams compete in regional leagues for a chance to compete for the global championship.
                                                </li>

                                                <li className="my-1">
                                                    Valorant Champions - The VCT culminates in the annual{" "}
                                                    <a
                                                        href="/blog/valorant-vct-champions-picks-predictions"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        Valorant Champions tournament
                                                    </a>
                                                    , which crowns the world champion.
                                                </li>
                                            </ul>

                                        </div>

                                        {/* Esports World Cup */}
                                        <div>
                                            <h3 className="text-[18px] mt-6 mb-2 font-bold text-white">Esports World Cup</h3>
                                            <p>
                                                The{" "}
                                                <a
                                                    href="/blog/esports-world-cup-picks-predictions"
                                                    className="text-[#b1bad3] hover:text-white underline inline-flex items-center gap-1 [text-underline-offset:25%]"
                                                >
                                                    Esports World Cup
                                                </a>{" "}
                                                is a major annual Esports event which features tournaments in many of the most popular Esports events. It’s held in Riyadh, Saudi Arabia, and offers big prize pools. In addition, all teams taking part have a chance to win the Club Championship by performing well in tournaments across multiple games.
                                            </p>

                                        </div>
                                    </section>

                                    {/* Most Popular Teams & Players */}
                                    <section className="mb-12">
                                        <h2 className="text-xl font-bold text-white mt-6 mb-2">Most Popular Teams & Players</h2>

                                        <div className="grid grid-cols-1">
                                            <div>
                                                <h3 className="text-[18px] mt-[25px] mb-[12px] text-white font-bold">FPS</h3>
                                                <ul className="list-disc pl-8 mb-4 leading-[24px] space-y-[4px]">
                                                    <li> <a
                                                        className="text-[#b1bad3] !mb-0 hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        Team Vitality
                                                    </a>{" "} - CS2</li>
                                                    <li>Team Spirit - CS2</li>
                                                    <li>FaZe Clan - CS2</li>
                                                    <li>Fnatic - Valorant</li>
                                                    <li>Team Falcons - Apex Legends</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-[18px] text-white mt-[25px] mb-[12px] font-bold">MOBA</h3>
                                                <ul className="list-disc pl-8 mb-4 leading-[24px] space-y-[4px]">
                                                    <li>T1 - League of Legends</li>
                                                    <li>G2 Esports - League of Legends</li>
                                                    <li>Gen.G - League of Legends</li>
                                                    <li>Bilibili Gaming - League of Legends</li>
                                                    <li>Team Falcons - Dota 2</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-[18px] text-white mt-[25px]  font-bold !mb-[12px]">RTS</h3>
                                                <ul className="list-disc pl-8 mb-4 leading-[24px] space-y-[4px]">
                                                    <li>Team Liquid - Starcraft II</li>
                                                    <li>Team Vitality - Starcraft II</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-[18px] text-white mt-[25px] mb-[12px]  font-bold">Sports</h3>
                                                <ul className="list-disc pl-8 mb-4 leading-[24px] space-y-[4px]">
                                                    <li>Nicolas99fc - EA FC</li>
                                                    <li>Verjrgang - EA FC</li>
                                                    <li>Tekkz - EA FC</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Betting Markets */}
                                    <section className="mb-12">
                                        <h2 className="text-xl font-bold text-white mt-6 mb-2">Most Popular Esports Betting Markets & Bet Types</h2>
                                        <p>
                                            Betting on Esports tournaments is just like betting on any other sports events at Stake.
                                            You can check out our{" "}
                                            <a
                                                href="/blog/esports-betting-guide"
                                                className="text-[#b1bad3] hover:text-white underline inline-flex [text-underline-offset:25%] items-center gap-1"
                                            >
                                                Esports betting guide
                                            </a>{" "}
                                            and our guides for specific game types, such as{" "}
                                            <a
                                                href="/blog/fps-games-esports-betting-guide"
                                                className="text-[#b1bad3] hover:text-white underline inline-flex [text-underline-offset:25%] items-center gap-1"
                                            >
                                                FPS game betting
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="/blog/moba-games-esports-betting-guide"
                                                className="text-[#b1bad3] hover:text-white underline inline-flex [text-underline-offset:25%] items-center gap-1"
                                            >
                                                MOBA game betting
                                            </a>
                                            . We’ve also got guides on{" "}
                                            <a
                                                href="/blog/fps-terminology-explained"
                                                className="text-[#b1bad3] hover:text-white underline inline-flex [text-underline-offset:25%] items-center gap-1"
                                            >
                                                FPS game terminology
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="/blog/moba-terminology-explained"
                                                className="text-[#b1bad3] hover:text-white underline inline-flex [text-underline-offset:25%] items-center gap-1"
                                            >
                                                MOBA terminology
                                            </a>
                                            .
                                        </p>
                                        <p className="mt-3">
                                            There are many different Esports betting markets at Stake. Some of the most popular bet types include:
                                        </p>

                                        <ul className="list-disc pl-8 mb-4 leading-[24px]">
                                            <li className="my-1">
                                                <p className="leading-[24px]">
                                                    Match winner - Twoway - This is essentially a{" "}
                                                    <a
                                                        href="/blog/moneyline-betting-guide"
                                                        className="text-[#b1bad3] hover:text-white underline inline-flex [text-underline-offset:25%] items-center gap-1"
                                                    >
                                                        moneyline bet
                                                    </a>
                                                    , where you pick which team you think will win the match overall.
                                                </p>
                                            </li>

                                            <li className="my-1">
                                                <p className="leading-[24px]">
                                                    Map winner - Threeway - A video game map, the area in which the game is
                                                    played, is typically used as a round for Esports tournaments. This bet
                                                    allows you to choose which team you think will win the map, with a draw
                                                    also possible for some games.
                                                </p>
                                            </li>

                                            <li className="my-1">
                                                <p className="leading-[24px]">
                                                    Map Handicap - This{" "}
                                                    <a
                                                        href="/blog/handicaps-a-sports-betting-guide"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        handicap betting market
                                                    </a>{" "}
                                                    lets you predict which team will win the game with a map handicap applied.
                                                </p>
                                            </li>

                                            <li className="my-1">
                                                <p className="leading-[24px]">
                                                    Total Maps/Kills - Bet on the{" "}
                                                    <a
                                                        href="/blog/over-under-betting-guide"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        over/under line
                                                    </a>{" "}
                                                    for the total maps played during the game. You can also bet on the total
                                                    kills during the match or the total kills for either team.
                                                </p>
                                            </li>

                                            <li className="my-1">
                                                <p className="leading-[24px]">
                                                    <a
                                                        href="/blog/correct-score-betting-strategy-explained"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        Correct Score
                                                    </a>{" "}
                                                    - This bet type allows you to predict the final score of the match.
                                                </p>
                                            </li>

                                            <li className="my-1">
                                                <p className="leading-[24px]">
                                                    Prop bets -{" "}
                                                    <a
                                                        href="/blog/prop-betting-guide"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        Prop bets
                                                    </a>{" "}
                                                    offer the chance to bet on stats that aren’t directly tied to the game’s
                                                    result. For example, you can bet on the total kills for a specific player,
                                                    multi-kills or which player will achieve first blood.
                                                </p>
                                            </li>

                                            <li className="my-1">
                                                <p className="leading-[24px]">
                                                    <a
                                                        href="/blog/parlay-betting-guide"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        Parlays
                                                    </a>{" "}
                                                    - Within your betslip, you’ll be able to combine multiple bets into one,
                                                    known as a parlay, to increase your odds and potential payout. Some
                                                    Esports events also offer{" "}
                                                    <a
                                                        href="/blog/same-game-multi-bet-builder"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        same-game multibets
                                                    </a>
                                                    , where you can combine bets within the same match.
                                                </p>
                                            </li>

                                            <li className="my-1">
                                                <p className="leading-[24px]">
                                                    Outright bets - Betting on the Esports tournament winner is an example of{" "}
                                                    <a
                                                        href="/blog/outright-betting-guide"
                                                        className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                    >
                                                        outright betting
                                                    </a>
                                                    .
                                                </p>
                                            </li>
                                        </ul>

                                    </section>

                                    {/* Live Streaming & Betting */}
                                    <section className="">
                                        <h2 className="text-xl font-bold text-white mt-6 mb-2">How to Watch Esports Live Streams & Place Live Bets</h2>
                                        <p className="my-1 text-base leading-relaxed text-gray-300">
                                            All major esports events are covered at Stake, with{" "}
                                            <a
                                                href="/blog/live-betting-vs-pre-match-betting"
                                                className="underline [text-underline-offset:25%]  decoration-[0.5px] text-gray-200 hover:text-white transition"
                                            >
                                                pre-match and live betting
                                            </a>{" "}
                                            options available. You can check out the latest{" "}
                                            <a
                                                href="/sports/live"
                                                className="underline [text-underline-offset:25%] decoration-[0.5px] text-gray-200 hover:text-white transition"
                                            >
                                                live betting odds
                                            </a>{" "}
                                            at any time by opening the event as it’s happening. Live scores and stats are
                                            provided too, increasing your insights into the match and helping your chances
                                            while in-play betting.
                                        </p>

                                        <p className="mt-3 text-base leading-relaxed text-gray-300">
                                            We also enable you to keep up with all esports events as they happen in real
                                            time through our live stream feature. All you have to do is access the Live
                                            Stream tab and find all ongoing major events. From there, find the event you
                                            bet on and click on the little screen icon to start the live stream.{" "}
                                            <a
                                                href="/blog/how-to-watch-live-stream-sports-free"
                                                className="underline [text-underline-offset:25%] decoration-[0.5px] text-gray-200 hover:text-white transition"
                                            >
                                                Live streaming is completely free
                                            </a>
                                            , and you’ll be able to enjoy all the action as it happens and place more
                                            informed bets.
                                        </p>

                                    </section>

                                    {/* Deposit & Withdrawal */}
                                    <section className="mb-[31px]">
                                        <h2 className="text-xl font-bold text-white mt-6 mb-2">Deposit & Withdrawal Methods for Betting on Esports</h2>

                                        <div className="grid md:grid-cols-1 gap-8">
                                            {/* Deposit */}
                                            <div>
                                                <h3 className="text-[18px] font-bold text-white mt-[25px] mb-[12px]">Deposit</h3>
                                                <ol className="list-decimal pl-8 mb-[17px] flex flex-col gap-[4px]">
                                                    <li className="my-1">
                                                        Log in to your Stake.com account using your{" "}
                                                        <a
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            secure passkey
                                                            <Icon name={"linkIcon"} />
                                                        </a>{" "}
                                                        and open your wallet.
                                                    </li>

                                                    <li className="my-1">
                                                        Choose the deposit option and then pick any of the{" "}
                                                        <a
                                                            href="/blog/deposit-withdrawal-methods-online-betting"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            available payment methods
                                                        </a>{" "}
                                                        and{" "}
                                                        <a
                                                            href="/blog/local-currency-deposit-withdraw-guide"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            local currencies
                                                        </a>
                                                        , which include{" "}
                                                        <a
                                                            href="/blog/how-to-deposit-canadian-dollars-cad"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            Canadian Dollars
                                                        </a>
                                                        ,{" "}
                                                        <a
                                                            href="/blog/how-to-deposit-turkish-lira-try"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            Turkish Lira
                                                        </a>
                                                        ,{" "}
                                                        <a
                                                            href="/blog/how-to-deposit-vietnamese-dong-vnd"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            Vietnamese Dong
                                                        </a>
                                                        ,{" "}
                                                        <a
                                                            href="/blog/how-to-deposit-argentine-pesos-ars"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            Argentine Pesos
                                                        </a>
                                                        ,{" "}
                                                        <a
                                                            href="/blog/how-to-deposit-chilean-pesos-clp"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            Chilean Pesos
                                                        </a>
                                                        ,{" "}
                                                        <a
                                                            href="/blog/how-to-deposit-mexican-pesos-mxn"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            Mexican Pesos
                                                        </a>
                                                        ,{" "}
                                                        <a
                                                            href="/blog/how-to-deposit-usd-ecuador-currency"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            USD in Ecuador
                                                        </a>
                                                        , and{" "}
                                                        <a
                                                            href="/blog/how-to-deposit-indian-rupees-inr"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            Indian Rupees
                                                        </a>
                                                        .
                                                    </li>

                                                    <li className="my-1">
                                                        <a
                                                            href="/blog/what-crypto-does-stake-offer"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            Stake also supports crypto deposits
                                                        </a>
                                                        , with lots of{" "}
                                                        <a
                                                            href="/blog/what-is-crypto-gambling-guide"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            crypto betting options
                                                        </a>{" "}
                                                        available, such as{" "}
                                                        <a
                                                            href="/blog/what-is-bitcoin"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            BTC
                                                        </a>
                                                        ,{" "}
                                                        <a
                                                            href="/blog/what-is-ethereum-eth-crypto-betting"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            ETH
                                                        </a>
                                                        , and more.
                                                    </li>

                                                    <li className="my-1">
                                                        Deposits are usually instant, but some methods{" "}
                                                        <a
                                                            href="/blog/deposit-withdrawal-delays-troubleshooting"
                                                            className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1"
                                                        >
                                                            may take a few minutes to process
                                                        </a>
                                                        . Always double-check your chosen currency and method before confirming the transaction.
                                                    </li>

                                                    <li className="my-1">
                                                        Once your deposit arrives, store your coins in the Stake vault for additional security.
                                                    </li>
                                                </ol>
                                            </div>

                                            {/* Withdraw */}
                                            <div>
                                                <h3 className="text-[18px] font-bold text-white mb-3">Withdraw</h3>
                                                <ol className="list-decimal pl-8 mb-[17px] flex flex-col gap-[8px]">
                                                    <li>Log in and open your Stake wallet</li>
                                                    <li>Choose the withdraw option and select any of the available payment methods.</li>
                                                    <li>Enter your payment details and the amount you’d like to withdraw.</li>
                                                    <li>If you’re withdrawing crypto, ensure you have the {""} <a className="text-[#b1bad3] hover:text-white underline [text-underline-offset:25%] inline-flex items-center gap-1 cursor-pointer">
                                                        right crypto network selected
                                                        <Icon name={"linkIcon"} /></a></li>
                                                    <li>Double-check all your details before you confirm the payment.</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Promotions & Responsible Gambling */}
                                    <section>
                                        <h2 className="text-xl font-bold text-white mt-6 mb-2">Sports Betting Promotions, VIP Club & Responsible Gambling</h2>
                                        <p className="text-[#b1bad3] leading-6 space-y-1">
                                            If you’re a regular bettor at Stake, you’ll be able to make the most of our{" "}
                                            <a
                                                href="/promotions/category/sports"
                                                className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]"
                                            >
                                                betting promotions
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="/blog/vip-program-levels-benefits-rewards"
                                                className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]"
                                            >
                                                access exclusive rewards
                                            </a>{" "}
                                            via the{" "}
                                            <a
                                                href="/vip-club"
                                                className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]"
                                            >
                                                Stake VIP Club
                                            </a>
                                            . VIPs can enjoy several benefits, like{" "}
                                            <a
                                                href="/blog/what-is-stake-rakeback"
                                                className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]"
                                            >
                                                regular rakeback
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="/blog/what-is-stake-reload-bonus"
                                                className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]"
                                            >
                                                reload bonuses
                                            </a>
                                            , as they level up their accounts. You can even unlock{" "}
                                            <a
                                                href="/blog/perks-benefits-of-stake-vip-hosts"
                                                className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]"
                                            >
                                                your own VIP host
                                            </a>{" "}
                                            if you reach the top levels.
                                        </p>
                                        <p className="mt-3">
                                            If you have questions about the VIP Club perks, you can always consult the{" "}
                                            <a className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]">
                                                customer support guide
                                            </a>{" "}
                                            or look into the dedicated{" "}
                                            <a className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]">
                                                VIP Club FAQ page
                                            </a>.
                                        </p>

                                        <p className="mt-3">
                                            Make sure you follow our{" "}
                                            <a href="/responsible-gambling/stake-safe" className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]">
                                                Stake Smart guidelines
                                            </a>{" "}
                                            to stay in control and{" "}
                                            <a
                                                href="/blog/responsible-gambling-online-guide-stake-smart"
                                                className="underline [text-underline-offset:25%] hover:text-white text-[#b1bad3]"
                                            >
                                                bet responsibly
                                            </a>{" "}
                                            while enjoying Esports.
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            <a className="inline-flex items-center gap-2 justify-center font-semibold whitespace-nowrap bg-[#0f212e] text-white hover:[#071824] py-[6px] px-3 rounded-full transition overflow-hidden my-4"
                                            >
                                                <span className="text-sm">Sport</span>
                                            </a>
                                        </div>

                                    </section>
                                </div>
                            </div>
                        </div>

                        <div className="pb-8">
                            <div className="pb-8 px-2">
                                <div className="">

                                    <h2 className="text-xl font-bold text-white mt-6">
                                        Other Popular Articles
                                    </h2>

                                    <hr className="border-t-2 border-[#2f4553] mt-4 mb-6"></hr>


                                    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-4">
                                        {blogArticles.map((article, index) => (
                                            <div
                                                key={index}
                                                className="bg-[#2f4553] rounded-[8px] shadow-md overflow-hidden  transition ease-in-out duration-250 
                 hover:-translate-y-1 hover:shadow-lg 
                 w-full ">
                                                <Link href={article.href}>
                                                    <div className="relative w-full">
                                                        <img
                                                            src={article.image}
                                                            alt={article.title}
                                                            className="object-cover w-full h-auto"
                                                        />
                                                    </div>
                                                </Link>
                                                <div className=" flex flex-col gap-1 py-3 px-4">
                                                    <Link href={article.href}>
                                                        <h3 className="font-semibold text-[16px] leading-[24px] text-white text-lg  line-clamp-2 ">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-[#b1bad3] text-[14px] mb-4 line-clamp-3">
                                                            {article.description}
                                                        </p>
                                                        <div className="text-[14px]">
                                                            <span className="font-semibold text-[#b1bad3] ">
                                                                Published at
                                                            </span>
                                                            <div className="font-semibold text-white text-[14px]">
                                                                {article.date}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
