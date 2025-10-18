"use client";
import React from "react";
import ReactDOM from "react-dom";
import { useToast } from "@workspace/ui/common/toast/toast-context";
import { ToastComponent } from "@workspace/ui/common/demotoaster/index";

export const ToastContainer: React.FC = () => {
  const { toasts, closeToast } = useToast();

  // Avoid SSR hydration issues
  if (typeof window === "undefined") return null;

  const container = (
    <>
      <style>
        {`
          @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>

      <div
        id="global-toast-container"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 2147483647, // 👈 MAX safe z-index (always on top)
          maxWidth: "400px",
          pointerEvents: "none", // so it doesn’t block clicks on other elements
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: "auto" }}>
            <ToastComponent toast={toast} onClose={closeToast} />
          </div>
        ))}
      </div>
    </>
  );

  // 👇 Portal ensures it renders directly inside <body>, not inside nested layouts/modals
  return ReactDOM.createPortal(container, document.body);
};
