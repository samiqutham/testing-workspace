
import { Skeleton } from "@workspace/ui/components/skeleton";


const MarketSkeleton = () => {
  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <div className="flex items-center bg-[#0E212E]">
        <Skeleton className="w-[36px] h-[46px] bg-[#213843]" />
        <div className="p-[8px_10px_8px_0] flex justify-between w-full">
          <div className="pl-2.5 w-full">
            <Skeleton className="h-3 w-3/4 mb-2 bg-[#213843]" />
            <Skeleton className="h-3 w-2/3 bg-[#213843]" />
          </div>
          <Skeleton className="h-4 w-16 bg-[#213843]" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      {/* <div className="mt-[5px] ">
        <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <ul className="flex">
            {[...Array(5)].map((_, i) => (
              <li
                key={i}
                className="flex-1 bg-[#0E212E] border-t-2 border-[#0E212E] pt-[1px]">
                <Skeleton className="w-full h-[38px] bg-[#213843]" />
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Rules Section Skeleton */}
      <div className="w-full">
        <div className="p-[0_10px] flex h-[38px] justify-between relative bg-[#213743] items-center">
          <Skeleton className="w-[17px] h-[16px] bg-[#213843]" />
          <Skeleton className="h-6 w-28 bg-[#213843]" />
        </div>
      </div>

      {/* Market Content Skeleton */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full mb-[5px]">
          {/* Market header skeleton */}
          <div className="h-[32px] bg-[#0E212E] flex items-center p-[0_12px]">
            <Skeleton className="h-4 w-40 bg-[#213843]" />
            <div className="flex items-center ml-auto">
              <Skeleton className="w-4 h-4 rounded-full bg-[#213843] ml-1" />
              <Skeleton className="w-4 h-4 rounded-full bg-[#213843] ml-1" />
            </div>
          </div>

          {/* Market stats skeleton */}
          <div className="h-[27px] bg-[#213743] flex items-center justify-end p-[0_10px]">
            <Skeleton className="h-3 w-24 bg-[#213843] mr-4" />
            <Skeleton className="h-3 w-32 bg-[#213843]" />
          </div>

          {/* Runners skeleton */}
          <div className="w-full">
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="flex min-h-[50px] border-b border-[#213743] justify-between bg-transparent p-[2px_10px]">
                <div className="flex items-center mr-[3px] w-full">
                  <Skeleton className="w-4 h-4 rounded-full bg-[#213843] me-2" />
                  <Skeleton className="h-3 w-32 bg-[#213843]" />
                </div>

                <div className="w-full flex gap-[5px] items-center justify-end max-w-fit">
                  {/* Back prices skeleton */}
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, k) => (
                      <Skeleton
                        key={k}
                        className={`w-[53px] h-[40px] rounded-[2px] bg-[#213843] ${k > 0 ? "hidden md:block" : ""}`}
                      />
                    ))}
                  </div>

                  {/* Lay prices skeleton */}
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, k) => (
                      <Skeleton
                        key={k}
                        className={`w-[53px] h-[40px] rounded-[2px] bg-[#213843] ${k > 0 ? "hidden md:block" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer Skeleton */}
      <div className="p-[0_14px_0_12px] h-[38px] items-center flex bg-[#213843] text-white justify-between">
        <Skeleton className="h-3 w-40 bg-[#213843]" />
        <Skeleton className="w-6 h-6 rounded-full bg-[#213843]" />
      </div>

      <div className="p-[0_14px_0_12px] h-[38px] items-center flex bg-[#213843] border-t border-[#1A2C38] text-white justify-between">
        <Skeleton className="h-3 w-48 bg-[#213843]" />
        <Skeleton className="w-6 h-6 rounded-full bg-[#213843]" />
      </div>
    </div>
  );
};

export default MarketSkeleton;
