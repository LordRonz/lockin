import React from "react";
import { cn } from "@/lib/utils";

const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { label: string }
>(({ className, type, label, ...props }, ref) => {
  return (
    <div className="relative border border-gray-300 rounded-md p-2 flex items-center gap-2 focus-within:border-orange-300">
      <span className="text-gray-500 text-sm whitespace-nowrap">
        {label}
      </span>
      <input
        className={cn(
          "peer w-full bg-transparent text-sm text-black placeholder-transparent focus:outline-none focus:ring-0",
          className,
        )}
        type={type}
        ref={ref}
        {...props}
      />
    </div>
  );
});

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
