import { Loader2 } from "lucide-react";

export default function LoadingSmall() {
  return (
    <div className="flex justify-center items-center bg-white">
      <span>جاري التحميل...</span>
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
    </div>
  );
}
