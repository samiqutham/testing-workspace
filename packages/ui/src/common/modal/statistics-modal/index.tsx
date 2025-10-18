import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";

const StatisticsModal = ({ open, onClose }: any) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {open && (
        <div className="fixed inset-0 bg-[#0000005e] z-40" />
      )}

      <DialogContent
        showCloseButton={false}
        className="p-0 overflow-hidden min-w-[200px] !max-w-[500px] h-[380.75px] border-0 bg-[#1a2c38]  rounded-md min-[320px]:w-[90%] min-[350px]:w-[91.5%] sm:w-[95%] min-[400px]:w-[92.5%]    
      [&>button]:outline-none 
             [&>button]:ring-0 
             [&>button]:focus:outline-none 
             [&>button]:focus:ring-0 
             [&>button]:focus:ring-offset-0 animate-modal-popover"
      >
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>

        <div className="">
          <div className="bg-[#1A2C38] rounded-md h-[100%] max-w-[500px] w-[100%] shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between  pb-4 px-[16px]">
              <h2 className="text-white font-semibold mb-[4px] text-lg flex justify-between w-full items-center gap-2">
                <div className="flex items-center">
                  {" "}
                  <svg
                    data-ds-icon="Stats"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="inline-block shrink-0 relative top-[-1px]"
                  >
                    <path
                      fill="#B1BAD3"
                      d="M21 1H3c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2m-1 9c0 .55-.45 1-1 1s-1-.45-1-1V8.63l-6.21 7.99c-.22.28-.58.43-.93.38a1.01 1.01 0 0 1-.79-.62l-1.36-3.41-2.93 3.66c-.2.25-.49.38-.78.38-.22 0-.44-.07-.62-.22-.43-.35-.5-.97-.16-1.41l4-5a1 1 0 0 1 1.71.26l1.35 3.38 5.45-7.01H15c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1v4z"
                    ></path>
                  </svg>{" "}
                  <div className="text-[18px] ml-2">Statistics</div>
                </div>
                <DialogClose asChild>
                  <button className="text-xl leading-none cursor-pointer outline-0">
                    <Icon
                      name={"closeIcon"}
                      className="w-5 h-5 hover:fill-[white]"
                      fill="#b1bad3"
                    />
                  </button>
                </DialogClose>
              </h2>
            </div>

            {/* Content */}
            <div className="px-4 pb-5 text-sm max-h-[calc(100%-4em)]">
              {/* Username + Date */}
              <div className="relative top-[-3px]">
                <p className="text-[#b1bad3]  text-[16px] font-[600]">
                  userName5268
                </p>
                <p className="text-[#b1bad3] font-[400] text-[14px]">
                  Joined on{" "}
                  <span className="text-[#b1bad3]">September 18, 2025</span>
                </p>
              </div>

              {/* VIP Progress */}
              <div className="mt-4 relative top-[-2px]">
                <div className="flex items-center justify-between text-xs mt-1">
                  <p className="text-white text-[16px] font-semibold">
                    Your VIP Progress
                  </p>
                  <span className="text-white text-[16px]">0.00%</span>
                </div>
                <div className="w-full bg-[#304553] rounded-full h-2 mt-2 relative top-[1px]"></div>
              </div>

              {/* Levels */}
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-[#b1bad3] flex items-center gap-1">
                  <svg
                    data-ds-icon="VIPNone"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="inline-block shrink-0 relative top-[-1px]"
                  >
                    <path
                      fill="#829BAE"
                      d="m12 4.376 1.946 3.595a3.13 3.13 0 0 0 2.214 1.615l4.09.733-2.84 2.944a3.16 3.16 0 0 0-.893 2.198q-.015.22 0 .438l.564 4.054-3.589-1.726a3.45 3.45 0 0 0-3.004-.006l-3.569 1.718.564-4.053a4 4 0 0 0 0-.425 3.16 3.16 0 0 0-.894-2.198L3.75 10.32l4.043-.733a3.13 3.13 0 0 0 2.255-1.602zm0-2.862a1.2 1.2 0 0 0-1.052.623L8.336 7.033a1.23 1.23 0 0 1-.84.609l-5.5.986A1.204 1.204 0 0 0 1 9.806c-.002.306.116.6.33.821l3.857 4.006c.215.22.336.514.337.821q.004.1 0 .199l-.75 5.478a.7.7 0 0 0 0 .164 1.18 1.18 0 0 0 .733 1.1q.22.09.457.091h.041c.173-.008.342-.055.495-.137l4.902-2.355c.197-.094.414-.143.633-.144.222 0 .44.051.639.15l4.812 2.356c.158.086.336.131.516.13h.048a1.19 1.19 0 0 0 1.19-1.184 1 1 0 0 0 0-.171l-.75-5.478a1 1 0 0 1 0-.171 1.14 1.14 0 0 1 .337-.815l3.843-4.04a1.182 1.182 0 0 0-.646-1.985l-5.5-.986a1.2 1.2 0 0 1-.846-.63L13.066 2.13A1.2 1.2 0 0 0 12 1.514"
                    ></path>
                  </svg>{" "}
                  <div className="pl-[2px]"> None</div>
                </span>
                <span className="text-[#b1bad3] flex items-center gap-[6px]">
                  <svg
                    data-ds-icon="VIPBronze"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="inline-block shrink-0 relative top-[-1px]"
                  >
                    <path
                      fill="#D1A773"
                      d="m12 4.727 1.944 3.431a3.12 3.12 0 0 0 2.217 1.54l.019.002 4.042.697-2.841 2.814a2.94 2.94 0 0 0-.86 2.516l-.002-.016.559 3.867-3.584-1.646A3.6 3.6 0 0 0 12 17.61c-.543 0-1.057.119-1.514.33l.02-.008-3.583 1.646.559-3.867a2.94 2.94 0 0 0-.863-2.5l-2.868-2.814L7.793 9.7c.988-.154 1.808-.732 2.256-1.526l.008-.016zM12 2h-.002a1.2 1.2 0 0 0-1.049.595l-.003.006L8.334 7.27a1.21 1.21 0 0 1-.836.583l-.008.001-5.5.94c-.565.095-.99.56-.99 1.117 0 .303.126.579.33.783l3.859 3.823a1.07 1.07 0 0 1 .32.974v-.007l-.75 5.226a1 1 0 0 0-.012.157c0 .625.533 1.132 1.19 1.132h.004l.035.001c.191 0 .372-.045.53-.125l-.007.002 4.904-2.247a1.5 1.5 0 0 1 1.273.003l-.008-.003 4.83 2.247c.15.077.328.122.516.122h.008l.038.001c.658 0 1.191-.507 1.191-1.132q0-.084-.012-.163v.005l-.75-5.226a1.07 1.07 0 0 1 .321-.94l3.858-3.824A1.1 1.1 0 0 0 23 9.936c0-.555-.42-1.017-.976-1.114l-.007-.001-5.5-.94a1.21 1.21 0 0 1-.848-.604l-.004-.006-2.612-4.67A1.2 1.2 0 0 0 12 2"
                    ></path>
                  </svg>{" "}
                  Bronze
                </span>
              </div>

              {/* No stats text */}
              <div className="flex flex-col items-center mt-8 mb-3 text-[#b1bad3]">
                <div className="text-5xl relative top-[-1px]">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M69.5298 21.2739H58.4108C57.0786 21.2739 55.9986 22.3539 55.9986 23.6862V77.5877C55.9986 78.92 57.0786 80 58.4108 80H69.5298C70.8621 80 71.9421 78.92 71.9421 77.5877V23.6862C71.9421 22.3539 70.8621 21.2739 69.5298 21.2739Z"
                      fill="#263742"
                    ></path>
                    <path
                      d="M45.5615 36.9571H34.4424C33.1102 36.9571 32.0302 38.0371 32.0302 39.3694V77.5877C32.0302 78.9199 33.1102 79.9999 34.4424 79.9999H45.5615C46.8937 79.9999 47.9737 78.9199 47.9737 77.5877V39.3694C47.9737 38.0371 46.8937 36.9571 45.5615 36.9571Z"
                      fill="#263742"
                    ></path>
                    <path
                      d="M21.5892 52.2665H10.4702C9.13792 52.2665 8.05792 53.3465 8.05792 54.6787V77.5877C8.05792 78.92 9.13792 80 10.4702 80H21.5892C22.9215 80 24.0015 78.92 24.0015 77.5877V54.6787C24.0015 53.3465 22.9215 52.2665 21.5892 52.2665Z"
                      fill="#263742"
                    ></path>
                    <path
                      d="M21.8054 54.9316C21.8054 51.7407 19.2187 49.154 16.0278 49.154C12.8369 49.154 10.2501 51.7407 10.2501 54.9316V71.2491C10.2501 74.44 12.8369 77.0268 16.0278 77.0268C19.2187 77.0268 21.8054 74.44 21.8054 71.2491V54.9316Z"
                      fill="#334552"
                    ></path>
                    <path
                      d="M45.7777 38.1194C45.7777 34.9284 43.1909 32.3417 40 32.3417C36.8091 32.3417 34.2224 34.9284 34.2224 38.1194V71.1209C34.2224 74.3118 36.8091 76.8986 40 76.8986C43.1909 76.8986 45.7777 74.3118 45.7777 71.1209V38.1194Z"
                      fill="#334552"
                    ></path>
                    <path
                      d="M69.746 21.9485C69.746 18.7575 67.1593 16.1708 63.9684 16.1708C60.7775 16.1708 58.1907 18.7575 58.1907 21.9485V71.0219C58.1907 74.2128 60.7775 76.7995 63.9684 76.7995C67.1593 76.7995 69.746 74.2128 69.746 71.0219V21.9485Z"
                      fill="#334552"
                    ></path>
                    <path
                      d="M16.0279 46.3862C19.2573 46.3862 21.8752 43.7683 21.8752 40.5389C21.8752 37.3095 19.2573 34.6916 16.0279 34.6916C12.7985 34.6916 10.1806 37.3095 10.1806 40.5389C10.1806 43.7683 12.7985 46.3862 16.0279 46.3862Z"
                      fill="#3C8725"
                    ></path>
                    <path
                      d="M16.0277 42.0786C17.7507 42.0786 19.1475 40.6819 19.1475 38.9589C19.1475 37.2358 17.7507 35.8391 16.0277 35.8391C14.3047 35.8391 12.9079 37.2358 12.9079 38.9589C12.9079 40.6819 14.3047 42.0786 16.0277 42.0786Z"
                      fill="#69E244"
                    ></path>
                    <path
                      d="M22.33 32.3417L17.1462 27.1579L33.5883 10.7158L39.9892 17.1167L57.1059 0L62.2933 5.18743L39.9892 27.4879L33.5883 21.0833L22.33 32.3417Z"
                      fill="#334552"
                    ></path>
                  </svg>
                </div>
                <p className="mt-[24px] text-[16px]">
                  This user has no visible statistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatisticsModal;