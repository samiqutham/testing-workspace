
import { Button } from "@workspace/ui/components/button";
import Icon from "@workspace/ui/icons/icons";
import { useAppStore } from "@workspace/ui/store/store";
import React, { useEffect } from "react";

const MHeaderWrapper = () => {
  const setIsRegisterOpen = useAppStore((state) => state.setIsRegisterOpen);
  useEffect(() => {
    const storedValue = localStorage.getItem("registerModal");
    if (storedValue === "true") {
      setIsRegisterOpen(true);
    }
  }, [setIsRegisterOpen]);

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    localStorage.setItem("registerModal", "true");
  };
  return (
    <div className="bg-[url('/banner.png')] bg-cover py-8 text-center">
      <div className="px-[3vw] max-w-[calc(1200px+6vw)]">
        <div className="grid grid-flow-row grid-rows-[1fr_auto] gap-y-3 md:gap-y-8 lg:max-w-[478px] w-full items-center">
          <div>
            <h1 className="text-3xl font-bold  text-[32px]">
              World's Largest Online
              <br />
              Exchange and Casino
            </h1>

            <Button
              onClick={() => openRegisterModal()}
              className="relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#1475e1] h-11 text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.9375rem] pb-[17] px-[1.25rem] mt-8 md:mt-4 w-full md:w-auto sm:max-w-80 mx-auto block md:mx-0 md:inline-flex md:max-w-max"
            >
              Register
            </Button>
          </div>
          <div>
            <p className=" text-[#b1bad3] font-bold  mb-2  text-[12px]">
              <span>Or sign up with</span>
            </p>
            <div className="grid grid-cols-4 gap-[calc(var(--spacing)*2)]">
              <Button
                variant="outline"
                className="bg-[#2f4553] border-0 rounded h-[44px] text-white hover:bg-slate-600 
          flex items-center justify-center flex-1"
              >
                <Icon
                  name={"facebook"}
                  width={20}
                  height={20}
                  fill="white"
                  className=" !w-5 !h-5"
                ></Icon>
              </Button>
              <Button
                variant="outline"
                className="bg-[#2f4553] border-0 rounded h-[44px] text-white hover:bg-slate-600
          flex items-center justify-center flex-1"
              >
                <Icon
                  name={"googleIcon"}
                  width={20}
                  height={20}
                  fill="white"
                  className=" !w-5 !h-5"
                ></Icon>
              </Button>
              <Button
                variant="outline"
                className="bg-[#2f4553] border-0 rounded h-[44px] text-white hover:bg-slate-600 
          flex items-center justify-center flex-1"
              >
                <Icon
                  name={"whatsapp"}
                  width={20}
                  height={20}
                  fill="white"
                  className=" !w-5 !h-5"
                ></Icon>
              </Button>
              <Button
                variant="outline"
                className="bg-[#2f4553] border-0 rounded h-[44px] text-white hover:bg-slate-600 
          flex items-center justify-center flex-1"
              >
                <Icon
                  name={"apple"}
                  width={20}
                  height={20}
                  fill="white"
                  className=" !w-6 !h-6"
                ></Icon>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MHeaderWrapper;
