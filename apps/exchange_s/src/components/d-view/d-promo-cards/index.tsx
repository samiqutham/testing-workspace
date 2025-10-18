import React, { useEffect, useState } from "react";

export const DPromoCards = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

    const skeletonCard = (
    <div className="pr-[1px] flex-[1_0_0%] w-full max-w-full">
      <div className="shadow-[0_1px_3px_#0006] rounded-[0.375rem] bg-[#213743] animate-pulse">
        <div className="rounded-t-[0.375rem] w-full h-[130px] bg-[#2f4553]" />
        <div className="h-7 py-2 flex items-center bg-[#071824]">
          <div className="h-3 w-32 bg-[#2f4553] rounded ml-2" />
        </div>
        <div className="px-2 pt-4 pb-[7px]">
          <div className="h-3 w-28 bg-[#2f4553] rounded mb-2" />
          <div className="h-2 w-20 bg-[#2f4553] rounded mb-1" />
          <div className="h-2 w-24 bg-[#2f4553] rounded mb-1" />
          <div className="h-2 w-16 bg-[#2f4553] rounded" />
        </div>
      </div>
    </div>
  );


  return (
    <section className="flex gap-4 mb-3">

      {loading ? (
        <>
          {skeletonCard}
          {skeletonCard}
          <div className="hidden lg:block">{skeletonCard}</div>
        </>
      ) : (
        <>

      <div className="pr-[1px] flex-[1_0_0%] w-full max-w-full">
        <div className="shadow-[0_1px_3px_#0006] rounded-[0.375rem] bg-[#213743]">
          <img
            className="rounded-t-[0.375rem] w-full h-[130px]"
            src="/sportsimg.png"
            alt="sportsimg"
          />
          <div className="h-7 py-2 flex items-center bg-[#071824]">
            <h4 className="px-2 text-xs text-white">
              Explore the great selection
            </h4>
          </div>
          <h6 className="px-2 pt-4 pb-[7px] text-sm font-bold">
            New games every week
          </h6>
          <div className="pr-2 pb-1.5">
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
          </div>
        </div>
      </div>
      <div className="pr-[1px] flex-[1_0_0%] w-full max-w-full">
        <div className="shadow-[0_1px_3px_#0006] rounded-[0.375rem] bg-[#213743]">
          <img
            className="rounded-t-[0.375rem] w-full h-[130px]"
            src="/sportsimg.png"
            alt="sportsimg"
          />
          <div className="h-7 py-2 flex items-center bg-[#071824]">
            <h4 className="px-2 text-xs text-white">
              Explore the great selection
            </h4>
          </div>
          <h6 className="px-2 pt-4 pb-[7px] text-sm font-bold">
            New games every week
          </h6>
          <div className="pr-2 pb-1.5">
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
          </div>
        </div>
      </div>
      <div className="pr-[1px] flex-[1_0_0%] w-full max-w-full lg:block hidden">
        <div className="shadow-[0_1px_3px_#0006] rounded-[0.375rem] bg-[#213743]">
          <img
            className="rounded-t-[0.375rem] w-full h-[130px]"
            src="/sportsimg.png"
            alt="sportsimg"
          />
          <div className="h-7 py-2 flex items-center bg-[#071824]">
            <h4 className="px-2 text-xs text-white">
              Explore the great selection
            </h4>
          </div>
          <h6 className="px-2 pt-4 pb-[7px] text-sm font-bold">
            New games every week
          </h6>
          <div className="pr-2 pb-1.5">
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
            <div className="cursor-pointer text-xs font-bold pl-2 text-white hover:underline">
              See also Live Casino
            </div>
          </div>
        </div>
      </div>
      </>
        )}
    </section>
  );
};
