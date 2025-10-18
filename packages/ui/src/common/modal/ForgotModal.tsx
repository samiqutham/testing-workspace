"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, AlertCircle } from "lucide-react";
import { useToast } from "@workspace/ui/common/toast/toast-context";

type ForgotPasswordModalProps = {
  onClose: () => void;
  onBackToLogin: () => void;
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { y: 30, opacity: 1 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 1 },
};

const ForgotPasswordModal = ({
  onClose,
  onBackToLogin,
}: ForgotPasswordModalProps) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "email") {
      if (!value) {
        error = "Email is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
      }
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: { email?: string } = {
      email: validateField("email", email),
    };
    setErrors(newErrors);
    setTouched({ email: true });

    if (!newErrors.email) {
      setIsLoading(true);

      setTimeout(() => {
        console.log("Form submitted", { email });

        setIsLoading(false);

        showToast(
          "success",
          "Password Reset Email Sent",
          `We have sent an account recovery email to ${email}.`
        );

        setTimeout(() => {
          onClose();
        }, 100);
      }, 2500);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="md:bg-[rgba(0,0,0,0.7)] fixed inset-0 z-[99999] md:flex items-center justify-center md:p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => !isLoading && handleClose()}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex flex-col rounded-[4px] md:overflow-hidden md:max-w-[630px] bg-[#0f212e] md:max-h-[716px] md:h-full md:w-full"
            variants={modal}
            initial="hidden"
            animate="visible"
            onClick={(e) => e.stopPropagation()}
            exit="exit"
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between p-4 bg-[#0f212e] border-b border-[#1a2c38]">
              <div className="flex items-center gap-2">
                <Settings width={18} height={18} className="text-white" />
                <h2 className="text-white text-lg font-medium">
                  Forgot Password
                </h2>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="text-gray-400 hover:text-white transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X width={20} height={20} />
              </button>
            </div>
            <div className="wrapper pt-0 p-4 flex flex-col gap-4 h-[calc(100dvh-60px)] md:h-full md:overflow-y-auto [scrollbar-width:none]">
              <div className="flex flex-col flex-1 mt-[23px]">
                <div className="flex-1 items-end flex flex-col justify-between">
                  <div className="flex flex-col gap-4 md:gap-[16px] w-full">
                    <div className="flex flex-col gap-[5px]">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-[rgb(177,186,211)] leading-[1] overflow-hidden top-[1px] relative"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        autoComplete="off"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        className={`w-full bg-[rgb(15,33,46)] border-2 h-[41px] ${
                          errors.email
                            ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                            : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
                        } transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                      {touched.email && errors.email && (
                        <span className="text-[#f2708a] text-xs flex gap-2 items-center">
                          <AlertCircle
                            className="relative"
                            width={12}
                            height={12}
                            fill="#f2708a"
                          />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="md:mt-4 inline-flex relative items-center gap-2 justify-center rounded-[2px] font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[rgb(20,117,225)] text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-base leading-none shadow-md py-[1.125rem] px-[1.75rem] min-w-[12ch] w-full cursor-pointer mb-[1px]"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <div className="contents">Recover Password</div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ForgotPasswordModal;
