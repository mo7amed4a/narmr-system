import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LucideIcon } from "lucide-react";

interface StateCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  className?: string;
  loading?: boolean
}

export default function StateCard({
  title,
  value,
  Icon,
  className,
  loading
}: StateCardProps) {
  console.log(value);
  
  return (
    <Card
      className={`flex justify-between items-center px-4 shadow-none border-none ${className} bg-opacity-30`}
    >
      <div>
        <CardHeader>
          <CardTitle className="text-sm font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="md:text-2xl font-bold">
            {loading ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : value}
          </div>
        </CardContent>
      </div>
      <div className={`w-8 flex items-center h-full `}>
        <Icon className={`size-8 rounded p-1 text-white ${className}`} />
      </div>
    </Card>
  );
}
