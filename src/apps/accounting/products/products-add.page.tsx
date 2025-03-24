import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function ProductAddPage() {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock_quantity: 0,
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/product/add`, {
        name: formData.name,
        price: parseFloat(formData.price as any),
        stock_quantity: parseInt(formData.stock_quantity as any),
      });
      if (response.status === 200) toast.success("تم اضافة المنتج بنجاح"); // Navigate back on success
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <form onSubmit={handleSubmit}>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>إضافة منتج جديد</CardTitle>
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