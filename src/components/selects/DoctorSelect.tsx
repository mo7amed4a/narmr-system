import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";
import { Doctor } from "@/apps/booking/doctors/doctors.page";

interface DoctorSelectProps {
  value: string;
  onValueChange: (value: string | Doctor) => void;
  allData?:boolean
}

export default function DoctorSelect({ value, onValueChange, allData }: DoctorSelectProps) {
  const { data, loading, error } = useFetch("/doctors");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الأطباء: {error.message}</div>;

  const doctors = data?.data || [];
  const onValueChangeHandler = (value:string) => {
    if(allData) onValueChange(doctors.find((doctor:Doctor) => doctor.id.toString() === value))
    else onValueChange(value)
  }
  return (
    <div className="space-y-2">
      <Label>اختر الطبيب</Label>
      <Select value={value} onValueChange={onValueChangeHandler}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر الطبيب" />
        </SelectTrigger>
        <SelectContent>
          {doctors.map((doctor: Doctor) => (
            <SelectItem key={doctor.id} value={doctor.id.toString()}>
              {doctor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}