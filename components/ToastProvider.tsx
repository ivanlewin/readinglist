import { CheckIcon, FrownIcon, InfoIcon } from "lucide-react";
import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      className="pointer-events-none mt-10 select-none !shadow-none"
      visibleToasts={3}
      toastOptions={{
        duration: 4000,
        classNames: {
          description: "text-neutral-600",
          toast: "rounded-modifier",
          info: "border-sky-300 bg-sky-100 text-sky-800",
          error: "border-red-300 bg-red-100 text-red-800",
          success: "border-sky-300 bg-sky-100 text-sky-800",
        },
      }}
      icons={{
        info: <InfoIcon className="ml-1 h-4 w-4 text-sky-800" />,
        error: <FrownIcon className="ml-1 h-4 w-4 text-red-600" />,
        success: <CheckIcon className="ml-1 h-4 w-4 text-sky-800" />,
      }}
    />
  );
}
