"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";

const ChatRulesModal = ({ open, onClose }: any) => {

    const chatRules = [
      "Don't spam & don't use excessive capital letters when chatting.",
      "Don't harass or be offensive to other users or Stake staff.",
      "Don't share any personal information (including socials) of you or other players.",
      "Don't beg or ask for loans, rains or tips.",
      "Don't use alternative (alts) accounts on chat, that is strictly forbidden.",
      "No suspicious behavior that can be seen as potential scams.",
      "Don't engage in any forms of advertising/trading/selling/buying or offering services.",
      "No discussion of streamers or Twitch or any other similar platforms.",
      "Don't use URL shortening services. Always submit the full link.",
      "Don't share codes, scripts or any other bot service.",
      "Only use the language specified in the chat channel, potential abuse will be sanctioned.",
      "No politics & no religion talk in chat, this one is strictly forbidden.",
    ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="p-0 min-w-[200px] !max-w-[500px] border-0 bg-[#1a2c38] max-h-[calc(100dvh-64px)]  rounded-[8px] text-white  shadow-lg !gap-0 [&>button]:mt-[6px] animate-modal-popover sm:w-full max-[325px]:w-[90%] w-[92.5%]">
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between gap-2 p-4">
          <div className="flex items-center">
            <Icon
              name="chatRules"
              className="w-[20px] h-[20px] text-[#b1bad3]"
            />
            <h2 className="text-[18px] leading-[28px] font-bold ml-2 font-[proxima-nova] ">
              Chat Rules
            </h2>
          </div>
          <DialogClose asChild>
            <button className="text-xl leading-none cursor-pointer outline-0">
              <Icon
                name={"closeIcon"}
                className="w-5 h-5 hover:fill-[white]"
                fill="#b1bad3"
              />
            </button>
          </DialogClose>
        </div>

        {/*  Body Text */}
        <div className="overflow-x-hiddin overflow-y-auto scrollbar-hide max-[1023px]:max-h-[calc(100dvh-140px)] max-[1023px]:h-auto h-[590.400px]  font-[proxima-nova]">
          <div className="p-4 pt-0 text-[#b1bad3] flex flex-col gap-4">
            <ol className="list-decimal list-inside space-y-2 text-[16px] marker:text-[14px] leading-[24px] font-[proxima-nova]">
              {chatRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ol>

            <p className="text-center  text-[16px] text-[#b1bad3] relative top-[5px]">
              Our full rules can be found on our{" "}
              <a
                href="https://stakecommunity.com/topic/981-chat-rules"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white  transition-colors">
                forum
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="inline-block text-[#b1bad3] hover:text-white">
                  <path
                    fill="currentColor"
                    d="M20 13.4c-.55 0-1 .45-1 1v4c0 .33-.27.6-.6.6H5.6c-.33 0-.6-.27-.6-.6V5.6c0-.33.27-.6.6-.6h4.8c.55 0 1-.45 1-1s-.45-1-1-1H5.6C4.17 3 3 4.17 3 5.6v12.8C3 19.83 4.17 21 5.6 21h12.8c1.43 0 2.6-1.17 2.6-2.6v-4c0-.55-.45-1-1-1"></path>
                  <path
                    fill="currentColor"
                    d="M14.4 3c-.55 0-1 .45-1 1s.45 1 1 1h3.19L8.1 14.49a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l9.49-9.49V9.6c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1z"></path>
                </svg>
              </a>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRulesModal;
