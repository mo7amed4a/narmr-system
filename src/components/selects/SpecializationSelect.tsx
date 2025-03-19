import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const specializations = [
  { key: "general", name: "طبيب عام" },
  { key: "dentist", name: "طبيب أسنان" },
  { key: "cardiologist", name: "طبيب قلب" },
  { key: "dermatologist", name: "طبيب جلدية" },
  { key: "orthopedic", name: "طبيب عظام" },
  { key: "pediatrician", name: "طبيب أطفال" },
  { key: "surgeon", name: "جراح" },
  { key: "laser_doctor", name: "طبيب ليزر" },
  { key: "cosmetic_surgeon", name: "جراح تجميلي" },
  { key: "beautician", name: "خبير تجميل" },
];

interface SpecializationSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SpecializationSelect({ value, onValueChange }: SpecializationSelectProps) {
  return (
    <div className="space-y-2">
      <Label>التخصص</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر التخصص" />
        </SelectTrigger>
        <SelectContent>
          {specializations.map((spec) => (
            <SelectItem key={spec.key} value={spec.key}>
              {spec.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}