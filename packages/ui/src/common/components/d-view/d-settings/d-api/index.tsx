import React, { useState } from "react";

const CopyIcon = () => (
  <svg
    data-ds-icon="Copy"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="inline-block shrink-0"
  >
    <path
      fill="currentColor"
      d="M14 8H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2"
    />
    <path
      fill="currentColor"
      d="M22 4v10c0 1.1-.9 2-2 2h-2v-6c0-2.21-1.79-4-4-4H8V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
    />
  </svg>
);

const DApi = () => {
  // --- Token Creation ---
  const realToken = "I5RTCVRKONIDKOKRJYF23U...";
  const [revealed, setRevealed] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(realToken);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleReveal = (e: React.FormEvent) => {
    e.preventDefault();
    setRevealed(true);
  };

  // --- Active Tokens ---
  const [tokens, setTokens] = useState([
    {
      id: 1,
      device: "Chrome (Android)",
      ip: "45.64.104.9",
      createdTime: "12:13 PM",
      createdDate: "9/24/2025",
      updatedTime: "12:13 PM",
      updatedDate: "9/24/2025",
    },
  ]);

  const handleDeactivate = (id: number) => {
    setTokens((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* =================== Token Creation =================== */}
      <section className="rounded-md border border-[#2f4553] bg-[#1a2c38] pt-8">
        <div className="px-6">
          <h3 className="text-white text-[20px] font-bold">Token Creation</h3>
        </div>

        <div className="px-6 mt-4 text-[#d5dceb] text-base">
          Disclaimer: Stake.com support will never ask you for this token. In
          giving this token to other people, you are granting them full access
          to your account.
        </div>

        <hr className="my-4 border-[#2f4553]" />

        <form onSubmit={handleReveal}>
          <div className="px-6 flex flex-col gap-4 max-w-[420px]">
            <label className="inline-flex relative flex-col-reverse items-start w-full">
              <div className="flex w-full shadow rounded-md">
                <input
                  type="text"
                  readOnly
                  value={revealed ? realToken : "*********************"}
                  className="bg-[#2f4553] text-[#b1bad3] p-2 border-2 border-[#2f4553] rounded-md w-full pr-12"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!revealed}
                  className={`absolute right-0 top-[47px] -translate-y-1/2 bg-[#2f4553] text-white p-2 rounded-md border-2 border-[#2f4553] h-[42px] flex items-center justify-center ${
                    !revealed ? "opacity-50" : "hover:bg-[#3a5a6b]"
                  }`}
                >
                  <CopyIcon />
                </button>
              </div>
              <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] pb-1 w-full">
                Token
              </span>
            </label>
          </div>

          <div className="mt-6 p-4 border-t border-[#2f4553] flex justify-between items-center">
            <p className="text-[#ffffff] font-semibold text-base">
              Do not share this!
            </p>
            <button
              type="submit"
              disabled={revealed}
              className={`py-2.5 px-5 text-black bg-[#00e701] min-w-[12ch] rounded-md shadow-md font-semibold ${
                revealed
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#00c701]"
              }`}
            >
              Reveal
            </button>
          </div>
        </form>
      </section>

      {/* =================== Active Tokens =================== */}
      <section className="rounded-md border border-[#2f4553] bg-[#1a2c38] pt-8">
        <div className="px-6">
          <h3 className="text-white text-[20px] font-bold">Active Tokens</h3>
        </div>

        <div className="px-6 mt-4 text-[#d5dceb] text-[16px]">
          Stake currently operates with a closed API and therefore the use of
          these tokens are very limited. Every time you choose to reveal a new
          API token using the "Token Creation" form, you are initiating a new
          independent session. Old tokens are not deactivated until you click to
          disable all tokens.
        </div>

        <hr className="my-4 border-[#2f4553]" />

        <div className="px-6">
          <div className="scrollbar-hidden overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#2f4553]">
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    Device
                  </th>
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    IP Address
                  </th>
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    Created
                  </th>
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    Updated
                  </th>
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr
                    key={token.id}
                    className={`hover:bg-[#1a2c38]/50 ${
                      index % 2 === 1 ? "bg-[#17313f]" : ""
                    }`}
                  >
                    <td className="px-3 lg:px-6 py-4 text-[#b1bad3] text-[14px]">
                      {token.device}
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-[#b1bad3] text-[14px]">
                      {token.ip}
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-[#b1bad3] text-[14px]">
                      <div>{token.createdTime}</div>
                      <span className="text-xs">{token.createdDate}</span>
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-[#b1bad3] text-[14px]">
                      <div>{token.updatedTime}</div>
                      <span className="text-xs">{token.updatedDate}</span>
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeactivate(token.id)}
                        className="inline-flex items-center gap-2 justify-center rounded-md font-semibold transition active:scale-[0.98] bg-[#556b7d] text-white hover:bg-[#6b8299] text-sm shadow-md py-2 px-3 lg:px-4"
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
                {tokens.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-[#b1bad3] text-sm"
                    >
                      No active tokens
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 border-t border-[#2f4553]">
          <span className="text-[#d5dceb] text-sm">
            Deactivating API tokens cannot be undone, however you can create a
            new one above.
          </span>
        </div>
      </section>
    </div>
  );
};

export default DApi;
