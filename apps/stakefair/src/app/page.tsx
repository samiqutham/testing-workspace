"use client";
import DBetBoards from "@stakefair/components/d-view/d-home/d-bet-board";
import DHeaderWrapper from "@stakefair/components/d-view/d-home/d-header-wrapper";
import DPromotions from "@stakefair/components/d-view/d-home/d-promotions";
import DRacesRaffles from "@stakefair/components/d-view/d-home/d-Races-Raffles";
import DSearch from "@workspace/ui/common/components/d-view/d-search";
import DTrendingEvents from "@stakefair/components/d-view/d-home/d-trending-events";
import DTrendingGames from "@stakefair/components/d-view/d-home/d-trending-games";
import DTrendingSports from "@stakefair/components/d-view/d-home/d-trending-sports";
import DQuestions from "@stakefair/components/d-view/d-questions";
import MBetBoards from "@stakefair/components/m-view/m-home/m-bet-board";
import MHeaderWrapper from "@stakefair/components/m-view/m-home/m-header-wrapper";
import MPromotions from "@stakefair/components/m-view/m-home/m-promotions";
import MQuestions from "@stakefair/components/m-view/m-home/m-questions";
import MRacesRaffles from "@stakefair/components/m-view/m-home/m-race-raffle";
import MSearch from "@workspace/ui/common/components/m-view/m-search";
import MStartPlaying from "@stakefair/components/m-view/m-home/m-start-playing";
import MTrendingEvents from "@stakefair/components/m-view/m-home/m-trending-events";
import MTrendingGames from "@stakefair/components/m-view/m-home/m-trending-games";
import MTrendingSports from "@stakefair/components/m-view/m-home/m-trending-sports";
import VerificationNotice from "@workspace/ui/common/components/verificationNotice";
import { useAppStore } from "@workspace/ui/store/store";
import { useEffect, useState } from "react";
// Mobile versions

// Desktop versions
// import DHeaderWrapper from "@/components/d-view/d-home/d-header-wrapper";
// import DTrendingGames from "@/components/d-view/d-home/d-trending-games";
// ... etc

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const isAuthUser = useAppStore((state) => state.isAuthUser);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNoticeClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setNoticeVisible(false);
    }, 300);
  };

  return (
    <div>
      {isMobile ? (
        <>
          <div className="pb-8">
            {noticeVisible && (
              <VerificationNotice
                onClose={handleNoticeClose}
                isClosing={isClosing}
              />
            )}
            <MHeaderWrapper />
            <MSearch />
            <div className="mt-6 flex flex-col gap-6 px-[3vw]">
              <MStartPlaying />
              <MTrendingEvents />
              <MTrendingSports />
              <MTrendingGames />
              <MPromotions />
              {isAuthUser && <MRacesRaffles />}
              <MBetBoards />
              <MQuestions />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pb-8">
            <DHeaderWrapper />
            <DSearch/>
            <div className="mt-6 flex flex-col gap-6 px-[3vw]">
              <div className="max-[828px]:block hidden">
                <MStartPlaying />
              </div>
              <DTrendingEvents />
              <DTrendingSports />
              <DTrendingGames />
              <DPromotions />
              {isAuthUser && <DRacesRaffles />}
              <DBetBoards />
              <DQuestions />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;