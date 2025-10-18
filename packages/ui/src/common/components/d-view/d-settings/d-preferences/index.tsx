"use client";
import React, { useState } from "react";
import Icon from "@workspace/ui/icons/icons";
import { useToast } from "@workspace/ui/common/toast/toast-context";
import "./preferences.css";

interface ToggleState {
  ghostMode: boolean;
  hideStats: boolean;
  hideRaceStats: boolean;
  excludeFromRain: boolean;
  emailOffers: boolean;
  smsOffers: boolean;
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  disabled?: boolean;
}

const Preferences = () => {
  const { showToast } = useToast();

  const [toggles, setToggles] = useState<ToggleState>({
    ghostMode: true,
    hideStats: true,
    hideRaceStats: true,
    excludeFromRain: true,
    emailOffers: true,
    smsOffers: true,
  });

  const [touched, setTouched] = useState({
    privacy: false,
    community: false,
    marketing: false,
  });

  const [loadingStates, setLoadingStates] = useState({
    privacy: false,
    community: false,
    marketing: false,
    formatting: false,
    ignoredUsers: false,
  });

  const handleToggle = (
    key: keyof ToggleState,
    section: keyof typeof touched
  ) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    if (!touched[section]) {
      setTouched((prev) => ({ ...prev, [section]: true }));
    }
  };

  const handleSave = async (
    section:
      | "privacy"
      | "community"
      | "marketing"
      | "formatting"
      | "ignoredUsers"
  ) => {
    setLoadingStates((prev) => ({ ...prev, [section]: true }));

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [section]: false }));

      if (
        section === "privacy" ||
        section === "community" ||
        section === "marketing"
      ) {
        setTouched((prev) => ({ ...prev, [section]: false }));
      }

      switch (section) {
        case "privacy":
          showToast(
            "success",
            "Preference Updated",
            "Please allow up to 30 seconds for update to take effect."
          );
          break;
        case "community":
          showToast(
            "success",
            "Preference Updated",
            "Please allow up to 30 seconds for update to take effect."
          );
          break;
        case "marketing":
          showToast(
            "success",
            "Marketing Preferences Updated",
            "Please allow up to 30 seconds for update to take effect."
          );
          break;
        case "formatting":
          showToast(
            "success",
            "Formatting Updated",
            "Fiat number formatting updated successfully."
          );
          break;
      }
    }, 2500);
  };

  const ToggleSwitch = ({
    checked,
    onChange,
    id,
    disabled = false,
  }: ToggleSwitchProps) => (
    <div className="inline-flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        id={id}
        disabled={disabled}
      />
      <div
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? undefined : onChange}
        className={`relative w-10 h-6 rounded-full transition-all duration-300 ease-in-out
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          ${checked ? "bg-[#00b801]" : "bg-[#2f4553]"}
          after:content-[''] after:absolute after:top-[2px] after:start-[1px]
          after:bg-white after:rounded-full after:h-5 after:w-5
          after:transition-all after:duration-300 after:ease-in-out
          after:shadow-md
          ${checked ? "after:translate-x-[18px]" : "after:translate-x-0"}
        `}
      ></div>
    </div>
  );

  const SaveButton = ({
    enabled,
    label = "Save",
    onClick,
    isLoading = false,
  }: {
    enabled: boolean;
    label?: string;
    onClick: () => void;
    isLoading?: boolean;
  }) => (
    <button
      disabled={!enabled || isLoading}
      onClick={onClick}
      className={`py-2.5 px-5 text-black bg-[#00e701] min-w-[12ch] rounded-md shadow-md font-semibold transition-colors duration-200 cursor-pointer
        ${
          enabled && !isLoading
            ? "hover:bg-[#00d001] opacity-100"
            : "opacity-50 cursor-not-allowed"
        }`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center w-full !h-[24px] w-[118px]">
          <div className="relative flex justify-between items-center">
            <span className="h-2 w-2 rounded-full bg-black animate-swap1"></span>
            <span className="h-3 w-3 rounded-full bg-black animate-swap2"></span>
          </div>
        </div>
      ) : (
        label
      )}
    </button>
  );

  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-9">
        {/* Privacy */}
        <div className="pt-8 rounded-md border border-[rgb(47,69,83)] border-solid bg-[rgb(26,44,56)]">
          <div className="px-6 text-[20px] font-bold text-white leading-[28px]">
            Privacy
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="px-6 text-[#d5dceb]">
              User privacy is one of the core values of Stake. These settings
              allow you to be completely anonymous from the rest of the players.
            </div>
            <div className="px-6 flex flex-col gap-4">
              <hr className="h-px w-full border-0 border-t-[1.5px] border-[rgb(47,69,83)]" />

              <div className="flex items-start gap-4 cursor-pointer group">
                <ToggleSwitch
                  checked={toggles.ghostMode}
                  onChange={() => handleToggle("ghostMode", "privacy")}
                  id="ghost-mode"
                />
                <div className="flex flex-col">
                  <span className="text-[#d5dceb] group-hover:text-white transition-colors duration-200">
                    Enable Ghost Mode
                  </span>
                  <span className="text-[.875rem] text-[#557086] mt-1">
                    Your username will not appear in public bet feed and bet
                    preview
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 cursor-pointer group">
                <ToggleSwitch
                  checked={toggles.hideStats}
                  onChange={() => handleToggle("hideStats", "privacy")}
                  id="hide-stats"
                />
                <div className="flex flex-col">
                  <span className="text-[#d5dceb] group-hover:text-white transition-colors duration-200">
                    Hide All Your Statistics
                  </span>
                  <span className="text-[.875rem] text-[#557086] mt-1">
                    Other users won't be able to view your wins, losses and
                    wagered statistics
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 cursor-pointer group">
                <ToggleSwitch
                  checked={toggles.hideRaceStats}
                  onChange={() => handleToggle("hideRaceStats", "privacy")}
                  id="hide-race-stats"
                />
                <div className="flex flex-col">
                  <span className="text-[#d5dceb] group-hover:text-white transition-colors duration-200">
                    Hide All Your Race Statistics
                  </span>
                  <span className="text-[.875rem] text-[#557086] mt-1">
                    Other users won't be able to view your race statistics
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-t border-t-[rgb(47,69,83)]">
              <div className="text-[#d5dceb]">
                Please allow up to 30 seconds for update to take effect.
              </div>
              <SaveButton
                enabled={touched.privacy}
                onClick={() => handleSave("privacy")}
                isLoading={loadingStates.privacy}
              />
            </div>
          </div>
        </div>

        {/* Community */}
        <div className="pt-8 rounded-md border border-[rgb(47,69,83)] border-solid bg-[rgb(26,44,56)]">
          <div className="px-6 text-[20px] font-bold text-white">Community</div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="px-6 flex flex-col gap-4">
              <hr className="h-px w-full border-t-[1.5px] border-[rgb(47,69,83)]" />
              <div className="flex items-start gap-4 cursor-pointer group">
                <ToggleSwitch
                  checked={toggles.excludeFromRain}
                  onChange={() => handleToggle("excludeFromRain", "community")}
                  id="exclude-rain"
                />
                <div className="flex flex-col">
                  <span className="text-[#d5dceb] group-hover:text-white transition-colors duration-200">
                    Exclude From Rain
                  </span>
                  <span className="text-[.875rem] text-[#557086] mt-1">
                    Prevents you from receiving a rain in chat
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-t border-t-[rgb(47,69,83)]">
              <div className="text-[#d5dceb]">
                Please allow up to 30 seconds for update to take effect.
              </div>
              <SaveButton
                enabled={touched.community}
                onClick={() => handleSave("community")}
                isLoading={loadingStates.community}
              />
            </div>
          </div>
        </div>

        {/* Marketing */}
        <div className="pt-8 rounded-md border border-[rgb(47,69,83)] border-solid bg-[rgb(26,44,56)]">
          <div className="px-6 text-[20px] font-bold text-white">Marketing</div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="px-6 flex flex-col gap-4">
              <div className="flex items-start gap-4 cursor-pointer group">
                <ToggleSwitch
                  checked={toggles.emailOffers}
                  onChange={() => handleToggle("emailOffers", "marketing")}
                  id="email-offers"
                />
                <div className="flex flex-col">
                  <span className="text-[#d5dceb] group-hover:text-white transition-colors duration-200">
                    Receive Email Offers From Us
                  </span>
                  <span className="text-[.875rem] text-[#557086] mt-1">
                    Choose if you wish to hear from us via email
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 group opacity-50 cursor-not-allowed">
                <ToggleSwitch
                  checked={false}
                  onChange={() => {}}
                  id="sms-offers"
                  disabled
                />
                <div className="flex flex-col">
                  <span className="text-[#d5dceb]">
                    Receive SMS Offers From Us
                  </span>
                  <span className="text-[.875rem] text-[#557086] mt-1">
                    Choose if you wish to hear from us via SMS
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center p-4 border-t border-t-[rgb(47,69,83)]">
              <div></div>
              <SaveButton
                enabled={touched.marketing}
                onClick={() => handleSave("marketing")}
                isLoading={loadingStates.marketing}
              />
            </div>
          </div>
        </div>

        {/* Fiat Number Formatting */}
        <div className="pt-8 rounded-md border border-[rgb(47,69,83)] border-solid bg-[rgb(26,44,56)]">
          <div className="px-6 text-[20px] font-bold text-white">
            Fiat Number Formatting
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="px-6 flex flex-col gap-4">
              {/* Radio Option 1 */}
              <label
                htmlFor="radio1"
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    id="radio1"
                    name="format"
                    type="radio"
                    defaultChecked
                    className="peer h-[24px] w-[24px] cursor-pointer appearance-none rounded-full border-2 border-[rgb(47,69,83)] checked:bg-[rgb(47,69,83)] transition-all"
                  />
                  <span className="absolute bg-white w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </div>
                <span className="label-content text-[#d5dceb]">123,456.78</span>
              </label>

              {/* Radio Option 2 */}
              <label
                htmlFor="radio2"
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    id="radio2"
                    name="format"
                    type="radio"
                    className="peer h-[24px] w-[24px] cursor-pointer appearance-none rounded-full border-2 border-[rgb(47,69,83)] checked:bg-[rgb(47,69,83)] transition-all"
                  />
                  <span className="absolute bg-white w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </div>
                <span className="label-content text-[#d5dceb]">١٢٣٤٥٦٫٧٨</span>
              </label>

              {/* Radio Option 3 */}
              <label
                htmlFor="radio3"
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    id="radio3"
                    name="format"
                    type="radio"
                    className="peer h-[24px] w-[24px] cursor-pointer appearance-none rounded-full border-2 border-[rgb(47,69,83)] checked:bg-[rgb(47,69,83)] transition-all"
                  />
                  <span className="absolute bg-white w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </div>
                <span className="label-content text-[#d5dceb]">123.456,78</span>
              </label>
            </div>

            <div className="flex flex-row justify-between items-center p-4 border-t border-t-[rgb(47,69,83)]">
              <div></div>
              <SaveButton
                enabled={true}
                label="Submit"
                onClick={() => handleSave("formatting")}
                isLoading={loadingStates.formatting}
              />
            </div>
          </div>
        </div>

        {/* Ignored Users */}
        <div className="pt-8 rounded-md border border-[rgb(47,69,83)] border-solid bg-[rgb(26,44,56)]">
          <div className="px-6 text-[20px] font-bold text-white">
            Ignored Users
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="px-6">
              View and manage Stake users that you have ignored.
            </div>
            <div className="px-6 flex flex-col gap-4">
              <hr className="h-[1px] bg-[rgb(47,69,83)] w-full px-6" />
              <div className="flex justify-between">
                <div>Action</div>
                <div>User</div>
              </div>
              <div className="flex flex-col justify-center items-center mb-6">
                <Icon name="globe" />
                <div className="mt-6">No ignored users to show</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
