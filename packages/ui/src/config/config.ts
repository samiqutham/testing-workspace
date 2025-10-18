// base url
// export const BASE_URL = "http://101.0.20.132:2083";
export const BASE_URL = "https://stakefair.yourdesign.live";
export const BASE_URL2 = "https://eka247.com";
export const BASE_URL_AUTH = "http://192.168.2.96:2923";
// export const BASE_URL = "";

// all domains
export const stakefairLiveUrl = "https://stakefair-hazel.vercel.app";
export const casino_sLiveUrl = "https://stakefair-casino.vercel.app";
export const exchange_sLiveUrl = "https://stakefair-exchange.vercel.app";
export const fantasy_sLiveUrl = "https://stakefair-fantasy.vercel.app";
export const sportsbook_sLiveUrl =
  "https://stakefair-sportsbook.vercel.app";

export const CONFIG = {
  siteKey: "2",
  siteKey2: "7",
  SiteName: "stakefair",
  // Basic
  trendingList: `${BASE_URL}/api/navigation/trendingList`,
  trendingListTime: 5, // 5 minutes

  // for testing purpose
  allEventsList: `https://eka247.com/api/navigation/allEventsList`,
  allEventsListTime: 20, // 5 minutes
  menuList: BASE_URL2 + "/api/navigation/menuList",
  menuListTime: 1440,

  bannersList: BASE_URL2 + "/api/navigation/bannersList",
  bannersListTime: 1440,

  getRacingEvents: BASE_URL2 + "/api/navigation/racingEventsList",
  getRacingEventsTime: 1440,

  competetionMarketList: BASE_URL2 + "/api/navigation/competitionMarketList",
  marketList: BASE_URL2 + "/api/navigation/marketList",

  // For auth
  register: `${BASE_URL_AUTH}/api/v1/auth/register`,
  checkEmail: `${BASE_URL_AUTH}/api/v1/auth/checkEmailId`,
  checkUsername: `${BASE_URL_AUTH}/api/v1/auth/checkUsername`,
  logout: `${BASE_URL_AUTH}/api/v1/auth/userLogout`,
  login: `${BASE_URL_AUTH}/api/v1/auth/loginUser`,

  //user balance
  userBalance: BASE_URL_AUTH + "/api/v1/user/userBalance",
};
