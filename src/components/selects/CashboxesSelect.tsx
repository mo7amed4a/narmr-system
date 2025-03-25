import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";

interface CashboxSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function CashboxesSelect({ value, onValueChange }: CashboxSelectProps) {
  const { data, loading, error } = useFetch("/cashboxes");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الخزينة: {error.message} {value}</div>;

  const cashboxes = data?.records || [];

  return (
    <div className="space-y-2">
      <Label>اختر الخزنة</Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر الخزنة" />
        </SelectTrigger>
        <SelectContent>
          {cashboxes.map((cashbox: any) => (
            <SelectItem key={cashbox.id} value={cashbox.id.toString()}>
              {cashbox.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}