"use client";

import responsible from "@workspace/ui/assets/responsible-gambling/self-assessment-en.svg";
import SelfAssessment from "@workspace/ui/common/modal/responsible-gambling-modals/SelfAssessment";
import { useState } from "react";

export default function DSelfAssessment() {
  const [isSelfAssessment, setIsSelfAssessment] = useState<any>(false);
  return (
    <>
      <div>
        {" "}
        <div className="overflow-hidden mb-5 rounded-lg">
          <img
            className="object-cover w-full h-[136px]"
            src={responsible.src}
          />
        </div>
        <div className=" mx-auto bg-[#1A2C38]  text-white rounded-[8px] border-[2px] border-[#2E4351]  space-y-6">
          {/* Heading */}
          <div className="px-[24px] pt-[32px]">
            <h2 className="text-xl font-bold mb-2">Your Gambling Habits</h2>
            <p className="text-[#D5DCEB] leading-relaxed">
              Complete the NODS Self-Assessment - a quick 3-minute quiz with 10
              questions - to better understand your current gambling habits.
            </p>
          </div>

          <div className="flex justify-end text-[#D5DCEB] p-4 mt-4 text-[16px] border-t border-[#304553]">
            <button
              type="submit"
              onClick={() => setIsSelfAssessment(true)}
              className="bg-[#1475e1] cursor-pointer active:scale-[.98] hover:bg-[#105eb4] transition-colors text-white font-semibold px-5 py-[10px] rounded-[8px]"
            >
              Start Self-Assessment
            </button>
          </div>
        </div>
      </div>
      {isSelfAssessment && (
        <SelfAssessment
          open={isSelfAssessment}
          onClose={() => setIsSelfAssessment(false)}
        />
      )}
    </>
  );
}
