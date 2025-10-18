"use client";

import responsible from "@workspace/ui/assets/responsible-gambling/responsible.svg";
import Icon from "@workspace/ui/icons/icons";

export default function DGamblingFaqs() {
  return (
    <>
      <div className="overflow-hidden relative">
        <div className="flex flex-col w-full">

          <div className="overflow-hidden rounded-[8px]">
            <img className="object-cover h-[136px] w-full" src={responsible.src} />
          </div>
          <div className="flex flex-col w-full mt-4 !text-[#D5DCEB]">
            <h2 className="font-bold text-[20px] leading-7 text-white w-full mb-2">
              Responsible Gambling FAQ's
            </h2>

            <h3 className="mt-6 mb-2 text-white font-bold text-[18px] leading-7">
              1. Isn't problem gambling just a financial problem?
            </h3>
            <p className="font-normal text-base text-[#D5DCEB] leading-6">
              No. Problem gambling is a behavioural addiction that has financial and other consequences. Even if the person pays off their gambling debts, they can still have other problems caused by gambling.
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-[18px] leading-7">
              2. Do you have to wager often to be considered as someone being affected by problem gambling?
            </h3>

            <p className="font-normal text-base leading-6 mt-3">
              It really doesn’t matter how often a person wagers. If a person’s gambling is causing emotional, physical, financial, relationship or other challenges for themselves and the people around them, then they are affected as a result of problem gambling.
            </p>

            <h3 className="mt-6 mb-2 text-white font-bold text-[18px] leading-7">
              3. How much money do you have to lose before gambling is a problem?
            </h3>
            <p className="font-normal text-base leading-6 mt-[13px]">
              The amount of money lost or won does not determine when gambling becomes problematic. Problem gambling is a behavioural addiction, of which negatively affects ones finances simply as a direct result of the behavioural addiction. While gambling can cause financial problems, it is not the only warning sign of a gambling problem. When gambling affects an individual’s relationships, job, mental, physical or financial well-being, it is problematic.
            </p>

            <h3 className="mt-[36px] mb-2 text-white font-bold text-[18px] leading-7">
              4. Who is at risk for problem gambling?
            </h3>

            <p className="font-normal text-base leading-6">
              Problem gambling does not discriminate and can impact anyone who gambles regardless of economic, social, cultural or levels of education. Anyone who gambles can develop a gambling problem. Certain factors can increase your risk of developing a gambling addiction, genetics, environment, medical history and age may all play a role.
            </p>

            <h3 className="mt-6 mb-2 text-white font-bold text-[18px] leading-7">
              5. How can I protect myself from problem gambling?
            </h3>

            <ul className="list-disc pl-8 mb-4">
              <li className="mt-1">
                Educate yourself on the risks associated to gambling
              </li>
              <li className="mt-1">
                Understand that gambling is entertainment, not a source of income
              </li>
              <li className="mt-1">
                Use of Responsible Gambling tools plays a critical role in managing your gambling activities
              </li>
              <li className="mt-1">
                <a className="hover:text-white underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer">Budget</a> for your gambling activities
              </li>
              <li className="mt-1">
                Avoid chasing losses or wins, no bet outcome is guaranteed
              </li>
              <li className="mt-1">
                When the fun stops, it is a clear indication that you need to stop
              </li>
            </ul>
            <h3 className="mt-[28px] mb-2 text-white font-bold text-[18px] leading-7">
              6. What are responsible gambling interactions?
            </h3>

            <p className="font-normal text-base leading-6">
              Responsible gambling interactions are communicated in the form of an email or software messaging. These interactions are aimed at promoting healthy gambling activity, assisting you in understanding the tools and resources available in order to manage your gambling activities. They typically include information about setting limits, {""}
              <a className="hover:text-white underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer">recognising signs</a> of problem gambling, and accessing {""}
              <a className="hover:text-white underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer">support</a> resources.
            </p>

            <h3 className="mt-[36px] mb-2 text-white font-bold text-[18px] leading-7">
              Help Organizations
            </h3>

            <p className="font-normal text-base leading-6">
              If you are worried about yourself, or if someone you know is having problems managing their gambling, there are several external support agencies that can assist with providing advice.
            </p>


            <p className="font-[600] text-base leading-6 mt-6 ">
              Gamblers Anonymous
            </p>

            <p className="font-normal text-base leading-6 mt-3 flex items-center gap-1">
              Website: <a className="hover:text-white inline-flex items-center gap-1 cursor-pointer">https://gamblersanonymous.org/ga/ <Icon name={"linkIcon"} /></a>
            </p>

            <p className="font-[600] text-base leading-6 mt-6 ">
              Gambling Therapy
            </p>

            <p className="font-normal text-base leading-6 mt-3 flex items-center gap-1">
              Website: <a className="hover:text-white inline-flex items-center gap-1 cursor-pointer">https://www.gamblingtherapy.org/ <Icon name={"linkIcon"} /></a>
            </p>

            <p className="font-normal text-base leading-6 mt-3 flex items-center gap-1">
             Contact: <a className="hover:text-white inline-flex items-center gap-1 cursor-pointer">support@gamblingtherapy.org <Icon name={"linkIcon"} /></a>
            </p>

            <p className="font-[600] text-base leading-6 mt-6 ">
              The National Council on Problem Gambling
            </p>

            <p className="font-normal text-base leading-6 mt-3 ">
              The National Council on Problem Gambling provides a range of resources, including answers to commonly asked questions, a gambling behavior self-assessment, information about treatment and the National Problem Gambling Helpline (1-800-GAMBLER) to connect you with help in your state (Canada).
            </p>

            <p className="font-normal text-base leading-6 mt-3 flex items-center gap-1">
              Tel:+18004262537 Chat: <a className="hover:text-white inline-flex items-center gap-1 cursor-pointer">https://www.ncpgambling.org/help-treatment/chat/ <Icon name={"linkIcon"} /></a>
            </p>
            
          </div>

        </div>
      </div>
    </>
  );
}
