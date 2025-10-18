"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Icon from "@workspace/ui/icons/icons";
import { motion, AnimatePresence } from "framer-motion";
import MLoginHeader from "@workspace/ui/common/components/m-view/m-login-header/index";
import MLoginFooter from "@workspace/ui/common/components/m-view/m-login-footer/index";
import { useAppStore } from "@workspace/ui/store/store";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { useToast } from "@workspace/ui/common/toast/toast-context";

type LoginModalProps = {
  onClose: () => void;
  onForgotPassword: () => void;
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

const LoginModal = ({ onClose, onForgotPassword }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const setIsRegisterOpen = useAppStore((state) => state.setIsRegisterOpen);
  const setIsLoginOpen = useAppStore((state) => state.setIsLoginOpen);
  const setAuthUser = useAppStore((state) => state.setAuthUser); 

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const { showToast } = useToast();

  //

  useEffect(() => {
    const storedValue = localStorage.getItem("registerModal");
    if (storedValue === "true") {
      setIsRegisterOpen(true);
    }
  }, [setIsRegisterOpen]);

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    localStorage.setItem("registerModal", "true");
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "email" && (!value || value.length < 3)) {
      error = "Minimum character length is 3";
    }
    if (name === "password" && (!value || value.length < 6)) {
      error = "Password must be at least 6 characters";
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
    if (name === "password") setPassword(value);
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate first
    const newErrors: { email?: string; password?: string } = {
      email: validateField("email", email),
      password: validateField("password", password),
    };
    setErrors(newErrors);
    setTouched({ email: true, password: true });

    // stop if validation fails
    if (newErrors.email || newErrors.password) return;

    // always show logs and attempt API
    console.log("Attempting login with payload:", {
      email,
      password,
    });

    const trimmedEmail = email.trim();

    const payload = {
      identifier: trimmedEmail,
      password: password.trim(),
    };

    runtimeApiService
      .login(payload)
      .then((response) => {
        console.log("Login API response:", response);

        if (response?.data?.accessToken || response?.token) {
          const token = response?.data?.accessToken || response?.token;
          localStorage.setItem("authToken", token);
          
          // ✅ SET AUTH STATE TO TRUE
          setAuthUser(true);
          const successMessage = response?.meta?.message || "Login Successful";
          showToast("success", "Success", successMessage);
          onClose();
        } else {
          const message = response?.meta?.message || "Login successful, but no token found.";
          showToast("error", "Oops!", message);
        }
      })
      .catch((error) => {
        console.error("Login API error:", error);

        const errMsg =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.";

        showToast("error", "Login Failed", errMsg);
      })
      .finally(() => {
        console.log("Login API call finished (success or fail).");
      });
  };

  return (
    <AnimatePresence>
      <motion.div
        key={"login-modal"}
        className="md:bg-[rgba(0,0,0,0.7)] fixed inset-0 z-[99999] md:flex items-center justify-center md:p-4 drawer"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={() => onClose()}
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
          <MLoginHeader onClose={onClose} />
          <div className="wrapper pt-0 p-4 flex flex-col gap-4 h-[calc(100dvh-60px)] md:h-full md:overflow-y-auto [scrollbar-width:none]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 mt-[23px]"
            >
              <div className="flex-1 items-end flex flex-col justify-between">
                <div className="flex flex-col gap-4 md:gap-[16px] w-full">
                  <div className="flex flex-col gap-[5px]">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-[rgb(177,186,211)] leading-[1] overflow-hidden top-[1px] relative"
                    >
                      Email or Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-[rgb(15,33,46)] border-2 h-[41px] ${
                        errors.email
                          ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                          : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
                      } transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none`}
                    />
                    {touched.email && errors.email && (
                      <span className="text-[#f2708a] text-xs flex gap-2 items-center">
                        <Icon
                          name={"Alert"}
                          className="relative"
                          width={12}
                          height={12}
                          fill="#f2708a"
                        />
                        <span>{errors.email}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-[4px]">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-[rgb(177,186,211)] leading-[1] overflow-hidden"
                    >
                      Password <span className="text-[#f2708a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-[rgb(15,33,46)] border-2 h-[41px] ${
                          errors.password
                            ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                            : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
                        } rounded-[4px] p-2 text-white transition-all hover:border-[rgb(85,112,134)] text-sm font-semibold focus:outline-none pr-12 min-h-[41px]`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white py-2 px-4"
                      >
                        {showPassword ? (
                          // <EyeOff className="cursor-pointer" size={18} />
                          <Icon name={"loginHideEye"} width={18} height={18} />
                        ) : (
                          // <Eye className="cursor-pointer" size={18} />
                          <Icon name={"loginOpenEye"} width={18} height={18} />
                        )}
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <span className="text-[#f2708a] text-xs flex gap-2 items-center">
                        <Icon
                          name={"Alert"}
                          className="relative"
                          width={12}
                          height={12}
                          fill="#f2708a"
                        />
                        <span>{errors.password}</span>
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="md:mt-4 inline-flex relative  items-center gap-2 justify-center rounded-[2px] font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[rgb(20,117,225)] text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-base leading-none shadow-md py-[1.125rem] px-[1.75rem] min-w-[12ch] w-full cursor-pointer mb-[1px]"
                >
                  <div className="contents">Sign in</div>
                </button>
              </div>
            </form>
            <MLoginFooter />
            <button
              onClick={onForgotPassword}
              type="button"
              className="inline-flex text-center relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-none text-sm leading-none ring-offset-background [&_svg]:text-grey-200 [&:hover>svg]:text-white cursor-pointer mb-[1px]"
            >
              Forgot Password
            </button>
            <div className="flex flex-col gap-[0.75rem] touch-auto">
              <span className="text-[#b1bad3] text-center text-sm font-normal touch-auto">
                Don’t have an account?&nbsp;
                <button
                  onClick={() => {
                    setIsLoginOpen(false);
                    openRegisterModal();
                  }}
                  type="button"
                  className="ring-offset-background inline-flex items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-none text-sm leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white cursor-pointer relative bottom-[0.5px]"
                >
                  Register an Account
                </button>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
