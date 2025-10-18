import toast from "react-hot-toast";
import { X } from "lucide-react";
import Icon from "@workspace/ui/icons/icons";

export const showGhostToast = (mode: "on" | "off") => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-[320px] w-full shadow-lg rounded-[4px] pointer-events-auto mt-[60px] flex z-50 relative overflow-hidden`}
      >
        {/* Icon Section */}
        <div className="flex items-center justify-center bg-[#0f212e] px-4">
          <Icon
            name="hidden"
            className={`h-6 w-6 text-[#00E701]`}
          />
        </div>

        {/* Text + Close Section */}
        <div className="flex-1 bg-[#2f4553ff] p-4 relative">
          <div className="flex justify-between items-start">
            <p className="text-sm font-semibold text-white">Ghost Mode</p>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-2 text-[#b1bad3ff] mt-3 hover:text-white flex justify-center items-center h-full cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-1 text-sm text-white">
            {mode === "on" ? "Your bets are now hidden." : "Your bets are public."}
          </p>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-[#b1bad3ff] animate-progress w-full z-60"></div>
      </div>
    ),
    { duration: 4000 }
  );
};
