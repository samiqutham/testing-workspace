
"use client";
import { useState } from "react";
import { Eye, EyeOff,  } from "lucide-react";
import Icon from "@workspace/ui/icons/icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";


const EyeIcon = ({ visible }: { visible: boolean }) =>
  visible ? (
    <EyeOff className="cursor-pointer" size={18} />
  ) : (
    <Eye className="cursor-pointer" size={18} />
  );

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
    ></path>
    <path
      fill="currentColor"
      d="M22 4v10c0 1.1-.9 2-2 2h-2v-6c0-2.21-1.79-4-4-4H8V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
    ></path>
  </svg>
);

const Security = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState("");
  const [tfaCode, setTfaCode] = useState("");
  const [showTfaPassword, setShowTfaPassword] = useState(false);
  const [secretKey] = useState("I5RTCVRKONIDKOKRJYF23U...");
const [affiliateLink] = useState("stake.com/?c=SEUEkrD");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };
  // Sessions data - reduced to 4-5 items per filter
  const sessionsData = [
    {
      id: 1,
      browser: "Chrome (Windows PC)",
      location: "IN, Pune",
      ipAddress: "103.247.19.87",
      lastUsed: "26 minutes ago",
      status: "current",
    },
    {
      id: 2,
      browser: "Chrome (Mac)",
      location: "CA, Toronto",
      ipAddress: "104.28.216.220",
      lastUsed: "59 minutes ago",
      status: "active",
    },
    {
      id: 3,
      browser: "Safari (iPhone)",
      location: "IN, Mumbai",
      ipAddress: "3.111.169.223",
      lastUsed: "4 days ago",
      status: "active",
    },
    {
      id: 4,
      browser: "Chrome (Android)",
      location: "IN, Mumbai",
      ipAddress: "3.111.169.223",
      lastUsed: "8 days ago",
      status: "active",
    },
    {
      id: 5,
      browser: "Chrome (Mac)",
      location: "CA, Toronto",
      ipAddress: "104.28.216.220",
      lastUsed: "1 day ago",
      status: "removed",
    },
    {
      id: 6,
      browser: "Firefox (Windows)",
      location: "IN, Delhi",
      ipAddress: "157.32.45.123",
      lastUsed: "3 days ago",
      status: "removed",
    },
    {
      id: 7,
      browser: "Chrome (Mac)",
      location: "IN, Mumbai",
      ipAddress: "3.111.169.223",
      lastUsed: "15 days ago",
      status: "removed",
    },
    {
      id: 8,
      browser: "Edge (Windows)",
      location: "UK, London",
      ipAddress: "185.199.108.153",
      lastUsed: "20 days ago",
      status: "removed",
    },
  ];

  const [sessionFilter, setSessionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSessions = sessionsData.filter((session) => {
    if (sessionFilter === "all") return true;
    if (sessionFilter === "active")
      return session.status === "active" || session.status === "current";
    if (sessionFilter === "inactive") return session.status === "removed";
    return true;
  });

  const totalResults = filteredSessions.length;
  const resultsPerPage = 8; // Since we have 8 items total
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleRemoveSession = (sessionId: number) => {
    console.log(`Remove session ${sessionId}`);
  };

  const renderActionCell = (session: any) => {
    if (session.status === "current") {
      return <span className="text-white font-semibold">Current</span>;
    }

    if (session.status === "removed") {
      return <span className="text-[#b1bad3] font-semibold">Removed</span>;
    }

    return (
      <button
        type="button"
        onClick={() => handleRemoveSession(session.id)}
        className="inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm"
      >
        <span className="text-[#ed4163] font-semibold">Remove Session</span>
      </button>
    );
  };

  const handleCopySecretKey = async () => {
    try {
      await navigator.clipboard.writeText(secretKey);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password change submitted", {
      oldPassword,
      newPassword,
      confirmPassword,
    });
  };

  const handleTfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("TFA setup submitted", { password, tfaCode });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* PASSWORD SECTION */}
      <div className="rounded-md border border-[#2f4553] bg-[#1a2c38] pt-8">
        <div className="px-6">
          <h3 className="text-white text-[20px] font-bold">Password</h3>
        </div>

        <div className="flex flex-col mt-6 px-6 gap-6 max-w-[420px]">
          {/* Old Password */}
          <label className="inline-flex relative flex-col-reverse items-start w-full">
            <div className="flex w-full shadow rounded-md">
              <div className="relative flex grow w-full">
                <input
                  className="bg-[#0f212e] text-white p-2 border-2 border-[#2f4553] rounded-md focus:outline-0 w-full pr-12"
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white py-2 px-4"
                >
                  <EyeIcon visible={showOld} />
                </button>
              </div>
            </div>
            <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] pb-1 w-full">
              Old Password <span className="ml-1 text-[#ed4163]">*</span>
            </span>
          </label>

          {/* New Password */}
          <label className="inline-flex relative flex-col-reverse items-start w-full">
            <div className="flex w-full shadow rounded-md">
              <div className="relative flex grow w-full">
                <input
                  className="bg-[#0f212e] text-white p-2 border-2 border-[#2f4553] rounded-md focus:outline-0 w-full pr-12"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white py-2 px-4"
                >
                  <EyeIcon visible={showNew} />
                </button>
              </div>
            </div>
            <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] pb-1 w-full">
              New Password <span className="ml-1 text-[#ed4163]">*</span>
            </span>
          </label>

          {/* Confirm Password */}
          <label className="inline-flex relative flex-col-reverse items-start w-full">
            <div className="flex w-full shadow rounded-md">
              <div className="relative flex grow w-full">
                <input
                  className="bg-[#0f212e] text-white p-2 border-2 border-[#2f4553] rounded-md focus:outline-0 w-full pr-12"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white py-2 px-4"
                >
                  <EyeIcon visible={showConfirm} />
                </button>
              </div>
            </div>
            <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] pb-1 w-full">
              Confirm New Password{" "}
              <span className="ml-1 text-[#ed4163]">*</span>
            </span>
          </label>
        </div>

        <div className="mt-6 p-4 border-t border-[#2f4553] flex justify-end">
          <button
            type="button"
            onClick={handlePasswordSubmit}
            className="py-2.5 px-5 text-black opacity-50 bg-[#00e701] min-w-[12ch] rounded-md shadow-md font-semibold "
          >
            Save
          </button>
        </div>
      </div>

      {/* TWO FACTOR SECTION */}
      <div className="rounded-md border border-[#2f4553] bg-[#1a2c38] pt-8">
        <div className="px-6">
          <h3 className="text-white text-[20px] font-bold">Two Factor</h3>
        </div>

        <div className="px-6 mt-4 text-[#d5dceb]">
          To keep your account secure, enable two factor authentication by
          following the process below.
        </div>

        <hr className="my-4 border-[#2f4553]" />

        <div className="px-6 flex flex-col gap-4 max-w-[420px]">
          <span className="text-[#d5dceb] font-semibold">
            Scan the QR code or manually enter the key into your authenticator
            app to link your account.
          </span>

          {/* QR + Code */}
          <div className="flex flex-col gap-3">
       
             <div className="bg-white p-2 w-[128px] h-[128px] rounded flex items-center justify-center">
  <img
    src="/QRcode.png"   
    alt="QR Code"
    className="w-full h-full object-contain"
  />
