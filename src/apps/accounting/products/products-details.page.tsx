import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import CardBorderStart from "@/components/global/CardBorderStart";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch"; // Custom hook

export default function ProductDetailsPage() {
  const { id } = useParams(); // Get product_id from URL
  const [refresh] = useState(false);
  
  // Fetch product data
  const { data, loading, error } = useFetch(`/product/${id}`, refresh);
  const product = data?.data || {};

  // Sample transaction data (you can fetch this dynamically as well)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <Card className="w-full shadow-none">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>بيانات المنتج</CardTitle>
          <Link to={`edit`}>
            <Button variant="outline">تعديل</Button>
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4 text-right">
          <CardBorderStart title="اسم المنتج" value={product.name || "غير متوفر"} />
          <div className="flex gap-5 md:gap-20 lg:gap-32">
            <CardBorderStart title="رقم المنتج" value={product.product_id || "غير متوفر"} />
            <CardBorderStart title="السعر" value={`${product.price || "0"} دولار`} />
            <CardBorderStart title="الكمية المتوفرة" value={product.stock_quantity || "0"} />
          </div>
        </CardContent>
      </Card>
    </Card>
  );
}