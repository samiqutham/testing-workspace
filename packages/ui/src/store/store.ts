import { create } from "zustand";

type Drawer = string | null;
type IsSearch = boolean;

export const useAppStore = create<any>((set) => ({
  // for auth
  isAuthUser: false,
  userBalance: null,
  // stakefair home data and startplaying data
  trendingList: [],

  allEventsList: [],
  AllSportList: [],
  top21Events: [],
  allRacingEvents: [],
  inplaySports: {},
  betPrice: "",
  eventName: "",
  // login modal and register modal states
  isLoginOpen: false,
  isRegisterOpen: false,

  // sidebar dropdown open state when collapsed
  activeSubMenu: "",

  //footer navbar state
  activeDrawer: null,
  // search drawer state
  isOpenSearch: false,

  //search overlay for desktop & tab
  isOverlayOpen: false,
  isHeaderOverlayOpen: false,
  isLiveSupportOpen: false,
  openLiveSupport: () => set({ isLiveSupportOpen: true }),
  closeLiveSupport: () => set({ isLiveSupportOpen: false }),

  headerTitle: "Default Title",
  setHeaderTitle: (title: string) => set({ headerTitle: title }),

  sideBarTabs: "home",
  setSideBarTabs: (tabs: string) => set({ sideBarTabs: tabs }),

  isSetupWalletModalOpen: false,
  setIsSetupWalletModalOpen: (value: boolean) =>
    set({ isSetupWalletModalOpen: value }),

  // stakefair home data and startplaying data setter
  setTrendingList: (data: any) => set({ trendingList: data }),
  setEventName: (data: any) => set({ eventName: data }),
  setAllSportList: (data: any) => set({ AllSportList: data }),
  setallEventsList: (data: any) => set({ allEventsList: data }),
  setBetPrice: (data: any) => set({ betPrice: data }),
  setTop21Events: (data: any) => set({ top21Events: data }),
  setAllRacingEvents: (data: any) => set({ allRacingEvents: data }),
  setInplaySports: (data: any) => set({ inplaySports: data }),

  // auth setter
  setAuthUser: (value: boolean) => set({ isAuthUser: value }),
  setUserBalance: (value: boolean) => set({ userBalance: value }),

  // login modal and register modal states setter
  setIsLoginOpen: (value: boolean) => set({ isLoginOpen: value }),
  setIsRegisterOpen: (value: boolean) => set({ isRegisterOpen: value }),

  // sidebar dropdown open state when collapsed setter
  setActiveSubMenu: (value: string) => set({ activeSubMenu: value }),
  // search drawer state setter
  toggleSearch: (value: boolean) => set({ isOpenSearch: value }),
  //footer navbar open and close
  openDrawer: (id: any) => set({ activeDrawer: id }),
  closeDrawer: () => set({ activeDrawer: null }),

  //search overlay setter for desktop & tab
  setIsOverlayOpen: (value: boolean) => set({ isOverlayOpen: value }),
  setIsHeaderOverlayOpen: (value: boolean) =>
    set({ isHeaderOverlayOpen: value }),

  reset: () =>
    set({
      trendingList: [],
      allEventsList: [],
      isAuthUser: false,
      AllSportList: [],
      isLoginOpen: false,
      isRegisterOpen: false,
    }),
}));
