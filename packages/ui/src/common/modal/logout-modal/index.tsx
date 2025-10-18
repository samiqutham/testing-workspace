// "use client";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@workspace/ui/components/dialog";
// import Icon from "@workspace/ui/icons/icons";

// const LogoutModal = ({ open, onClose }: any) => {
//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       {/* Overlay */}
//       {open && (
//         <div className="fixed inset-0 bg-[#000000bf] z-40" />
//       )}

//       <DialogContent
//         showCloseButton={false}
//         className="p-0 min-w-[200px] !max-w-[500px] border-0 bg-[#1a2c38] rounded-[8px] text-white font-sans shadow-lg !gap-0
//       [&>button]:mt-[6px] animate-modal-popover min-[320px]:w-[90%] min-[350px]:w-[91.5%] sm:w-[95%] min-[400px]:w-[92.5%]">
//         <DialogHeader>
//           <DialogTitle className="hidden"></DialogTitle>
//         </DialogHeader>
//         {/* 🔙 Header */}
//         <div className="flex items-center justify-between gap-2 p-4">
//           <div className="flex items-center">
//             {" "}
//             <Icon name="logout" className="w-[20px] h-[20px] text-[#b1bad3]" />
//             <h2 className="text-[18px] font-bold ml-2 font-[proxima-nova] ">
//               Logout
//             </h2>
//           </div>
//           <DialogClose asChild>
//             <button className="text-xl leading-none cursor-pointer outline-0">
//               <Icon
//                 name={"closeIcon"}
//                 className="w-5 h-5 hover:fill-[white]"
//                 fill="#b1bad3"
//               />
//             </button>
//           </DialogClose>
//         </div>

//         {/* 📜 Body Text */}
//         <div className="px-4 pb-4 text-[#b1bad3] font-[proxima-nova]  text-[16px]">
//           Are you sure you want to end your session and log out?
//         </div>

//         {/* 🔘 Logout Button */}
//         <div className="px-4 pb-4">
//           <button className="w-full bg-[#e9113c] hover:bg-[#ba0e30] text-white text-[16px] font-[proxima-nova]  font-semibold py-3 rounded-md transition-all">
//             Log out
//           </button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default LogoutModal;

"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import Icon from "@workspace/ui/icons/icons";
import { useState } from "react";
import { runtimeApiService } from "@workspace/ui/services/runtime-api.service";
import { destroyCookie } from "nookies";
import { useAppStore } from "@workspace/ui/store/store";
import { useToast } from "@workspace/ui/common/toast/toast-context";

const LogoutModal = ({ open, onClose }: any) => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const { showToast } = useToast();

  const handleLogout = () => {
    setLoading(true);

    runtimeApiService
      .logout()
      .then((res) => {
        if (res?.meta?.status) {
          // ✅ Success: show toast and clear tokens
          showToast(
            "success",
            "Logout Successful",
            res.meta.message || "Logged out successfully"
          );

          destroyCookie(null, "authToken", { path: "/" });
          localStorage.removeItem("authToken");
          setAuthUser(false);
          onClose();

          // Close modal immediately
        } else {
          // ❌ API error message
          showToast(
            "error",
            "Logout Failed",
            res.meta.message || "Something went wrong"
          );

          // Close modal even on failure
          onClose();
        }
      })
      .catch((error) => {
        console.error("Logout API error:", error);

        const message =
          error?.response?.data?.meta?.message ||
          error?.meta?.message ||
          error?.message ||
          "Something went wrong during logout";

        // ❌ Toast for caught exception
        showToast("error", "Logout Failed", message);

        // Close modal on error too
        onClose();
      })
      .finally(() => {
        setLoading(false);
        console.log("Logout API call finished (success or fail).");
      });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        {/* Overlay */}
        {open && <div className="fixed inset-0 bg-[#000000bf] z-40" />}

        <DialogContent
          showCloseButton={false}
          className="p-0 min-w-[200px] !max-w-[500px] border-0 bg-[#1a2c38] rounded-[8px] text-white font-sans shadow-lg !gap-0
          [&>button]:mt-[6px] animate-modal-popover min-[320px]:w-[90%] min-[350px]:w-[91.5%] sm:w-[95%] min-[400px]:w-[92.5%]"
        >
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
          </DialogHeader>

          {/* 🔙 Header */}
          <div className="flex items-center justify-between gap-2 p-4">
            <div className="flex items-center">
              <Icon
                name="logout"
                className="w-[20px] h-[20px] text-[#b1bad3]"
              />
              <h2 className="text-[18px] font-bold ml-2 font-[proxima-nova]">
                Logout
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

          {/* 📜 Body Text */}
          <div className="px-4 pb-4 text-[#b1bad3] font-[proxima-nova] text-[16px]">
            Are you sure you want to end your session and log out?
          </div>

          {/* 🔘 Logout Button */}
          <div className="px-4 pb-4">
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`w-full text-white text-[16px] font-[proxima-nova] font-semibold py-3 rounded-md transition-all ${
                loading
                  ? "bg-[#ba0e30] opacity-70 cursor-not-allowed"
                  : "bg-[#e9113c] hover:bg-[#ba0e30]"
              }`}
            >
              {loading ? "Logging out..." : "Log out"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutModal;
