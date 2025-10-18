"use client";

import Icon from "@workspace/ui/icons/icons";
import { useState } from "react";
export default function DVerification() {
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  const toggleLevel = (level: number) => {
    setOpenLevel(openLevel === level ? null : level);
  };

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [backFile, setBackFile] = useState<File | null>(null);
  return (
    <>
      <div className="space-y-4 w-full  mx-auto">
      {/* Level 1 */}
        <div className="bg-[#213843] text-white rounded-md">
          <button
            onClick={() => toggleLevel(1)}
            className="w-full flex justify-between items-center px-4 py-3 "
          >
            <span className="text-[#D5DCEA] font-semibold">Level 1</span>
            <span className="w-4  h-4 mr-1 mb-1">
              {openLevel === 1 ? (
                <Icon
                  className="-rotate-180  w-5 h-5 text-[#D5DCE9]"
                  name={"arrowDown"}
                />
              ) : (
                <Icon className=" text-[#D5DCE9] w-5 h-5" name={"arrowDown"} />
              )}
            </span>
          </button>
          {openLevel === 1 && (
            <div className="bg-[#213843] border-t-[2px] border-[#2F4652] pb-4 rounded-bl-md rounded-br-md px-[16px] w-full mx-auto text-white">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold  mt-4">
                  Confirm Your Details
                </h3>
                <p className="text-[16px] text-[#D0D7E5] mt-1">
                  Please fill in your details & confirm your identity to unlock
                  additional services. All information is private & secure.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                    First Name (including middle name, if applicable){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md bg-[#0E212E] border-2 border-[#2F4652] px-3 py-2 text-white focus:outline-none hover:border-[#557086]
"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] px-3 py-2 text-white focus:outline-none hover:border-[rgb(85,112,134)]"
                  />
                </div>

                {/* Country */}
                <div className="relative w-full">
                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px] ">
                    Country <span className="text-red-500 ">*</span>
                  </label>

                  <select className="w-full appearance-none rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] px-3 py-2 pr-10 text-white focus:outline-none hover:border-[rgb(85,112,134)] ">
                    <option className="font-semibold" value=""></option>
                    <option value="pakistan">Pakistan</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                  </select>

                  {/* Custom Icon */}
                  <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
                    <Icon
                      className="text-[#D5DCE9] w-5 h-5"
                      name={"arrowDown"}
                    />
                  </span>
                </div>

                {/* Place of Birth */}
                <div className="relative w-full">
                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                    Place of Birth <span className="text-red-500">*</span>
                  </label>

                  <select className="w-full appearance-none rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] px-3 py-2 pr-10 text-white focus:outline-none hover:border-[rgb(85,112,134)] ">
                    <option value=""></option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                    <option value="islamabad">Islamabad</option>
                  </select>

                  {/* Custom Icon */}
                  <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
                    <Icon
                      className="text-[#D5DCE9] w-5 h-5"
                      name={"arrowDown"}
                    />
                  </span>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] px-3 py-2 text-white focus:outline-none hover:border-[rgb(85,112,134)]"
                  />
                </div>

                {/* Address */}
                <div className="relative w-full">

                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                    Residential Address <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-[#D5DCE9]">
                      <Icon className="w-5 h-5" name={"searchverified"} />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="w-full rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] pl-10 py-2 placeholder:font-light text-white placeholder:text-[#7D8DA1] focus:outline-none hover:border-[rgb(85,112,134)]"
                    />
                  </div>
                </div>

                {/* City + Postal Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] px-3 py-2 text-white focus:outline-none hover:border-[rgb(85,112,134)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] px-3 py-2 text-white focus:outline-none hover:border-[rgb(85,112,134)]"
                    />
                  </div>
                </div>

                {/* Occupation Industry */}

                <div className="relative w-full">
                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                    Occupation Industry  <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full appearance-none rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] 
             px-3 py-2 pr-10 text-[#B1BAD3] focus:text-white hover:text-white 
             focus:outline-none hover:border-[#557086] transition-colors duration-200 cursor-pointer"
                  >
                    <option value="">Select your occupation industry</option>
                    <option value="lit">LIT</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                  </select>


                  {/* Custom Icon */}
                  <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
                    <Icon
                      className="text-[#D5DCE9] w-5 h-5"
                      name={"arrowDown"}
                    />
                  </span>
                </div>


                {/* Occupation */}

                <div className="relative w-full">
                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                    Occupation  <span className="text-red-500">*</span>
                  </label>

                  <select className="w-full appearance-none rounded-md text-[#B1BAD3] focus:text-white cursor-pointer hover:text-white  bg-[#0E212E] border-[2px] border-[#2F4652] px-3 py-2 pr-10  focus:outline-none hover:border-[rgb(85,112,134)] ">
                    <option value="">Select your occupation</option>
                    <option value="lahore">Developer</option>
                    <option value="karachi">Teacher</option>
                    <option value="islamabad">Doctor</option>
                  </select>

                  {/* Custom Icon */}
                  <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
                    <Icon
                      className="text-[#D5DCE9] w-5 h-5"
                      name={"arrowDown"}
                    />
                  </span>
                </div>

                {/* Experience */}

                <div className="relative w-full">
                  <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
                    Occupation Experience  <span className="text-red-500">*</span>
                  </label>

                  <select className="w-full appearance-none rounded-md bg-[#0E212E] border-[2px] border-[#2F4652] px-3 py-2 pr-10  text-[#B1BAD3] hover:text-white focus:text-white cursor-pointer focus:outline-none hover:border-[rgb(85,112,134)]  ">
                    <option value="">Select your occupation experience</option>
                    <option value="lahore">0-1 Years</option>
                    <option value="karachi">2-5 Years</option>
                    <option value="islamabad">5+ Years</option>
                  </select>

                  {/* Custom Icon */}
                  <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
                    <Icon
                      className="text-[#D5DCE9] w-5 h-5"
                      name={"arrowDown"}
                    />
                  </span>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded-md py-2 font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>

       {/* Level 2 */}
<div className="bg-[#213843] text-white rounded-md">
  <button
    onClick={() => toggleLevel(2)}
    className="w-full flex justify-between items-center px-4 py-3 "
  >
    <span className="text-[#D5DCEA] font-semibold ">Level 2</span>
    <span className="w-4  h-4 mr-1 mb-1">
      {openLevel === 2 ? (
        <Icon
          className="-rotate-180  w-5 h-5 text-[#D5DCE9]"
          name={"arrowDown"}
        />
      ) : (
        <Icon className="text-[#D5DCE9] w-5 h-5" name={"arrowDown"} />
      )}
    </span>
  </button>

  {openLevel === 2 && (
    <div className="px-4 py-4 border-t-[2px] border-[#2F4652]">
      <h2 className="text-[20px] font-semibold">Upload Identification</h2>
      <p className="text-[#ff9d00] text-[16px] mt-1">
        Please complete level one verification first.
      </p>
      <p className="text-[#d5dceb] text-[16px] mt-2">
        Please upload your identification. This step will unlock more
        capabilities such as higher betting limits and enhanced account
        security.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Front Side */}
        <div className="flex flex-col">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-[#b1bad3]">
              Front Side <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 bg-[#1D313D] border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-400">
            <div className="icon flex justify-center items-center ">
              <img
                src="/UploadFrontIcon.svg"
                alt="Upload Front"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Upload Button */}
            <label className="inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition 
              focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] 
              bg-[#2f4553] text-white hover:bg-gray-300 focus-visible:outline-white 
              shadow-md py-[0.625rem] px-[1.25rem] cursor-pointer">
              {frontFile ? frontFile.name : "Upload Front Side"}
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                className="hidden"
                onChange={(e) => setFrontFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </div>

        {/* Back Side */}
        <div className="flex flex-col">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-[#b1bad3]">
              Back Side <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 bg-[#1D313D] border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-400">
            <div className="icon flex justify-center items-center ">
          
                <img
                src="/IdUploadBack.svg"
                alt="Upload Front"
                className="w-[100px] h-[100px] object-contain"
              />
            </div>

            {/* Upload Button */}
            <label className="inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition 
              focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] 
              bg-[#2f4553] text-white hover:bg-gray-300 focus-visible:outline-white 
              shadow-md py-[0.625rem] px-[1.25rem] cursor-pointer">
              {backFile ? backFile.name : "Upload Back Side"}
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                className="hidden"
                onChange={(e) => setBackFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="mt-4 w-full bg-[#1475e1] hover:bg-blue-700 px-[20px] py-[10px] rounded-[8px] text-white font-medium">
        Submit
      </button>
    </div>
  )}
</div>


        
       {/* Level 3 */}
        <div className={'bg-[#213843] text-white rounded-md  font-["proxima-nova",ui-sans-serif,-apple-system,system-ui,sans-serif] '}>
          <button
            onClick={() => toggleLevel(3)}
            className="w-full flex justify-between items-center px-4 py-3 "
          >
            <span className="text-[#D5DCEA] font-semibold">Level 3</span>
            <span className="w-4  h-4  mr-1 mb-1">
              {openLevel === 3 ? (
                <Icon
                  className="-rotate-180 w-5 h-5 text-[#D5DCE9]"
                  name={"arrowDown"}
                />
              ) : (
                <Icon className=" text-[#D5DCE9] w-5 h-5" name={"arrowDown"} />
              )}
            </span>
          </button>
          {openLevel === 3 && (
            <div className="w-full border-t-[2px] border-[#2F4652]  mx-auto bg-[#213843] text-white rounded-md p-4">
              {/* Title */}
              <h2 className="text-xl font-semibold mb-[2px]">Verification</h2>
              <p className="text-[rgb(213,220,235)] ">
                Please upload your proof of address. All documents must be
                laying on a flat surface with all 4 corners inside the frame.
                All information should be clear and identifiable.
              </p>

              {/* Alert Box */}
              <div className="mt-4 border-2 border-dashed border-[#ff9d00] bg-[#0F212E] rounded-md p-3 text-[#ff9d00] flex items-center gap-2">
                <span><svg
                  data-ds-icon="Caution"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="inline-block shrink-0 mt-1 ml-1 mb-1"
                >
                  <path
                    fill="#ff9d00"
                    d="M21.78 19.04 13.83 3.13c-.75-1.51-2.91-1.51-3.66 0l-7.95 15.9c-.68 1.36.31 2.96 1.83 2.96h15.9c1.52 0 2.51-1.6 1.83-2.96zM11 7c0-.55.45-1 1-1s1 .45 1 1v7c0 .55-.45 1-1 1s-1-.45-1-1zm1 12c-.83 0-1.5-.67-1.5-1.5S11.17 16 12 16s1.5.67 1.5 1.5S12.83 19 12 19"
                  />
                </svg>
                </span>
                <span className="text-sm">Please complete level two verification first.</span>
              </div>

              {/* Proof of Address Upload */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-[#b1bad3]">
                  Proof of Address <span className="text-red-500">*</span>
                </label>

                {/* Accepted File Types Info */}
                <div className="mt-2 bg-[#2F4553] text-[#d5dceb] text-[16px] px-2 py-2 rounded-md mb-4">
                  Following file types are accepted:{" "}
                  <span className="font-semibold">.png, .jpg, .pdf</span>
                </div>

                {/* Upload Box */}
                {/* <label className="mt-4 block border-2 border-dashed border-gray-500 rounded-md h-40 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                  {file ? (
                    <p className="text-[16px]">{file.name}</p>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-10 bg-gray-600 rounded mb-2" />
                      <span className="bg-gray-700 px-3 py-1 rounded text-xs">
                        Upload Proof of Address
                      </span>
                    </div>
                  )}
                </label> */}
                <div

                  className=" disabled opacity-[.5]  flex flex-col items-center gap-3 p-6 bg-[#1D313D] border-2 border-dashed border-gray-500 rounded-md"
                >
                  {/* Icon Section */}
                  <div className="icon flex justify-center items-center ">

                    <img
                      src="/UploadFrontIcon.svg"
                      alt="QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Upload Button */}
                  <button
                    type="button"
                    tabIndex={0}
                    disabled
                    className="inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 
                   focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] 
                   bg-[#2f4553] text-white  hover:bg-gray-300 focus-visible:outline-white 
                   shadow-md py-[0.625rem] px-[1.25rem] "
                  >
                    Upload Proof of Address
                  </button>

                  {/* Hidden Input */}
                  <label className="inline-flex relative flex-col-reverse items-start text-sm text-gray-400">
                    <div className="input-wrap w-full">
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button className="mt-4 w-full opacity-[.5] bg-[#1475e1] hover:bg-blue-700 px-[20px] py-[10px] rounded-[8px] text-white font-medium">
                Submit
              </button>
            </div>
          )}
        </div>

       {/* Level 4 */}
        <div className={'bg-[#213843] text-white rounded-md  font-["proxima-nova",ui-sans-serif,-apple-system,system-ui,sans-serif] '}>
          <button
            onClick={() => toggleLevel(4)}
            className="w-full flex justify-between items-center px-4 py-3 "
          >
            <span className="text-[#D5DCEA] font-semibold">Level 4</span>
            <span className="w-4  h-4 mr-1 mb-1">
              {openLevel === 4 ? (
                <Icon
                  className=" -rotate-180 w-5 h-5 text-[#D5DCE9]"
                  name={"arrowDown"}
                />
              ) : (
                <Icon className=" text-[#D5DCE9] w-5 h-5" name={"arrowDown"} />
              )}
            </span>
          </button>
          {openLevel === 4 && (
            <div className="w-full border-t-[2px] border-[#2F4652]  mx-auto bg-[#213843] text-white rounded-md p-4">
              {/* Title */}
              <h2 className="text-xl font-semibold mb-[2px]">Verification</h2>
              <p className="text-[rgb(213,220,235)] ">
                Please upload supporting documentation for your Source of Funds. Document laying on a flat surface must show all 4 corners and all information should be clear and identifiable.
              </p>

              {/* Alert Box */}
              <div className="mt-4 border-2 border-dashed border-[#ff9d00] bg-[#0F212E] rounded-md p-3 text-[#ff9d00] flex items-center gap-2">
                <span><svg
                  data-ds-icon="Caution"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="inline-block shrink-0 mt-1 ml-1 mb-1"
                >
                  <path
                    fill="#ff9d00"
                    d="M21.78 19.04 13.83 3.13c-.75-1.51-2.91-1.51-3.66 0l-7.95 15.9c-.68 1.36.31 2.96 1.83 2.96h15.9c1.52 0 2.51-1.6 1.83-2.96zM11 7c0-.55.45-1 1-1s1 .45 1 1v7c0 .55-.45 1-1 1s-1-.45-1-1zm1 12c-.83 0-1.5-.67-1.5-1.5S11.17 16 12 16s1.5.67 1.5 1.5S12.83 19 12 19"
                  />
                </svg>
                </span>
                <span className="text-sm">Please complete level two verification first.</span>
              </div>

              {/* Source of Fundss Upload */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-[#b1bad3]">
                  Source of Funds <span className="text-red-500">*</span>
                </label>

                {/* Accepted File Types Info */}
                <div className="mt-2 bg-[#2F4553] text-[#d5dceb] text-[16px] px-2 py-2 rounded-md mb-4">
                  Following file types are accepted:{" "}
                  <span className="font-semibold">.png, .jpg, .pdf</span>
                </div>

                {/* Upload Box */}

                <div

                  className=" disabled opacity-[.5]  flex flex-col items-center gap-3 p-6 bg-[#1D313D] border-2 border-dashed border-[#b1bad3] rounded-md"
                >
                  {/* Icon Section */}
                  <div className="icon flex justify-center items-center ">

                    <img
                      src="/UploadFrontIcon.svg"
                      alt="QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Upload Button */}
                  <button
                    type="button"
                    tabIndex={0}
                    disabled
                    className="inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 
                   focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] 
                   bg-[#2f4553] text-white  hover:bg-gray-300 focus-visible:outline-white 
                   shadow-md py-[0.625rem] px-[1.25rem] "
                  >
                    Upload Source of Funds
                  </button>

                  {/* Hidden Input */}
                  <label className="inline-flex relative flex-col-reverse items-start text-sm text-gray-400">
                    <div className="input-wrap w-full">
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button className="mt-4 w-full opacity-[.5] bg-[#1475e1] hover:bg-blue-700 px-[20px] py-[10px] rounded-[8px] text-white font-medium">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
