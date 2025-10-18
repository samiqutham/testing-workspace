import React, { useState, useEffect, useRef } from "react";

interface BetItem {
  name?: string;
  price: string;
}

interface DBetslipProps {
  hasBackBetslipArray: BetItem[];
  hasLayBetslipArray: BetItem[];
  betColor: string;
  onDeleteBackBet: (index: number) => void;
  onDeleteLayBet: (index: number) => void;
  onCancelAll: () => void;
  onProfitLossUpdate?: (profitLossData: { [key: string]: number }) => void;
}

const DBetslip: React.FC<DBetslipProps> = ({
  hasBackBetslipArray,
  hasLayBetslipArray,
  onDeleteBackBet,
  onDeleteLayBet,
  onCancelAll,
  betColor,
  onProfitLossUpdate,
}) => {
  const [stakeBack, setStakeBack] = useState("");
  const [stakeLay, setStakeLay] = useState("");
  const [showStakeForm, setShowStakeForm] = useState(false);
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const [totalStakeAmount, setTotalStakeAmount] = useState("");
  const [totalPayoutAmount, setTotalPayoutAmount] = useState("");
  const [totalLiabilityAmount, setTotalLiabilityAmount] = useState("");

  // Refs for the form containers
  const stakeFormRef = useRef<HTMLDivElement>(null);
  const payoutFormRef = useRef<HTMLDivElement>(null);
  const liabilityFormRef = useRef<HTMLDivElement>(null);

  // Close forms when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stakeFormRef.current &&
        !stakeFormRef.current.contains(event.target as Node)
      ) {
        setShowStakeForm(false);
      }

      if (
        liabilityFormRef.current &&
        !liabilityFormRef.current.contains(event.target as Node)
      ) {
        setShowLiabilityForm(false);
      }
    };

    if (showStakeForm || showPayoutForm || showLiabilityForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStakeForm, showPayoutForm, showLiabilityForm]);

  useEffect(() => {
    if (onProfitLossUpdate) {
      const profitLossData: { [key: string]: number } = {};

      hasBackBetslipArray.forEach((backItem) => {
        const stake = parseFloat(stakeBack || "0");
        const odds = parseFloat(backItem.price || "0");
        const profit = stake * (odds - 1);

        const key = backItem.name || "";
        profitLossData[key] = (profitLossData[key] || 0) + profit;
      });

      hasLayBetslipArray.forEach((layItem) => {
        const stake = parseFloat(stakeLay || "0");
        const odds = parseFloat(layItem.price || "0");
        const liability = stake * (odds - 1);

        const key = layItem.name || "";
        profitLossData[key] = (profitLossData[key] || 0) - liability;
      });

      onProfitLossUpdate(profitLossData);
    }
  }, [stakeBack, stakeLay, hasBackBetslipArray, hasLayBetslipArray]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let value = e.target.value;
    if (/^\d{0,99}$/.test(value)) {
      setter(value);
    }
  };

  const closeAllForms = () => {
    setShowStakeForm(false);
    setShowPayoutForm(false);
    setShowLiabilityForm(false);
  };

  const handleStakeClick = () => {
    closeAllForms();
    setShowStakeForm(true);
  };

  const handleLiabilityClick = () => {
    closeAllForms();
    setShowLiabilityForm(true);
  };

  const handleStakeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStakeBack(totalStakeAmount);
    setShowStakeForm(false);
  };

  const handlePayoutFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStakeBack(totalPayoutAmount);
    setShowPayoutForm(false);
  };

  const handleLiabilityFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStakeLay(totalLiabilityAmount);
    setShowLiabilityForm(false);
  };

  return (
    <section className="block relative">
      <div>
        <div className="max-h-[355px] overflow-auto">
          {/* Header */}
          <div>
            <header className="bg-[#1A2C38] text-white text-[1.2rem] p-2 relative">
              <h2 className="font-bold text-left text-[12px] m-0 p-0 leading-[1]">
                Current odds bets
              </h2>
            </header>
          </div>

          {/* Back Bets Section */}
          {hasBackBetslipArray.length > 0 && (
            <div className="relative text-black">
              <div>
                <header className="bg-[#a6d8ff] p-1 flex justify-between items-center text-[11px]">
                  <span className="leading-[16px]">Back (Bet For)</span>
                  <div className="flex relative">
                    <span className="text-center w-16 max-h-[16px] break-words overflow-wrap-break-word">
                      Odds
                    </span>
                    <span className="text-center w-16 max-h-[16px] break-words overflow-wrap-break-word">
                      <span
                        className="text-[#2789ce] cursor-pointer hover:underline"
                        onClick={handleStakeClick}
                      >
                        Stake
                      </span>
                      <span className="w-[13px] h-[13px] cursor-help pl-[1px] text-[#2789ce]">
                        [ ? ]
                      </span>
                    </span>
                    <span className="text-center w-16 max-h-[16px] break-words overflow-wrap-break-word">
                      Profit
                    </span>
                  </div>
                </header>
              </div>

              <section className="bg-[#dbefff]">
                {hasBackBetslipArray.map((backItem, backIndex) => (
                  <div key={backIndex} className="flex p-1 items-center">
                    <section className="flex justify-between w-full items-center max-h-fit">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => onDeleteBackBet(backIndex)}
                          className="rounded-[2px] text-[#303030] inline-flex w-3 h-3 p-0 hover:bg-[#e0e0e0] items-center justify-center mx-1 cursor-pointer"
                        >
                          <svg
                            className="w-[6.5px] h-[6.5px] text-white fill-[#303030]"
                            viewBox="0 0 100 100"
                          >
                            <path d="M100,12.5L87.5,0L50,37.5L12.5,0L0,12.5L37.5,50L0,87.5L12.5,100L50,62.5L87.5,100L100,87.5L62.5,50L100,12.5z"></path>
                          </svg>
                        </button>
                        <span className="font-bold text-[13px] leading-[16px]">
                          {backItem?.name ?? "Name-Pending"}
                        </span>
                      </div>
                    </section>

                    <div className="flex items-center min-w-[187px] max-h-fit">
                      <div className="w-[64px]">
                        <div className="relative max-h-[21.5px] flex items-center">
                          <input
                            className="p-[2px_14px_2px_0] border border-[#dcdcdc] text-center w-full text-[11px] focus:!text-[11px] outline-none max-h-[21.5px]"
                            value={backItem?.price}
                            readOnly
                            name="odd-back"
                          />
                          <div className="absolute top-0 right-[6px] h-full flex flex-col justify-around p-[1px_0]">
                            <button
                              type="button"
                              className="w-2 h-1 p-0 border-0 bg-transparent cursor-pointer"
                              style={{
                                backgroundImage:
                                  "url(https://ie2eds.cdnppb.net/resources/eds/bundle/images/nudge-arrow.093dd7b4d.svg)",
                              }}
                            />
                            <button
                              type="button"
                              className="w-2 h-1 p-0 border-0 bg-transparent transform rotate-180 cursor-pointer"
                              style={{
                                backgroundImage:
                                  "url(https://ie2eds.cdnppb.net/resources/eds/bundle/images/nudge-arrow.093dd7b4d.svg)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[64px] ml-2 max-h-[21.5px] flex items-center">
                        <input
                          className="p-[2px_0] border border-[#dcdcdc] text-center w-full text-[11px] 
          focus:!text-[11px] outline-none max-h-[21.5px] appearance-none
          [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none"
                          name="stake-back"
                          type="text"
                          value={stakeBack}
                          onChange={(e) => handleChange(e, setStakeBack)}
                        />
                      </div>
                      <span className="ml-2 text-[11px]">
                        £{stakeBack ? Number(stakeBack).toFixed(2) : "0.00"}
                      </span>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* Lay Bets Section */}
          <div className="relative">
            {hasLayBetslipArray.length > 0 ? (
              <>
                <div>
                  <header className="bg-[#fac9d4] text-black p-1 flex justify-between items-center text-[11px] relative">
                    <span className="leading-[16px]">Lay (Bet Against)</span>
                    <div className="flex relative">
                      <span className="text-center w-16 leading-[16px] break-words overflow-wrap-break-word">
                        Backer's odds
                      </span>
                      <span className="text-center w-16 leading-[16px] break-words overflow-wrap-break-word">
                        Backer's stake
                      </span>

                      <div className="flex flex-col items-center mr-[10px] relative">
                        <label className="cursor-pointer max-h-[16px]  text-[#2789ce] text-[12px]">
                          <input
                            type="radio"
                            name="lay-option"
                            className="bg-[length:10px] mr-[2px] w-[11px] h-[10px]"
                            value="LIABILITY"
                          />
                          <span
                            className="text-[#2789ce] cursor-pointer hover:underline"
                            onClick={handleLiabilityClick}
                          >
                            Liability
                          </span>
                        </label>
                        <label className="cursor-pointer max-h-[16px] mr-[3px] text-[#2789ce] text-[12px]">
                          <input
                            type="radio"
                            name="lay-option"
                            className="bg-[length:10px] mr-[2px] w-[11px] h-[10px]"
                            value="Payout"
                          />
                          <span
                            className="text-[rgb(39,137,206)] cursor-pointer hover:underline"
                            onClick={handleLiabilityClick}
                          >
                            Payout
                          </span>
                        </label>
                        <span className="flex absolute -right-2.5 text-[11px] leading-[16px] top-[50%] cursor-help -translate-y-[50%]">
                          {"["} <span className="text-[#2889ce]">?</span> {"]"}
                        </span>

                        {/* 👇 Liability Form anchored under header */}
                        {showLiabilityForm && (
                          <div className="absolute top-full right-0 mt-1 z-50">
                            <div
                              ref={liabilityFormRef}
                              className="bg-[#fff9d8] border border-[#7d97a8] p-2 h-[52.5px] w-max"
                            >
                              <form
                                onSubmit={handleLiabilityFormSubmit}
                                className="h-full flex flex-col justify-between"
                              >
                                <p className="text-[#273a47] mb-[3px] text-[11px] text-left m-0 p-0 leading-[1]">
                                  Total Stake
                                </p>
                                <div className="flex items-center gap-1">
                                  <label className="inline-flex items-center leading-[19px]">
                                    <span className="mr-1 text-[#273a47] text-[13px]">
                                      GBP
                                    </span>
                                    <input
                                      name="amount"
                                      className="amount-input border text-[#273a47] border-[#dcdcdc] p-[2px_4px] text-[11px] w-[80px] max-h-[21.5px] outline-none"
                                      type="text"
                                      autoFocus
                                    />
                                  </label>
                                  <button
                                    type="submit"
                                    className="text-[11px] text-[#273a47] text-center leading-[16px] h-[18px] px-[10px] bg-[#cbcbcb] border-b border-[#94a8b3] rounded-[2px] cursor-pointer hover:bg-[#b0b0b0]"
                                  >
                                    OK
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </header>
                </div>
              </>
            ) : null}

            <section className="bg-[#FFE9EE] text-black">
              {hasLayBetslipArray.map((layItem, layIndex) => (
                <div key={layIndex} className="flex p-1 items-center">
                  <section className="flex justify-between w-full items-center max-h-fit">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => onDeleteLayBet(layIndex)}
                        className="rounded-[2px] text-[#303030] inline-flex w-3 h-3 p-0 hover:bg-[#e0e0e0] items-center justify-center mx-1 cursor-pointer"
                      >
                        <svg
                          className="w-[6.5px] h-[6.5px] text-white fill-[#303030]"
                          viewBox="0 0 100 100"
                        >
                          <path d="M100,12.5L87.5,0L50,37.5L12.5,0L0,12.5L37.5,50L0,87.5L12.5,100L50,62.5L87.5,100L100,87.5L62.5,50L100,12.5z"></path>
                        </svg>
                      </button>
                      <span className="font-bold text-[13px] leading-[16px]">
                        {layItem?.name ?? "Name-Pending"}
                      </span>
                    </div>
                  </section>

                  <div className="flex items-center min-w-[187px] max-h-fit">
                    <div className="w-[64px]">
                      <div className="relative max-h-[21.5px] flex items-center">
                        <input
                          className="p-[2px_14px_2px_0] border border-[#dcdcdc] text-center w-full text-[11px] focus:!text-[11px] outline-none max-h-[21.5px]"
                          value={layItem?.price}
                          readOnly
                          name="odd-back"
                        />
                        <div className="absolute top-0 right-[6px] h-full flex flex-col justify-around p-[1px_0]">
                          <button
                            type="button"
                            className="w-2 h-1 p-0 border-0 bg-transparent cursor-pointer"
                            style={{
                              backgroundImage:
                                "url(https://ie2eds.cdnppb.net/resources/eds/bundle/images/nudge-arrow.093dd7b4d.svg)",
                            }}
                          />
                          <button
                            type="button"
                            className="w-2 h-1 p-0 border-0 bg-transparent transform rotate-180 cursor-pointer"
                            style={{
                              backgroundImage:
                                "url(https://ie2eds.cdnppb.net/resources/eds/bundle/images/nudge-arrow.093dd7b4d.svg)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-[64px] ml-2 max-h-[21.5px] flex items-center">
                      <input
                        className="p-[2px_0] border border-[#dcdcdc] text-center w-full text-[11px] 
                focus:!text-[11px] outline-none max-h-[21.5px] appearance-none
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none"
                        name="stake-lay"
                        type="text"
                        value={stakeLay}
                        onChange={(e) => handleChange(e, setStakeLay)}
                      />
                    </div>
                    <span className="ml-2 text-[11px]">
                      £{stakeLay ? Number(stakeLay).toFixed(2) : "0.00"}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Footer */}
          <div className="bg-[#122D38] p-1">
            <div className="flex justify-end text-right text-[12px] text-[#fff] p-[7px]">
              <span>
                <span className="font-bold">
                  Liability : £
                  {stakeBack || stakeLay
                    ? (Number(stakeBack || 0) + Number(stakeLay || 0)).toFixed(
                        2
                      )
                    : "0.00"}
                </span>
              </span>
            </div>
            <div className="flex">
              <button
                type="button"
                onClick={onCancelAll}
                className="bg-[#122D38] rounded-[2px] text-[#fff] inline-block p-[6px_12px] text-[13px] font-bold cursor-pointer hover:bg-[#e0e0e0] hover:text-[#000]"
              >
                Cancel all selections
              </button>
              <div className="flex-1 flex justify-end">
                <button
                  type="button"
                  className="rounded-[2px] inline-block p-[6px_12px] text-[13px] font-bold cursor-default pointer-events-none text-[#e0e0e0]"
                >
                  Place bets
                </button>
              </div>
            </div>
            <div className="p-[8px_4px_5px] text-left text-[13px]">
              <label className="inline-block">
                <input type="checkbox" className="mr-1" name="confirm" />
                Confirm bets before placing
              </label>
              <label className="inline-block ml-4">
                <input type="checkbox" className="mr-1" name="show-percent" />
                <span>Show % Book</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Stake Form Modal */}
      {showStakeForm && (
        <div className="absolute top-[47px] left-[225px] right-0 z-50">
          <div
            ref={stakeFormRef}
            className="bg-[#fff9d8] border border-[#7d97a8] p-2 h-[52.5px] mx-auto w-max"
          >
            <form
              onSubmit={handleStakeFormSubmit}
              className="h-full flex flex-col justify-between"
            >
              <p className="text-[#273a47] mb-[3px] text-[11px] text-left m-0 p-0 leading-[1]">
                Total Stake
              </p>
              <div className="flex items-center m-0 p-0 leading-[1] gap-1">
                <label className="inline-flex items-center leading-[19px]">
                  <span className="mr-1 text-[#273a47]  text-[13px]">GBP</span>
                  <input
                    name="amount"
                    className="amount-input border text-[#273a47]  border-[#dcdcdc] p-[2px_4px] text-[11px] w-[80px] max-h-[21.5px] outline-none"
                    type="text"
                    autoFocus
                  />
                </label>
                <button
                  type="submit"
                  className="text-[11px ] text-[#273a47]  text-center leading-[16px] h-[18px] px-[10px] bg-[#cbcbcb] border-b border-[#94a8b3] rounded-[2px] cursor-pointer hover:bg-[#b0b0b0]"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default DBetslip;
