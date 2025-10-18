"use client";

import Icon from "@workspace/ui/icons/icons";

export default function DRacesRaffles() {
  return (
    <div className="w-full max-w-[1200] mx-auto mt-[2px]">
      <div className="flex items-center gap-2 mb-4">
        <Icon name={"RacesRaffles"} className="w-[18] h-[18]" fill="#b1bad3"></Icon>
        <h2 className="text-white font-semibold text-lg">Races & Raffles</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#213743] rounded flex flex-col justify-between">
          <div className="p-[16px] flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold text-lg">$100k Race</h3>
              <p className="text-[#b1bad3] text-sm mb-4">
                Ready to race to the top?
              </p>
              <div className="flex items-center gap-3">
                <button className="bg-[#2f4553] hover:bg-[#557086] text-white px-[15px] py-[12px] rounded font-semibold text-sm">
                  Leaderboard
                </button>
                #557086
                <Icon
                  name={"questions"}
                  className="w-[14px] h-[14px]"
                  fill="#fff"
                ></Icon>
              </div>
            </div>
            <div className="relative w-[112px] h-[112px] flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="57"
                  cy="57"
                  r="50"
                  stroke="#2a3f4e"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="57"
                  cy="57"
                  r="50"
                  stroke="#1475e1"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 50}
                  strokeDashoffset={2 * Math.PI * 50 * 0.7}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center text-white text-sm">
                <p className="text-xs text-[#b1bad3] font-bold">Ends in</p>
                <p className="font-bold text-[20px]">
                  <span>6</span>
                  <span className="text-[14px] font-bold mr-[2px]">h</span>
                  <span className="ml-[2px]">56</span>
                  <span className="text-[14px] ffont-bold">m</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-col auto-cols-auto h-12 py-3 pr-2 pl-4 bg-[#213743]  rounded-b border-t-[2px] border-[#2f4553]">
            <span className="font-semibold leading-normal text-sm flex items-center gap-2 text-white">
              <Icon
                name={"cup"}
                className="w-[14px] h-[14px]"
                fill="#b1bad3"
              ></Icon>
              Not entered yet
            </span>
          </div>
        </div>
        {/*  */}
        <div className="bg-[#213743] rounded flex flex-col justify-between">
          <div className="p-[16px] flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold text-lg">$75k Weekly Raffle</h3>
              <p className="text-[#b1bad3] text-sm mb-4">
                Finish your week with a win!
              </p>
              <div className="flex items-center gap-3">
                <button className="bg-[#2f4553] hover:bg-[#557086] text-white px-[15px] py-[12px] rounded font-semibold text-sm opacity-50">
                  0 Tickets
                </button>
                <Icon
                  name={"questions"}
                  className="w-[14px] h-[14px]"
                  fill="#fff"
                ></Icon>
              </div>
            </div>
            <div className="relative w-[112px] h-[112px] flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="57"
                  cy="57"
                  r="50"
                  stroke="#2a3f4e"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="57"
                  cy="57"
                  r="50"
                  stroke="#1475e1"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 50}
                  strokeDashoffset={2 * Math.PI * 50 * 0.7}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center text-white text-sm">
                <p className="text-xs text-[#b1bad3] font-bold">Ends in</p>
                <p className="font-bold text-[20px]">
                  <span>6</span>
                  <span className="text-[14px] font-bold mr-[2px]">h</span>
                  <span className="ml-[2px]">56</span>
                  <span className="text-[14px] ffont-bold">m</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center h-12 py-3 px-4 bg-[#213743] rounded-b border-t-[2px] border-[#2f4553] gap-2">
            <Icon name={"Raffles"} className="w-[14px] h-[14px]" fill="#b1bad3" />
            <progress
              max={100}
              value={0}
              role="meter"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
              className="custom-progress h-[12px] flex-1 rounded-[10px]"
            />
            <span className="font-semibold leading-normal text-sm text-white text-right  ">
              0%
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
