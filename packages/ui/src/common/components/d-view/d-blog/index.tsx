"use client";
import Link from "next/link";
import { useState } from "react";

const DBlog = () => {
  const [activeBlogCategory, setActiveBlogCategory] = useState("All Blogs");

  const [currentPage, setCurrentPage] = useState(1);

  const blogCategories = [
    { name: "All Blogs", href: "/blog" },
    { name: "Crypto", href: "" },
    { name: "How to Guides", href: "" },
    { name: "Stake News", href: "" },
    { name: "Sport", href: "" },
    { name: "Poker", href: "" },
    { name: "Casino", href: "" },
    { name: "Other", href: "" },
  ];

  const blogArticles = [
    {
      title: "Popular Esports Events & Tournaments",
       slug: "popular-esports-events-tournaments",
      category: "Crypto",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Popular Esports Events & Tournaments",
       slug: "popular-esports-events-tournaments",
      category: "Crypto",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Popular Esports Events & Tournaments",
       slug: "popular-esports-events-tournaments",
      category: "Crypto",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Popular Esports Events & Tournaments",
       slug: "popular-esports-events-tournaments",
      category: "Crypto",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Popular Esports Events & Tournaments",
       slug: "popular-esports-events-tournaments",
      category: "Crypto",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "How to Play Plinko on Stake - Free Plinko Betting Strategy",
             slug: "popular-esports-events-tournaments",

          category: "How to Guides",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },  {
      title: "How to Play Plinko on Stake - Free Plinko Betting Strategy",
             slug: "popular-esports-events-tournaments",

          category: "How to Guides",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },  {
      title: "How to Play Plinko on Stake - Free Plinko Betting Strategy",
             slug: "popular-esports-events-tournaments",

          category: "How to Guides",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },  {
      title: "How to Play Plinko on Stake - Free Plinko Betting Strategy",
             slug: "popular-esports-events-tournaments",

          category: "How to Guides",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "Premier League Week 10 Predictions",
             slug: "popular-esports-events-tournaments",

            category: "Stake News",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Premier League Week 10 Predictions",
             slug: "popular-esports-events-tournaments",

            category: "Stake News",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Premier League Week 10 Predictions",
             slug: "popular-esports-events-tournaments",

            category: "Stake News",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Premier League Week 10 Predictions",
             slug: "popular-esports-events-tournaments",

            category: "Stake News",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "Premier League Week 10 Predictions",
             slug: "popular-esports-events-tournaments",

           category: "Sport",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Premier League Week 10 Predictions",
             slug: "popular-esports-events-tournaments",

           category: "Sport",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Premier League Week 10 Predictions",
             slug: "popular-esports-events-tournaments",

           category: "Sport",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Premier League Week 10 Predictions",
             slug: "popular-esports-events-tournaments",

           category: "Sport",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "Top Poker Strategies for Beginners",
             slug: "popular-esports-events-tournaments",

        category: "Poker",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Top Poker Strategies for Beginners",
             slug: "popular-esports-events-tournaments",

        category: "Poker",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Top Poker Strategies for Beginners",
             slug: "popular-esports-events-tournaments",

        category: "Poker",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
      title: "Top Poker Strategies for Beginners",
             slug: "popular-esports-events-tournaments",

        category: "Poker",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },
    {
     title: "Casino Game Spotlight: Roulette",
            slug: "popular-esports-events-tournaments",

               category: "Casino",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
     title: "Casino Game Spotlight: Roulette",
            slug: "popular-esports-events-tournaments",

               category: "Casino",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
     title: "Casino Game Spotlight: Roulette",
            slug: "popular-esports-events-tournaments",

               category: "Casino",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
     title: "Casino Game Spotlight: Roulette",
            slug: "popular-esports-events-tournaments",

               category: "Casino",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },
    {
   title: "Fun Reads: Behind the Scenes of Online Gambling",  
          slug: "popular-esports-events-tournaments",
       category: "Other",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
   title: "Fun Reads: Behind the Scenes of Online Gambling",  
          slug: "popular-esports-events-tournaments",
       category: "Other",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
   title: "Fun Reads: Behind the Scenes of Online Gambling",  
          slug: "popular-esports-events-tournaments",
       category: "Other",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
   title: "Fun Reads: Behind the Scenes of Online Gambling",  
          slug: "popular-esports-events-tournaments",
       category: "Other",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },    {
   title: "Fun Reads: Behind the Scenes of Online Gambling",  
          slug: "popular-esports-events-tournaments",
       category: "Other",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "Popular Esports Events & Tournaments",
             slug: "popular-esports-events-tournaments",

      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "Popular Esports Events & Tournaments",
             slug: "popular-esports-events-tournaments",
      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg2.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "Popular Esports Events & Tournaments",
                   slug: "popular-esports-events-tournaments",

      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg2.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "Popular Esports Events & Tournaments",
                   slug: "popular-esports-events-tournaments",

      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg2.png",
      href: "",
      date: "October 2, 2025",
    },
    {
      title: "Popular Esports Events & Tournaments",
                   slug: "popular-esports-events-tournaments",

      description:
        "The gaming community stretches across all countries and continents, so there is no shortage of betting options available! Find out how to bet on your favourite Esports from major tournaments online at Stake Sportsbook.",
      image: "/blog/articalimg2.png",
      href: "",
      date: "October 2, 2025",
    },
  ];

  const blogsPerPage = blogArticles.length / 2;
  // Filter logic
  const filteredArticles =
    activeBlogCategory === "All Blogs"
      ? blogArticles
      : blogArticles.filter((article) => article.category === activeBlogCategory);


  const totalPages = Math.ceil(filteredArticles.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  return (
    <div className="flex items-center justify-center flex-col px-[3vw] overflow-hidden">
      <div className="pb-[80px] md:pb-8 max-w-[1200px] w-full ">
        {/* Banner Section */}
        <div className="relative w-full">
          <div className="absolute top-0 left-[-100%] h-full w-[300%] bg-[#213743]"></div>
          <div className="relative w-full z-10 flex justify-between items-center flex-wrap gap-4">
            <div className="w-full h-[115px] max-md:h-[80px]  flex overflow-hidden">
              <div className="flex justify-center  items-center whitespace-nowrap">
                <h1 className="text-white text-[24px] font-bold">Blog</h1>
              </div>
              <div className="flex justify-end items-center w-full">
                <img
                  src="blog/blogBanner.png"
                  alt="Blog"
                  className="w-auto h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="mt-6  overflow-x-auto overflow-y-hidden [scrollbar-width:thin] [scrollbar-color:#2f4553_transparent]  [-webkit-overflow-scrolling:touch]  [transform:translate(0)] ![-moz-transform:none]">
          <div className="flex rounded-[48px] p-[6px] bg-[#0f212e] w-fit ">
            <div className=" text-[16px] font-semibold ">
              <div className="flex ">
                {blogCategories.map((category, index) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveBlogCategory(category.name);
                      setCurrentPage(1); // Reset to page 1 when changing category
                    }}
                    className={`items-center justify-center font-semibold border-0 whitespace-nowrap px-5 py-2.5 rounded-full cursor-pointer ${
                      activeBlogCategory === category.name
                        ? "bg-[#2f4553] text-white"
                        : "bg-transparent text-white hover:bg-[#2f4553]"
                    } ${index === 0 ? "ml-0" : "ml-[8px]"}`}>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Cards */}
        <div className="mt-6">
          {paginatedArticles.length === 0 ? (
            <p className="text-white text-center mt-6">No blogs found.</p>
          ) : (
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-4">
              {paginatedArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-[#2f4553] rounded-[8px] shadow-md overflow-hidden  transition ease-in-out duration-250 
                 hover:-translate-y-1 hover:shadow-lg 
                 w-full ">
                  <Link href={`/blog/${article.slug}`}>
                    <div className="relative w-full">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="object-cover w-full h-auto"
                      />
                    </div>
                  </Link>
                  <div className=" flex flex-col gap-1 py-3 px-4">
                    <Link href={`/blog/${article.slug}`}>
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
          )}
            <div className="flex justify-center md:mt-8 mt-[34px]">
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className="px-5 py-2.5 bg-[#2f4553] text-white rounded-md font-semibold disabled:opacity-50 hover:bg-[#557086] disabled:hover:bg-[#2f4553] transition-colors disabled:cursor-auto cursor-pointer">
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2.5 bg-[#2f4553] text-white rounded-md font-semibold disabled:opacity-50 hover:bg-[#557086] disabled:hover:bg-[#2f4553] transition-colors disabled:cursor-auto cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default DBlog;
