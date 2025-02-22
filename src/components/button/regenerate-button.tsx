import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const RegenerateButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        "bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 font-semibold text-black",
        props.className,
      )}
    >
      Regenerate
    </Button>
  );
};
