"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";
import { cn } from "@workspace/ui/lib/utils";

type OddsChoice = "any" | "higher" | "none";

const OPTIONS: { key: OddsChoice; label: string }[] = [
  { key: "any", label: "Accept Any Odds" },
  { key: "higher", label: "Accept Only Higher Odds" },
  { key: "none", label: "No Odds Changes Accepted" },
];

const STORAGE_KEY = "betsettings.odds";

export default function BetSettingsModal({
  open,
  onClose,
  initial = "none",
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  initial?: OddsChoice;
}) {
  const [savedChoice, setSavedChoice] = useState<OddsChoice>(initial);
  const [choice, setChoice] = useState<OddsChoice>(initial);
  const [applying, setApplying] = useState(false);

  // Rehydrate on open
  useEffect(() => {
    if (!open) return;
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "any" || stored === "higher" || stored === "none") {
      setSavedChoice(stored);
      setChoice(stored);
    } else {
      setSavedChoice(initial);
      setChoice(initial);
    }
    setApplying(false);
  }, [open, initial]);

  const applyDisabled = useMemo(
    () => applying || choice === savedChoice,
    [applying, choice, savedChoice]
  );

  const handleApply = async () => {
    if (applyDisabled) return;
    setApplying(true);
    // show two-dot loader briefly
    await new Promise((r) => setTimeout(r, 900));
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, choice);
    }
    setSavedChoice(choice);
    setApplying(false);
    onClose(false); // close after apply
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* Backdrop above drawer */}
      <DialogOverlay className="fixed inset-0 bg-black/70 backdrop-blur-[1px] z-[12000]" />

      <DialogContent
        showCloseButton={false}
        className="
          z-[12001] w-[500px] max-w-[95vw]
          p-0 border-0 rounded-[12px]
          bg-[#1A2C38] text-white shadow-2xl
          animate-modal-popover
        "
      >
      
        <div>
          <DialogHeader className="flex  !flex-row items-center justify-between px-4 h-[60px]">
            <DialogTitle className="flex items-center gap-2 text-[18px] font-bold">
              <Icon name="settings" className="w-5 text-[#b1bad3] h-5"  />
              <span className="text-white">Betslip Settings</span>
            </DialogTitle>
            <DialogClose asChild>
              <button
                aria-label="Close"
                className="grid place-items-center py-2 pl-2 rounded-full hover:bg-white/5"
              >
                <Icon name="closeIcon" className="w-5 h-5" fill="#b1bad3" />
              </button>
            </DialogClose>
          </DialogHeader>

          <div className="px-4 pb-4 ">
            <p className="text-[white] text-[16px] font-semibold">
              Odds Settings
            </p>

            <div className="mt-4 flex flex-col gap-2">
              {OPTIONS.map((opt) => {
                const selected = choice === opt.key;
                return (
                  <label
                    key={opt.key}
                    className={cn(
                      "group flex items-center gap-2 rounded-[10px]   cursor-pointer",
                      "transition-colors hover:bg-white/5"
                    )}
                  >
                    <input
                      type="radio"
                      name="odds-setting"
                      className="sr-only peer"
                      checked={selected}
                      onChange={() => setChoice(opt.key)}
                    />
                    {/* Custom radio (outer ring + inner dot) */}
                    <span className="relative inline-flex items-center justify-center w-6 h-6">
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full border-[2px] transition-colors",
                          selected
                            ? "border-[#567085]"
                            : "border-[#2F4652] group-hover:border-[#b1bad3]"
                        )}
                      />
                      <span
                        className={cn(
                          "h-3 w-3 rounded-full transition-opacity",
                          selected ? "bg-white opacity-100" : "opacity-0"
                        )}
                      />
                    </span>

                    <span
                      className={cn(
                        "text-[16px] font-[500] transition-colors",
                        selected ? "text-[#b1bad3]" : "text-[#b1bad3] "
                      )}
                    >
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Apply */}
            <div className="mt-4">
              <button
                onClick={handleApply}
                disabled={applyDisabled}
                className={cn(
                  "w-full h-[41px] text-sm disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] font-semibold transition",
                  "flex items-center justify-center",
                  applying
                    ? "bg-[#1475e1] text-white"
                    : applyDisabled
                      ? "bg-[#2f6bc0] text-white/90 cursor-not-allowed"
                      : "bg-[#1475e1] hover:bg-[#105EB4] text-white"
                )}
              >
                {applying ? (
                  // Only dots while applying (mirror of reference)
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full bg-white"
                      style={{ animation: "bet-dot 1s ease-in-out infinite" }}
                    />
                    <span
                      className="inline-block h-2 w-2 rounded-full bg-white"
                      style={{
                        animation: "bet-dot 1s ease-in-out infinite",
                        animationDelay: "200ms",
                      }}
                    />
                  </span>
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Local keyframes for the two-dot loader */}
        <style jsx>{`
          @keyframes bet-dot {
            0% {
              opacity: 0.2;
              transform: translateY(0);
            }
            50% {
              opacity: 1;
              transform: translateY(-3px);
            }
            100% {
              opacity: 0.2;
              transform: translateY(0);
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
