"use client";
import { useState } from "react";
import responsible from "@workspace/ui/assets/responsible-gambling/responsible-gambling-budget-calculator-en.svg";
import Icon from "@workspace/ui/icons/icons";

export default function DBudgetCalculator() {
  const [wages, setWages] = useState("0.00");
  const [pensions, setPensions] = useState("0.00");
  const [benefits, setBenefits] = useState("0.00");
  const [otherIncome, setOtherIncome] = useState("0.00");

  const [rent, setRent] = useState("0.00");
  const [bills, setBills] = useState("0.00");
  const [loans, setLoans] = useState("0.00");
  const [otherExpenses, setOtherExpenses] = useState("0.00");
  const [errors, setErrors] = useState({
    wages: "",
    pensions: "",
    benefits: "",
    otherIncome: "",
    rent: "",
    bills: "",
    loans: "",
    otherExpenses: "",
  });
  const totalIncome =
    (Number(wages) || 0) +
    (Number(pensions) || 0) +
    (Number(benefits) || 0) +
    (Number(otherIncome) || 0);

  const totalExpenses =
    (Number(rent) || 0) +
    (Number(bills) || 0) +
    (Number(loans) || 0) +
    (Number(otherExpenses) || 0);

  const disposableIncome = totalIncome - totalExpenses;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof errors,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const val = e.target.value.trim();
    if (val === "") {
      setErrors((prev) => ({
        ...prev,
        [key]:
          "wageIncome must be a `number` type, but the final value was: `NaN`.",
      }));
      setter("");
      return;
    }
    if (isNaN(Number(val))) {
      setErrors((prev) => ({
        ...prev,
        [key]: "Please enter a valid number.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setter(val);
  };
  const handleBlur = (
    value: string,
    key: keyof typeof errors,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let num = parseFloat(value);

    if (!value || value.trim() === "" || isNaN(num)) {
      setter("0.00");
      setErrors((prev) => ({ ...prev, [key]: "" }));
      return;
    }

    setter(num.toFixed(2));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <div>
      {" "}
      <div className="overflow-hidden mb-5 rounded-[8px]">
        <img className="object-cover w-full h-[136px]" src={responsible.src} />
      </div>
      <div className="bg-[#1A2C38] pt-[32px] rounded-[8px] max-w-5xl border border-[#304553] mx-auto ">
        {/* Header */}
        <div>
          <h1 className="text-[20px] px-6 font-bold text-white relative top-[-1px]">
            Monthly Budget Calculator
          </h1>
          <p className="text-[#d5dceb] pb-5 px-6 mt-[18px] border-b border-[#304553] text-[16px]">
            Your information is confidential and is not visible to Stake.
          </p>
        </div>

        {/* Income & Expenses */}
        <div className="grid  grid-cols-2 gap-4 border-b-1  border-[#304553] pb-4 mt-5">
          {/* Income Section */}
          <div className="px-6">
            <h2 className="text-white font-bold text-[20px] leading-[28px]">
              Income
            </h2>
            <div className="space-y-4 mt-4">
              {/* Wages */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-1px]">Wages after deductions</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${Number(wages || 0).toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#0E212E]  hover:border-[#567086] active:border-[#567086] border-[2px] border-[#304553] rounded-md overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={wages}
                    onChange={(e) => handleChange(e, "wages", setWages)}
                    onBlur={() => handleBlur(wages, "wages", setWages)}
                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-[#7E8CA0] focus:outline-none "
                  />
                  <div className="px-2 mr-[2px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
                {errors.wages && (
                  <p className="text-[#F26F8A] text-sm mt-2">
                    <Icon name={"gamblingValidation"} />
                    {errors.wages}
                  </p>
                )}
              </div>

              {/* Pensions */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-2px]">Pensions</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${Number(pensions || 0).toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#0E212E] hover:border-[#567086] active:border-[#567086] border-[2px] border-[#304553] rounded-md overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={pensions}
                    onChange={(e) => handleChange(e, "pensions", setPensions)}
                    onBlur={() => handleBlur(pensions, "pensions", setPensions)}
                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-[#7E8CA0] focus:outline-none "
                  />
                  <div className="px-2 mr-[2px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
                {errors.pensions && (
                  <p className="text-[#F26F8A] text-sm mt-2">
                    <Icon name={"gamblingValidation"} />
                    {errors.pensions}
                  </p>
                )}
              </div>

              {/* Benefits */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-2px]">Benefits</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${Number(benefits || 0).toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#0E212E] hover:border-[#567086] active:border-[#567086] border-[2px] border-[#304553] rounded-md overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={benefits}
                    onChange={(e) => handleChange(e, "benefits", setBenefits)}
                    onBlur={() => handleBlur(benefits, "benefits", setBenefits)}
                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-[#7E8CA0] focus:outline-none "
                  />
                  <div className="px-2 mr-[2px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
                {errors.benefits && (
                  <p className="text-[#F26F8A] text-sm mt-2">
                    <Icon name={"gamblingValidation"} />
                    {errors.benefits}
                  </p>
                )}
              </div>

              {/* Other Income */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-2px]">Other income</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${Number(otherIncome || 0).toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#0E212E] hover:border-[#567086] active:border-[#567086] border-[2px] border-[#304553] rounded-md overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={otherIncome}
                    onChange={(e) =>
                      handleChange(e, "otherExpenses", setOtherIncome)
                    }
                    onBlur={() =>
                      handleBlur(otherIncome, "otherIncome", setOtherIncome)
                    }
                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-[#7E8CA0] focus:outline-none "
                  />
                  <div className="px-2 mr-[2px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
                {errors.otherExpenses && (
                  <p className="text-[#F26F8A] text-sm mt-2">
                    <Icon name={"gamblingValidation"} />
                    {errors.otherExpenses}
                  </p>
                )}
              </div>

              {/* Total Income */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3]  mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-2px]">Total income</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${totalIncome.toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#304553] border border-[#2E4351] rounded-md overflow-hidden">
                  <input
                    type="text"
                    step="0.01"
                    value={totalIncome.toFixed(2)}
                    readOnly
                    className="flex-1 bg-transparent px-[9px] pt-2 pb-[10px] text-white focus:outline-none"
                  />
                  <div className="px-2 mr-[3px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expenses Section */}
          <div className="px-6">
            <h2 className="text-white font-bold text-[20px] leading-[28px] ">
              Expenses
            </h2>
            <div className="space-y-4 mt-4">
              {/* Rent */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-1px]">Rent/mortgage</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${Number(rent || 0).toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#0E212E] hover:border-[#567086] active:border-[#567086] border-[2px] border-[#304553] rounded-md overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={rent}
                    onChange={(e) => handleChange(e, "rent", setRent)}
                    onBlur={() => handleBlur(rent, "rent", setRent)}
                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-[#7E8CA0] focus:outline-none "
                  />
                  <div className="px-2 mr-[2px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
                {errors.rent && (
                  <p className="text-[#F26F8A] text-sm mt-2">
                    <Icon name={"gamblingValidation"} />
                    {errors.rent}
                  </p>
                )}
              </div>

              {/* Bills */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-2px]">Utility bills</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${Number(bills || 0).toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#0E212E] hover:border-[#567086] active:border-[#567086] border-[2px] border-[#304553] rounded-md overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={bills}
                    onChange={(e) => handleChange(e, "bills", setBills)}
                    onBlur={() => handleBlur(bills, "bills", setBills)}
                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-[#7E8CA0] focus:outline-none "
                  />
                  <div className="px-2 mr-[2px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
                {errors.bills && (
                  <p className="text-[#F26F8A] text-sm mt-2">
                    <Icon name={"gamblingValidation"} />
                    {errors.bills}
                  </p>
                )}
              </div>

              {/* Loans */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-2px]">Loans/credit</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${Number(loans || 0).toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#0E212E] hover:border-[#567086] active:border-[#567086] border-[2px] border-[#304553] rounded-md overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={loans}
                    onChange={(e) => handleChange(e, "loans", setLoans)}
                    onBlur={() => handleBlur(loans, "loans", setLoans)}
                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-[#7E8CA0] focus:outline-none "
                  />
                  <div className="px-2 mr-[2px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
                {errors.loans && (
                  <p className="text-[#F26F8A] text-sm mt-2">
                    <Icon name={"gamblingValidation"} />
                    {errors.loans}
                  </p>
                )}
              </div>

              {/* Other Expenses */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-1px]">Other expenses</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${Number(otherExpenses || 0).toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#0E212E] hover:border-[#567086] active:border-[#567086] border-[2px] border-[#304553] rounded-md overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={otherExpenses}
                    onBlur={() =>
                      handleBlur(
                        otherExpenses,
                        "otherExpenses",
                        setOtherExpenses
                      )
                    }
                    onChange={(e) =>
                      handleChange(e, "otherExpenses", setOtherExpenses)
                    }
                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-[#7E8CA0] focus:outline-none "
                  />
                  <div className="px-2 mr-[2px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
                {errors.otherExpenses && (
                  <p className="text-[#F26F8A] text-sm mt-2">
                    <Icon name={"gamblingValidation"} />
                    {errors.otherExpenses}
                  </p>
                )}
              </div>

              {/* Total Expenses */}
              <div className="pt-1">
                <label className="flex justify-between text-[#B1BAD3] mb-1 text-sm font-medium">
                  <span className="font-semibold relative top-[-2px]">Total expenses</span>
                  <span className="text-[#B1BAD3] text-xs font-semibold">
                    ${totalExpenses.toFixed(2)}
                  </span>
                </label>
                <div className="flex items-center bg-[#304553] border border-[#2E4351] rounded-md overflow-hidden">
                  <input
                    type="text"
                    step="0.01"
                    value={totalExpenses.toFixed(2)}
                    readOnly
                    className="flex-1 bg-transparent px-[9px] pt-2 pb-[10px] text-white focus:outline-none"
                  />
                  <div className="px-2 mr-[3px] mb-[2.5px] text-green-400 font-bold">
                    {" "}
                    <Icon name={"gamblingcoin"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disposable Income */}
        <div className="bg-[#304553] mb-[22px] mt-4 mx-6 rounded-[8px] p-4">
          <h3 className="text-white font-semibold text-base mb-2">
            Disposable income
          </h3>
          <div className="flex items-center text-[16px] font-semibold text-white">
            <div className="relative top-[1px]"> ${disposableIncome.toFixed(2)}</div>
            <div className="ml-1">
              {" "}
              <Icon name={"gamblingcoin"} />
            </div>
          </div>
        </div>
        {disposableIncome < 0 && (
          <div className="flex mb-6 mx-6 items-center gap-2 border-2 border-dashed border-[#FF9D00] rounded-lg p-4 bg-[#0E212E] text-orange-400">
            <div>
              <svg
                data-ds-icon="Caution"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="inline-block shrink-0">
                <path
                  fill="currentColor"
                  d="M21.78 19.04 13.83 3.13c-.75-1.51-2.91-1.51-3.66 0l-7.95 15.9c-.68 1.36.31 2.96 1.83 2.96h15.9c1.52 0 2.51-1.6 1.83-2.96zM11 7c0-.55.45-1 1-1s1 .45 1 1v7c0 .55-.45 1-1 1s-1-.45-1-1zm1 12c-.83 0-1.5-.67-1.5-1.5S11.17 16 12 16s1.5.67 1.5 1.5S12.83 19 12 19"></path>
              </svg>
            </div>
            <p className="text-sm md:text-base">
              Your monthly expenses exceeds your monthly income. We strongly
              recommend that you implement and use{" "}
              <span className="font-semibold">Safer Gambling Tools</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
