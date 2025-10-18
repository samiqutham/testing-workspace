import Link from "next/link";

export default function Page() {
  const tabs = [
    { label: "Account", href: "/settings/account" },
    { label: "Security", href: "/settings/security" },
    { label: "Preferences", href: "/settings/preferences" },
    { label: "API", href: "/settings/api" },
    { label: "Verification", href: "/settings" },
    { label: "Offers", href: "/settings/offers" },
  ];

  return (
    <div className="py-2">
      {/* Back button same as affiliate */}

      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="transition hover:no-underline bg-transparent text-white hover:bg-grey-900 hover:text-white focus-visible:outline-white text-[16px] py-[0.625rem] px-[1.25rem] rounded-full w-full justify-start block relative items-center font-semibold whitespace-nowrap"
        >
          <span className="ds-body-md-strong">{tab.label}</span>
        </Link>
      ))}
    </div>
  );
}
