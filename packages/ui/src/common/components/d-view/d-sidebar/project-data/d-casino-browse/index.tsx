export interface NavItem {
  title?: string;
  url?: string;
  icon?: string;
  className?: string;
  isLabel?: boolean;
  divider?: boolean;
  items?: NavItem[];
  disabled?:any;
}

export interface NavData {
  navMain: NavItem[];
}

export const casinoNavData: NavData = {
  navMain: [
    { title: "Favourites", icon: "starSilver", url: "#", disabled: true },
    { title: "Recent", icon: "raceTime", url: "#", disabled: true },
    { title: "Challenges", icon: "casino", url: "#", className: "text-white" },
    { title: "My Bets", icon: "ticket", url: "#",disabled: true },
    { divider: true },
    { title: "Games", isLabel: true, className: "text-[rgb(177,186,211)] font-semibold" },
    { title: "New Releases", icon: "time", url: "#" },
    { title: "Slots", icon: "responsible", url: "#" },
    { title: "Stake Originals", icon: "responsible", url: "#" },
    { title: "Stake Exclusives", icon: "dollar", url: "#" },
    { title: "Live Casino", icon: "casino", url: "#" },
    { title: "Game Shows", icon: "gift", url: "#" },
    { title: "Burst Games", icon: "responsible", url: "#" },
    { title: "Enhanced RTP", icon: "graph", url: "#" },
    { title: "Stake Poker", icon: "responsible", url: "#" },
    { title: "Bonus Buy", icon: "responsible", url: "#" },
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
