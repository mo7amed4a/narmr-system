import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";
import { SupplierType } from "@/apps/accounting/suppliers/suppliers.page";

interface SupplierSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  allData?:boolean
}

export default function SuppliersSelect({ value, onValueChange, allData }: SupplierSelectProps) {
  const { data, loading, error } = useFetch("/suppliers");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الموردين: {error.message}</div>;

  const suppliers = data?.data || [];
  const onValueChangeHandler = (value:string) => {
    if(allData) onValueChange(suppliers.find((supplier:SupplierType) => supplier.supplier_id.toString() === value))
    else onValueChange(value)
  }
  return (
    <div className="space-y-2">
      <Label>اختر المورد</Label>
      <Select value={value} onValueChange={onValueChangeHandler}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر المورد" />
        </SelectTrigger>
        <SelectContent>
          {suppliers.map((supplier: SupplierType) => (
            <SelectItem key={supplier.supplier_id} value={supplier.supplier_id.toString()}>
              {supplier.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}