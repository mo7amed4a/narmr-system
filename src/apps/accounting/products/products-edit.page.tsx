import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/use-fetch"; // Custom hook
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function ProductEditPage() {
  const { id } = useParams(); // Get product_id from URL
  const navigate = useNavigate();
  const [refresh] = useState(false);

  // Fetch product data
  const { data, loading, error } = useFetch(`/product/${id}`, refresh);
  const product = data?.data || {};

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock_quantity: "",
  });

  // Update form data when product data is fetched
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        stock_quantity: product.stock_quantity || "",
      });
    }
  }, [product]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/product/update`, { product_id: parseInt(id as string), ...formData })
      toast.success("تم تحديث المنتج بنجاح")
      if (response.status === 200) navigate(-1); // Navigate back on success
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <form onSubmit={handleSubmit}>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>تعديل بيانات المنتج</CardTitle>
            <div className="flex gap-3">
              <Button onClick={() => navigate(-1)} type="button" variant="outline" className="text-red-500">
                الغاء
              </Button>
              <Button type="submit" variant="green">حفظ</Button>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <InputLabel
              label="اسم المنتج"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ادخل اسم المنتج"
            />
            <InputLabel
              label="السعر"
              required
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="ادخل السعر"
              type="number"
            />
            <InputLabel
              label="الكمية المتوفرة"
              required
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              placeholder="ادخل الكمية المتوفرة"
              type="number"
            />
          </CardContent>
        </Card>
      </form>
    </Card>
  );
}