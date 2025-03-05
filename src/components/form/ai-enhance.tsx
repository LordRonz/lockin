import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegenerateButton } from "@/components/button/regenerate-button";

type AiEnhanceProps = {
  aiResult?: string;
  enhance: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isPending: boolean;
  onApply: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonText?: string;
};

export const AiEnhance = ({
  aiResult,
  enhance,
  isPending,
  onApply,
  buttonText = 'AI Enhance',
}: AiEnhanceProps) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      {aiResult ? (
        <div className="flex-1 p-4 bg-white rounded-2xl outline-orange-400 outline-1">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">AI Enhanced</h2>
            <div className="flex space-x-4">
              <RegenerateButton onClick={enhance} disabled={isPending}>
                Regenerate
              </RegenerateButton>
              <Button variant="outline" onClick={onApply}>
                Apply
              </Button>
            </div>
          </div>

          <div className="w-full max-h-[40vh] overflow-scroll p-3 resize-none dark:border-none border-none outline-none focus:border-none focus-visible:ring-0 shadow-none ring-0 active:border-none rounded-lg">
            {aiResult}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "w-full h-full flex items-center justify-center rounded-2xl transition-colors duration-1000",
            !isPending &&
              "has-hover:bg-radial has-hover:from-10% has-hover:via-50% has-hover:from-orange-200 has-hover:to-white has-hover:via-orange-100",
            !isPending &&
              "bg-radial from-10% via-50% from-white to-white via-white",
            isPending &&
              "bg-radial from-10% via-50% from-orange-200 to-orange-400 via-orange-300",
          )}
        >
          <Button
            className={cn(
              "transition-colors hover:bg-white bg-white text-black hover:text-orange-400 font-semibold",
              isPending && "text-orange-400",
            )}
            onClick={enhance}
          >
            <Sparkles className={cn(isPending && "animate-pulse")} />
            <motion.div
              initial={false}
              animate={{ width: isPending ? 80 : 180 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="overflow-hidden"
            >
              {!isPending ? buttonText : "Loading..."}
            </motion.div>
          </Button>
        </div>
      )}
    </div>
  );
};
