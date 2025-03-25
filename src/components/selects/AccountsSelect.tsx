import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";

interface AccountSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function AccountsSelect({ value, onValueChange }: AccountSelectProps) {
  const { data, loading, error } = useFetch("/accounts");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الخزينة: {error.message} {value}</div>;

  const accounts = data?.accounts || [];

  return (
    <div className="space-y-2">
      <Label>اختر الحساب</Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر الحساب" />
        </SelectTrigger>
        <SelectContent>
          {accounts.map((account: any) => (
            <SelectItem key={account.id} value={account.id.toString()}>
              {account.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}