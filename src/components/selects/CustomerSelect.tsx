import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";

interface CustomerSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function CustomerSelect({ value, onValueChange }: CustomerSelectProps) {
  const { data, loading, error } = useFetch("/customers");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل العملاء: {error.message}</div>;

  const customers = data?.data || [];

  return (
    <div className="space-y-2">
      <Label>اختر العميل</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر العميل" />
        </SelectTrigger>
        <SelectContent>
          {customers.map((customer: any) => (
            <SelectItem key={customer.id} value={customer.id.toString()}>
              {customer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}