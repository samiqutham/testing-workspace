import React, { useState } from "react";

const DLiveEvents = () => {
  const [isMarket, setMarket] = useState(false);
  const [isMostrar, setMostrar] = useState(false);
  const [marketTab, setMarketTab] = useState(1);
  const [mostrarValue, setMostrarValue] = useState("Standard ");
  const [isMarketValue, setisMarketValue] = useState("Winner");

  const toggleMarket = () => {
    setMarket((prev) => !prev);
  };

  const toggleMostrar = () => {
    setMostrar((prev) => !prev);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* live event header  */}
      <div className="relative flex items-center justify-between mt-3  pt-4 !min-h-11">
        {/* left */}
        <span className="min-[1024]:mt-[-1px]">
          <span>
            <svg
              className="mt-[-5px] pointer-events-none [stroke-width:0] flex-shrink-0 inline-block size-[1em] mr-2"
              fill="currentColor"
              viewBox="0 0 64 64"
            >
              <title></title>
              <path
                d="M32 0C14.326 0 0 14.326 0 32s14.326 32 32 32 32-14.326 32-32S49.674 0 32 0Zm-9 49V15l26 17-26 17Z"
                fill="#b1bad3"
              ></path>
            </svg>
          </span>
          <span className="font-semibold text-left text-[1.125rem] inline-flex items-center text-white relative max-[1025px]:bottom-[1.5px] ">
            Live Events
          </span>
        </span>

        {/* Right */}
        <div className="w-full flex flex-row gap-4 justify-end items-center flex-1">
          <div className="flex gap-2 relative">
            <button className="inline-flex relative cursor-pointer items-center rounded-[2rem] gap-2 justify-center border  border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none">
              <span className="text-[.875rem] font-semibold inline-flex items-center justify-between leading-[1.5]">
                <svg
                  className="mt-[-3px] mr-2 pointer-events-none [stroke-width:0] flex-shrink-0 inline-block size-[1em] !my-auto relative max-[1025px]:bottom-[1px] bottom-[0.5px]"
                  fill="#B1BAD3"
                  viewBox="0 0 64 64"
                >
                  <title></title>
                  <path d="M56.003 48h-48a2.675 2.675 0 0 1-2.667-2.667V10.667C5.336 9.2 6.536 8 8.003 8h48c1.466 0 2.666 1.2 2.666 2.667v34.666c0 1.467-1.2 2.667-2.666 2.667m-45.334-5.333h42.667V13.333H10.669zm47.995 15.998H5.331A2.675 2.675 0 0 1 2.664 56c0-1.467 1.2-2.667 2.667-2.667h53.333c1.467 0 2.667 1.2 2.667 2.667s-1.2 2.666-2.667 2.666"></path>
                </svg>
                <span className="">Display</span>
              </span>
            </button>

            <button
              className="inline-flex max-h-[40px]  cursor-pointer items-center  gap-2 justify-center border  border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]  text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none !py-[13px] !px-4 bg-[#0f212e] rounded-[4px] relative  max-[1025px]:bottom-[1px] bottom-[.5px]"
              onClick={toggleMostrar}
            >
              <span> {mostrarValue}</span>
              <svg
                className={`mt-[-3px] pointer-events-none [stroke-width:0] fill-current stroke-current flex-shrink-0 inline-block size-[1em] !my-auto ${isMostrar ? "rotate-180" : ""}`}
                fill="currentColor"
                style={{ transform: "rotate(0deg)" }}
                viewBox="0 0 64 64"
              >
                <title></title>
                <path
                  d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07h-.005Z"
                  fill="#b1bad3"
                ></path>
              </svg>

              {isMostrar ? (
                <div className="absolute left-[50%] -translate-x-1/2 z-[100] top-[48px]   bg-white rounded-[.25rem] shadow-lg  w-[90px]">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>
                  <div className="flex flex-col p-[.25rem_0] [max-height:inherit]">
                    <div className="flex flex-col">
                      <button
                        className="inline-flex cursor-pointer w-full relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-sm leading-none hover:text-black  px-3 py-3 rounded-none justify-start "
                        type="button"
                        onClick={() => {
                          setMostrarValue("Standard ");
                          setMostrar(false);
                        }}
                      >
                        <span
                          className={`${mostrarValue == "Standard " ? "text-[#1475e1]" : ""}`}
                        >
                          Standard
                        </span>
                      </button>
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent hover:text-black text-sm leading-none  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setMostrarValue("Winner");
                          setMostrar(false);
                        }}
                      >
                        <span
                          className={`${mostrarValue == "Winner" ? "text-[#1475e1]" : ""}`}
                        >
                          Winner
                        </span>
                      </button>
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] hover:text-black bg-transparent text-sm leading-none  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setMostrarValue("Handicaps");
                          setMostrar(false);
                        }}
                      >
                        <span
                          className={`${mostrarValue == "Handicaps" ? "text-[#1475e1]" : ""}`}
                        >
                          Handicaps
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </button>
          </div>

          <div className="flex gap-2 relative">
            <button className="inline-flex relative cursor-pointer items-center rounded-[2rem] gap-2 justify-center border  border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none">
              <span className="text-[.875rem] font-semibold inline-flex items-center justify-between leading-[1.5]">
                <svg
                  className="mt-[-3px] mr-2 pointer-events-none [stroke-width:0] flex-shrink-0 inline-block size-[1em] !my-auto relative max-[1025px]:bottom-[1px] bottom-[0.5px]"
                  fill="#B1BAD3"
                  viewBox="0 0 64 64"
                >
                  <title></title>
                  <path d="M8.003 34.668h3.146c1.094 3.093 4.027 5.333 7.52 5.333 4.427 0 8-3.573 8-8s-3.573-8-8-8c-3.466 0-6.4 2.24-7.52 5.334H8.003A2.675 2.675 0 0 0 5.336 32c0 1.467 1.2 2.667 2.667 2.667m48 16.001h-3.147c-1.093-3.093-4.027-5.333-7.52-5.333a7.99 7.99 0 0 0-8 8c0 4.426 3.573 8 8 8 3.467 0 6.4-2.24 7.52-5.334h3.147c1.466 0 2.666-1.2 2.666-2.666 0-1.467-1.2-2.667-2.666-2.667m-10.667-32c3.467 0 6.4-2.24 7.52-5.333h3.147c1.466 0 2.666-1.2 2.666-2.667s-1.2-2.667-2.666-2.667h-3.147c-1.093-3.093-4.027-5.333-7.52-5.333a7.99 7.99 0 0 0-8 8c0 4.427 3.573 8 8 8m10.667 10.667H34.669A2.675 2.675 0 0 0 32.003 32c0 1.467 1.2 2.667 2.666 2.667h21.334c1.466 0 2.666-1.2 2.666-2.667s-1.2-2.666-2.666-2.666m-48-15.999h21.333c1.467 0 2.667-1.2 2.667-2.667s-1.2-2.667-2.667-2.667H8.003a2.675 2.675 0 0 0-2.667 2.667c0 1.467 1.2 2.667 2.667 2.667m21.333 37.333H8.003a2.674 2.674 0 0 0-2.667 2.667C5.336 54.8 6.536 56 8.003 56h21.333c1.467 0 2.667-1.2 2.667-2.666 0-1.467-1.2-2.667-2.667-2.667"></path>
                </svg>
                <span className="">Market</span>
              </span>
            </button>

            <button
              className="inline-flex max-h-[40px]   cursor-pointer items-center  gap-2 justify-center border  border-[#2f4553] font-semibold text-[.875rem] whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]  text-white focus-visible:outline-none text-sm leading-none [&:hover>svg]:text-white !border-none !py-[13px] !px-4 bg-[#0f212e] rounded-[4px] relative max-[1025px]:bottom-[1px] bottom-[0.5px]"
              onClick={toggleMarket}
            >
              <span>{isMarketValue} </span>
              <svg
                className={`mt-[-3px] pointer-events-none [stroke-width:0] fill-current stroke-current flex-shrink-0 inline-block size-[1em] !my-auto ${isMarket ? "rotate-180" : ""}`}
                fill="currentColor"
                viewBox="0 0 64 64"
              >
                <title></title>
                <path
                  d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07h-.005Z"
                  fill="#b1bad3"
                ></path>
              </svg>
              {isMarket ? (
                <div className="absolute left-[50%] -translate-x-1/2  z-[100] top-[48px]   bg-white rounded-[.25rem] shadow-lg  w-[90px]">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>
                  <div className="flex flex-col p-[.25rem_0] [max-height:inherit]">
                    <div className="flex flex-col">
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-sm leading-none hover:text-black  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setisMarketValue("Ganador");
                          setMarket(false);
                        }}
                      >
                        <span
                          className={`${isMarketValue == "Ganador" ? "text-[#1475e1]" : ""}`}
                        >
                          Ganador
                        </span>
                      </button>
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] hover:text-black bg-transparent text-sm leading-none  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setisMarketValue("Winner");
                          setMarket(false);
                        }}
                      >
                        <span
                          className={`${isMarketValue == "Winner" ? "text-[#1475e1]" : ""}`}
                        >
                          Winner
                        </span>
                      </button>
                      <button
                        className="inline-flex w-full cursor-pointer relative items-center gap-2 font-semibold whitespace-nowrap  text-[rgb(47_69_83)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 hover:bg-[#B1BAD3]
    focus-visible:outline-offset-2 active:scale-[0.98] hover:text-black bg-transparent text-sm leading-none  px-3 py-3 rounded-none justify-start"
                        type="button"
                        onClick={() => {
                          setisMarketValue("Handicaps");
                          setMarket(false);
                        }}
                      >
                        <span
                          className={`${isMarketValue == "Handicaps" ? "text-[#1475e1]" : ""}`}
                        >
                          Handicaps
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </button>
          </div>
        </div>
      </div>
      {/* live event header  */}

      <div className="w-full mt-3 min-[1025px]:mt-[11.5px] bg-[rgb(15,33,46)] rounded overflow-x-auto">
        <ul className="p-[32px_8px_18px] relative inline-flex">
          <li>
            <button
              className="inline-flex relative cursor-pointer items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:outline-hidden text-xs leading-none  !text-white [&_svg]:!text-white focus-visible:text-white focus-visible!:[&_svg]:text-white"
              onClick={() => setMarketTab(1)}
            >
              <div className="grid grid-flow-row gap-2 place-items-center relative w-[9ch] max-w-[9ch] group">
                {marketTab === 1 ? (
                  <div className="block bg-blue-500 w-3 h-[6px] absolute -top-8 left-1/2 z-[1] -translate-x-1/2 rounded-b"></div>
                ) : null}
                <svg
                  fill="#fff"
                  viewBox="0 0 96 96"
                  className={`svg-icon inline-block text-[28px] !fill-[#B1BAD3] group-hover:!fill-white ${marketTab == 1 ? "!fill-white" : ""}`}
                >
                  <path d="M71.61 24.438c-3.927-3.887-8.8-6.82-14.481-8.481l-.285-.074A40.24 40.24 0 0 1 39.93 5.559l-4-4-.336.074A48 48 0 0 1 48.02.012C61.24.012 73.212 5.357 81.89 14l.004-.004C90.61 22.687 96 34.71 96 47.988c0 26.511-21.49 48-48 48S0 74.5 0 47.988c0-4.275.56-8.422 1.531-12.031l4.121 4 .004.004c4.62 4.532 8.1 10.225 10.035 16.875l.055.234c2.11 7.62 6.873 14.14 13.344 18.57l.887.567a33.3 33.3 0 0 0 17.539 4.957c18.489 0 33.48-14.991 33.48-33.48a33.36 33.36 0 0 0-9.387-23.246M34.171 11.48c5.592 5.546 12.56 9.705 20.68 12.003l.183.043c10.553 3.145 18.246 12.924 18.246 24.5 0 .834-.04 1.66-.11 2.371l-.007.114c-.801 7.772-5.064 14.514-11.312 18.726l.09-.054a25.3 25.3 0 0 1-14.137 4.293c-11.664-.001-21.492-7.866-24.516-18.758l-.078-.328a46.45 46.45 0 0 0-11.922-20.07L4.53 27.558l.008.003.117-.285c4.647-9.92 12.67-17.947 22.88-22.714z"></path>
                </svg>
                <span className="truncate max-w-[6ch]">
                  <span
                    className={`text-[#B1BAD3] group-hover:text-white ${marketTab === 1 ? "text-white" : ""}`}
                  >
                    Tennis
                  </span>
                </span>
                <div className="absolute top-[-8px] left-[55%] flex text-[#fff]">
                  <div
                    className={`bg-[rgb(7,24,36)] text-[rgb(177,186,211)] px-2 min-w-[1.8em] rounded-full inline-flex text-[.75rem] font-[600] leading-[1.5] whitespace-nowrap items-center justify-center ${marketTab == 1 ? "!bg-[rgb(67,145,231)] !text-[rgb(4,23,45)]" : ""}`}
                  >
                    2
                  </div>
                </div>
              </div>
            </button>
          </li>

          <li>
            <button
              className="inline-flex relative cursor-pointer  items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:outline-hidden text-xs leading-none  !text-white [&_svg]:!text-white focus-visible:text-white focus-visible!:[&_svg]:text-white"
              onClick={() => setMarketTab(2)}
            >
              <div className="grid grid-flow-row gap-2 place-items-center relative w-[9ch] max-w-[9ch] group">
                {marketTab === 2 ? (
                  <div className="block bg-blue-500 w-3 h-[6px] absolute -top-8 left-1/2 z-[1] -translate-x-1/2 rounded-b"></div>
                ) : null}
                <svg
                  fill="#fff"
                  viewBox="0 0 96 96"
                  className={`svg-icon inline-block text-[28px] group-hover:!fill-white !fill-[#B1BAD3] ${marketTab == 2 ? "!fill-white" : ""}`}
                >
                  <path d="M73.336 39.933a31.06 31.06 0 0 1-4.364 20.938L92 80.999 81 92 60.87 68.903a30.95 30.95 0 0 1-16.538 4.766 29 29 0 0 1-4.399-.333zm-61.043-27.64c12.43-12.467 34.43-10.67 49.097 3.996a41.7 41.7 0 0 1 10.156 16.39L32.64 71.433a41.55 41.55 0 0 1-16.35-10.047C1.623 46.72-.137 24.76 12.292 12.292m14.257 14.55a11 11 0 0 0-6.355-.629 11.007 11.007 0 0 0-8.02 15 11 11 0 0 0 4.051 4.938 11 11 0 0 0 6.113 1.851 11 11 0 0 0 11-11 11 11 0 0 0-6.789-10.16"></path>
                </svg>
                <span className="truncate max-w-[6ch]">
                  <span
                    className={`text-[#B1BAD3] group-hover:text-white ${marketTab === 2 ? "text-white" : ""}`}
                  >
                    Table Tennis
                  </span>
                </span>
                <div className="absolute top-[-8px] left-[55%] flex text-[#fff]">
                  <div
                    className={`bg-[rgb(7,24,36)] text-[rgb(177,186,211)] px-2 min-w-[1.8em] rounded-full inline-flex text-[.75rem] font-[600] leading-[1.5] whitespace-nowrap items-center justify-center ${marketTab == 2 ? "!bg-[rgb(67,145,231)] !text-[rgb(4,23,45)]" : ""}`}
                  >
                    6
                  </div>
                </div>
              </div>
            </button>
          </li>

          <li>
            <button
              className="inline-flex relative cursor-pointer  items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:outline-hidden text-xs leading-none  !text-white [&_svg]:!text-white focus-visible:text-white focus-visible!:[&_svg]:text-white"
              onClick={() => setMarketTab(3)}
            >
              <div className="grid grid-flow-row gap-2 place-items-center relative w-[9ch] max-w-[9ch] group">
                {marketTab === 3 ? (
                  <div className="block bg-blue-500 w-3 h-[6px] absolute -top-8 left-1/2 z-[1] -translate-x-1/2 rounded-b"></div>
                ) : null}
                <svg
                  fill="#fff"
                  viewBox="0 0 96 96"
                  className={`svg-icon inline-block text-[28px] group-hover:!fill-white !fill-[#B1BAD3] ${marketTab == 3 ? "!fill-white" : ""}`}
                >
                  <path d="M12.006 16.432c.84-.96 1.719-1.92 2.64-2.799 16.314.813 31.113 6.708 42.996 16.12l-.156-.12c13.839 11.588 24.615 26.384 31.23 43.271l.252.73a43 43 0 0 1-2.514 3.662l.075-.102c-6.846-16.476-16.95-30.378-29.592-41.45l-.129-.112a83.25 83.25 0 0 0-44.415-19.164zm-6.279 8.8c17.289.785 32.922 7.29 45.192 17.651l-.111-.093c12.516 11.1 22.29 25.014 28.359 40.764l.243.714C71.043 91.54 60.039 95.971 48 95.971c-26.511 0-48-21.489-48-48a47.8 47.8 0 0 1 5.856-22.995l-.126.252zm19.998-19.72C32.184 2.06 39.855.032 48 .032c26.511 0 48 21.488 48 48a48 48 0 0 1-2.166 14.3l.09-.339C86.553 46.057 76.101 32.686 63.24 22.15l-.195-.156C52.626 13.786 39.948 7.97 26.097 5.584l-.492-.069z"></path>
                </svg>
                <span className="truncate max-w-[6ch]">
                  <span
                    className={`text-[#B1BAD3] group-hover:text-white ${marketTab === 3 ? "text-white" : ""}`}
                  >
                    Cricket
                  </span>
                </span>
                <div className="absolute top-[-8px] left-[55%] flex text-[#fff]">
                  <div
                    className={`bg-[rgb(7,24,36)] text-[rgb(177,186,211)] px-2 min-w-[1.8em] rounded-full inline-flex text-[.75rem] font-[600] leading-[1.5] whitespace-nowrap items-center justify-center ${marketTab == 3 ? "!bg-[rgb(67,145,231)] !text-[rgb(4,23,45)]" : ""}`}
                  >
                    4
                  </div>
                </div>
              </div>
            </button>
          </li>

          <li>
            <button
              className="inline-flex relative cursor-pointer  items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:outline-hidden text-xs leading-none  !text-white [&_svg]:!text-white focus-visible:text-white focus-visible!:[&_svg]:text-white"
              onClick={() => setMarketTab(4)}
            >
              <div className="grid grid-flow-row gap-2 place-items-center relative w-[9ch] max-w-[9ch] group">
                {marketTab === 4 ? (
                  <div className="block bg-blue-500 w-3 h-[6px] absolute -top-8 left-1/2 z-[1] -translate-x-1/2 rounded-b"></div>
                ) : null}
                <svg
                  fill="#fff"
                  viewBox="0 0 96 96"
                  className={`svg-icon inline-block text-[28px] group-hover:!fill-white !fill-[#B1BAD3] ${marketTab == 4 ? "!fill-white" : ""}`}
                >
                  <path d="M17.398 0a2.19 2.19 0 0 0-1.752 3.501l-.004-.006 6.12 8.145v72.72l-8.324 8.145a2.22 2.22 0 0 0-.204 2.307l-.007-.012a2.19 2.19 0 0 0 1.95 1.2h63.307c.69 0 1.302-.321 1.7-.822l10.91-10.908a2.177 2.177 0 0 0-1.692-3.54H43.571V2.175c0-1.2-.975-2.175-2.175-2.175zm30.54 8.73v4.365h.06c21.654 0 39.21 17.556 39.21 39.21 0 9.108-3.105 17.49-8.317 24.147l.066-.087h5.386c4.53-6.765 7.233-15.09 7.233-24.045 0-24.075-19.515-43.59-43.59-43.59zh.002zm0 8.73v58.905h25.29a34.73 34.73 0 0 0 9.62-24.045c0-19.254-15.605-34.86-34.86-34.86h-.053zm-30.54 3.795C9.892 28.629 5.053 38.694 4.444 49.884l-.006.111v2.37c0 1.29 0 2.565.165 3.825.978 10.758 5.739 20.253 12.92 27.276l.01.009v-6.48c-5.437-6.663-8.73-15.261-8.73-24.63a38.95 38.95 0 0 1 8.787-24.702l-.058.072zm0 14.25c-2.748 4.86-4.365 10.671-4.365 16.86s1.62 12 4.455 17.034l-.09-.174z"></path>
                </svg>
                <span className="truncate max-w-[6ch]">
                  <span
                    className={`text-[#B1BAD3] group-hover:text-white ${marketTab === 4 ? "text-white" : ""}`}
                  >
                    League of Legends
                  </span>
                </span>
                <div className="absolute top-[-8px] left-[55%] flex text-[#fff]">
                  <div
                    className={`bg-[rgb(7,24,36)] text-[rgb(177,186,211)] px-2 min-w-[1.8em] rounded-full inline-flex text-[.75rem] font-[600] leading-[1.5] whitespace-nowrap items-center justify-center ${marketTab == 4 ? "!bg-[rgb(67,145,231)] !text-[rgb(4,23,45)]" : ""}`}
                  >
                    8
                  </div>
                </div>
              </div>
            </button>
          </li>

          <li>
            <button
              className="inline-flex relative cursor-pointer  items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:outline-hidden text-xs leading-none  !text-white [&_svg]:!text-white focus-visible:text-white focus-visible!:[&_svg]:text-white"
              onClick={() => setMarketTab(5)}
            >
              <div className="grid grid-flow-row gap-2 place-items-center relative w-[9ch] max-w-[9ch] group">
                {marketTab === 5 ? (
                  <div className="block bg-blue-500 w-3 h-[6px] absolute -top-8 left-1/2 z-[1] -translate-x-1/2 rounded-b"></div>
                ) : null}
                <svg
                  viewBox="0 0 96 96"
                  className={`svg-icon inline-block text-[28px] group-hover:!fill-white !fill-[#B1BAD3] ${marketTab == 5 ? "!fill-white" : ""}`}
                >
                  <path d="M95.982 9.166V4.667a2.295 2.295 0 0 0-2.28-2.294h-9.148c-.078-.003-.168-.003-.258-.003-.717 0-1.416.09-2.081.255l.06-.012v-.315c0-1.26-1.02-2.28-2.28-2.28H66.273a6 6 0 0 0-6.275 4.532l-.01.042h-1.814a4.7 4.7 0 0 1-1.032-2.267l-.003-.027a2.295 2.295 0 0 0-2.294-2.28H38.843a2.296 2.296 0 0 0-2.265 2.046v.009c0 .48-1.02 2.52-2.534 2.52h-6.27a4 4 0 0 1-.53-.904l-.01-.027a2.31 2.31 0 0 0-2.099-1.364H2.28A2.295 2.295 0 0 0 0 4.592v18.282a81.7 81.7 0 0 0 2.4 16.818l-.12-.561v3.464l-1.5 1.5c-.462.402-.756.98-.78 1.631v9.143c0 .63.258 1.203.675 1.613l1.605 1.62V68.21L.12 74.704a2.4 2.4 0 0 0 .003 1.308l-.003-.018 2.115 8.488L.12 90.706a2.282 2.282 0 0 0 2.16 3h32.004A2.22 2.22 0 0 0 35.888 93l.21-.21c1.059 1.775 2.889 2.996 5.012 3.206l.027.003h6.854a10.1 10.1 0 0 0 4.544-1.404l-.045.027a6.7 6.7 0 0 1 2.358-.894l.042-.006h11.428a2.26 2.26 0 0 0 1.574-.72l.555-.554.42.54c1.11 1.5 2.28 2.999 4.26 2.999h11.427c1.26 0 2.28-1.02 2.28-2.28v-1.65l6.314 1.5a2.27 2.27 0 0 0 1.968-.423l-.007.003c.513-.41.843-1.025.87-1.721v-.003c0-.225-.15-22.646 0-34.239v-.033a2.3 2.3 0 0 0-.675-1.631L93.7 53.89V43.477c0-.648-.275-1.233-.72-1.64l-1.124-1.126 1.38-2.774 2.024-2.01a2.3 2.3 0 0 0 .72-1.616V22.85a2.5 2.5 0 0 0-.003-.552v.012L93.831 14l1.905-3.809c.15-.29.24-.639.24-1.005V9.17zM68.762 18.3l6.959 4.574-2.325 13.707-18.551-13.707zM25.135 77.718l-9.133-6.853 4.5-16.002 18.34 18.281zm48.456-2.28H62.988L16.002 20.415l8.533-2.114 55.49 42.322z"></path>
                </svg>
                <span className="truncate max-w-[6ch]">
                  <span
                    className={`text-[#B1BAD3] group-hover:text-white ${marketTab === 5 ? "text-white" : ""}`}
                  >
                    Dota 2
                  </span>
                </span>
                <div className="absolute top-[-8px] left-[55%] flex text-[#fff]">
                  <div
                    className={`bg-[rgb(7,24,36)] text-[rgb(177,186,211)] px-2 min-w-[1.8em] rounded-full inline-flex text-[.75rem] font-[600] leading-[1.5] whitespace-nowrap items-center justify-center ${marketTab == 5 ? "!bg-[rgb(67,145,231)] !text-[rgb(4,23,45)]" : ""}`}
                  >
                    1
                  </div>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DLiveEvents;
