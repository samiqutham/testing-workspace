import Link from "next/link";

export default function page() {
  const tabs = [
    { href: "/transactions/deposits", label: "Deposits" },
    { href: "/transactions/withdraw", label: "Withdrawals" },
    { href: "/transactions/bonuses", label: "Bonuses" },
    { href: "/transactions/raffles", label: "Raffles" },
    { href: "/transactions/races", label: "Races" },
    { href: "/transactions/others", label: "Other" },
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
