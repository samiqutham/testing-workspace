"use client"

import recognize from "@workspace/ui/assets/responsible-gambling/recognize.svg";
import Icon from "@workspace/ui/icons/icons";

const warningSigns = [
  "I have extreme emotions or mood swings",
  "I feel that gambling is the only thing I really enjoy",
  "I have difficulty sleeping",
  "I often feel depressed or anxious",
  "I have suicidal thoughts",
  "I use gambling to avoid difficulties"
];

const gamblingIssues = [
  "I’m arguing more with my partner or family – especially about money, budgeting and debt.",
  "I’m preoccupied with gambling and finding it difficult to focus on other things.",
  "I’m spending less time with my friends and more time gambling.",
  "I’m not able to tell people the truth about how much I have lost.",
  "I’m stealing money from friends and family to gamble with."
];

const financialProblems = [
  "I am struggling to pay my bills on time.",
  "I am juggling my credit card debt.",
  "I have taken out a payday loan.",
  "I am using business money to gamble with.",
  "I have gambled with my savings.",
  "I am hiding my financial situation from those close to me."
];

export default function DRecogniseTheSign() {
  return (
    <>
      <div className="overflow-hidden relative">
        <div className="flex flex-col w-full">

          <div className="overflow-hidden rounded-[8px]">
            <img className="object-cover h-[136px] w-full" src={recognize.src} />
          </div>
          <div className="flex flex-col w-full mt-3 !text-[#D5DCEB]">
            <h2 className="font-bold text-[20px] leading-9 text-white w-full mb-1">
              Recognise The Signs of Gambling Dependency?
            </h2>
            <p className="font-normal text-base text-[#D5DCEB] leading-6">
              Often we find it is easier identifying problem gambling in others, but harder to recognise when this affects us as individuals. Although problem gambling often results in financial problems – the impact of problem gambling usually stretches much further than this. Recognizing the effects of gambling dependency is crucial in identifying and addressing the problem before it escalates further. Gambling dependency, also known as gambling addiction or gambling disorder, can have profound consequences on various aspects of an individual's life.
            </p>
            <h3 className="mt-[56px] mb-2 text-white font-bold text-[18px] leading-7">
              Is Gambling Affecting My Mental Health?
            </h3>

            <p className="font-normal text-base leading-6">
              Problem gambling can have a serious impact on your mental health. Do any of these statements sound familiar to you?
            </p>

            <ul className="list-disc pl-8 mb-4">
              {warningSigns.map((item, index) => (
                <li key={index} className="mt-1">
                  <p>
                    <span>{item}</span>
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="mt-[60px] mb-2 text-white font-bold text-[18px] leading-7">
              Is Gambling Affecting My Relationships?
            </h3>
            <p className="font-normal text-base leading-6">
              Gambling addiction can have a serious impact on relationships which can make it even harder on the gambler. Consider the following:
            </p>

            <ul className="list-disc pl-8 mb-[20px]">
              {gamblingIssues.map((item, index) => (
                <li key={index} className="mt-1">
                  <p>
                    <span>{item}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p className="font-normal text-base leading-6">
              The impact of gambling on relationships is profound and multifaceted, affecting not only the individuals directly involved but also their loved ones, including children. Recognizing the signs of gambling addiction and seeking
              help early is crucial in mitigating its destructive effects on relationships. Counseling, therapy, support groups, and financial guidance can provide individuals and families with the tools they need to navigate the challenges posed by gambling addiction and rebuild their relationships on a foundation of trust, communication, and mutual support.
            </p>


            <h3 className="mt-[56px] mb-2 text-white font-bold text-[18px] leading-7">
              Is Gambling Affecting My Finances?
            </h3>
            <p className="font-normal text-base leading-6">All gambling has an element of
              One of the most obvious ways in which gambling can become problematic is when debt begins to mount or when savings or money meant for other things is being spent on gambling.
            </p>
            <p className="font-normal text-base leading-6 mt-3"> Do any of these statements describe your situation?</p>

            <ul className="list-disc pl-8 mb-4">
              {financialProblems.map((item, index) => (
                <li key={index} className="mt-1">
                  <p>
                    <span>{item}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p className="font-normal text-base leading-6">
              Recognizing the signs of gambling addiction and seeking professional{" "}
              <a className=" hover:text-white underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer" >
                help
                <Icon name={"linkIcon"} />
              </a>{" "}
              is paramount in mitigating the financial fallout and reclaiming control over
              one's financial future. Through counseling, support groups, and financial
              planning, individuals can break free from the grip of gambling addiction and
              embark on a path towards financial stability and recovery.
            </p>

            <p className="font-normal text-base leading-6 mt-3">
              Stake is committed to responsible gambling, for more information visit{" "}
              <a className="inline-flex items-center gap-1 hover:text-white underline underline-offset-2 cursor-pointer">
                https://www.gamblingtherapy.org
                <Icon name={"linkIcon"}/>
              </a>
            </p>


            <p className="font-normal text-base leading-6 mt-3">
              Contact:{" "}
              <a className="inline-flex items-center gap-1 hover:text-white underline underline-offset-2 cursor-pointer" >
                support@gamblingtherapy.org
                <Icon name={"linkIcon"} />
              </a>
            </p>
          </div>

        </div>
      </div>
    </>

  );
}
