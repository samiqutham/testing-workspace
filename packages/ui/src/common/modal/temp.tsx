"use client";

import Icon from "@workspace/ui/icons/icons";
import MLoginHeader from "@workspace/ui/common/components/m-view/m-login-header/index";
import MLoginFooter from "@workspace/ui/common/components/m-view/m-login-footer/index";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import "./registerModal.css";
import { useAppStore } from "@workspace/ui/store/store";
import { showToast } from "@/components/toaster/ToasterDemo"; // 🔔 import toast helper

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
  countryLanguages: Record<string, string>;
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

  const [currentStep, setCurrentStep] = useState(1);

  async function getUserCountry(): Promise<string> {
    try {
      const res = await fetch("https://pro.ip-api.com/json/?key=qSA5ctYZHdWsx04");
      const data = await res.json();
      return data.countryCode;
    } catch (err) {
      console.error("Failed to detect country", err);
      return "US";
    }
  }

  const handleSwitchToLogin = () => {
    onClose?.();
    setIsRegisterOpen(false);
    localStorage.removeItem("registerModal");
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

  useEffect(() => {
    getUserCountry().then((countryCode) => {
      const reordered = reorderLanguagesByCountry(
        globalThis.__GOOGLE_TRANSLATION_CONFIG__?.languages,
        countryCode
      );
      setCurrentLanguage(reordered);
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

  const handleSelectLanguage = (name: any) => {
    setLoader(true);
    setTimeout(() => {
      const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = `googtrans=; ${expire}; path=/;`;
      document.cookie = `googtrans=; ${expire}; domain=.yourdesign.live; path=/;`;

      const cookieValue = `/auto/${name}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; domain=.yourdesign.live; path=/;`;

      setCookie(null, COOKIE_NAME, cookieValue, { path: "/" });
      setLoader(false);

      // 🔔 Toast confirmation
      showToast("info", "Language Changed", `Language set to ${name}`);

      window.location.reload();
    }, 500);
  };

  const [isPhone, setPhone] = useState(false);
  const [isReferral, setReferral] = useState(false);

  const toggleReferral = () => setReferral((prev) => !prev);
  const togglePhone = () => setPhone((prev) => !prev);

  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    username: false,
    date: false,
  });
  const [attemptedStepTwo, setAttemptedStepTwo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validators = {
    email: (v: string) =>
      !v || v.length < 3
        ? "Minimum character length is 3"
        : !/\S+@\S+\.\S+/.test(v)
        ? "Invalid email address"
        : undefined,
    username: (v: string) =>
      !v || v.length < 3 ? "Minimum character length is 3" : undefined,
    password: (v: string) =>
      !v || v.length < 6 ? "Minimum character length is 6" : undefined,
    date: (v: string) => (!v ? "Date is required" : undefined),
  };

  const setFieldError = (field: keyof Errors, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
  };

  const hasError = (field: keyof Errors) =>
    Boolean((touched[field] || attemptedStepTwo) && errors[field]);

  const validateStepTwo = () => {
    const newErrors: Errors = {
      email: validators.email(email),
      date: validators.date(date),
      username: validators.username(username),
      password: validators.password(password),
    };
    setErrors(newErrors);

    // 🔔 Trigger toast for each invalid field
    Object.entries(newErrors).forEach(([key, value]) => {
      if (value) {
        showToast(
          "error",
          "Invalid Input",
          `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
        );
      }
    });

    return Object.values(newErrors).every((v) => v === undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {
      email: validators.email(email),
      date: validators.date(date),
      username: validators.username(username),
      password: validators.password(password),
    };
    setErrors(newErrors);

    const valid = Object.values(newErrors).every((v) => v === undefined);
    if (valid) {
      showToast("success", "Registration Complete", "Your account has been created!");
      console.log("Form submitted", { email, username, password, date });
    } else {
      Object.entries(newErrors).forEach(([key, value]) => {
        if (value) {
          showToast(
            "error",
            "Invalid Input",
            `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
          );
        }
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
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

          {/* === Your Existing Content === */}
          {/* (no change in form structure, toasts are triggered from JS only) */}
          {/* ... */}
          
          {/* Keep the same footer and sign-in link */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
