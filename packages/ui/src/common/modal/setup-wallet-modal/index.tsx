"use client";

import Icon from "@workspace/ui/icons/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useRef, useState } from "react";
import VerificationModal from "@workspace/ui/common/components/d-view/d-settings/verificationmodal/index";

type Errors = {
  firstName?: string;
  lastName?: string;
  selectedCountry?: string;
  selectedPlaceBirth?: string;
  date?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  occupationIndustry?: string;
  occupation?: string;
  occupationExperience?: string;
  documentType?: string;
  frontFile?: string;
  backFile?: string;
  email?: string;
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

export default function SetupWalletModal({ isOpen, onClose }: any) {
  const [loader, setLoader] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlaceBirth, setSelectedPlaceBirth] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [occupationIndustry, setOccupationIndustry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [occupationExperience, setOccupationExperience] = useState("");
  const [documentType, setDocumentType] = useState(" Driver license");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("bolypuryfu@mailinator.com");
  const [code, setCode] = useState("");
  const codeRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const [touched, setTouched] = useState<{
    firstName: boolean;
    selectedCountry: boolean;
    selectedPlaceBirth: boolean;
    lastName: boolean;
    date: boolean;
    address: boolean;
    city: boolean;
    postalCode: boolean;
    occupationIndustry: boolean;
    occupation: boolean;
    occupationExperience: boolean;
    documentType: boolean;
    frontFile: boolean;
    backFile: boolean;
    email: boolean;
  }>({
    firstName: false,
    selectedCountry: false,
    selectedPlaceBirth: false,
    lastName: false,
    date: false,
    address: false,
    city: false,
    postalCode: false,
    occupationIndustry: false,
    occupation: false,
    occupationExperience: false,
    documentType: false,
    frontFile: false,
    backFile: false,
    email: false,
  });
  const [attemptedStepTwo, setAttemptedStepTwo] = useState(false);

  const validators: {
    [K in keyof Errors]-?: (v: string | File | null) => string | undefined;
  } = {
    firstName: (v) =>
      !v || (typeof v === "string" && v.length < 3)
        ? "First Name is a required field"
        : undefined,
    lastName: (v) =>
      !v || (typeof v === "string" && v.length < 3)
        ? "Last Name is a required field"
        : undefined,
    selectedCountry: (v) =>
      !v || (typeof v === "string" && v.length < 1)
        ? "Country is a required field"
        : undefined,
    selectedPlaceBirth: (v) =>
      !v || (typeof v === "string" && v.length < 1)
        ? "Place of Birth is a required field"
        : undefined,
    date: (v) => (!v ? "Date of Birth is required" : undefined),
    address: (v) =>
      !v || (typeof v === "string" && v.length < 5)
        ? "Residential Address is required"
        : undefined,
    city: (v) =>
      !v || (typeof v === "string" && v.length < 2)
        ? "City is required"
        : undefined,
    postalCode: (v) =>
      !v || (typeof v === "string" && v.length < 3)
        ? "Postal Code is required"
        : undefined,
    occupationIndustry: (v) =>
      !v ? "Occupation Industry is required" : undefined,
    occupation: (v) => (!v ? "Occupation is required" : undefined),
    occupationExperience: (v) =>
      !v ? "Occupation Experience is required" : undefined,
    documentType: (v) => (!v ? "Document Type is required" : undefined),
    frontFile: (v) => (!v ? "No file added" : undefined),
    backFile: (v) => (!v ? "No file added" : undefined),
    email: (v) => {
      if (!v || typeof v !== "string" || v.trim().length === 0)
        return "Email is a required field";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(v) ? "Email must be a valid email" : undefined;
    },
  };

  const setFieldError = (field: keyof Errors, value: string | File | null) => {
    setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
  };

  const hasError = (field: keyof Errors) =>
    Boolean((touched[field] || attemptedStepTwo) && errors[field]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 2) {
      const newErrors: Errors = {
        firstName: validators.firstName(firstName),
        date: validators.date(date),
        lastName: validators.lastName(lastName),
        selectedCountry: validators.selectedCountry(selectedCountry),
        selectedPlaceBirth: validators.selectedPlaceBirth(selectedPlaceBirth),
        address: validators.address(address),
        city: validators.city(city),
        postalCode: validators.postalCode(postalCode),
        occupationIndustry: validators.occupationIndustry(occupationIndustry),
        occupation: validators.occupation(occupation),
        occupationExperience:
          validators.occupationExperience(occupationExperience),
        documentType: validators.documentType(documentType),
        frontFile: validators.frontFile(frontFile),
        backFile: validators.backFile(backFile),
      };

      // Mark all fields as touched
      Object.keys(touched).forEach((key) => {
        setTouched((t) => ({ ...t, [key]: true }));
      });

      setErrors(newErrors);

      if (Object.values(newErrors).every((v) => v === undefined)) {
        console.log("Form submitted", {
          firstName,
          lastName,
          selectedCountry,
          selectedPlaceBirth,
          date,
          address,
          city,
          postalCode,
          occupationIndustry,
          occupation,
          occupationExperience,
          documentType,
          frontFile,
          backFile,
        });
        onClose();
      }
    }
  };

  const validateStepOne = () => {
    const stepOneErrors: Errors = {
      firstName: validators.firstName(firstName),
      lastName: validators.lastName(lastName),
      selectedCountry: validators.selectedCountry(selectedCountry),
      selectedPlaceBirth: validators.selectedPlaceBirth(selectedPlaceBirth),
      date: validators.date(date),
      address: validators.address(address),
      city: validators.city(city),
      postalCode: validators.postalCode(postalCode),
      occupationIndustry: validators.occupationIndustry(occupationIndustry),
      occupation: validators.occupation(occupation),
      occupationExperience:
        validators.occupationExperience(occupationExperience),
    };

    setErrors(stepOneErrors);

    // Mark step one fields as touched
    const stepOneFields = [
      "firstName",
      "lastName",
      "selectedCountry",
      "selectedPlaceBirth",
      "date",
      "address",
      "city",
      "postalCode",
      "occupationIndustry",
      "occupation",
      "occupationExperience",
      "email",
    ];
    stepOneFields.forEach((field) => {
      setTouched((t) => ({ ...t, [field]: true }));
    });

    return Object.values(stepOneErrors).every((v) => v === undefined);
  };

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (validateStepOne()) {
        setCurrentStep(2);
      }
    }
  };

  const handleSubmitVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError("email", email);
    console.log("Verification submitted:", { email, code });
  };

  const isInvalid = code.length !== 6;
  const copyCode = useCallback(async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      if (codeRef.current) {
        await navigator.clipboard.writeText(codeRef.current.value);
      }
    } catch (err) {
      console.log("Clipboard permission denied:", err);
    }
  }, []);

  return (
    // login  by email
    //    <AnimatePresence>
    //       <motion.div
    //         className="md:bg-[rgba(0,0,0,0.7)] fixed inset-0 z-[9999] md:flex items-center justify-center md:p-4 drawer"
    //         variants={backdrop}
    //         initial="hidden"
    //         animate="visible"
    //         onClick={() => onClose()}
    //         exit="exit"
    //         transition={{ duration: 0.2 }}>
    //         <motion.div
    //           className="flex flex-col md:rounded-sm md:overflow-hidden md:max-w-[630px] bg-[#0f212e] md:max-h-[716px] md:h-full md:w-full"
    //           variants={modal}
    //           initial="hidden"
    //           animate="visible"
    //           exit="exit"
    //           onClick={(e) => e.stopPropagation()}
    //           transition={{ duration: 0.1, ease: "easeOut" }}>
    //           <div className="flex items-center justify-between bg-[#1a2c38] gap-2 px-4 min-h-[60px]">
    //             <div className="flex items-center">
    //               <Icon name="logo" className="w-20 h-10" fill="white" />
    //             </div>
    //             <button
    //               onClick={() => onClose()}
    //               className="text-xl leading-none cursor-pointer outline-0">
    //               <Icon
    //                 name={"closeIcon"}
    //                 className="w-5 h-5 hover:fill-[white]"
    //                 fill="#b1bad3"
    //               />
    //             </button>
    //           </div>
    //           <div className="wrapper pt-0 p-4 flex flex-col gap-4 h-[calc(100dvh-120px)] md:h-full overflow-y-auto [scrollbar-width:none] pb-0">
    //             <form className="flex flex-col flex-1">
    //               <div className="flex-1 items-end flex flex-col gap-4 justify-between">
    //                 <div className="flex flex-col gap-4 w-full">
    //                   <div className="flex bg-[#0f212e] z-50 sticky top-0 flex-col left-4 right-4 gap-2">
    //                     <div className="pt-2 flex flex-col gap-2">
    //                       <div className="grid grid-cols-2 gap-1">
    //                         <div className="bg-[rgb(0,231,1)] h-1 rounded-full"></div>
    //                         <div
    //                           className={`h-1 rounded-full  ${
    //                             currentStep == 2 || currentStep == 3
    //                               ? "bg-[rgb(0,231,1)]"
    //                               : "bg-[rgb(47,69,83)]"
    //                           }`}></div>
    //                       </div>
    //                     </div>
    //                     <div
    //                       className={`text-end flex items-center justify-between h-[calc(.25rem*6)] ${
    //                         currentStep == 1 ? "justify-end" : ""
    //                       }`}>
    //                       {currentStep != 1 ? (
    //                         <div
    //                           className="text-[rgb(177,186,211)] text-[14px] flex items-center gap-2"
    //                           onClick={() =>
    //                             setCurrentStep((prev) =>
    //                               prev > 1 ? prev - 1 : prev
    //                             )
    //                           }>
    //                           <Icon
    //                             name={"steBackArrow"}
    //                             fill="#B1BAD3"
    //                             className=" w-5 h-5"></Icon>
    //                           <span className="font-medium hover:text-white">
    //                             Back{" "}
    //                           </span>
    //                         </div>
    //                       ) : null}
    //                       <div className="text-[rgb(177,186,211)] text-[12px]">
    //                         Step {currentStep} / 2
    //                       </div>
    //                     </div>
    //                   </div>

    //                   {currentStep === 1 ? (
    //                     <>
    //                       <div>
    //                         <h2 className=" text-[#fff] font-bold text-[20px] leading-[28px]">
    //                           Confirm Your Details
    //                         </h2>
    //                         <p className="text-base text-[#b1bad3] ">
    //                           Please fill in your details &amp; confirm your
    //                           identity to unlock additional services. All
    //                           information is private &amp; secure.
    //                         </p>
    //                       </div>

    //                       <div className="space-y-4">
    //                         {/* First Name */}
    //                         <div className="flex flex-col gap-1">
    //                           <label
    //                             htmlFor="firstName"
    //                             className="text-sm font-semibold text-[rgb(177,186,211)] ">
    //                             First Name (including middle name, if applicable)
    //                             <span className="text-red-500">*</span>
    //                           </label>
    //                           <input
    //                             type="text"
    //                             autoComplete="off"
    //                             name="firstName"
    //                             value={firstName}
    //                             onChange={(e) => {
    //                               setFirstName(e.target.value);
    //                               setFieldError("firstName", e.target.value);
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({ ...t, firstName: true }))
    //                             }
    //                             className={`w-full bg-[rgb(15,33,46)] border-2 ${
    //                               hasError("firstName")
    //                                 ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                 : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] rounded-[8px] p-2 min-h-[41px] text-white text-[16px]  focus:outline-none`}
    //                           />
    //                           {hasError("firstName") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               <span>{errors.firstName}</span>
    //                             </span>
    //                           )}
    //                         </div>

    //                         {/* Last Name */}
    //                         <div className="flex flex-col gap-1">
    //                           <label
    //                             htmlFor="lastName"
    //                             className="text-sm font-semibold text-[rgb(177,186,211)] ">
    //                             Last Name <span className="text-red-500">*</span>
    //                           </label>
    //                           <input
    //                             type="text"
    //                             autoComplete="off"
    //                             name="lastName"
    //                             value={lastName}
    //                             onChange={(e) => {
    //                               setLastName(e.target.value);
    //                               setFieldError("lastName", e.target.value);
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({ ...t, lastName: true }))
    //                             }
    //                             className={`w-full bg-[rgb(15,33,46)] border-2 ${
    //                               hasError("lastName")
    //                                 ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                 : "border-[rgb(47,69,83)] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] rounded-[8px] p-2 min-h-[41px] text-white text-[16px]  focus:outline-none`}
    //                           />
    //                           {hasError("lastName") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.lastName}
    //                             </span>
    //                           )}
    //                         </div>

    //                         {/* Country */}
    //                         <div className="relative w-full">
    //                           <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px] ">
    //                             Country <span className="text-red-500 ">*</span>
    //                           </label>

    //                           <select
    //                             value={selectedCountry}
    //                             onChange={(e) => {
    //                               setSelectedCountry(e.target.value);
    //                               setFieldError("selectedCountry", e.target.value);
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({
    //                                 ...t,
    //                                 selectedCountry: true,
    //                               }))
    //                             }
    //                             className={`w-full appearance-none rounded-md bg-[#0E212E] border-2 ${
    //                               hasError("selectedCountry")
    //                                 ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                 : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] px-3 py-2 pr-10 text-white focus:outline-none`}>
    //                             <option className="font-semibold" value=""></option>
    //                             <option value="pakistan">Pakistan</option>
    //                             <option value="india">India</option>
    //                             <option value="usa">USA</option>
    //                           </select>

    //                           {/* Custom Icon */}
    //                           <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
    //                             <Icon
    //                               className="text-[#D5DCE9] w-5 h-5"
    //                               name={"arrowDown"}
    //                             />
    //                           </span>
    //                           {hasError("selectedCountry") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.selectedCountry}
    //                             </span>
    //                           )}
    //                         </div>

    //                         {/* Place of Birth */}
    //                         <div className="relative w-full">
    //                           <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
    //                             Place of Birth{" "}
    //                             <span className="text-red-500">*</span>
    //                           </label>

    //                           <select
    //                             value={selectedPlaceBirth}
    //                             onChange={(e) => {
    //                               setSelectedPlaceBirth(e.target.value);
    //                               setFieldError(
    //                                 "selectedPlaceBirth",
    //                                 e.target.value
    //                               );
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({
    //                                 ...t,
    //                                 selectedPlaceBirth: true,
    //                               }))
    //                             }
    //                             className={`w-full appearance-none rounded-md bg-[#0E212E] border-2 ${
    //                               hasError("selectedPlaceBirth")
    //                                 ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                 : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] px-3 py-2 pr-10 text-white focus:outline-none`}>
    //                             <option value=""></option>
    //                             <option value="lahore">Lahore</option>
    //                             <option value="karachi">Karachi</option>
    //                             <option value="islamabad">Islamabad</option>
    //                           </select>

    //                           {/* Custom Icon */}
    //                           <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
    //                             <Icon
    //                               className="text-[#D5DCE9] w-5 h-5"
    //                               name={"arrowDown"}
    //                             />
    //                           </span>
    //                           {hasError("selectedPlaceBirth") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.selectedPlaceBirth}
    //                             </span>
    //                           )}
    //                         </div>

    //                         {/* Date of Birth */}
    //                         <div className="flex flex-col gap-1">
    //                           <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
    //                             Date of Birth{" "}
    //                             <span className="text-red-500">*</span>
    //                           </label>
    //                           <input
    //                             type="date"
    //                             value={date}
    //                             onChange={(e) => {
    //                               setDate(e.target.value);
    //                               setFieldError("date", e.target.value);
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({ ...t, date: true }))
    //                             }
    //                             className={`w-full rounded-md bg-[#0E212E] border-2 ${
    //                               hasError("date")
    //                                 ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                 : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] px-3 py-2 text-white focus:outline-none`}
    //                           />
    //                           {hasError("date") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.date}
    //                             </span>
    //                           )}
    //                         </div>

    //                         {/* Address */}
    //                         <div className="relative w-full">
    //                           <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
    //                             Residential Address{" "}
    //                             <span className="text-red-500">*</span>
    //                           </label>

    //                           <div className="relative">
    //                             <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-[#D5DCE9]">
    //                               <Icon
    //                                 className="w-5 h-5"
    //                                 name={"searchverified"}
    //                               />
    //                             </span>
    //                             <input
    //                               type="text"
    //                               placeholder="Enter your address"
    //                               value={address}
    //                               onChange={(e) => {
    //                                 setAddress(e.target.value);
    //                                 setFieldError("address", e.target.value);
    //                               }}
    //                               onBlur={() =>
    //                                 setTouched((t) => ({ ...t, address: true }))
    //                               }
    //                               className={`w-full rounded-md bg-[#0E212E] border-2 ${
    //                                 hasError("address")
    //                                   ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                   : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                               } transition-all hover:border-[rgb(85,112,134)] pl-10 py-2 placeholder:font-light text-white placeholder:text-[#7D8DA1] focus:outline-none`}
    //                             />
    //                           </div>
    //                           {hasError("address") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.address}
    //                             </span>
    //                           )}
    //                         </div>

    //                         {/* City + Postal Code */}
    //                         <div className="grid grid-cols-2 gap-4">
    //                           <div className="flex flex-col gap-1">
    //                             <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
    //                               City <span className="text-red-500">*</span>
    //                             </label>
    //                             <input
    //                               type="text"
    //                               placeholder=""
    //                               value={city}
    //                               onChange={(e) => {
    //                                 setCity(e.target.value);
    //                                 setFieldError("city", e.target.value);
    //                               }}
    //                               onBlur={() =>
    //                                 setTouched((t) => ({ ...t, city: true }))
    //                               }
    //                               className={`w-full rounded-md bg-[#0E212E] border-2 ${
    //                                 hasError("city")
    //                                   ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                   : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                               } transition-all hover:border-[rgb(85,112,134)] px-3 py-2 text-white focus:outline-none`}
    //                             />
    //                             {hasError("city") && (
    //                               <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                                 <Icon
    //                                   name={"Caution"}
    //                                   className="relative w-5 h-5"
    //                                   fill="rgb(237,65,99)"
    //                                 />
    //                                 {errors.city}
    //                               </span>
    //                             )}
    //                           </div>
    //                           <div className="flex flex-col gap-1">
    //                             <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
    //                               Postal Code{" "}
    //                               <span className="text-red-500">*</span>
    //                             </label>
    //                             <input
    //                               type="text"
    //                               placeholder=""
    //                               value={postalCode}
    //                               onChange={(e) => {
    //                                 setPostalCode(e.target.value);
    //                                 setFieldError("postalCode", e.target.value);
    //                               }}
    //                               onBlur={() =>
    //                                 setTouched((t) => ({ ...t, postalCode: true }))
    //                               }
    //                               className={`w-full rounded-md bg-[#0E212E] border-2 ${
    //                                 hasError("postalCode")
    //                                   ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                   : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                               } transition-all hover:border-[rgb(85,112,134)] px-3 py-2 text-white focus:outline-none`}
    //                             />
    //                             {hasError("postalCode") && (
    //                               <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                                 <Icon
    //                                   name={"Caution"}
    //                                   className="relative w-5 h-5"
    //                                   fill="rgb(237,65,99)"
    //                                 />
    //                                 {errors.postalCode}
    //                               </span>
    //                             )}
    //                           </div>
    //                         </div>

    //                         {/* Occupation Industry */}
    //                         <div className="relative w-full">
    //                           <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
    //                             Occupation Industry{" "}
    //                             <span className="text-red-500">*</span>
    //                           </label>
    //                           <select
    //                             value={occupationIndustry}
    //                             onChange={(e) => {
    //                               setOccupationIndustry(e.target.value);
    //                               setFieldError(
    //                                 "occupationIndustry",
    //                                 e.target.value
    //                               );
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({
    //                                 ...t,
    //                                 occupationIndustry: true,
    //                               }))
    //                             }
    //                             className={`w-full appearance-none rounded-md bg-[#0E212E] border-2 ${
    //                               hasError("occupationIndustry")
    //                                 ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                 : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] px-3 py-2 pr-10 text-[#B1BAD3] focus:text-white hover:text-white focus:outline-none cursor-pointer`}>
    //                             <option value="">
    //                               Select your occupation industry
    //                             </option>
    //                             <option value="lit">LIT</option>
    //                             <option value="finance">Finance</option>
    //                             <option value="healthcare">Healthcare</option>
    //                           </select>

    //                           {/* Custom Icon */}
    //                           <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
    //                             <Icon
    //                               className="text-[#D5DCE9] w-5 h-5"
    //                               name={"arrowDown"}
    //                             />
    //                           </span>
    //                           {hasError("occupationIndustry") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.occupationIndustry}
    //                             </span>
    //                           )}
    //                         </div>

    //                         {/* Occupation */}
    //                         <div className="relative w-full">
    //                           <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
    //                             Occupation <span className="text-red-500">*</span>
    //                           </label>

    //                           <select
    //                             value={occupation}
    //                             onChange={(e) => {
    //                               setOccupation(e.target.value);
    //                               setFieldError("occupation", e.target.value);
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({ ...t, occupation: true }))
    //                             }
    //                             className={`w-full appearance-none rounded-md bg-[#0E212E] border-2 ${
    //                               hasError("occupation")
    //                                 ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                 : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] text-[#B1BAD3] focus:text-white cursor-pointer hover:text-white px-3 py-2 pr-10 focus:outline-none`}>
    //                             <option value="">Select your occupation</option>
    //                             <option value="developer">Developer</option>
    //                             <option value="teacher">Teacher</option>
    //                             <option value="doctor">Doctor</option>
    //                           </select>

    //                           {/* Custom Icon */}
    //                           <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
    //                             <Icon
    //                               className="text-[#D5DCE9] w-5 h-5"
    //                               name={"arrowDown"}
    //                             />
    //                           </span>
    //                           {hasError("occupation") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.occupation}
    //                             </span>
    //                           )}
    //                         </div>

    //                         {/* Experience */}
    //                         <div className="relative w-full">
    //                           <label className="block text-[#B1BAD3] text-[14px] font-semibold mb-[3px]">
    //                             Occupation Experience{" "}
    //                             <span className="text-red-500">*</span>
    //                           </label>

    //                           <select
    //                             value={occupationExperience}
    //                             onChange={(e) => {
    //                               setOccupationExperience(e.target.value);
    //                               setFieldError(
    //                                 "occupationExperience",
    //                                 e.target.value
    //                               );
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({
    //                                 ...t,
    //                                 occupationExperience: true,
    //                               }))
    //                             }
    //                             className={`w-full appearance-none rounded-md bg-[#0E212E] border-2 ${
    //                               hasError("occupationExperience")
    //                                 ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
    //                                 : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] px-3 py-2 pr-10 text-[#B1BAD3] hover:text-white focus:text-white cursor-pointer focus:outline-none`}>
    //                             <option value="">
    //                               Select your occupation experience
    //                             </option>
    //                             <option value="0-1">0-1 Years</option>
    //                             <option value="2-5">2-5 Years</option>
    //                             <option value="5+">5+ Years</option>
    //                           </select>

    //                           {/* Custom Icon */}
    //                           <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
    //                             <Icon
    //                               className="text-[#D5DCE9] w-5 h-5"
    //                               name={"arrowDown"}
    //                             />
    //                           </span>
    //                           {hasError("occupationExperience") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.occupationExperience}
    //                             </span>
    //                           )}
    //                         </div>
    //                       </div>
    //                     </>
    //                   ) : null}

    //                   {currentStep === 2 ? (
    //                     <>
    //                       <div className="">
    //                         <h2 className="text-[20px] text-white font-semibold">
    //                           Upload Identification
    //                         </h2>
    //                         <p className="text-[#d5dceb] text-[16px] ">
    //                           Please upload your identification. This step will
    //                           unlock more capabilities such as higher betting limits
    //                           and enhanced account security.
    //                         </p>

    //                         <div className="relative w-full mt-4">
    //                           <div className="flex flex-row flex-1 pb-1 justify-between items-center">
    //                             <div className="flex items-center space-x-1 pb-1">
    //                               <span className="text-sm text-[#b1bad3]">
    //                                 Document Type
    //                               </span>
    //                               <span className="text-sm font-semibold text-red-500">
    //                                 *
    //                               </span>
    //                             </div>

    //                             <button
    //                               type="button"

    //                               className="inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-transparent text-white hover:text-white disabled:opacity-50 disabled:pointer-events-none">
    //                               <Icon
    //                                      onClick={() => setOpen(!open)}
    //                                 name={"Info"}
    //                                 className="w-5 h-5 cursor-pointer text-[#b1bad3] hover:text-white"
    //                               />
    //                             </button>
    //                           </div>

    //                           <select
    //                             value={documentType}
    //                             onChange={(e) => {
    //                               setDocumentType(e.target.value);
    //                               setFieldError("documentType", e.target.value);
    //                             }}
    //                             onBlur={() =>
    //                               setTouched((t) => ({ ...t, documentType: true }))
    //                             }
    //                             className={`w-full appearance-none rounded-md bg-[#0E212E] border-2 ${
    //                               hasError("documentType")
    //                                 ? ""
    //                                 : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
    //                             } transition-all hover:border-[rgb(85,112,134)] px-3 py-2 pr-10 text-white focus:text-white cursor-pointer focus:outline-none`}>

    //                             <option value="DriverLicense">
    //                               Driver license
    //                             </option>
    //                             <option value="NationalID">National ID card</option>
    //                             <option value="InternationalPassport">
    //                               International passport
    //                             </option>
    //                             <option value="Other">Other</option>
    //                           </select>

    //                           {/* Custom Icon */}
    //                           <span className="pointer-events-none absolute top-[35%] inset-y-0 right-2 flex items-center">
    //                             <Icon
    //                               className="text-[#D5DCE9] w-5 h-5"
    //                               name={"arrowDown"}
    //                             />
    //                           </span>

    //                           {hasError("documentType") && (
    //                             <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //                               <Icon
    //                                 name={"Caution"}
    //                                 className="relative w-5 h-5"
    //                                 fill="rgb(237,65,99)"
    //                               />
    //                               {errors.documentType}
    //                             </span>
    //                           )}
    //                         </div>
    //                       <div
    //   className={`overflow-hidden transition-all duration-200 ease-in-out ${
    //     open ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
    //   }`}
    // >
    //   <div className="bg-[#213743] text-[#B1BAD3] rounded-[8px] p-2 shadow-lg">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
    //       {/* Left column */}
    //       <ul className="list-none">
    //         <div>Documents Requirements:</div>
    //         <li className="flex gap-3 my-1 max-h-[50px] items-start">
    //           <span className="flex-shrink-0 mt-[14px] ml-2 w-[6px] h-[6px] rounded-full bg-[#B1BAD3]" />
    //           <span className="text-[16px]">Original, high resolution colour photos</span>
    //         </li>
    //         <li className="flex gap-3 my-1 max-h-[50px] items-start">
    //           <span className="flex-shrink-0 mt-[14px] ml-2 w-[6px] h-[6px] rounded-full bg-[#B1BAD3]" />
    //           <span className="text-[16px]">No screenshots, digital copies, or edits</span>
    //         </li>
    //         <li className="flex gap-3 my-1 max-h-[50px] items-start">
    //           <span className="flex-shrink-0 mt-[14px] ml-2 w-[6px] h-[6px] rounded-full bg-[#B1BAD3]" />
    //           <span className="text-[16px]">Readable documents, with all corners in frame</span>
    //         </li>
    //       </ul>

    //       {/* Right column */}
    //       <ul className="list-none">
    //         <li className="flex gap-3 my-1 max-h-[50px] items-start">
    //           <span className="flex-shrink-0 mt-[14px] ml-2 w-[6px] h-[6px] rounded-full bg-[#B1BAD3]" />
    //           <span className="text-[16px]">Upload both front & back sides if applicable</span>
    //         </li>
    //         <li className="flex gap-3 my-1 max-h-[50px] items-start">
    //           <span className="flex-shrink-0 mt-[14px] ml-2 w-[6px] h-[6px] rounded-full bg-[#B1BAD3]" />
    //           <span className="text-[16px]">Document is not physically damaged</span>
    //         </li>
    //         <li className="flex gap-3 my-1 max-h-[50px] items-start">
    //           <span className="flex-shrink-0 mt-[14px] ml-2 w-[6px] h-[6px] rounded-full bg-[#B1BAD3]" />
    //           <span className="text-[16px]">Document is valid for at least 3 months</span>
    //         </li>
    //         <li className="flex gap-3 my-1 max-h-[50px] items-start">
    //           <span className="flex-shrink-0 mt-[14px] ml-2 w-[6px] h-[6px] rounded-full bg-[#B1BAD3]" />
    //           <span className="text-[16px]">Document is displayed in accepted language</span>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    //                         <div className="mt-4 p-2  text-[16px] bg-[#213743] rounded-[8px]">
    //                           <span className=" text-[#b1bad3]">
    //                             Following file types are accepted:{" "}
    //                             <span className=" text-[#b1bad3]">
    //                               .png, .jpg, .pdf
    //                             </span>
    //                           </span>
    //                         </div>

    //                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

    //                           <div className="flex flex-col">
    //                             <div className="mb-2">
    //                                <label className="block text-sm font-semibold text-[#b1bad3]">
    //                                  Front Side
    //                                 <span className="text-red-500">*</span>
    //                               </label>
    //                             </div>

    //     <div
    //       className={`relative flex flex-col items-center justify-center p-6 bg-[#1D313D] border-2 border-dashed ${
    //         hasError("frontFile")
    //           ? ""
    //           : "border-gray-500 hover:border-blue-400"
    //       } rounded-md cursor-pointer h-[196px]`}
    //     >
    //       {/* Hidden input covering entire box */}
    //       <input
    //         type="file"
    //         accept=".png,.jpg,.jpeg,.pdf"
    //         className="absolute inset-0 opacity-0 cursor-pointer"
    //         onChange={(e) => {
    //           const file = e.target.files?.[0] ?? null;
    //           setFrontFile(file);
    //           setFieldError("frontFile", file);
    //           setTouched((t) => ({
    //             ...t,
    //             frontFile: true,
    //           }));
    //         }}
    //       />

    //       {/* Icon + Text */}
    //       <div className="icon flex flex-col justify-center items-center pointer-events-none">
    //         <img
    //           src="/UploadFrontIcon.svg"
    //           alt="Upload Front"
    //           className="w-[100px] h-[100px] object-contain mb-3"
    //         />
    //         <span className="inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition
    //           bg-[#2f4553] text-white hover:bg-[#557086]
    //           shadow-md py-[0.625rem] px-[1.25rem] pointer-events-none">
    //           {frontFile ? frontFile.name : "Upload Front Side"}
    //         </span>
    //       </div>
    //     </div>

    //     {hasError("frontFile") && (
    //       <span className="text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //         <Icon
    //           name={"Caution"}
    //           className="relative w-5 h-5"
    //           fill="rgb(237,65,99)"
    //         />
    //         {errors.frontFile}
    //       </span>
    //     )}
    //   </div>

    //   {/* ===== BACK SIDE ===== */}
    //   <div className="flex flex-col">
    //     <div className="mb-2">
    //       <label className="block text-sm font-semibold text-[#b1bad3]">
    //         Back Side <span className="text-red-500">*</span>
    //       </label>
    //     </div>

    //     <div
    //       className={`relative flex flex-col items-center justify-center p-6 bg-[#1D313D] border-2 border-dashed ${
    //         hasError("backFile")
    //           ? ""
    //           : "border-gray-500 hover:border-blue-400"
    //       } rounded-md cursor-pointer h-[196px]`}
    //     >
    //       {/* Hidden input covering entire box */}
    //       <input
    //         type="file"
    //         accept=".png,.jpg,.jpeg,.pdf"
    //         className="absolute inset-0 opacity-0 cursor-pointer"
    //         onChange={(e) => {
    //           const file = e.target.files?.[0] ?? null;
    //           setBackFile(file);
    //           setFieldError("backFile", file);
    //           setTouched((t) => ({
    //             ...t,
    //             backFile: true,
    //           }));
    //         }}
    //       />

    //       {/* Icon + Text */}
    //       <div className="icon flex flex-col justify-center items-center pointer-events-none">
    //         <img
    //           src="/IdUploadBack.svg"
    //           alt="Upload Back"
    //           className="w-[100px] h-[100px] object-contain mb-3"
    //         />
    //         <span className="inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition
    //           bg-[#2f4553] text-white hover:bg-[#557086]
    //           shadow-md py-[0.625rem] px-[1.25rem] pointer-events-none">
    //           {backFile ? backFile.name : "Upload Back Side"}
    //         </span>
    //       </div>
    //     </div>

    //     {hasError("backFile") && (
    //       <span className="text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center mt-1">
    //         <Icon
    //           name={"Caution"}
    //           className="relative w-5 h-5"
    //           fill="rgb(237,65,99)"
    //         />
    //         {errors.backFile}
    //       </span>
    //     )}
    //   </div>
    // </div>

    //                       </div>
    //                     </>
    //                   ) : null}
    //                 </div>

    //                 <div className="sticky bottom-0 bg-[#0f212e] w-full py-4 !mt-4">
    //                   <button
    //                     disabled={loader}
    //                     type={currentStep === 1 ? "button" : "submit"}
    //                     onClick={currentStep === 1 ? handleNextStep : handleSubmit}
    //                     className="inline-flex cursor-pointer h-[42px] relative items-center gap-2 justify-center rounded-[8px] font-semibold whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-[rgb(20,117,225)] text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-base leading-none shadow-md py-2.5 px-5 min-w-[12ch] w-full">
    //                     {loader ? (
    //                       <>
    //                         <div id="preloader_2">
    //                           <span></span>
    //                           <span></span>
    //                         </div>
    //                       </>
    //                     ) : (
    //                       <>
    //                         {currentStep === 1 && (
    //                           <div className="contents"> Save and Continue</div>
    //                         )}
    //                         {currentStep === 2 && (
    //                           <div className="contents">Submit</div>
    //                         )}
    //                       </>
    //                     )}
    //                   </button>
    //                 </div>
    //               </div>
    //             </form>
    //           </div>
    //         </motion.div>
    //       </motion.div>
    //     </AnimatePresence>

    // login when username and password
    <AnimatePresence>
      <motion.div
        className="md:bg-[rgba(0,0,0,0.7)] fixed inset-0 z-[99999] md:flex items-center justify-center md:p-4 drawer"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        transition={{ duration: 0.2 }}>
        <motion.div
          className="flex flex-col rounded-[8px] md:overflow-hidden max-[767px]:h-full md:max-w-[630px] bg-[#0f212e] md:max-h-[716px] md:h-full md:w-full"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between bg-[#1a2c38] gap-2 px-[3vw] md:px-4 min-h-[60px]">
            <div className="flex items-center">
              <Icon name="logo" className="w-20 h-10" fill="white" />
            </div>
            <button
              onClick={() => onClose()}
              className="text-xl leading-none cursor-pointer outline-0">
              <Icon
                name={"closeIcon"}
                className="w-5 h-5 hover:fill-[white]"
                fill="#b1bad3"
              />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 flex flex-col gap-[23.5px] flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2">
              <h2 className="text-white font-bold text-[20px] leading-[28px]">
                Confirm Your Email
              </h2>
              <span className="text-[#b1bad3] text-base ">
                Please check your email for the verification code we sent and
                enter it in the form below to confirm your email address.
              </span>
            </div>
            <form
              onSubmit={handleSubmitVerify}
              className="flex flex-col gap-4 flex-1">
              {/* Email */}
              <label className="flex flex-col gap-[4.5px] text-sm font-semibold text-[#b1bad3]">
                <span className="flex items-center gap-1 ">
                  Email <span className="text-[#ed4163]">*</span>
                </span>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEmail(val);
                    setFieldError("email", val);
                  }}
                  className="w-full bg-[#0f212e] border-2 border-[#2f4553] hover:border-[#557086] rounded-[8px] p-2 text-white text-[16px] leading-[24px] focus:outline-none focus:border-[#557086]"
                />

                {errors.email && (
                  <span className=" text-[#E56B84] text-[14px] leading-[20px] flex gap-2 items-center">
                    <Icon
                      name={"Caution"}
                      className="relative w-5 h-5"
                      fill="rgb(237,65,99)"
                    />
                    <span>{errors.email}</span>
                  </span>
                )}
              </label>
              {/* Email Code */}
              {!errors.email && (
                <>
                  <label className="flex flex-col gap-1 text-sm font-semibold text-[#b1bad3]">
                    <span className="flex items-center gap-1">
                      Email Code <span className="text-[#ed4163]">*</span>
                    </span>
                    <div className="flex">
                      <input
                        ref={codeRef}
                        type="text"
                        name="emailCode"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={`flex-1 bg-[#0f212e] border-2 ${isInvalid && code.length > 0
                            ? "border-[rgb(237,65,99)] hover:border-[rgb(237,65,99)] focus:border-[rgb(237,65,99)]"
                            : "border-[#2F4652] focus:border-[rgb(85,112,134)]"
                          }  rounded-l-[8px] p-2 text-white text-[16px] leading-[24px] focus:outline-none `}
                      />
                      <button
                        onClick={() => copyCode()}
                        type="button"
                        className="bg-[#2f4553] px-4 py-2 flex items-center justify-center rounded-r-[8px] hover:bg-[#557086]">
                        <Icon
                          name={"copyIcon"}
                          className="w-5 h-5 text-white"
                        />
                      </button>
                    </div>

                    {isInvalid && code.length > 0 && (
                      <span className=" text-[#f2708a] text-[14px] leading-[20px] flex gap-2 items-center py-1">
                        <Icon
                          name={"Caution"}
                          className="relative w-5 h-5"
                          fill="rgb(237,65,99)"
                        />
                        <span>emailCode must be exactly 6 characters</span>
                      </span>
                    )}
                  </label>
                </>
              )}
              {/* Resend aligned right */}
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="text-sm py-[15px] px-5 text-white font-semibold leading-[21px]"
                  onClick={() => console.log("Resend email")}>
                  {errors.email ? "Save" : "Resend email"}
                </button>
              </div>
              {/* Submit pinned bottom */}
              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={isInvalid}
                  className={`w-full inline-flex justify-center rounded-[8px]  whitespace-nowrap transition disabled:opacity-50 font-semibold disabled:hover:bg-[#1475e1] bg-[#1475e1] text-white hover:bg-blue-600 text-[14px] py-2.5 px-5 min-w-[12ch] ${!code ? "cursor-default" : "cursor-pointer"
                    }`}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
