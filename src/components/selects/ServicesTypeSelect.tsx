import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ServiceTypeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const serviceTypes = [
  { value: "consultation", label: "استشارة" },
  { value: "dermatology_examination", label: "كشف جلدية" },
  { value: "skin_analysis", label: "تحليل البشرة" },
  { value: "cosmetic_surgery", label: "جراحة تجميلية" },
  { value: "pigmentation_treatment", label: "معالجة التصبغات" },
];

export default function ServiceTypeSelect({ value, onValueChange }: ServiceTypeSelectProps) {
  return (
    <div className="gap-4 flex items-start md:items-center">
      <Label className="text-nowrap">نوع الخدمة</Label>
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="flex flex-wrap gap-4"
      >
        {serviceTypes.map((service) => (
          <div key={service.value} className="flex items-center gap-x-2">
            <RadioGroupItem value={service.value} id={service.value} />
            <Label htmlFor={service.value}>{service.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}