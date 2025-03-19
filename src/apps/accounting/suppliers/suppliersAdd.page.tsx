import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function SuppliersAddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company_name: "",
    email: "",
    city: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من الحقول المطلوبة
    if (!formData.name || !formData.phone || !formData.company_name || !formData.city || !formData.country) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        company_name: formData.company_name,
        email: formData.email || undefined, // إذا كان فارغًا، يترسل كـ undefined (اختياري)
        city: formData.city,
        country: formData.country,
      };

      await api.post("/supplier/add", payload);
      toast.success("تم إضافة المورد بنجاح");
      setFormData({
        name: "",
        phone: "",
        company_name: "",
        email: "",
        city: "",
        country: "",
      });
    } catch (error) {
      console.error("Error adding supplier:", error);
      toast.error("حدث خطأ أثناء إضافة المورد");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <form onSubmit={handleSubmit}>
        <Card className="w-full shadow-none p-0">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>إضافة مورد جديد</CardTitle>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="text-red-500"
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
              <Button variant="green" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <InputLabel
              label="اسم المورد"
              required
              placeholder="ادخل اسم المورد"
              value={formData.name}
              onChange={(e) => handleChange("name")(e.target.value)}
            />
            <InputLabel
              label="البريد الإلكتروني (اختياري)"
              placeholder="ادخل البريد الإلكتروني (اختياري)"
              value={formData.email}
              onChange={(e) => handleChange("email")(e.target.value)}
            />
            <InputLabel
              label="رقم الجوال"
              required
              placeholder="ادخل رقم الجوال"
              value={formData.phone}
              onChange={(e) => handleChange("phone")(e.target.value)}
            />
            <InputLabel
              label="اسم الشركة"
              required
              placeholder="ادخل اسم الشركة"
              value={formData.company_name}
              onChange={(e) => handleChange("company_name")(e.target.value)}
            />
            <InputLabel
              label="المدينة"
              required
              placeholder="ادخل المدينة"
              value={formData.city}
              onChange={(e) => handleChange("city")(e.target.value)}
            />
            <InputLabel
              label="الدولة"
              required
              placeholder="العراق"
              value={formData.country}
              onChange={(e) => handleChange("country")(e.target.value)}
            />
          </CardContent>
        </Card>
      </form>
    </Card>
  );
}