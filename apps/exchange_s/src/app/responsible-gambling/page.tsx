import Link from "next/link";

export default function page() {
  const tabs = [
    { href: "/responsible-gambling/stakesmart", label: "Stake Smart" },
    {
      href: "/responsible-gambling/recognise-the-sign",
      label: "Recognise the Signs",
    },
    {
      href: "/responsible-gambling/gambling-faqs",
      label: "Responsible Gambling FAQ's",
    },
    { href: "/responsible-gambling/self-exclusion", label: "Self Exclusion" },
    { href: "/responsible-gambling/gambling-limits", label: "Gambling Limits" },
    { href: "/responsible-gambling/deposit-limit", label: "Deposit Limits" },
    { href: "/responsible-gambling/self-assessment", label: "Self Assessment" },
    {
      href: "/responsible-gambling/budget-calculator",
      label: "Budget Calculator",
    },
  ];

  return (
    <div className="py-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className=" transition  hover:no-underline bg-transparent text-white hover:bg-grey-900 hover:text-white focus-visible:outline-white text-[16px] py-[0.625rem] px-[1.25rem] rounded-full w-full justify-start block relative items-center  font-semibold whitespace-nowrap">
          <span className="ds-body-md-strong">{tab.label}</span>
        </Link>
      ))}
    </div>
  );
}
