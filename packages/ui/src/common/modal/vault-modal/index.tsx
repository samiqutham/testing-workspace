import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";
import Link from "next/link";

const currencies = [
  {
    value: "btc",
    label: "BTC",
    name: "Bitcoin",
    balance: "0.00000000",
    usd: "$0.00",
    icon: "btc",
  },
  {
    value: "eth",
    label: "ETH",
    name: "Ethereum",
    balance: "0.00000000",
    usd: "$0.00",
    icon: "btc",
  },
  {
    value: "ltc",
    label: "LTC",
    name: "Litecoin",
    balance: "0.00000000",
    usd: "$0.00",
    icon: "btc",
  },
  {
    value: "usdt",
    label: "USDT",
    name: "USD Tether",
    balance: "0.00000000",
    usd: "$0.00",
    icon: "btc",
  },
  {
    value: "sol",
    label: "SOL",
    name: "Solana",
    balance: "0.00000000",
    usd: "$0.00",
    icon: "btc",
  },
  {
    value: "doge",
    label: "DOGE",
    name: "Dogecoin",
    balance: "0.00000000",
    usd: "$0.00",
    icon: "btc",
  },
];

export default function VaultModal({ open, onClose }: any) {
  
  const [activeTab, setActiveTab] = useState("deposit");
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState<string>("0.00000000");
  const [error, setError] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setValue("");
      setError(
        "Amount must be a `number` type, but the final value was: `NaN`."
      );
      return;
    }
    const num = Number(val);
    if (isNaN(num)) {
      setError("Please enter a valid number.");
      return;
    }
    if (num > 0) {
      setError("The maximum value is 0.");
      return;
    }
    setValue(val);
    setError("");
  };

  const handleBlur = () => {
    if (value === "" || isNaN(Number(value))) {
      setValue("0.00000000");
      setError("");
    } else {
      setValue(Number(value).toFixed(8));
      setError("");
    }
  };

  const increment = () => {
    setValue((prev) => {
      const num = prev === "" ? 0 : parseFloat(prev);
      const next = num + 1;
      return next > 0 ? "0.00000000" : next.toFixed(8);
    });
  };

  const decrement = () => {
    setValue((prev) => {
      const num = prev === "" ? 0 : parseFloat(prev);
      const next = num - 1;
      return next.toFixed(8);
    });
  };

  return (
    <Dialog   open={open} onOpenChange={onClose}>
         {open && (
        <div className="fixed inset-0 bg-[#0000008c] z-40" />
      )}
      <DialogContent
        showCloseButton={false}
        className="animate-modal-popover p-0 overflow-hidden min-w-[200px] !max-w-[500px] max-h-auto border-0   rounded-[8px] min-[320px]:w-[90%] min-[350px]:w-[91.5%] sm:w-[95%] min-[400px]:w-[92.5%]  gap-0"
      >
        <DialogHeader className="flex !flex-row h-[60px] justify-between items-center !bg-[#1A2C38] text-white !p-4 !border-none !outline-none !shahdow-none">
          <DialogTitle className="font-bold text-[18px] leading-[28px] !min-h-[28px] flex items-center gap-2">
            <Icon
              name={"vaultModal"}
              width={20}
              height={20}
              fill="#b1bad3"
              className="inline-block shrink-0 text-[#b1bad3]"
            />
            <div className="text-white !min-h-[28px]">Vault</div>
          </DialogTitle>
          <DialogClose asChild>
            <button className="text-xl leading-none cursor-pointer outline-0">
              <Icon
                name={"closeIcon"}
                className="w-5 h-5 hover:fill-[white]"
                fill="#b1bad3"
              />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className=" max-h-[calc(100vh-150px)] bg-[#1A2C38] scrollbar-hidden overflow-y-auto">
          <div className="flex flex-col flex-1 relative overflow-y-auto">
            <div className="flex flex-col px-4 pb-4 gap-4">
              <div className="flex flex-col gap-4  w-full">
                <div className="flex w-full">
                  <div className="flex flex-grow shrink-0 rounded-[3rem] p-[6px] bg-[#0F212E]">
                    <div className="flex flex-grow gap-2">
                      <button
                        onClick={() => setActiveTab("deposit")}
                        className={`inline-flex relative items-center justify-center whitespace-nowrap hover:bg-[#2F4553] text-white py-[0.625rem] px-[1.25rem] outline-none rounded-full flex-1 text-[16px] font-[600] cursor-pointer ${activeTab === "deposit" ? "bg-[#2F4553]" : "bg-transparent"}`}
                      >
                        Deposit
                      </button>
                      <button
                        onClick={() => setActiveTab("withdraw")}
                        className={`inline-flex relative items-center justify-center whitespace-nowrap flex-1 text-[16px] font-[600] text-white py-[0.625rem] px-[1.25rem] rounded-full hover:bg-[#2F4553] outline-none cursor-pointer ${activeTab === "withdraw" ? "bg-[#2F4553]" : "bg-transparent"}`}
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    {activeTab === "deposit" && ( <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm  leading-5 text-[#A9B3CB]">
                      Balance
                    </span>
                    <div className="relative">
                      <div className="flex flex-col justify-center items-start flex-1">
                        <div className="position-relative flex w-full">
                          <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="inline-flex bg-[#2F4553] relative items-center gap-2 justify-center whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-md shadow-md py-[0.80rem] px-5 rounded-md max-w-full w-full font-semibold hover:bg-[#557086] cursor-pointer">
                            <div className="position-relative w-full truncate">
                              <div className="flex items-center justify-between gap-2 w-full">
                                <div className="inline-flex items-center gap-2">
                                  <Icon
                                    name={selectedCurrency?.icon}
                                    width={28}
                                    height={28}
                                    className="w-[25px] h-[25px]"
                                  />
                                  <div className="flex flex-col gap-[2px] text-start">
                                    <div className="text-md font-semibold left">
                                      {selectedCurrency?.label}
                                    </div>
                                    <span className="text-sm text-gray-400">
                                      {selectedCurrency?.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="inline-block overflow-hidden whitespace-nowrap tabular-nums">
                                    <span className="text-md font-semibold">
                                      {selectedCurrency?.balance}
                                    </span>
                                  </span>
                                  <span className="inline-block overflow-hidden whitespace-nowrap tabular-nums">
                                    <span className="text-sm text-[#b1bad3]">
                                      {selectedCurrency?.usd} USD
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="inline-flex items-center">
                              <Icon
                                name={"arrowDown"}
                                className={`w-[20px] h-[20px] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                              />
                            </span>
                          </button>
                        </div>
                      </div>

                      {dropdownOpen && (
                        <div className="absolute top-full left-0 max-h-[272px] overflow-y-hidden w-full mt-2 bg-[#2F4653] rounded-md shadow-lg z-50 border border-[#2F4553]">
                          {/* Triangle pointer */}
                          <div className="absolute -top-2 left-60 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#2F4553]"></div>
                          <div className="absolute -top-[7px] left-60 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#0F212E]"></div>

                          <div className="px-4 pb-2 pt-[7px]">
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#b1bad3]">
                             <Icon name={"search"} className="text-[#566571]"/>
                              </div>
                              <input
                                type="text"
                                placeholder="Search Currencies"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 bg-[#0E212E] border-2 border-[#2F4553] rounded-md text-white placeholder-[#b1bad3] placeholder:text-[#566571] outline-none focus:border-[#557086] text-base [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                              />
                            </div>
                          </div>

                          <div className="max-h-[240px] overflow-y-auto scrollbar-hide">
                            {filteredCurrencies.length === 0 ? (
                              <div className="text-center py-4 text-[#b1bad3] text-sm">
                                Currency not available
                              </div>
                            ) : (
                              filteredCurrencies.map((currency) => (
                                <button
                                  key={currency.value}
                                  onClick={() => {
                                    setSelectedCurrency(currency);
                                    setDropdownOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-[#2F4553] transition-colors text-white"
                                >
                                  <div className="flex items-center gap-2">
                                    <Icon
                                      name={currency.icon}
                                      width={28}
                                      height={28}
                                      className="w-[28px] h-[28px]"
                                    />
                                    <div className="flex flex-col items-start">
                                      <span className="text-md font-semibold">
                                        {currency.label}
                                      </span>
                                      <span className="text-sm text-[#b1bad3]">
                                        {currency.name}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="text-md font-semibold">
                                      {currency.balance}
                                    </span>
                                    <span className="text-sm text-[#b1bad3]">
                                      {currency.usd} USD
                                    </span>
                                  </div>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div> )}
                       {activeTab === "withdraw" && (
                     <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm  leading-5 text-[#A9B3CB]">
                      Vault Balance
                    </span>
                    <div className="relative">
                      <div className="flex flex-col justify-center items-start flex-1">
                        <div className="position-relative flex w-full">
                          <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="inline-flex bg-[#2F4553] relative items-center gap-2 justify-center whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-md shadow-md py-[0.75rem] px-5 rounded-md max-w-full w-full font-semibold hover:bg-[#557086]"
                          >
                            <div className="position-relative w-full truncate">
                              <div className="flex items-center justify-between gap-2 w-full">
                                <div className="inline-flex items-center gap-2">
                                  <Icon
                                    name={selectedCurrency?.icon}
                                    width={28}
                                    height={28}
                                    className="w-[25px] h-[25px]"
                                  />
                                  <div className="flex flex-col gap-[2px] text-start">
                                    <div className="text-md font-semibold left">
                                      {selectedCurrency?.label}
                                    </div>
                                    <span className="text-sm text-gray-400">
                                      {selectedCurrency?.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="inline-block overflow-hidden whitespace-nowrap tabular-nums">
                                    <span className="text-md font-semibold">
                                      {selectedCurrency?.balance}
                                    </span>
                                  </span>
                                  <span className="inline-block overflow-hidden whitespace-nowrap tabular-nums">
                                    <span className="text-sm text-[#b1bad3]">
                                      {selectedCurrency?.usd} USD
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="inline-flex items-center">
                              <Icon
                                name={"ChevronDown"}
                                className={`w-[18px] h-[18px] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                              />
                            </span>
                          </button>
                        </div>
                      </div>

                      {dropdownOpen && (
                        <div className="absolute top-full left-0 max-h-[272px] overflow-y-hidden w-full mt-2 bg-[#2F4653] rounded-md shadow-lg z-50 border border-[#2F4553]">
                          {/* Triangle pointer */}
                          <div className="absolute -top-2 left-60 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#2F4553]"></div>
                          <div className="absolute -top-[7px] left-60 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#0F212E]"></div>

                          <div className="px-4 pb-2 pt-[7px]">
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#b1bad3]">
                             <Icon name={"search"} className="text-[#566571]"/>
                              </div>
                              <input
                                type="text"
                                placeholder="Search Currencies"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 bg-[#0E212E] border-2 border-[#2F4553] rounded-md text-white placeholder-[#b1bad3] placeholder:text-[#566571] outline-none focus:border-[#557086] text-base [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                              />
                            </div>
                          </div>

                          <div className="max-h-[240px] overflow-y-auto scrollbar-hide">
                            {filteredCurrencies.length === 0 ? (
                              <div className="text-center py-4 text-[#b1bad3] text-sm">
                                Currency not available
                              </div>
                            ) : (
                              filteredCurrencies.map((currency) => (
                                <button
                                  key={currency.value}
                                  onClick={() => {
                                    setSelectedCurrency(currency);
                                    setDropdownOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-[#2F4553] transition-colors text-white"
                                >
                                  <div className="flex items-center gap-2">
                                    <Icon
                                      name={currency.icon}
                                      width={28}
                                      height={28}
                                      className="w-[28px] h-[28px]"
                                    />
                                    <div className="flex flex-col items-start">
                                      <span className="text-md font-semibold">
                                        {currency.label}
                                      </span>
                                      <span className="text-sm text-[#b1bad3]">
                                        {currency.name}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="text-md font-semibold">
                                      {currency.balance}
                                    </span>
                                    <span className="text-sm text-[#b1bad3]">
                                      {currency.usd} USD
                                    </span>
                                  </div>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                      )}
                </div>

                <div className="h-full overflow-y-auto">
                  <label className="flex flex-col-reverse items-start relative">
                    <div className="w-full flex shrink-0 rounded-md">
                      <div className="relative flex-grow w-full flex items-center bg-[#2F4553] !rounded-sm">
                        <div className="absolute right-19 flex top-1/2 -translate-y-1/2 pointer-events-none z-2">
                          <Icon
                            name={selectedCurrency?.icon}
                            width={20}
                            height={20}
                          />
                        </div>
                        <div className="relative w-full group h-[44.590px]">
                          <input
                            type="number"
                            step="0.01"
                            value={value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-2 py-2 rounded-l-sm w-full h-full border-2 text-[16px] border-[#2F4553] font-normal text-base font-sans leading-5 outline-none focus:ring-0 transition-all bg-[#0F212E] hover:border-[#557086] placeholder-white focus:placeholder-white peer custom-input-number text-white"
                            placeholder="Enter amount"
                          />
                          <div className="absolute right-[44px] top-1/2 -translate-y-1/2 flex-col px-1 bg-[#2c2c2c] hidden group-hover:flex peer-focus:flex">
                            <button
                              type="button"
                              onClick={increment}
                              className="text-white opacity-60 text-[9px] rounded hover:opacity-100 cursor-pointer"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              onClick={decrement}
                              className="text-white opacity-60 text-[9px] rounded hover:opacity-100 cursor-pointer"
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                        <button className="inline-flex ml-[2px] bg-[#2F4553] h-[43.2px] items-center gap-2 justify-center transition text-white text-[16px] py-[0.5rem] px-[1rem] font-bold hover:bg-[#557086] rounded-r-md">
                          Max
                        </button>
                      </div>
                    </div>
                    <span className="inline-flex items-center justify-between w-full pb-1  text-sm  pb-0  px-0 text-white">
                      <span className="inline-flex text-[#A9B3CB] font-semibold w-full">Amount</span>
                      <span className="inline-flex items-center text-sm  text-[#A9B3CB] ml-[0.5ch]">
                        $0.00
                      </span>
                    </span>
                  </label>
                  {error && (
                    <p className="text-[#F26F8A] text-sm mt-2 flex items-center gap-1">
                      <Icon name="gamblingValidation" />
                      {error}
                    </p>
                  )}


                  {/* {activeTab === "withdraw" && (
                    <label className="inline-flex flex-col-reverse items-start text-base relative w-full mt-[16px]">
                      <div className="w-full flex flex-shrink-0 rounded-md shadow-sm">
                        <div className="relative flex flex-grow w-full">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="flex-grow w-full px-2 py-2 rounded-md text-base border-2 text-[16px] border-[#2F4553] outline-0 focus:outline-none bg-[#0F212E] text-white"
                            data-testid="vault-withdraw-password"
                          />
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center px-4 py-2 cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Icon
                                  name={"loginHideEye"}
                                  width={18}
                                  height={18}
                                />
                              ) : (
                                <Icon
                                  name={"loginOpenEye"}
                                  width={18}
                                  height={18}
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="w-full mb-2 flex gap-1 text-sm font-semibold mt-1 text-white">
                        <span>Password</span>
                        <span className="text-red-600 font-bold">*</span>
                      </span>
                    </label>
                  )} */}
             
                  <div className="flex items-end flex-1 mt-4">
                   {activeTab=="deposit" && ( <button className="inline-flex text-[16px] items-center gap-2 justify-center rounded-md whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#1475E1] text-white cursor-pointer focus-visible:outline-white text-sm shadow-md py-[0.625rem] px-[1.25rem] min-w-[12ch] w-full font-semibold">
                      Deposit to Vault
                    </button>)}
                     {activeTab=="withdraw" && ( <button className="inline-flex text-[16px] items-center gap-2 justify-center rounded-md whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#01E601] text-black cursor-pointer focus-visible:outline-white text-sm shadow-md py-[0.625rem] px-[1.25rem] min-w-[12ch] w-full ">
                   <div><Icon name={"googleicon"} className="h-5 w-5"/></div><div>  Re-verify with Google</div>
                    </button>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-[500]:mt-0 flex flex-col items-center w-full px-4 py-4 gap-3 bg-[#0F212E]">
              <p className="font-normal text-base leading-6 text-[#b1bad3]">
                Improve your account security with Two-Factor Authentication
              </p>
              <a
                className="inline-flex items-center gap-2 justify-center rounded-md whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 bg-[#2F4553] focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:bg-grey-300 focus-visible:outline-white text-[16px] shadow-md py-[0.625rem] px-[1.25rem] w-full font-semibold"
                href="/settings/security"
              >
                Enable 2FA
              </a>
            </div>

            <div  className="footer bg-[#0F212E] flex flex-col items-center w-full  pb-4 gap-3">
              <Link
              onClick={() => onClose(false)} 
                className="inline-flex items-center gap-2 justify-center whitespace-nowrap transition text-[#b1bad3] hover:text-white text-sm font-semibold"
                href="/blog/popular-esports-events-tournaments"
                
              >
                Learn More About Vault
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