</div>
            {/* <div className="flex items-center gap-0">
              <input
                readOnly
                value={secretKey}
                className="bg-[#2f4553] text-white p-2 border border-[#2f4553] rounded-md w-full border-r-0 rounded-r-none 
             focus:outline-none focus:ring-0 focus:border-[#2f4553]"
              />

              <button
                type="button"
                onClick={handleCopySecretKey}
                className="bg-[#2f4553]  text-white p-2 rounded-md hover:bg-[#3a5a6b] border-2 border-[#2f4553] rounded-l-none border-l-0 h-[42px] flex items-center justify-center"
              >
                <CopyIcon />
              </button>
            </div> */}
            <div className="flex w-full relative">
  <label className="flex-grow inline-flex relative flex-col-reverse items-start font-normal text-base leading-6 font-proxima-nova" >
    
    <div className="flex w-full flex-shrink-0 shadow-[0_1px_3px_0_rgba(0,0,0,0.2),_0_1px_2px_0_rgba(0,0,0,0.12)] rounded-md">
    
       <TooltipProvider>
      <Tooltip open={copied}>
        {/*  TooltipTrigger only wraps the button for perfect positioning */}
        <div className="relative flex-grow w-full flex">
          <input
            type="text"
            value={affiliateLink}
            readOnly
            className="flex-1 bg-[#2f4553] border-2 border-[#2f4553] rounded-l-md p-2 text-white text-sm font-semibold"
          />

          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-[#2f4553] px-3 flex items-center justify-center rounded-r-md hover:bg-[#3a5a6b]"
            >
              <CopyIcon />
            </button>
          </TooltipTrigger>
        </div>
    {/*  Tooltip content — clean shadcn styling */}
        <TooltipContent
          side="top"
          align="center"
          sideOffset={6}
          className="bg-white text-[#0F212E] text-sm font-medium px-3 py-1.5 rounded-md shadow-md"
        >
          Copied!
          {/* <TooltipArrow className="fill-white stroke-[#d1d5db]" /> */}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    </div>
   

    <span className="inline-flex items-center font-semibold text-sm w-full justify-between pt-1">
      <div className="inline-flex w-full">
        <span className="font-semibold text-sm font-proxima-nova">Code</span>
      </div>
    </span>
  </label>
</div>


          </div>

          <span className="text-[#d5dceb] font-semibold">
            Complete the setup by entering the 6-digit code from your
            authenticator app.
          </span>

          {/* Password */}
          <label className="inline-flex relative flex-col-reverse items-start w-full">
            <div className="flex w-full shadow rounded-md">
              <div className="relative flex grow w-full">
                <input
                  className="bg-[#0f212e] text-white p-2 border-2 border-[#2f4553] rounded-md focus:outline-0 w-full pr-12"
                  type={showTfaPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowTfaPassword(!showTfaPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white py-2 px-4"
                >
                  <EyeIcon visible={showTfaPassword} />
                </button>
              </div>
            </div>
            <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] pb-1 w-full">
              Password <span className="ml-1 text-[#ed4163]">*</span>
            </span>
          </label>

          {/* Two Factor Code */}
          <label className="inline-flex relative flex-col-reverse items-start w-full">
            <div className="flex w-full shadow rounded-md">
              <input
                className="bg-[#0f212e] text-white p-2 border-2 border-[#2f4553] rounded-md focus:outline-0 w-full"
                type="text"
                value={tfaCode}
                onChange={(e) => setTfaCode(e.target.value)}
                maxLength={6}
              />
            </div>
            <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] pb-1 w-full">
              Two Factor Code <span className="ml-1 text-[#ed4163]">*</span>
            </span>
          </label>
        </div>

        <div className="mt-6 p-4 border-t border-[#2f4553] flex justify-end">
          {/* opacity-50 */}
          <button
            type="button"
            onClick={handleTfaSubmit}
            className="py-2.5 px-5 text-black bg-[#00e701] min-w-[12ch] rounded-md shadow-md font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
      {/* PASSKEYS SECTION */}
      <div className="rounded-md border border-[#2f4553] bg-[#1a2c38] pt-8">
        {/* Info Banner */}
        <div className="mx-6 mb-6 bg-[#0f212e] border-[2px] border-dashed border-gray-400 rounded-md p-4 flex items-start gap-3">
          <svg
            data-ds-icon="Info"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="inline-block shrink-0  mt-0.5"
          >
            <path
              fill="currentColor"
              d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10v2l3.54-2.66C19.31 18.91 22 15.27 22 11c0-5.52-4.48-10-10-10m-.5 3c.83 0 1.5.67 1.5 1.5S12.33 7 11.5 7 10 6.33 10 5.5 10.67 4 11.5 4M15 17H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-5H9c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1v6h2c.55 0 1 .45 1 1s-.45 1-1 1"
            ></path>
          </svg>
          <div className="flex flex-col">
            <span className="text-[#b1bad3] font-bold text-base">Enable 2FA</span>
            <span className="text-[#b1bad3] text-sm">
              In order for you to create a passkey you will have to enable 2FA
            </span>
          </div>
        </div>

        <div className="px-6">
          <h3 className="text-white text-[20px] font-bold flex items-center">
            Passkeys (0/10)
          </h3>
        </div>

        <div className="px-6 mt-4 text-[#d5dceb] text-[16px]">
          <span>
            With passkeys you don't need to remember complex passwords. Learn
            more about passkeys in the{" "}
            <a
              className=" relative inline-flex items-center gap-1 justify-center rounded-md font-thick whitespace-nowrap text-sm text-white bg-transparent hover:text-white hover:bg-transparent focus-visible:outline-none ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] no-underline [&_svg]:text-gray-400 [&:hover>svg]:text-white font-proxima-nova "
              href="https://help.stake.com/en/articles/11872129-how-to-use-passkeys-at-stake-com"
              target="_blank"
              rel="external noreferrer noopener"
            >
              Help Centre
             <svg data-ds-icon="External" width="20" height="20" viewBox="0 0 24 24" fill="none" className="inline-block shrink-0">
    <path fill="currentColor" d="M20 13.4c-.55 0-1 .45-1 1v4c0 .33-.27.6-.6.6H5.6c-.33 0-.6-.27-.6-.6V5.6c0-.33.27-.6.6-.6h4.8c.55 0 1-.45 1-1s-.45-1-1-1H5.6C4.17 3 3 4.17 3 5.6v12.8C3 19.83 4.17 21 5.6 21h12.8c1.43 0 2.6-1.17 2.6-2.6v-4c0-.55-.45-1-1-1"></path>
    <path fill="currentColor" d="M14.4 3c-.55 0-1 .45-1 1s.45 1 1 1h3.19L8.1 14.49a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l9.49-9.49V9.6c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1z"></path>
  </svg>
            </a>
          </span>
        </div>

        <hr className="my-4 border-[#2f4553]" />

        {/* Passkeys Table */}
        <div className="px-6 overflow-x-auto ">
          <div className="table-wrapper scrollbar-hidden overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className=" border-[#2f4553]">
                  <th className="py-3 px-4 text-left text-[#b1bad3] font-semibold text-base">
                    Authenticator
                  </th>
                  <th className="py-3 px-4 text-left text-[#b1bad3] font-semibold text-sm">
                    Created on
                  </th>
                  <th className="py-3 px-4 text-left text-[#b1bad3] font-semibold text-sm">
                    Device
                  </th>
                  <th className="py-3 px-4 text-left text-[#b1bad3] font-semibold text-sm">
                    Last Used
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="animate-slideDownOdd">
                  <td
                    colSpan={4}
                    className="py-4 px-4 text-[#b1bad3] text-base bg-[#17313f] rounded-md"
                  >
                    You have not set any passkeys.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 border-t border-[#2f4553] flex justify-between items-center">
          <div></div>
          <button
            type="button"
            disabled
            className="py-2.5 px-5 text-black bg-[#00e701] min-w-[12ch] rounded-md shadow-md font-semibold opacity-50 cursor-not-allowed"
          >
            Create Passkey
          </button>
        </div>
      </div>

      {/* SESSIONS SECTION */}
      <div className="rounded-md border border-[#2f4553] bg-[#1a2c38] pt-8">
        <div className="px-6">
          <h3 className="text-white text-[20px] font-bold mb-4">Sessions</h3>
          <span className="text-[#d5dceb] text-sm">
            Track and manage your Stake sessions.
          </span>
        </div>

        <hr className="my-4 border-[#2f4553]" />

        {/* Filter */}
        <div className="px-6 mb-6">
          <label className="inline-flex relative flex-col-reverse items-start ">
            <div className="relative w-full">
              <select
                className="bg-[#0f212e] text-white p-2 border-2 border-[#2f4553] rounded-md focus:outline-0 w-full appearance-none pr-10"
                value={sessionFilter}
                onChange={(e) => setSessionFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  data-ds-icon="ChevronDown"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="inline-block shrink-0 text-[#b1bad3]"
                >
                  <path
                    fill="currentColor"
                    d="M17.293 8.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6-.068-.076A1 1 0 0 1 6.63 8.225l.076.068L12 13.586z"
                  ></path>
                </svg>
              </div>
            </div>
            <span className="inline-flex items-center font-bold text-sm text-[#b1bad3] pb-1 w-full">
              Session Filter
            </span>
          </label>
        </div>

        {/* Table */}
        <div className="px-6">
          <div className="overflow-x-auto scrollbar-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2f4553]">
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    Browser
                  </th>
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    Near
                  </th>
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    IP Address
                  </th>
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    Last Used
                  </th>
                  <th className="text-left px-3 lg:px-6 py-3 text-[#b1bad3] font-semibold text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session, index) => (
                  <tr
                    key={session.id}
                    className={`border-[#2f4553] hover:bg-[#1a2c38]/50 ${
                      index % 2 === 1 ? "bg-[#17313f]" : ""
                    }`}
                  >
                    <td className="px-3 lg:px-6 py-4">
                      <div className="text-[#b1bad3] text-[14px]">
                        {session.browser}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="text-[#b1bad3] text-[14px]">
                        {session.location}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="text-[#b1bad3] text-[14px]">
                        {session.ipAddress}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="text-[#b1bad3] text-[14px]">
                        {session.lastUsed}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-sm">
                      {renderActionCell(session)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer with Pagination */}
        <div className="mt-6 p-4 border-t border-[#2f4553] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Results text — stays left on desktop, goes bottom on mobile */}
          <span className="text-[#d5dceb] text-sm text-center md:text-left order-2 md:order-none">
            {totalResults} results | Page {currentPage}
          </span>

          {/* Buttons — stays right on desktop, goes top on mobile */}
          <div className="flex justify-center md:justify-end order-1 md:order-none">
            <div className="flex flex-row gap-4">
              <button
                type="button"
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#556b7d] text-white hover:bg-[#6b8299] focus-visible:outline-white text-sm shadow-md py-2.5 px-5 disabled:bg-gray-500"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[#556b7d] text-white hover:bg-[#6b8299] focus-visible:outline-white text-sm shadow-md py-2.5 px-5 disabled:bg-gray-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
