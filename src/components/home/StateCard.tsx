import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StateCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  className?: string
}

export default function StateCard({ title, value, Icon, className}: StateCardProps) {
  return (
    <Card className={`flex justify-between items-center px-4 shadow-none border-none ${className} bg-opacity-30`}>
      <div>
        <CardHeader>
          <CardTitle className="text-sm font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="md:text-2xl font-bold">{value}</div>
        </CardContent>
      </div>
      <div className={`w-8 flex items-center h-full `}>
        <Icon className={`size-8 rounded p-1 text-white ${className}`} />
      </div>
    </Card>
  );
}
