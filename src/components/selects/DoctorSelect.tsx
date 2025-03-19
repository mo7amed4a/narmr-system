import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";

interface DoctorSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function DoctorSelect({ value, onValueChange }: DoctorSelectProps) {
  const { data, loading, error } = useFetch("/doctors");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الأطباء: {error.message}</div>;

  const doctors = data?.data || [];

  return (
    <div className="space-y-2">
      <Label>اختر الطبيب</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر الطبيب" />
        </SelectTrigger>
        <SelectContent>
          {doctors.map((doctor: any) => (
            <SelectItem key={doctor.id} value={doctor.id.toString()}>
              {doctor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}