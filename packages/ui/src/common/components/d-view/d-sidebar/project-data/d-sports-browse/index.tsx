export interface NavItem {
  title?: string;
  url?: string;
  icon?: string;
  className?: string;
  isLabel?: boolean;
  divider?: boolean;
  disabled?: boolean;
  badge?: number;
  items?: NavItem[];
  name?: string;
}

export interface NavData {
  navMain: NavItem[];
}
export const sportsNavData: NavData = {
  navMain: [
    { title: "Live Events", icon: "startPlaying", url: "#", className: "font-bold", badge: 57 },
    { title: "Starting Soon", icon: "time", url: "#" },
    { title: "My Bets", icon: "bets", url: "#", disabled: true },
    { divider: true },
    { title: "Top Sports", isLabel: true, className: "text-[rgb(177,186,211)] font-semibold" },
    {
      title: "Soccer", icon: "sports", url: "#", items: [
        { title: "England Premier League", icon: "sports", url: "#" },
        { title: "Champions League", icon: "sports", url: "#" },
      ]
    },
    {
      title: "Tennis", icon: "sports", url: "#", items: [
        { title: "ATP Finals", icon: "sports", url: "#" },
        { title: "Wimbledon", icon: "sports", url: "#" },
      ]
    },
    {
      title: "Baseball", icon: "sports", url: "#", items: [
        { title: "MLB", icon: "sports", url: "#" },
      ]
    },
    {
      title: "American Football", icon: "sports", url: "#", items: [
        { title: "NFL", icon: "sports", url: "#" },
      ]
    },
    {
      title: "Cricket", icon: "sports", url: "#", items: [
        { title: "IPL", icon: "sports", url: "#" },
        { title: "World Cup", icon: "sports", url: "#" },
      ]
    },
    {
      title: "Basketball", icon: "sports", url: "#", items: [
        { title: "ATP Finals", icon: "sports", url: "#" },
        { title: "Wimbledon", icon: "sports", url: "#" },
      ]
    },
    {
      title: "Racing", icon: "sports", url: "#", items: [
        { title: "ATP Finals", icon: "sports", url: "#" },
        { title: "Wimbledon", icon: "sports", url: "#" },
      ]
    },
    {
      title: "Volleyball", icon: "sports", url: "#", items: [
        { title: "ATP Finals", icon: "sports", url: "#" },
        { title: "Wimbledon", icon: "sports", url: "#" },
      ]
    },
    {
      title: "CS2", icon: "sports", url: "#", items: [
        { title: "ATP Finals", icon: "sports", url: "#" },
        { title: "Wimbledon", icon: "sports", url: "#" },
      ]
    },
    {
      title: "League of Legends", icon: "sports", url: "#", items: [
        { title: "ATP Finals", icon: "sports", url: "#" },
        { title: "Wimbledon", icon: "sports", url: "#" },
      ]
    },
    { divider: true },
    {
      title: "All Sports",
      icon: "sports",
      url: "#",
      items: [
        { title: "Soccer", icon: "sports", url: "#" },
        { title: "Basketball", icon: "sports", url: "#" },
        { title: "Tennis", icon: "sports", url: "#" },
        { title: "More...", icon: "sports", url: "#" },
      ],
    },
    {
      title: "All Esports",
      icon: "sports",
      url: "#",
      items: [
        { title: "CS2", icon: "sports", url: "#" },
        { title: "League of Legends", icon: "sports", url: "#" },
        { title: "Dota 2", icon: "sports", url: "#" },
      ],
    },
    {
      title: "All Racing",
      icon: "sports",
      url: "#",
      items: [
        { title: "Horse Racing", icon: "sports", url: "#" },
        { title: "Greyhounds", icon: "sports", url: "#" },
        { title: "Harness Racing", icon: "sports", url: "#" },
      ],
    },
    { divider: true },
      {
        title: "Promotions",
        url: "#",
        icon: "gift",
        items: [
          { title: "$75k Weekly Raffle", icon: "ticket", url: "#" },
          { title: "$100k Race", icon: "time", url: "#" },
          { title: "Pragmatic Drops & Wins", icon: "trophy", url: "#" },
          { title: "View All", icon: "gift", url: "#" },
        ],
      },
      { title: "Affiliate", icon: "joint", url: "#" },
      { title: "VIP Club", icon: "trophy", url: "#" },
      { title: "Blog", icon: "faqBlog", url: "#" },
      { title: "Forum", icon: "chat", url: "#" },
      { divider: true },
      {
        title: "Sponsorships",
        url: "#",
        icon: "hand",
        items: [
          { title: "$75k Weekly Raffle", icon: "ticket", url: "#" },
          { title: "$100k Race", icon: "time", url: "#" },
          { title: "Pragmatic Drops & Wins", icon: "trophy", url: "#" },
          { title: "View All", icon: "gift", url: "#" },
        ],
      },
      { title: "Responsible Gambling", icon: "privacy", url: "#" },
      { title: "Live Support", icon: "support", url: "#" },
      {
        title: "Language: English",
        icon: "language",
        url: "#",
        items: [], 
      },
  ],
};


