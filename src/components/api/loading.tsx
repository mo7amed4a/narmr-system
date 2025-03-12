import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-64 flex justify-center items-center bg-white">
      <span>جاري التحميل...</span>
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
    </div>
  );
}
