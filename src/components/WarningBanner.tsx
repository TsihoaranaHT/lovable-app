import { Lightbulb } from "lucide-react";

interface WarningBannerProps {
  message: string;
}

const WarningBanner = ({ message }: WarningBannerProps) => {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-warning/10 border border-warning/20 p-4">
      <Lightbulb className="h-5 w-5 shrink-0 text-warning mt-0.5" />
      <p className="text-sm text-foreground/80">{message}</p>
    </div>
  );
};

export default WarningBanner;
