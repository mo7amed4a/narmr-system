import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";

export default function SuppliersEditPage() {
  const { id } = useParams(); // Get supplier_id from URL
  const navigate = useNavigate();
  const [refresh] = useState(false);
  
  // Fetch supplier data
  const { data, loading, error } = useFetch(`/supplier/${id}`, refresh);
  const supplier = data?.data || {};

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company_name: "",
    email: "",
    city: "",
    country: "",
    initial_balance: "",
    amount: "",
  });

  // Update form data when supplier data is fetched
  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || "",
        phone: supplier.phone || "",
        company_name: supplier.company_name || "",
        email: supplier.email || "",
        city: supplier.city || "",
        country: supplier.country || "",
        initial_balance: supplier.initial_balance || "",
        amount: supplier.amount || "",
      });
    }
  }, [supplier]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/supplier/update`, { supplier_id: id, ...formData });
      // if (response.status === 200) navigate(-1); // Navigate back on success
    } catch (err) {
      console.error("Error updating supplier:", err);
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
            <CardTitle>تعديل بيانات المورد</CardTitle>
            <div className="flex gap-3">
              <Button onClick={() => navigate(-1)} variant="outline" className="text-red-500">
                الغاء
              </Button>
              <Button type="submit" variant="green">حفظ</Button>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <InputLabel
              label="اسم المورد"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ادخل اسم المورد"
            />
            <InputLabel
              label="البريد الالكتروني (اختياري)"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ادخل البريد الالكتروني (اختياري)"
            />
            <InputLabel
              label="رقم الجوال"
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="ادخل رقم الجوال"
            />
            <InputLabel
              label="اسم الشركة"
              required
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="ادخل اسم الشركة"
            />
            <InputLabel
              label="المدينة"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="ادخل المدينة"
            />
            <InputLabel
              label="الدولة"
              required
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="ادخل الدولة"
            />
            <InputLabel
              label="الرصيد الافتتاحي"
              name="initial_balance"
              value={formData.initial_balance}
              onChange={handleChange}
              placeholder="ادخل الرصيد الافتتاحي"
            />
            <InputLabel
              label="المبلغ"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="ادخل المبلغ"
            />
          </CardContent>
        </Card>
      </form>
    </Card>
  );
}