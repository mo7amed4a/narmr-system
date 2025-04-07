import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { Label } from "@/components/ui/label";
import PasswordInput from "../../login/_components/PasswordInput";
import { role } from "@/utils/roleStatic";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: localStorage.getItem("otp_phone") || "",
    otp_code: "",
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/forgot_password", {
        ...formData,
        phone: formData.phone.split("+").join("")
      });
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
       
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="phone">رقم الموبايل :</Label>
            <Input
              id="phone"
              type="tel"
              // dir="ltr"
              placeholder="+96650000000"
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
            value={formData.new_password}
            onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
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
        <Button type="submit" className="w-full bg-[#8B2635] hover:bg-[#7A2230]">
          حفظ التغييرات
        </Button>
      </form>
    </div>
  );
}