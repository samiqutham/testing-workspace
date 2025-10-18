import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import ModalLoader from "@workspace/ui/common/modal/modal-loader/index";


interface WalletSettingProps {
    open: boolean;
    onClose: () => void;
    onWalletModalOpen?: () => void;
}

const WalletSetting = ({ open, onClose, onWalletModalOpen }: WalletSettingProps) => {
    const [activeTab, setActiveTab] = useState("settings");
    const [selected, setSelected] = useState("USD");
    const [hideZeroBalances, setHideZeroBalances] = useState(false);
    const [hideInactiveAssets, setHideInactiveAssets] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const currencies = [
        { code: "USD", color: "#6CDE07" },
        { code: "EUR", color: "#0F8FF8" },
        { code: "JPY", color: "#EAC749" },
        { code: "INR", color: "#276304" },
        { code: "CAD", color: "#61121F" },
        { code: "CNY", color: "#EAC749" },
        { code: "IDR", color: "#EB0A29" },
        { code: "KRW", color: "#0F97F8" },
        { code: "PHP", color: "#0F97F8" },
        { code: "RUB", color: "#fff" },
        { code: "DKK", color: "#fff" },
        { code: "MXN", color: "#EB0A29" },
        { code: "PLN", color: "#EB0A29" },
        { code: "TRY", color: "#fff" },
    ];
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleOverviewClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
        if (onWalletModalOpen) {
            onWalletModalOpen();
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent
                    showCloseButton={false}
                    className={`p-0 overflow-hidden min-w-[200px] w-[500px]  border-0 bg-[#1a2c38] rounded-[8px]  gap-0 animate-modal-popover ${isLoading ? 'h-[310px]' : 'max-h-auto'}`}>
                    <DialogHeader className="flex !flex-row h-[60px] justify-between items-center !bg-[#1A2C38] text-white !p-4 !border-none !outline-none !shahdow-none">
                        <DialogTitle className="font-bold text-[18px] leading-[28px] !min-h-[28px] flex items-center gap-2">
                            <Icon
                                name={"popwallet"}
                                width={20}
                                height={20}
                                fill="#b1bad3"
                                className="inline-block shrink-0 text-[#b1bad3]"
                            />
                            <div className="text-white !min-h-[28px]">Wallet</div>
                        </DialogTitle>
                        <DialogClose asChild>
                            <button className="text-xl leading-none cursor-pointer outline-0">
                                <Icon
                                    name={"closeIcon"}
                                    className="w-5 h-5 hover:fill-[white]"
                                    fill="#b1bad3"
                                />
                            </button>
                        </DialogClose>
                    </DialogHeader>

                    {isLoading ? (
                        <ModalLoader />
                    ) : (
                        <div className="overflow-y-auto overflow-x-hidden max-h-[calc(100vh-150px)] bg-[#1A2C38] scrollbar-hide">
                            <div className="flex flex-col flex-1 relative gap-0">


                                <div className="flex flex-col px-4 gap-4">
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="flex w-full">
                                            <div className="flex flex-grow shrink-0 h-[56px] rounded-[3rem] p-[6px] bg-[#0F212E]">
                                                <div className="flex flex-grow gap-2">
                                                    <button
                                                        onClick={handleOverviewClick}
                                                        className={`inline-flex relative items-center justify-center whitespace-nowrap text-white py-2 px-4 outline-none rounded-full flex-1 hover:bg-[#2F4553] text-[16px] font-semibold cursor-pointer ${activeTab === "overview" ? "bg-[#2F4553]" : "bg-transparent"}`}>
                                                        Overview
                                                    </button>

                                                    <button
                                                        onClick={() => setActiveTab("settings")}
                                                        className={`inline-flex relative items-center justify-center whitespace-nowrap flex-1 text-[16px] font-semibold  text-white  py-2 px-4 rounded-full hover:bg-[#2F4553] outline-none  cursor-pointer ${activeTab === "settings" ? "bg-[#2F4553]" : "bg-transparent"}`}>
                                                        Settings
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 !pb-0"
                                    style={{
                                        '--slider-size': '2.5em',
                                        '--indicator-size': '1em',
                                        '--border-size': '4px',
                                        '--input-border': '#444c56',
                                        '--color-green-600': '#16a34a',
                                        '--color-white': '#fff'
                                    } as any} >

                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={hideZeroBalances}
                                            onChange={() => setHideZeroBalances(!hideZeroBalances)}
                                            className="sr-only peer"
                                        />
                                        <div
                                            className={`relative w-[35px] h-[21px] rounded-full transition-all duration-300 flex-shrink-0 bg-[#2f4553] peer-checked:bg-green-600  peer-focus:outline-2 peer-focus:outline-[#b1bad3]`}
                                        >
                                            <span
                                                className={`absolute top-[2px] left-[2px] w-[17px] h-[17px] rounded-full bg-[var(--color-white)] transition-transform duration-300 ease-in-out ${hideZeroBalances ? 'translate-x-[14px]' : ''
                                                    }`}
                                            />
                                        </div>
                                    </label>



                                    {/* Text Section */}
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[16px] text-white mb-[4px] font-medium">Hide Zero Balances</span>
                                        <span className="text-[14px] text-[#b1bad3]">
                                            Your zero balances won't appear in your wallet
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 !pb-0"
                                    style={{
                                        '--slider-size': '2.5em',
                                        '--indicator-size': '1em',
                                        '--border-size': '4px',
                                        '--input-border': '#444c56',
                                        '--color-green-600': '#16a34a',
                                        '--color-white': '#fff'
                                    } as any} >

                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={hideInactiveAssets}
                                            onChange={() => setHideInactiveAssets(!hideInactiveAssets)}
                                            className="sr-only peer"
                                        />
                                        <div
                                            className={`relative w-[35px] h-[21px] rounded-full transition-all duration-300 flex-shrink-0 bg-[#2f4553] peer-checked:bg-green-600  peer-focus:outline-2 peer-focus:outline-[#b1bad3]`}
                                        >
                                            <span
                                                className={`absolute top-[2px] left-[2px] w-[17px] h-[17px] rounded-full bg-white transition-transform duration-300 ease-in-out ${hideInactiveAssets ? 'translate-x-[14px]' : ''}`}
                                            />
                                        </div>
                                    </label>



                                    {/* Text Section */}
                                    <div className="flex flex-col leading-tight mt-[4px]">
                                        <span className="text-[16px] text-white mb-[4px] font-medium">Display Crypto in Fiat</span>
                                        <span className="text-[14px] text-[#b1bad3]">
                                            All bets & transactions will be settled in the crypto equivalent
                                        </span>
                                    </div>
                                </div>


                                <div className={`w-full p-4 text-white ${hideInactiveAssets ? '' : 'opacity-50 pointer-events-none'}`}>
                                    <div
                                        className="w-full grid justify-items-start gap-x-12 gap-y-3 pr-4"
                                        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))" }}
                                    >
                                        {currencies.map((cur, i) => (
                                            <label key={i} className="inline-flex h-[31px] items-start cursor-pointer" >
                                                <input
                                                    type="radio"
                                                    name="currency"
                                                    value={cur.code}
                                                    checked={selected === cur.code}
                                                    onChange={() => setSelected(cur.code)}
                                                    className="hidden"
                                                />
                                                <span className={`w-6 h-6 rounded-full  border-[#2f4553] mr-2 flex-shrink-0 flex items-center justify-center ${selected === cur.code ? 'bg-[#2F4553] border-[0]' : 'border-[2px]'
                                                    }`}>
                                                    {selected === cur.code && (
                                                        <span className="w-[11px] h-[11px] bg-white rounded-full" />
                                                    )}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="text-sm !text-[#b1bad3]">{cur.code}</span>
                                                    <Icon name={'dollar'} className="w-[20px] h-[20px]" />
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="footer p-4 bg-[#0F212E]">
                                    <div className="text-[16px] text-[#b1bad3] mb-3 text-center">
                                        Improve your account security with Two-Factor Authentication
                                    </div>



                                    <Link
                                        href="/settings/security"
                                        onClick={() => { onClose(); }}
                                        className="inline-flex items-center justify-center gap-2 w-full rounded-md bg-[#2f4553] text-white py-2.5 px-5 font-semibold shadow-md  transition hover:bg-[#557086] hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white cursor-pointer"
                                    >
                                        <span className="text-[16px] font-semibold">
                                            Enable 2FA
                                        </span>
                                    </Link>

                                </div>



                            </div>
                        </div>

                    )}

                </DialogContent>
            </Dialog>
        </>
    );
};

export default WalletSetting;