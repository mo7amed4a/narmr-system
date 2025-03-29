import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";

interface BranchSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  user_id?: number|string
}

export default function BranchSelect({ value, onValueChange, user_id }: BranchSelectProps) {
  const { data, loading, error } = useFetch(user_id ? `/branchess?user_id=${user_id}` :"/branches");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل العملاء: {error.message} {value}</div>;

  const branches = data?.data || [];

  return (
    <div className="space-y-2">
      <Label>اختر الفرع</Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر الفرع" />
        </SelectTrigger>
        <SelectContent>
          {branches.map((branch: any) => (
            <SelectItem key={branch.id} value={branch.id.toString()}>
              {branch.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}