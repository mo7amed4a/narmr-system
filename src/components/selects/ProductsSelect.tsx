import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";
import { ProductType } from "@/apps/accounting/products/products.page";

interface ProductsSelectProps {
  value: string;
  onValueChange: (value: string | ProductType) => void;
  allData?:boolean
}

export default function ProductsSelect({ value, onValueChange, allData }: ProductsSelectProps) {
  const { data, loading, error } = useFetch("/products");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل المنتجات: {error.message}</div>;

  const products = data?.data || [];
  const onValueChangeHandler = (value:string) => {
    if(allData) onValueChange(products.find((product:ProductType) => product.product_id.toString() === value))
    else onValueChange(value)
  }
  return (
    <div className="space-y-2">
      <Label>اختر المنتج</Label>
      <Select value={value} onValueChange={onValueChangeHandler}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر المنتج" />
        </SelectTrigger>
        <SelectContent>
          {products.map((product: ProductType) => (
            <SelectItem key={product.product_id} value={product.product_id.toString()}>
              {product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}