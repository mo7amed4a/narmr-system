import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";

interface ServiceSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function ServiceSelect({ value, onValueChange }: ServiceSelectProps) {
  const { data, loading, error } = useFetch("/services");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الخدمات: {error.message}</div>;

  const services = data?.data || [];

  const handleChange = (serviceId: string) => {
    services.find((service: any) => service.id === parseInt(serviceId));
    onValueChange(serviceId);
  };

  return (
    <div className="space-y-2">
      <Label>اختر الخدمة</Label>
      <Select value={value ==="0" ? "" : value} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر الخدمة" />
        </SelectTrigger>
        <SelectContent>
          {services.map((service: any) => (
            <SelectItem key={service.id} value={service.id.toString()}>
              {service.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}