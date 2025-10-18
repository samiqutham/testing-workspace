import React, { useState, FormEvent } from "react";
import VerifyEmailModal from "@workspace/ui/common/modal/confrimemail-modal/ConfirmEmail";

const Accounts = () => {
  const [isSelfAssessment, setIsSelfAssessment] = useState<any>(false);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSelfAssessment(true);
  };

  const handlePhoneSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Email Section */}
        <div className="flex flex-col rounded-md border border-[#2f4553] pt-8 bg-[#1a2c38]">
          <div className="px-6">
            <h3 className="text-white flex items-center text-[20px] font-bold">
              <div className="flex items-center gap-2">
                Email
                <div className="bg-[#00e701] text-[#013e01] px-2 rounded-full inline-flex text-[12px] font-semibold">
                  Verified
                </div>
              </div>
            </h3>
          </div>

          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col w-full mt-6"
          >
            <div className="flex flex-col gap-8 px-6">
              <div className="w-full border-[#2f4553] border-t" />
              <label className="inline-flex relative flex-col-reverse items-start">
                <div className="w-full flex shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.12)] rounded-[8px]">
                  <div className="relative flex grow w-full">
                    <input
                      className="bg-[#2f4553] p-2 border-2 border-[#2f4553] rounded-[8px] focus:outline-0 w-full text-white"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] transition pb-1 justify-between w-full">
                  <span>Email</span>
                </span>
              </label>
            </div>
            <div className="mt-5 p-4 border-t border-[#2f4553] flex justify-between items-center w-full flex-wrap gap-4">
              <button
                type="submit"
                className="text-[#05080a] bg-[#00e701] text-[16px] font-semibold rounded-[8px] shadow-md py-[0.625rem] px-[1.25rem] ml-auto hover:opacity-90 transition-opacity"
              >
                Confirm Email
              </button>
            </div>
          </form>
        </div>

        {/* Phone Number Section */}
        <div className="mt-8 pt-8 rounded-md border border-[#2f4553] bg-[#1a2c38]">
          <div className="px-6">
            <h3 className="text-white flex items-center text-[20px] font-bold">
              Phone Number
            </h3>
          </div>
          <form
            onSubmit={handlePhoneSubmit}
            className="flex justify-center flex-col w-full mt-5"
          >
            <div className="px-6 flex flex-col w-full">
              <span className="text-[16px] text-[#d5dceb]">
                We only service areas that are listed in the available country
                code list.
              </span>
              <div className="w-full border-[#2f4553] border-t-2 mt-4" />
              <div className="mt-4 flex w-full max-w-[420px] flex-col">
                <label className="inline-flex relative flex-col-reverse items-start">
                  <div className="flex w-full shrink-0">
                    <div className="flex grow w-full relative">
                      <select
                        className="w-full p-2 pr-8 border-2 bg-[#0f212e] border-[#2f4553] shadow-[0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12)] rounded-[6px] font-semibold appearance-none focus:outline-0 hover:border-[#557086] text-white"
                        value={countryCode}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setCountryCode(e.target.value)
                        }
                      >
                        <option value="+1">+1 United States</option>
                        <option value="+92">+92 Pakistan</option>
                        <option value="+20">+20 Egypt</option>
                      </select>
                      <div className="inline-flex absolute top-1/2 right-2 text-[#b1bad3] -translate-y-1/2 pointer-events-none cursor-pointer">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          className="inline-block shrink-0"
                        >
                          <path
                            fill="currentColor"
                            d="M17.293 8.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6-.068-.076A1 1 0 0 1 6.63 8.225l.076.068L12 13.586z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-[14px] font-semibold text-[#b1bad3] pb-1">
                      Country Code
                    </span>
                    <span className="ml-1 text-[#ed4163]">*</span>
                  </div>
                </label>
                <label className="mt-4 inline-flex relative flex-col-reverse items-start">
                  <div className="flex w-full rounded-[6px] shadow-[0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12)]">
                    <div className="relative w-full flex grow">
                      <input
                        className="p-2 w-full bg-[#0f212e] border-2 border-[#2f4553] rounded-md font-normal outline-0 cursor-text hover:border-[#557086] text-white"
                        type="tel"
                        name="mobile"
                        value={phoneNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPhoneNumber(e.target.value)
                        }
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-[14px] font-semibold text-[#b1bad3] pb-1">
                      Phone Number
                    </span>
                    <span className="ml-1 text-[#ed4163]">*</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-4 p-4 border-t border-[#2f4553]">
              <div className="flex justify-between items-center w-full flex-wrap gap-4">
                <button
                  type="submit"
                  className="text-[#05080a] bg-[#00e701] text-[16px] font-semibold rounded-[8px] shadow-md ml-auto py-[0.625rem] px-[1.25rem] min-w-[12ch] hover:opacity-90 transition-opacity"
                >
                  <div className="contents">Submit</div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isSelfAssessment && (
        <VerifyEmailModal
          open={isSelfAssessment}
          onClose={() => setIsSelfAssessment(false)}
        />
      )}
    </>
  );
};

export default Accounts;
