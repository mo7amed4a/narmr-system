import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { Label } from "@/components/ui/label";
import PasswordInput from "../../login/_components/PasswordInput";
import { role } from "@/utils/roleStatic";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    user_category: "transformer_employee",
    otp_code: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/create_portal_user", formData);
      if (response.status === 200) {
        localStorage.setItem("userType", role(response.data.user_type));
        navigate(`/${role(response.data.user_type)}`);
      } else {
        console.error("Error: ", response);
      }
    } catch (error) {
      console.error("Request failed: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">الاسم الأول :</Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">الاسم الأخير :</Label>
            <Input
              id="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="phone">رقم الجوال :</Label>
            <Input
              id="phone"
              type="tel"
              dir="ltr"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp_code">رمز التحقق :</Label>
            <Input
              id="otp_code"
              value={formData.otp_code}
              onChange={(e) => setFormData({ ...formData, otp_code: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">كلمة المرور :</Label>
          <PasswordInput
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm_password">تأكيد كلمة المرور :</Label>
          <PasswordInput
            id="confirm_password"
            value={formData.confirm_password}
            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
          />
        </div>

          <RadioGroup
            dir="rtl"
            defaultValue="محولات"
            className="flex justify-center gap-6"
            onValueChange={(value) =>
              setFormData({ ...formData, user_category: value })
            }
          >
            <div className="flex items-center gap-x-2">
              <RadioGroupItem value="transformer_employee" id="transformers" />
              <Label htmlFor="transformers">موظف المحولات</Label>
            </div>
            <div className="flex items-center gap-x-2">
              <RadioGroupItem value="accounting_employee" id="accounts" />
              <Label htmlFor="accounts">موظف الحسابات</Label>
            </div>
            <div className="flex items-center gap-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">المسؤول الرئيسي (الأدمن)</Label>
            </div>
          </RadioGroup>
        <Button type="submit" className="w-full bg-[#8B2635] hover:bg-[#7A2230]">
          تسجيل الحساب
        </Button>
      </form>
    </div>
  );
}