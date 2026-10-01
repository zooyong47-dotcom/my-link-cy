"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string | null;
  type?: "success" | "error";
  onClose?: () => void;
}

export function Toast({ message, type = "success" }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl border-3 border-black font-black text-sm text-black shadow-[5px_5px_0px_0px_#000] flex items-center gap-2.5 animate-bounce",
        type === "success" ? "bg-[#FFE169]" : "bg-[#FF5F56] text-white"
      )}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 text-black stroke-[2.5]" />
      ) : (
        <AlertCircle className="w-5 h-5 text-white stroke-[2.5]" />
      )}
      <span>{message}</span>
    </div>
  );
}
