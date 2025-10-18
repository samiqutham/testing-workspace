import React, { useState } from "react";

const DOffers = () => {
  // state for Welcome Offer
  const [welcomeCode, setWelcomeCode] = useState("");
  // state for Bonus Drop
  const [bonusCode, setBonusCode] = useState("");

  const handleWelcomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Welcome offer code submitted:", welcomeCode);
  };

  const handleBonusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bonus drop code submitted:", bonusCode);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* ================= Welcome Offer ================= */}
      <section className="rounded-md border border-[#2f4553] bg-[#1a2c38] pt-8">
        <div className="px-6">
          <h3 className="text-white text-[20px] font-bold">Welcome Offer</h3>
        </div>

        <div className="px-6 mt-4 text-[#d5dceb] text-base">
          To claim your welcome offer, please enter your code within 24 hours of
          signing up.
        </div>

        <hr className="my-4 mx-4 border-[#2f4553]" />

        <form onSubmit={handleWelcomeSubmit}>
          <div className="px-6 flex flex-col gap-4 max-w-[420px]">
            <label className="inline-flex relative flex-col-reverse items-start w-full">
              <div className="flex w-full shadow rounded-md">
                <input
                  type="text"
                  name="welcome-code"
                  value={welcomeCode}
                  onChange={(e) => setWelcomeCode(e.target.value)}
                  className="bg-[#0f212e] text-white p-2 border-2 border-[#2f4553] rounded-md w-full focus:outline-none"
                />
              </div>
              <span className="inline-flex items-center font-bold text-base text-[#b1bad3] pb-1 w-full">
                Code <span className="ml-1 text-[#ed4163]">*</span>
              </span>
            </label>
          </div>

          <div className="mt-6 p-4 border-t border-[#2f4553] flex justify-end">
            <button
              type="submit"
              disabled={!welcomeCode}
              className={`py-2.5 px-5 text-black min-w-[12ch] rounded-md shadow-md font-semibold transition ${
                welcomeCode
                  ? "bg-[#00e701] hover:bg-[#00c701]"
                  : "bg-[#00e701] opacity-50 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {/* ================= Claim Bonus Drop ================= */}
      <section className="rounded-md border border-[#2f4553] bg-[#1a2c38] pt-8">
        <div className="px-6">
          <h3 className="text-white text-[20px] font-bold">Claim Bonus Drop</h3>
        </div>

        <div className="px-6 mt-4 text-[#d5dceb] text-base">
          Find bonus drop codes on our social media's such as x.com (Twitter) &
          Telegram.
        </div>

        <hr className="my-4 mx-4 border-[#2f4553]" />

        <form onSubmit={handleBonusSubmit}>
          <div className="px-6 flex flex-col gap-4 max-w-[420px]">
            <label className="inline-flex relative flex-col-reverse items-start w-full">
              <div className="flex w-full shadow rounded-md">
                <input
                  type="text"
                  name="bonus-code"
                  value={bonusCode}
                  onChange={(e) => setBonusCode(e.target.value)}
                  className="bg-[#0f212e] text-white p-2 border-2 border-[#2f4553] rounded-md w-full focus:outline-none"
                />
              </div>
              <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] pb-1 w-full">
                Code <span className="ml-1 text-[#ed4163]">*</span>
              </span>
            </label>
          </div>

          <div className="mt-6 p-4 border-t border-[#2f4553] flex justify-end">
            <button
              type="submit"
              disabled={!bonusCode}
              className={`py-2.5 px-5 text-black min-w-[12ch] rounded-md shadow-md font-semibold transition ${
                bonusCode
                  ? "bg-[#00e701] hover:bg-[#00c701]"
                  : "bg-[#00e701] opacity-50 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default DOffers;
