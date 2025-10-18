"use client";

import Icon from "@workspace/ui/icons/icons";
import MLoginHeader from "@workspace/ui/common/components/m-view/m-login-header/index";
import MLoginFooter from "@workspace/ui/common/components/m-view/m-login-footer/index";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, Divide, Eye, EyeOff } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import "./registerModal.css";
import { useAppStore } from "@workspace/ui/store/store";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { useToast } from "@workspace/ui/common/toast/toast-context";
import { COUNTRIES } from "@workspace/ui/lib/project-data";
const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}
interface GoogleTranslationConfig {
  languages: LanguageDescriptor[];
  defaultLanguage: string;
  countryLanguages: Record<string, string>; // <-- add this
}
const translationConfig =
  globalThis.__GOOGLE_TRANSLATION_CONFIG__ as GoogleTranslationConfig;

type RegisterModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

type Errors = {
  email?: string;
  password?: string;
  username?: string;
  date?: string;
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

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [loader, setLoader] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>("English");
  const [currentLanguage, setCurrentLanguage] = useState<any>([]);
  const setIsRegisterOpen = useAppStore((state) => state.setIsRegisterOpen);
  const setIsLoginOpen = useAppStore((state) => state.setIsLoginOpen);
  const [readPrivacy, setReadPrivacy] = useState(false);
  const { showToast } = useToast();

  // Add these state variables after your existing states
  // const [emailValidation, setEmailValidation] = useState<{
  //   isValid: boolean | null;
  //   message: string;
  //   loading: boolean;
  // }>({ isValid: null, message: "", loading: false });

  // const [usernameValidation, setUsernameValidation] = useState<{
  //   isValid: boolean | null;
  //   message: string;
  //   loading: boolean;
  // }>({ isValid: null, message: "", loading: false });
  interface ValidationState {
    isValid: boolean | null;
    message: string;
    loading: boolean;
  }

  const emailAbortControllerRef = useRef<AbortController | null>(null);
  const usernameAbortControllerRef = useRef<AbortController | null>(null);

  const [emailValidation, setEmailValidation] = useState<ValidationState>({
    isValid: null,
    message: "",
    loading: false,
  });

  const [usernameValidation, setUsernameValidation] = useState<ValidationState>(
    {
      isValid: null,
      message: "",
      loading: false,
    }
  );

  // const debounce = (func: Function, delay: number) => {
  //   let timeoutId: NodeJS.Timeout;
  //   return (...args: any[]) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func(...args), delay);
  //   };
  // };
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Email validation API call
  const checkEmailAvailability = useCallback(
    debounce(async (email: string) => {
      if (email.length < 3) {
        setEmailValidation({ isValid: null, message: "", loading: false });
        return;
      }

      // Cancel previous request
      if (emailAbortControllerRef.current) {
        emailAbortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      emailAbortControllerRef.current = abortController;

      setEmailValidation((prev) => ({ ...prev, loading: true }));

      try {
        const response = await runtimeApiService.checkEmail({ email });

        // Check if request was cancelled
        if (!abortController.signal.aborted) {
          setEmailValidation({
            isValid: response.data.isValid,
            message: response.meta.message,
            loading: false,
          });
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Email validation error:", error);
          setEmailValidation({
            isValid: null,
            message: "",
            loading: false,
          });
        }
      }
    }, 300),
    []
  );

  // Username validation API call
  const checkUsernameAvailability = useCallback(
    debounce(async (username: string) => {
      if (username.length < 3) {
        setUsernameValidation({ isValid: null, message: "", loading: false });
        return;
      }

      // Cancel previous request
      if (usernameAbortControllerRef.current) {
        usernameAbortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      usernameAbortControllerRef.current = abortController;

      setUsernameValidation((prev) => ({ ...prev, loading: true }));

      try {
        const response = await runtimeApiService.checkUsername({ username });

        // Check if request was cancelled
        if (!abortController.signal.aborted) {
          setUsernameValidation({
            isValid: response.data.isValid,
            message: response.meta.message,
            loading: false,
          });
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Username validation error:", error);
          setUsernameValidation({
            isValid: null,
            message: "",
            loading: false,
          });
        }
      }
    }, 300),
    []
  );

  const [currentStep, setCurrentStep] = useState(1);
  async function getUserCountry(): Promise<string> {
    try {
      const res = await fetch(
        "https://pro.ip-api.com/json/?key=qSA5ctYZHdWsx04"
      );
      const data = await res.json();
      // console.log('User country code:', data.countryCode);

      const match = COUNTRIES.find((c) => c.code === data.countryCode);
      if (match) setPhoneCode(match.dial_code);

      return data.countryCode;
    } catch (err) {
      console.error("Failed to detect country", err);
      return "US";
    }
  }

  const handleSwitchToLogin = () => {
    // close Register
    onClose?.();
    setIsRegisterOpen(false);
    localStorage.removeItem("registerModal");

    // then open Login (next tick so animations don’t stack)
    setTimeout(() => setIsLoginOpen(true), 100);
  };

  function reorderLanguagesByCountry(
    languages: LanguageDescriptor[],
    countryCode: string
  ) {
    const defaultLang = translationConfig?.defaultLanguage || "en";
    const localLang = translationConfig?.countryLanguages[countryCode] || "";
    const english = languages?.find((l) => l.name === defaultLang);
    const local =
      localLang && localLang !== defaultLang
        ? languages?.find((l) => l.name === localLang)
        : null;
    const others = languages?.filter(
      (l) => l.name !== defaultLang && l.name !== localLang
    );
    return [english, local, ...(others?.length ? others : [])].filter(Boolean);
  }
  // ADD THIS NEW useEffect (keep your existing step change useEffect):
  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      emailAbortControllerRef.current?.abort();
      usernameAbortControllerRef.current?.abort();
    };
  }, []);
  //  Close on outside click
  useEffect(() => {
    // console.log("Translation config:", onClose);
    getUserCountry().then((countryCode) => {
      const reordered = reorderLanguagesByCountry(
        globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages,
        countryCode
      );
      setCurrentLanguage(reordered);
      // console.log('Reordered languages:', reordered);
    });
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];
    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }

    if (languageValue) {
      setSelectedLanguage(languageValue);
    }
  }, []);

  // const handleSelectLanguage = (name:any) => {
  //   setLoader(true);
  //   setTimeout(() => {
  //     setSelectedLanguage(name);
  //   const cookieValue = `/auto/${name}`;
  //    setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });
  //     window.location.reload();
  //     setLoader(false);
  //   }, 500);
  // };
  const handleSelectLanguage = (name: any) => {
    setLoader(true);
    setTimeout(() => {
      // Expire old googtrans cookie
      const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

      document.cookie = `googtrans=; ${expire}; path=/;`;
      document.cookie = `googtrans=; ${expire}; domain=.yourdesign.live; path=/;`;

      // Set new googtrans cookie
      const cookieValue = `/auto/${name}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; domain=.yourdesign.live; path=/;`;

      // Also store in your app’s cookie (if you want)
      setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });

      // Refresh to apply translation
      setLoader(false);
      window.location.reload();
    }, 500);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const [isPhone, setPhone] = useState(false);
  const [isReferral, setReferral] = useState(false);

  const toggleReferral = () => {
    setReferral((prev) => !prev);
  };
  const toggleRead = () => {
    setReadPrivacy((prev) => !prev);
  };

  const togglePhone = () => {
    setPhone((prev) => !prev);
  };

  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{
    email: boolean;
    password: boolean;
    username: boolean;
    date: boolean;
  }>({ email: false, password: false, username: false, date: false });
  const [attemptedStepTwo, setAttemptedStepTwo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setAuthUser = useAppStore((state) => state.setAuthUser);

  const validators: {
    [K in keyof Errors]-?: (v: string) => string | undefined;
  } = {
    email: (v) =>
      !v
        ? "Email is required"
        : v.length < 3
          ? "Minimum character length is 3"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            ? "Please enter a valid email address for bet confirmations and important account notifications!"
            : undefined,

    username: (v) =>
      !v || v.length < 3 ? "Minimum character length is 3" : undefined,

    password: (v) => {
      if (!v) return "Password is required";

      // ✅ Check all conditions in one place
      const strongPassword =
        v.length >= 8 && /[0-9]/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v);

      if (!strongPassword)
        return "Password must contain 8+ characters, numbers, and symbols to secure your betting account and winnings!";

      return undefined;
    },

    date: (v) => {
      if (!v) return "Date of birth is required";

      const birthDate = new Date(v);
      const today = new Date();
      const age =
        today.getFullYear() -
        birthDate.getFullYear() -
        (today <
        new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
          ? 1
          : 0);

      if (isNaN(birthDate.getTime())) return "Invalid date format";
      if (age < 18)
        return "Sports betting restricted to 18+ users only. Age verification protects minors and ensures legal compliance!";

      return undefined;
    },
  };

  const setFieldError = (field: keyof Errors, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
  };

  const hasError = (field: keyof Errors) =>
    Boolean((touched[field] || attemptedStepTwo) && errors[field]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 3) {
      const newErrors: Errors = {
        email: validators.email(email),
        date: validators.date(date),
        username: validators.username(username),
        password: validators.password(password),
      };
      setErrors(newErrors);

      const valid = Object.values(newErrors).every((v) => v === undefined);
      if (valid) {
        runtimeApiService
          .register({
            email,
            username,
            password,
            dob: date,
            language: selectedLanguage == "English" ? "en" : selectedLanguage,
          })
          .then((record) => {
            if (record) {
              const toastData = record?.meta?.message?.split(", ");
              showToast(
                toastData?.length ? toastData[0]?.slice(1, -1) : "",
                toastData?.length ? toastData[1]?.slice(1, -1) : "",
                toastData?.length ? toastData[2]?.slice(1, -1) : ""
              );
              const token = record?.data?.accessToken;
              if (token) {
                setTimeout(() => {
                  localStorage.setItem("authToken", token);
                  setAuthUser(true);
                  onClose();
                }, 1000);
              }
            } else {
              showToast(
                "error",
                "Registration Failed",
                "Something went wrong. Please try again."
              );
            }
          })
          .catch((error) => {
            console.error("Registration error:", error);

            showToast(
              "error",
              "Registration Failed",
              error?.message ||
                "Unable to register your account at the moment. Please try again later."
            );
          });

        console.log("Form submitted", { email, username, password, date });
      } else {
        Object.entries(newErrors).forEach(([key, value]) => {
          if (value) {
            showToast("error", "Invalid Input", `${value}`);
          }
        });
      }
    }
  };

  const validateStepTwo = () => {
    const newErrors: Errors = {
      email:
        validators.email(email) ||
        (!emailValidation.isValid ? emailValidation.message : undefined),
      date: validators.date(date),
      username: validators.username(username),
      password: validators.password(password),
    };
    console.log(newErrors, "000");
    setErrors(newErrors);

    // 🔔 Trigger toast for each invalid field
    Object.entries(newErrors).forEach(([key, value]) => {
      if (value) {
        if (key != "username") {
          showToast(
            key === "password" ? "warning" : "error",
            key === "password"
              ? "🔒 Password Security Check"
              : key === "date"
                ? "🎂 Age Verification Required"
                : emailValidation.message
                  ? "📧 Already Exsists"
                  : "📧 Email Format Invalid",
            `${value}`
          );
        }
      }
    });

    return Object.values(newErrors).every((v) => v === undefined);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="register-modal"
        className="md:bg-[rgba(0,0,0,0.7)] fixed inset-0 z-[9999] md:flex items-center justify-center md:p-4 drawer"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        onClick={() => onClose()}
        exit="exit"
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="flex flex-col md:rounded-sm md:overflow-hidden md:max-w-[630px] bg-[#0f212e] md:max-h-[716px] md:h-full md:w-full"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <MLoginHeader onClose={onClose} />
          <div className="wrapper pt-0 p-4 flex flex-col gap-4 h-[calc(100dvh-60px)] md:h-full overflow-y-auto [scrollbar-width:none] pb-[17px]">
            <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
              <div className="flex-1 items-end flex flex-col gap-4 justify-between">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex bg-[#0f212e] z-50 sticky top-0 flex-col left-4 right-4 gap-2">
                    <div className="pt-2 flex flex-col gap-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="bg-[rgb(0,231,1)] h-1 rounded-full"></div>
                        <div
                          className={`h-1 rounded-full  ${
                            currentStep == 2 || currentStep == 3
                              ? "bg-[rgb(0,231,1)]"
                              : "bg-[rgb(47,69,83)]"
                          }`}
                        ></div>
                        <div
                          className={`h-1 rounded-full  ${
                            currentStep == 3
                              ? "bg-[rgb(0,231,1)]"
                              : "bg-[rgb(47,69,83)]"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div
                      className={`text-end flex items-center justify-between h-[calc(.25rem*6)] ${
                        currentStep == 1 ? "justify-end" : ""
                      }`}
                    >
                      {currentStep != 1 ? (
                        <div
                          className="text-[rgb(177,186,211)] text-[14px] flex items-center gap-2"
                          onClick={() =>
                            setCurrentStep((prev) =>
                              prev > 1 ? prev - 1 : prev
                            )
                          }
                        >
                          <Icon
                            name={"arrow"}
                            width={14}
                            height={14}
                            fill="#B1BAD3"
                            className=" !w-[14px] !h-[14px] rotate-90"
                          ></Icon>
                          <span className="font-medium">Back </span>
                        </div>
                      ) : null}
                      <div className="text-[rgb(177,186,211)] text-[12px]">
                        Step {currentStep} / 3
                      </div>
                    </div>
                  </div>
                  {/* <div className="h-[44]"></div> */}
                  {currentStep === 1 ? (
                    <>
                      <h2 className="leading-[1.5] text-[#fff] font-semibold">
                        Select Your Preferred Language
                      </h2>

                      <span className="text-[rgb(177,186,211)] text-[14px]">
                        Stake is available is several languages. Feel free to
                        personalise your language across our site from the
                        options below.
                      </span>

                      <div translate="no" className="w-full relative">
                        <select
                          value={selectedLanguage}
                          onChange={(e) => handleSelectLanguage(e.target.value)}
                          className="py-[8.5px] appearance-none pr-[28px] w-full text-white bg-[#0E212E] border-2 rounded-[0.25rem] outline-none border-[#304553] cursor-pointer leading-[1.25rem] text-sm touch-auto shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.12)] pl-[8px]
                          font-semibold"
                        >
                          {currentLanguage.map((lang: any) => (
                            <option key={lang.name} value={lang.name}>
                              {lang.title}
                            </option>
                          ))}
                        </select>

                        {/* <select className="py-[8.5px] appearance-none pl-[7px] pr-[28px] w-full text-white bg-[#0E212E] border-2 rounded-[0.25rem] font-medium outline-none border-[#304553] cursor-pointer leading-[1.25rem] text-sm touch-auto shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.12)]">
                          <option>English</option>
                          <option>Español</option>
                          <option>日本語</option>
                          <option>中文</option>
                          <option>Português</option>
                        </select> */}

                        <Icon
                          name={"arrow"}
                          width={14}
                          height={14}
                          fill="#B1BAD3"
                          className=" !w-[14px] !h-[14px] rotate-0 absolute top-[13.5px] right-[8px]"
                        ></Icon>
                      </div>
                    </>
                  ) : null}
                  {currentStep === 2 ? (
                    <>
                      <h2 className="leading-[1.5] text-[#fff] font-semibold">
                        Create an Account
                      </h2>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="email-input"
                          className="text-sm font-medium text-[rgb(177,186,211)] leading-[1]"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="email-input"
                          autoComplete="off"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                            setFieldError("email", value);
                            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                              checkEmailAvailability(value);
                            } else {
                              setEmailValidation({
                                isValid: null,
                                message: "",
                                loading: false,
                              });
                            }
                          }}
                          onBlur={() =>
                            setTouched((t) => ({ ...t, email: true }))
                          }
                          // className={`w-full bg-[rgb(15,33,46)] border-2 ${
                          //   hasError("email")
                          //     ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                          //     : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
                          // } transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none`}
                          className={`w-full bg-[rgb(15,33,46)] border-2 ${
                            hasError("email")
                              ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                              : emailValidation.isValid === true
                                ? "border-[#00E701] hover:border-[#00E701] focus:border-[#00E701]"
                                : emailValidation.isValid === false
                                  ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                                  : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
                          } transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none`}
                        />
                        {/* {hasError("email") && (
                          <span className=" text-[#E56B84] text-xs flex gap-2 items-center">
                            <Icon
                              name={"Alert"}
                              className="relative"
                              width={12}
                              height={12}
                              fill="rgb(237,65,99)"
                            />
                            <span>{errors.email}</span>
                          </span>
                        )} */}
                        {/* Replace the current email error display section with this: */}
                        {/* Replace the entire email validation section with this: */}
                        {hasError("email") && (
                          <span className=" text-[#E56B84] text-xs flex gap-2 items-center">
                            <Icon
                              name={"Alert"}
                              className="relative"
                              width={12}
                              height={12}
                              fill="rgb(237,65,99)"
                            />
                            <span>{errors.email}</span>
                          </span>
                        )}
                        {emailValidation.message && !hasError("email") && (
                          <span
                            className={`text-xs flex gap-2 items-center ${
                              emailValidation.isValid
                                ? "text-[#00E701]"
                                : "text-[#E56B84]"
                            }`}
                          >
                            <Icon
                              name={emailValidation.isValid ? "Check" : "Alert"}
                              className="relative"
                              width={12}
                              height={12}
                              fill={
                                emailValidation.isValid
                                  ? "#00E701"
                                  : "rgb(237,65,99)"
                              }
                            />
                            <span>{emailValidation.message}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="username-input"
                          className="text-sm font-medium text-[rgb(177,186,211)] leading-[1]"
                        >
                          Username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          id="username-input"
                          name="username"
                          value={username}
                          onChange={(e) => {
                            const value = e.target.value;
                            setUsername(value);
                            setFieldError("username", value);

                            // Trigger username validation API when at least 3 characters
                            if (value.length >= 3) {
                              checkUsernameAvailability(value);
                            } else {
                              setUsernameValidation({
                                isValid: null,
                                message: "",
                                loading: false,
                              });
                            }
                          }}
                          onBlur={() =>
                            setTouched((t) => ({ ...t, username: true }))
                          }
                          // className={`w-full bg-[rgb(15,33,46)] border-2 ${
                          //   hasError("username")
                          //     ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                          //     : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
                          // } transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none`}
                          className={`w-full bg-[rgb(15,33,46)] border-2 ${
                            hasError("username")
                              ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                              : usernameValidation.isValid === true
                                ? "border-[#00E701] hover:border-[#00E701] focus:border-[#00E701]"
                                : usernameValidation.isValid === false
                                  ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                                  : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
                          } transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none`}
                        />
                        {/* {hasError("username") && (
                          <span className=" text-[#E56B84] text-xs flex gap-2 items-center">
                            <Icon
                              name={"Alert"}
                              className="relative"
                              width={12}
                              height={12}
                              fill="rgb(237,65,99)"
                            />
                            {errors.username}
                          </span>
                        )} */}
                        {/* Replace the entire username validation section with this: */}
                        {hasError("username") && (
                          <span className=" text-[#E56B84] text-xs flex gap-2 items-center">
                            <Icon
                              name={"Alert"}
                              className="relative"
                              width={12}
                              height={12}
                              fill="rgb(237,65,99)"
                            />
                            {errors.username}
                          </span>
                        )}
                        {usernameValidation.message &&
                          !hasError("username") && (
                            <span
                              className={`text-xs flex gap-2 items-center ${
                                usernameValidation.isValid
                                  ? "text-[#00E701]"
                                  : "text-[#E56B84]"
                              }`}
                            >
                              <Icon
                                name={
                                  usernameValidation.isValid ? "Check" : "Alert"
                                }
                                className="relative"
                                width={12}
                                height={12}
                                fill={
                                  usernameValidation.isValid
                                    ? "#00E701"
                                    : "rgb(237,65,99)"
                                }
                              />
                              <span>{usernameValidation.message}</span>
                            </span>
                          )}
                      </div>

                      <div className="p-2 mt-1 text-[14px] bg-[rgb(47,69,83)] text-[#b1bad3] rounded">
                        Your username must be 3-14 characters long.
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="password-input"
                          className="text-sm font-medium text-[rgb(177,186,211)] leading-[1]"
                        >
                          Password{" "}
                          <span className=" text-[rgb(237,65,99)]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="password-input"
                            name="password"
                            autoComplete="off"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setFieldError("password", e.target.value);
                            }}
                            onBlur={() =>
                              setTouched((t) => ({ ...t, password: true }))
                            }
                            className={`w-full bg-[rgb(15,33,46)] border-2 ${
                              hasError("password")
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
                              <EyeOff className="cursor-pointer" size={18} />
                            ) : (
                              <Eye className="cursor-pointer" size={18} />
                            )}
                          </button>
                        </div>
                        {hasError("password") && (
                          <span className=" text-[#E56B84] text-xs flex gap-2 items-center">
                            <Icon
                              name={"Alert"}
                              className="relative"
                              width={12}
                              height={12}
                              fill="rgb(237,65,99)"
                            />
                            {errors.password}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="date"
                          className="text-sm font-medium text-[rgb(177,186,211)] leading-[1]"
                        >
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div
                          className="relative w-full"
                          onClick={() => {
                            const dateInput = document.getElementById(
                              "date"
                            ) as HTMLInputElement | null;
                            dateInput?.showPicker();
                          }} // 👈 triggers calendar on click anywhere
                        >
                          <input
                            type="date"
                            autoComplete="off"
                            id="date"
                            name="date"
                            value={date}
                            onChange={(e) => {
                              setDate(e.target.value);
                              setFieldError("date", e.target.value);
                            }}
                            onBlur={() =>
                              setTouched((t) => ({ ...t, date: true }))
                            }
                            className={`w-full bg-[rgb(15,33,46)] border-2 appearance-none custom-date cursor-pointer ${
                              hasError("date")
                                ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                                : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
                            } transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none pr-10`}
                          />

                          {/* Custom calendar icon */}
                          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99C8FF]" />
                        </div>
                        {hasError("date") && (
                          <span className=" text-[#E56B84] text-xs flex gap-2 items-center">
                            <Icon
                              name={"Alert"}
                              className="relative"
                              width={12}
                              height={12}
                              fill="rgb(237,65,99)"
                            />
                            {errors.date}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-[6px]">
                        <label
                          htmlFor="checkbox"
                          className="flex items-center space-x-2 "
                        >
                          <input
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            className="peer hidden"
                            onChange={togglePhone}
                          />
                          <div className="w-[21] h-[21] flex items-center border-[#567086] border justify-center rounded-[2px] bg-[#0E212E] peer-checked:bg-[#304553] peer-checked:text-white text-transparent">
                            ✓
                          </div>
                        </label>
                        <span className="text-[14px] text-[#b1bad3] font-semibold">
                          Phone (Optional)
                        </span>
                      </div>

                      {isPhone ? (
                        <div>
                          <div className="items-center flex gap-2">
                            <div className="relative">
                              <select
                                value={phoneCode}
                                onChange={(e) => setPhoneCode(e.target.value)}
                                className="py-[7.25px] appearance-none pl-[7px] pr-[28px] w-[calc((100%_-_16_/3)] text-white bg-[#0E212E] border-2 rounded-[0.25rem] font-medium outline-none border-[#304553] cursor-pointer leading-[1.25rem] text-sm touch-auto shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.12)] custom-select"
                              >
                                <option disabled selected>
                                  Country code
                                </option>
                                {[
                                  ...COUNTRIES.filter(
                                    (item) => item.dial_code === phoneCode
                                  ),
                                  ...COUNTRIES.filter(
                                    (item) => item.dial_code !== phoneCode
                                  ),
                                ]?.map((item) => (
                                  <option
                                    value={item.dial_code}
                                    key={item.code}
                                    className="checked:!bg-[#99c8ff]"
                                  >
                                    {item.dial_code}
                                  </option>
                                ))}
                              </select>
                              <Icon
                                name={"arrow"}
                                width={14}
                                height={14}
                                fill="#B1BAD3"
                                className=" !w-[14px] !h-[14px] rotate-0 absolute top-[13.5px] right-[8px]"
                              ></Icon>
                            </div>

                            <input
                              type="text"
                              autoComplete="off"
                              name="phoneNumber"
                              placeholder="Phone Number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className={`w-full bg-[rgb(15,33,46)] border-2 border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)] transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none`}
                            />
                          </div>
                          <div className="text-[12px] text-[#b1bad3] leading-[1.5] mt-1">
                            By submitting your phone number, you are opting-in
                            to receive marketing communications & offers via SMS
                            from Stake.
                          </div>
                        </div>
                      ) : null}

                      <div className="flex items-center gap-[6px]">
                        <label
                          htmlFor="checkbox-input"
                          className="flex items-center space-x-2 "
                        >
                          <input
                            id="checkbox-input"
                            type="checkbox"
                            className="peer hidden"
                            onChange={toggleReferral}
                          />
                          <div className="w-[21] h-[21] flex items-center border-[#567086] border justify-center rounded-[2px] bg-[#0E212E] peer-checked:bg-[#304553] peer-checked:text-white text-transparent">
                            ✓
                          </div>
                        </label>
                        <span className="text-[14px] text-[#b1bad3] font-semibold">
                          Referral Code (Optional)
                        </span>
                      </div>

                      {isReferral ? (
                        <input
                          type="text"
                          autoComplete="off"
                          name="email"
                          placeholder=""
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full bg-[rgb(15,33,46)] border-2 border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)] transition-all hover:border-[rgb(85,112,134)] rounded-[4px] p-2 min-h-[41px] text-white text-sm font-semibold focus:outline-none`}
                        />
                      ) : null}
                    </>
                  ) : null}

                  {currentStep === 3 ? (
                    <>
                      <h2 className="leading-[1.5] text-[#fff] font-semibold ">
                        Create an Account
                      </h2>

                      <div className="w-full mt-1">
                        <div className="max-h-[280px] md:h-[372px] bg-[#213743] overflow-y-auto text-left rounded p-4">
                          <h1 className=" mb-2 text-[#fff] leading-[132%]  font-medium inline-block">
                            <span>Terms and Conditions</span>
                          </h1>

                          <h3 className="font-semibold mt-6 mb-2">
                            1. STAKE.COM
                          </h3>
                          <span className="text-[.875rem] text-[#b1bad3] leading-[150%] inline-block">
                            1.1 Stake.com is is owned and operated by Medium
                            Rare, N.V. (hereinafter "Stake", "We" or "Us"), a
                            company with head office at Seru Loraweg 17, B,
                            Curaçao. Medium Rare N.V. is licensed by the Curaçao
                            Gaming Authority under license number
                            OGL/2024/1451/0918. Some payment processing may be
                            handled by its wholly owned subsidiaries, Medium
                            Rare Limited with address 7-9 Riga Feraiou, Lizantia
                            Court, Office 310, Agioi Omologites, 1087 Nicosia,
                            Cyprus and registration number: HE 410775 and/or MRS
                            Tech Ltd with address Patrikiou Loumoumpa, 7, Block
                            A, Pervolia, 7560, Larnaca and registration number:
                            HE 477481.
                          </span>

                          <h3 className="font-semibold mt-6 mb-2">
                            2. IMPORTANT NOTICE
                          </h3>
                          <span className="text-[.875rem] text-[#b1bad3] leading-[150%] inline-block">
                            2.1 By registering on www.stake.com (the “Website”),
                            you enter into a contract with Medium Rare N.V., and
                            agree to be bound by (i) these Terms and Conditions;
                            (ii) our Privacy Policy; (iii) our Cookies Policy;
                            (iv) the Affiliate Terms and (v) the rules
                            applicable to our betting or gaming products as
                            further referenced in these Terms and Conditions
                            (“Terms and Conditions” or “Agreement”), and the
                            betting and/or gaming specific rules, and are deemed
                            to have accepted and understood all the terms.
                          </span>

                          <h3 className="font-semibold mt-6 mb-2">
                            3. GENERAL
                          </h3>
                          <span className="text-[.875rem] text-[#b1bad3] leading-[150%] inline-block">
                            3.1 When registering on
                            <span className="text-[#fff]">stake.com</span> You
                            (“You”, “Your”, Yourself” or the “Player”
                            interchangeably) enter into an agreement with Stake.
                          </span>
                          <span className="text-[.875rem] text-[#b1bad3] leading-[150%] inline-block">
                            3.2 This Agreement should be read by You in its
                            entirety prior to your use of Stake's service or
                            products. Please note that the Agreement constitutes
                            a legally binding agreement between you and Stake.
                          </span>
                          <h3 className="font-semibold mt-6 mb-2">
                            4. STAKE ACCOUNT
                          </h3>

                          <span className="text-[.875rem] text-[#b1bad3] leading-[150%] inline-block">
                            Registration
                          </span>

                          <span className="text-[.875rem] text-[#b1bad3] leading-[150%] inline-block mt-[calc(.25rem*3)]">
                            4.1 In order for you to be able to place bets on
                            stake.com, you must first personally register an
                            account with us ("Stake Account").
                          </span>
                          <span className="text-[.875rem] text-[#b1bad3] leading-[150%] inline-block ">
                            4.2 For a person to be registered as a player with
                            Stake and use the Website, that person must submit
                            an application for registration and opening of a
                            Stake account. The application for the opening of
                            the Stake Account must be submitted personally, and
                            will require You to provide a set of personal
                            information, namely e-mail, full name, date of
                            birth, address, etc.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-[5px]">
                        <label className="flex items-center space-x-2 ">
                          <input
                            type="checkbox"
                            className="peer hidden"
                            onChange={toggleRead}
                            checked={readPrivacy}
                          />
                          <div className="w-[21] h-[21] flex items-center border-[#567086] border-[2] justify-center rounded-[2px] bg-[#0E212E] peer-checked:bg-[#304553] peer-checked:text-white text-transparent">
                            ✓
                          </div>
                        </label>
                        <span className="text-[14px] text-[#b1bad3] font-[400]">
                          I have read and agree to the terms and conditions
                        </span>
                      </div>
                    </>
                  ) : null}
                </div>

                <button
                  disabled={(currentStep == 3 && !readPrivacy) || loader}
                  type={currentStep == 1 ? "button" : "submit"}
                  onClick={(e) => {
                    if (currentStep === 1) {
                      setCurrentStep(2);
                    } else if (currentStep === 2) {
                      e.preventDefault();
                      setAttemptedStepTwo(true);
                      if (validateStepTwo()) {
                        setCurrentStep(3);
                      }
                    }
                  }}
                  className="inline-flex cursor-pointer min-h-[52px] relative items-center gap-2 justify-center rounded-[2px] font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[rgb(20,117,225)] text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-base leading-none shadow-md py-[1.125rem] px-[1.75rem] min-w-[12ch] w-full"
                >
                  {loader ? (
                    <>
                      {/* <div
                        className="bounce-logo"
                        aria-label="bouncing dots logo"
                      >
                        <span className="dot left"></span>
                        <span className="dot right"></span>
                      </div> */}
                      <div id="preloader_2">
                        <span></span>
                        <span></span>
                      </div>
                    </>
                  ) : (
                    <>
                      {currentStep === 1 && (
                        <div className="contents"> Confirm</div>
                      )}
                      {currentStep === 2 && (
                        <div className="contents">Continue</div>
                      )}
                      {currentStep === 3 && (
                        <div className="contents">Create an Account</div>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
            {currentStep != 3 && currentStep != 1 ? <MLoginFooter /> : null}

            <div className="flex flex-col gap-[0.75rem] touch-auto relative top-[0.5px]">
              <span className="text-[#b1bad3] text-center text-sm font-normal touch-auto">
                Already have an account?&nbsp;
                <button
                  onClick={handleSwitchToLogin}
                  type="button"
                  className="ring-offset-background inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-none text-sm leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white"
                >
                  Sign in
                </button>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
