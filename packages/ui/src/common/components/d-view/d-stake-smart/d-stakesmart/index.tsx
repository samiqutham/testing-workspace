"use clirent"
import sportsImg from "@workspace/ui/assets/responsible-gambling/stake-smart-banner.svg";
import managment from "@workspace/ui/assets/responsible-gambling/managment.svg";
import amount from "@workspace/ui/assets/responsible-gambling/amount.svg";
import offord from "@workspace/ui/assets/responsible-gambling/offord.svg";
import risk from "@workspace/ui/assets/responsible-gambling/risk.svg";
import identify from "@workspace/ui/assets/responsible-gambling/identify.svg";
import limit from "@workspace/ui/assets/responsible-gambling/identify.svg";
export default function DStakeSmart() {

  const tips = [
    {
      img: managment.src,
      text: "Effective management of your gambling activities can be done by prioritizing other recreational activities too",
      bg: "bg-[#213743]",
    },
    {
      img: amount.src,
      text: "Before a gambling session, have a plan in mind of how much you want to spend gambling, and how long you will be gambling for",
      bg: "bg-gray-500",
    },
    {
      img: offord.src,
      text: "Do not spend more than what you can afford to lose",
      bg: "bg-gray-500",
    },
    {
      img: risk.src,
      text: "Understanding the odds and knowing the risks associated with gambling",
      bg: "bg-gray-500",
    },
    {
      img: identify.src,
      text: "Identify when you are no longer having fun or where gambling has become a problem for you, and stop",
      bg: "bg-gray-500",
    },
    {
      img: limit.src,
      text: "Set loss limits, wager limits to assist with managing your gambling activities",
      bg: "bg-gray-500",
    },
  ];
  const periods = ["1 Day", "1 Week", "1 Month", "2 Months", "3 Months"];
  const durations = [
    "6 Months",
    "1 Year",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
    "10 Years",
    "Indefinite",
  ];
  const safetyTips = [
    "Do not leave your computer unattended when your casino software is running.",
    "Password-protect your casino program.",
    "Do not allow minors to participate in any gambling activity.",
    "Keep your casino account number and payment card(s) out of reach of minors.",
    "Do not save passwords onto your computer.",
    "Limit the amount of time your children spend online and make use of software to prevent your children from accessing inappropriate material."
  ];

  return (
    <>
      <div className="overflow-hidden relative ">
        <div className="flex flex-col w-full ">

          <div className="overflow-hidden rounded-[8px]">
            <img className="object-cover h-[136px] w-full" src={sportsImg.src}/>
          </div>
          <div className="flex flex-col w-full mt-4 !text-[#D5DCEB]">
            <h2 className="font-bold text-2xl leading-9 text-white w-full mb-2">
              Mission Statement
            </h2>
            <p className="font-normal text-base leading-6 mt-3">
              Stake is dedicated to fostering responsible gambling practices to all customers on
              our platform and within our community. We are committed to ensuring that our
              customers are educated on our various responsible gambling tools available for use,
              promote gambling as a form of
              entertainment and empowering individuals to make informed decisions about their
              gambling activities.
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              6 Tips For Effective Management Of Your Gambling Activities
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 pt-2 !text-[#D5DCEB]">
              {tips.map((item, index) => (
                <li
                  key={index}
                  className={`grid grid-flow-col auto-cols-auto gap-3 p-4 shadow-md rounded-lg bg-[#213743]`}
                >
                  <div className="w-[36px] flex items-center">
                    <img src={item.img} alt="tip icon" />
                  </div>
                  <span className="inline-flex items-center font-normal text-base leading-6">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              House Advantage/House Edge
            </h3>
            <p className="font-normal text-base leading-6">
              Games have a house edge to ensure a percentage of the total amount wagered is returned to the House, which in this case is Stake.
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              Randomness
            </h3>
            <p className="font-normal text-base leading-6">All gambling has an element of
              randomness - there is no way to control the outcome of any casino game or sporting
              event.
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              Independent Outcomes
            </h3>
            <p className="font-normal text-base leading-6">
              Games/Spins are not related. Their outcomes are not dependent on how much, or how long, you've previously played the game for.
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              Odds and Probability
            </h3>
            <p className="font-normal text-base leading-6">
              Odds and probability are ways to describe your chances of winning. Whilst the odds can appear to be low, there are no certainties in betting.
            </p>
            <h2 className="mt-6 mb-2 text-white font-bold text-xl leading-7"></h2>
            <h2 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              Introducing Our Responsible Gambling Tools
            </h2>
            <p className="font-normal text-base leading-6">
              Gambling should always be a form of entertainment. In order to assist you in keeping your gambling activities fun, Stake has a range of responsible gambling tools which you are able to make use of at any point in time.
            </p>
            <p className="font-normal text-base leading-6 mt-3">
              Play for fun, not for funds.
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              Gambling Limits
            </h3>
            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              Loss Limits
            </h3>
            <p className="font-normal text-base leading-6">
              <span>A loss limit allows you to set a limit
                on how much you can afford to lose over your set period of time. The limit can be
                set over a period of one day, one week or one month. It is a net loss
                limit.
              </span>
              <span>Profits made during your set period
                will not count towards your limit amount. If you are profitable during the set
                period, you are able to use your profits to continue to wager and bet until you
                reach your loss limit. Unsettled bets count towards the limit. Please check your
                unsettled bets if you are unable to place bets, as these unsettled bets may be
                causing you to reach your limit.
              </span>
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              Wager Limits
            </h3>
            <p className="font-normal text-base leading-6">
              <span>A wager limit (or betting limit)
                allows you to set a limit on how much you can wager over your set period of time.
                The maximum bet limit can be set over a period of one day, one week or one month.
                The limit
              </span>
              <span> is not a net limit</span>
              <span> so profits are excluded. This means, if you are profitable during the period these profits are not offset against your maximum bet limit.
              </span>
            </p>
            <p className="font-normal text-base leading-6">
              <span>Decreasing an existing limit(s) is
                effective immediately. When increasing your limit(s), your new limit(s) will be
                subject to a </span>
              <span>24-hour cool off period</span>
              <span> before your new limit takes effect.</span>
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-xl leading-7">
              Deposit Limits
            </h3>
            <p className="font-normal text-base leading-6">
              <span>
                At Stake, we are committed to promoting responsible gambling and giving you greater
                control over your gambling activities. That's why we offer deposit limits, a tool
                designed to help you manage how much money you can deposit and play with over a set
                period.</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[36px]">
              <span>What are Deposit Limits?</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              <span>
                Deposit limits allow you to cap the amount of money you can deposit daily. Once you
                reach your set limit, you won't be able to deposit more funds until the daily limit
                resets.</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              <span className="font-bold">Withholding Balance:</span>
              <span>
                Your withholding balance refers to funds you have deposited in excess of your set
                deposit limit, which is temporarily held and unavailable for use. Once your daily
                deposit limit resets, an amount equal to your limit will be released from your
                withholding balance and made available in your account. Currently, it is important
                to note that Stake supports daily deposit limits only.</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[36px]">
              <span className="font-bold">How to Set a Deposit Limit:</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>Step 1: Go to </span>
              <a className="underline [text-underline-offset:25%] text-white">
                <span>Responsible Gambling
                  Page</span>
              </a>
              <span> &gt; Select
                the </span>
              <a className="underline [text-underline-offset:25%]">
                <span>Deposit
                  Limits </span>
              </a>
              <span>
                option</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>
                Step 2: Select the option 'Add Limit'</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>
                Step 3: Enter your desired amount you wish to set</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>
                Step 4: Proceed by clicking on 'Add Limit' to process limit request</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[36px]">
              <span>You have the ability to:
              </span>
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li className='mt-1'>
                <p>
                  Set a deposit limit
                </p>
              </li>
              <li className='mt-1'>
                <p>
                  Increase a deposit limit
                </p>
              </li>
              <li className='mt-1'>
                <p>Decrease a deposit limit Remove a deposit limit</p>
              </li>
            </ul>
            <p className="font-normal text-base leading-6 mt-[24px]">
              Note: Cooling-Off Periods
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              Setting or decreasing your deposit limit is effective immediately. Increasing or removing your existing deposit limit is subject to a 24-hour cooling off period.
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>Important Notes:</span>
              <span>
                Deposit limits apply only to deposits, not to wagers or losses. To set a wager or
                loss limit, see
              </span>
              <a className="underline [text-underline-offset:25%]">
                <span> here</span>
              </a>
              <span>.</span>
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-[18px] leading-6">
              <span id="Self-Exclusion">Self-Exclusion</span>
            </h3>
            <p>
              <span>A </span>
              <a className="underline [text-underline-offset:25%]">
                <span>self-exclusion</span>
              </a>
              <span> tool offers the ability to suspend all access to your
                account should you feel that you are at risk of developing a </span>
              <a className="underline [text-underline-offset:25%]">
                <span>gambling
                  problem</span>
              </a>
              <span>, or in some
                cases, believe you currently have one. </span>
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              <span>The available periods are as follows:</span>
            </p>

            <ul className="list-disc pl-8 mb-4">
              {durations.map((duration, index) => (
                <li key={index} className="mt-1">
                  <p>
                    <span>{duration}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p className="font-normal text-base leading-6 mt-[24px]">
              <span>In the event an </span>
              <a className="underline [text-underline-offset:25%]">
                indefinite exclusion
              </a>
              <span> is set, access to your account(s) will remain blocked until such time should you actively request to revoke the indefinite exclusion. The indefinite exclusion imposes a
              </span>
              <span>minimum exclusion period of at least 6 months</span>
              <span>, from the date of application. Once the 6 month period has lapsed, your account can be considered for reactivation subject to a formal return to play review. </span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>In order to initiate the review
                process, please contact our support team via email.</span>
            </p>
            <h3 className="mt-9 mb-2 text-white font-bold text-[18px] leading-6">
              <span id="Break_in_Play">Break in Play</span>
            </h3>
            <p className="font-normal text-base leading-6">
              <span>Stake also provides alternative options to suspend your account temporary, known as </span>
              <a className="underline [text-underline-offset:25%]">
                Break in Play
              </a>
              <span>. Whether you would like to take a break from gambling to re-evaluate your personal goals, save some money or simply spend time on other activities, the option is made available to you. </span>
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              The available periods are as follows:
            </p>
            <ul className="list-disc pl-8 mb-4">
              {periods.map((period, index) => (
                <li key={index} className="mt-1">
                  <p>{period}</p>
                </li>
              ))}
            </ul>
            <p className="font-normal text-base leading-6 mt-[24px]">
              <span className="font-[600]">Note:</span>
              <span> Stake reserves the right to self-exclude a customers account should we determine
                that gambling may not be safe for you to continue.</span>
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-[18px] leading-6">
              Applying a Self-Exclusion on your Account
            </h3>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>1. Navigate to our Stake Smart Self-Exclusion </span>
              <a className="underline [text-underline-offset:25%]">
                page
              </a>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>2. Select the '</span>
              <span>Request Self-Exclusion</span>
              <span>' option in the bottom right hand corner</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>3. Using the drop down options, select the applicable timeframe</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>4. Once you have selected the timeframe, proceed by clicking '</span>
              <span>Next</span>
              <span>'</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>5. Confirm your self-exclusion by proceeding with clicking on the '</span>
              <span>Confirm</span>
              <span>' option</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              <span>Note:</span>
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li className="mt-1">
                <p>
                  <span>It will not be
                    possible to reactivate your account until the chosen time period has
                    lapsed</span>
                </p>
              </li>
              <li className="mt-1">
                Where a defined self-exclusion is in effect, your account will automatically reactivate once the chosen time period has lapsed
              </li>
              <li className="mt-1">
                Where an indefinite self-exclusion is in effect, whether applied by the client or operator, a minimum of 6 months must pass before the account can be considered for review
              </li>
            </ul>
            <h3 className="mt-6 mb-2 text-white font-bold text-[18px] leading-6">
              Closing My Stake Account
            </h3>
            <p className="font-normal text-base leading-6">
              Stake provides the option to close your account should you wish. An individual may opt to close their account for different reasons, perhaps does not find gambling entertaining anymore, or for any other personal reasons unrelated to problem gambling.
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              To close your account, a request must be made to our Customer Support Team via chat or email which is support@stake.com
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              It is important to note that once your account has been closed, Stake will prohibit
              you from:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li className="mt-1">
                Accessing your account
              </li>
              <li className="mt-1">
                Receiving any further bonuses or promotional material
              </li>
            </ul>
            <h3 className="mt-9 mb-2 text-white font-bold text-[18px] leading-7">
              <span id="Reactivating_Your_Closed_Account">Reactivating Your
                Closed Account</span>
            </h3>
            <p className="font-normal text-base leading-6">
              In the event you wish to reactivate
              your account, a formal written request needs to be made via chat or email service
              (support@stake.com) for the account to be reactivated. A minimum cool off period of
              24 hours must lapse from the time the account was closed, before your account may be
              considered for reopening. In some instances, Stake may, at our discretion, conduct
              internal checks prior to making a decision to reopen an account.
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              Note: Stake reserves the right to close a customers account at any point in time, at our sole discretion.
            </p>
            <h3 className="mt-6 mb-2 text-white font-bold text-[18px] leading-7">
              <span id="Help_Organizations_">Help Organizations </span>
            </h3>
            <p className="font-normal text-base leading-6">
              If you are worried about yourself, or if someone you know is having problems managing their gambling, there are several external support agencies that can assist with providing advice.
            </p>
            <h4 className="mt-9 mb-2 text-white font-bold text-[18px] leading-7">
              <span id="Gamblers_Anonymous">Gamblers Anonymous</span>
            </h4>
            <p className="font-normal text-base leading-6">
              <span>Website</span>
              <span>:</span>
              <span>&nbsp;</span>
              <a>
                https://gamblersanonymous.org/ga/
              </a>
            </p>
            <h4 className="mt-6 mb-2 text-white font-bold text-[16px] leading-[24px]">
              Gambling Therapy
            </h4>
            <p className="font-normal text-base leading-6">
              <span>Website</span>
              <span>:&nbsp;</span>
              <a>
                https://www.gamblingtherapy.org/
              </a>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>Contact</span>
              <span>:</span>
              <span>&nbsp;</span>
              <a>
                support@gamblingtherapy.org
              </a>
            </p>
            <h4 className="mt-12 mb-2 text-white font-bold text-[16px] leading-[24px]">
              The National Council on Problem Gambling
            </h4>
            <p className="font-normal text-base leading-6">
              <span>The National Council on Problem
                Gambling provides a range of resources, including answers to commonly asked
                questions, a gambling behavior self-assessment, information about treatment and the
                National Problem Gambling Helpline (1-800-GAMBLER) to connect you with help in your
                state (Canada).</span>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              Tel:+18004262537 Chat:
              <a>
                <span> https://www.ncpgambling.org/help-treatment/chat/</span>
              </a>
            </p>
            <h4 className="mt-9 mb-2 text-white font-bold text-[16px] leading-[24px]">
              Gamtalk
            </h4>
            <p className="font-normal text-base leading-6">
              Gamtalk provides information on helplines, treatment and online resources from organizations around the world dedicated to helping those struggling with problem gambling.
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              <span>Website: </span>
              <a>
                https://www.gamtalk.org/treatment-support/
              </a>
            </p>
            <h2 className="mt-9 font-bold text-2xl leading-9 text-white w-full mb-2">
              Minors
            </h2>
            <p className="font-normal text-base leading-6">
              Stake.com does not support underage
              gambling.
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              Underage gambling is illegal, and is defined as anyone who is under the age of 18 years old at the time of account registration.
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              No winnings should be paid to such players if identified as someone who is underage.
            </p>
            <h3 className="mt-9 mb-2 text-white font-bold text-[18px] leading-7">
              <span id="Tips_for_Parents">Tips for Parents</span>
            </h3>
            <ul className="list-disc pl-8 mb-4">
              {safetyTips.map((tip, index) => (
                <li key={index} className="mt-1">
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 mb-2 text-white font-bold text-[18px] leading-7">
              <span id="Gambling_Blocks">Gambling Blocks</span>
            </h3>
            <p className="font-normal text-base leading-6 mt-[12px]">
              There are gambling site blocker apps available to help restrict access to gambling websites as a protective measure in safeguarding yourself, or in some instances, safeguarding the risk of gambling exposure to a minor. Betblocker
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <a>
               https://www.betblocker.org/
              </a>
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              Netnanny:
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              Netnanny offers protective measures which varies from website and app blocks to parental controls.
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>Website: </span>
              <a>
                https://www.netnanny.com/
              </a>
            </p>
            <p className="font-normal text-base leading-6 mt-[24px]">
              Gamblock:
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>
                Gamblock is a mobile app that blocks access to thousands of gambling websites and
                provides access to useful resources. Website: 
              </span>
              <a>
                <span> http://www.gamblock.com/</span>
              </a>
            </p>
            <p className="font-normal text-base leading-6 mt-[12px]">
              <span>
                *Stake does not accept any liability in respect of any third-party software.
              </span>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
