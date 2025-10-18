"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useState } from "react";
import Icon from "@workspace/ui/icons/icons";
// @ts-ignore
import responsible from "@workspace/ui/assets/responsible-gambling/self-assessment-failure-en.avif";

const questions = [
  "Have there ever been periods lasting two weeks or longer when you spent a lot of time thinking about your gambling experiences, planning out future gambling ventures or bets, or thinking about ways of getting money to gamble with?",
  "Have there ever been periods when you needed to gamble with increasing amounts of money or with larger bets than before in order to get the same feeling of excitement?",
  "Have you ever felt restless or irritable when trying to stop, cut down, or control your gambling?",
  "Have you tried and not succeeded in stopping, cutting down, or controlling your gambling three or more times in your life?",
  "Have you ever gambled to escape from personal problems, or to relieve uncomfortable feelings such as guilt, anxiety, helplessness, or depression?",
  "Has there ever been a period when, if you lost money gambling one day, you would often return another day to get even?",
  "Have you lied to family members, friends, or others about how much you gamble, and/or about how much money you lost on gambling, on at least three occasions?",
  "Have you ever written a bad cheque or taken money that didn’t belong to you from family members, friends, or anyone else in order to pay for your gambling?",
  "Has your gambling ever caused serious or repeated problems in your relationships with any of your family members or friends? Or, has your gambling ever caused you problems at work or your studies?",
  "Have you ever needed to ask family members, friends, a lending institution, or anyone else to loan you money or otherwise bail you out of a desperate money situation that was largely caused by your gambling?",
];

const SelfAssessment = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    console.log(`Q${step + 1} Answer:`, answer);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const progress = ((step + 1) / questions.length) * 100;
  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          showCloseButton={false}
          className="p-0 min-w-[200px] !max-w-[500px] w-[95%] border-0 bg-[#1a2c38] rounded-lg text-white font-sans shadow-lg !gap-0 animate-modal-popover "
        >
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
          </DialogHeader>

          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold flex items-center gap-2 !font-[proxima-nova]">
              <div>
                <Icon name={"selfAssessment"} />
              </div>
              Self Assessment Questionnaire
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 cursor-pointer hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-4 !font-[proxima-nova]">
            {" "}
            <div className="flex items-center justify-between">
              {step > 0 && (
                <div
                  className="flex items-center cursor-pointer w-full"
                  onClick={handlePrevious}
                >
                  {" "}
                  <Icon name="arrowDown" className="w-5 h-5 rotate-90" />
                  <div> Previous Question </div>{" "}
                </div>
              )}{" "}
              <p className="text-[16px] text-[#B1BAD3] flex justify-end w-full">
                {step + 1}/10
              </p>
            </div>
            <div className="w-full bg-[#304553] h-[15px] rounded-full mt-2">
              <div
                className="bg-[#1475e1] h-[15px] rounded-full  transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="px-4 pt-6 pb-4">
            <p className="text-[#B1BAD3] text-[16px] font-medium mb-2 !font-[proxima-nova]">
              Question {step + 1}
            </p>
            <p className="mb-4 text-[16px] font-semibold font-[proxima-nova]">{questions[step]}</p>

            {/* Buttons */}
            <div className="flex gap-2 !font-[proxima-nova]">
              <button
                onClick={() => handleAnswer("Yes")}
                className="flex-1 bg-[#304553] py-[10px] cursor-pointer rounded-lg font-semibold"
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer("No")}
                className="flex-1 bg-[#304553] py-[10px] cursor-pointer rounded-lg font-semibold"
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent
          showCloseButton={false}
          className="p-0 min-w-[200px] !max-w-[500px] w-[95%] border-0 bg-[#1a2c38] rounded-lg text-white font-sans shadow-lg !gap-0 animate-modal-popover max-h-[calc(100%-4em)]"
        >
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
          </DialogHeader>
          <div className="flex items-center p-4 justify-between !font-[proxima-nova]">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <div>
                <Icon name={"selfAssessment"} />
              </div>
              Self Assessment Questionnaire
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 cursor-pointer hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="!font-[proxima-nova] overflow-auto !max-h-[467.63px]">
            <div className="overflow-hidden">
              <img
                className="object-cover w-full h-[170px]"
                src={responsible.src}
              />
            </div>

            <div className="px-4 py-4 !font-[proxima-nova]">
              <div className="text-[white] text-[20px] font-bold mb-2">
                Your Results Suggest You May Need Support
              </div>
              <p className="mb-4 text-[#B1BAD3]">
                <span>
                  Based on your responses, we strongly recommend setting up
                  responsible gambling tools to support your well-being.
                </span>
                <span className="mt-2 block">
                  Contact our live support team should you require assistance in
                  setting a responsible gambling tool on your account.
                </span>
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button

                  className="flex-1 bg-[#304553] py-3 cursor-pointer rounded-lg font-semibold"
                >
                  Contact Support
                </button>
                <button

                  className="flex-1 bg-[#304553] py-3 cursor-pointer rounded-lg font-semibold"
                >
                  Learn More
                </button>

              </div>
              <button className="w-full bg-[#1375E1] text-[16px] px-[20px] py-[10px] rounded-lg mt-2 ">Done</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelfAssessment;
