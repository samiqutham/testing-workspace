import Icon from "@workspace/ui/icons/icons";
import React from "react";

export default function MSport() {
  return (
    <>
      <div className="flex w-full flex-col px-[3dvw] items-center">
        <div className="w-full max-w-[1200px] self-center">
          <div className="pb-8 flex flex-col w-full">
            <div className="w-full pt-8">
              <div className="flex flex-col w-full">
                {/* navigate button */}
                <div className="overscroll-x-auto inline-flex items-center justify-start w-full h-full">
                  <div className="mr-3">
                    <a
                      className="inline-flex relative items-center gap-2 justify-center font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#0f212e] !text-white hover:bg-grey-900 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.9375rem] px-[1.25rem] shadow-none rounded-[3.5px]"
                      href="">
                     <Icon name={"backArrow"} className="w-[14px] h-[14px]" fill="#fff"/>
                    </a>
                  </div>
                  <div className="breadcrumb-wrapper svelte-1n6rzl0 scrollX remove-end-border">
                    <a
                      className="inline-flex relative items-center gap-2 justify-center rounded-[3.5px] font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]  text-sm leading-none bg-[#0f212e] px-5 py-4 w-[98.91px] h-[44px]"
                      href="">
                      Soccer
                    </a>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
