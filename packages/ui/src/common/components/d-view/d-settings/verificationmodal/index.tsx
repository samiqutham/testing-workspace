"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@workspace/ui/icons/icons";
import MLoginHeader from "../../../m-view/m-login-header/index";
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
type VerificationModalProps = {
  onClose: () => void;
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 0 },
};

const VerificationModal = ({ onClose }: VerificationModalProps) => {
  const [email] = useState("bolypuryfu@mailinator.com");
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verification submitted:", { email, code });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="md:bg-[rgba(0,0,0,0.7)] fixed inset-0 z-[99999] md:flex items-center justify-center md:p-4"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="flex flex-col rounded-[4px] md:overflow-hidden md:max-w-[630px] bg-[#0f212e] md:max-h-[716px] md:h-full md:w-full"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <MLoginHeader onClose={onClose} />

          {/* Body */}
          <div className="p-6 flex flex-col gap-4 flex-1 overflow-y-auto">
            <h2 className="text-white font-bold text-[20px]">Confirm Your Email</h2>
            <span className="text-[#b1bad3] text-base">
              Please check your email for the verification code we sent and
              enter it in the form below to confirm your email address.
            </span>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 flex-1"
            >
              {/* Email */}
              <label className="flex flex-col gap-1 text-sm font-semibold text-[#b1bad3]">
                <span className="flex items-center gap-1">
                  Email <span className="text-[#ed4163]">*</span>
                </span>
                <input
                  type="text"
                  name="email"
                  value={email}
                  readOnly
                  className="w-full bg-[#0f212e] border-2 border-[#2f4553] rounded-[4px] p-2 text-white text-sm font-semibold"
                />
              </label>

              {/* Email Code */}
              <label className="flex flex-col gap-1 text-sm font-semibold text-[#b1bad3]">
                <span className="flex items-center gap-1">
                  Email Code <span className="text-[#ed4163]">*</span>
                </span>
                <div className="flex">
                  <input
                    type="text"
                    name="emailCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 bg-[#0f212e] border-2 border-[#2f4553] rounded-l-[4px] p-2 text-white text-sm font-semibold"
                  />
                  <button
                    type="button"
                    className="bg-[#2f4553] px-3 flex items-center justify-center rounded-r-[4px] hover:bg-[#3a5a6b]"
                  >
                    <CopyIcon />
                  </button>
                </div>
              </label>

              {/* Resend aligned right */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-white font-semibold hover:underline"
                  onClick={() => console.log("Resend email")}
                >
                  Resend email
                </button>
              </div>

              {/* Submit pinned bottom */}
              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={!code}
                  className={`w-full inline-flex justify-center rounded-[4px] font-semibold whitespace-nowrap transition disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 text-sm py-2.5 px-5 min-w-[12ch] ${
                    !code ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VerificationModal;
