import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordInput from "./_components/PasswordInput";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/auth.context";

export default function LoginForm() {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    rememberPassword: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (formData.rememberPassword)
    login({
      phone: formData.phone.split("+").join(""),
      password: formData.password,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      dir="rtl"
    >
      <div className="grid grid-cols-2 w-screen h-screen fixed inset-0">
        <img
          src="/auth/background.png"
          className="h-screen fixed start-0 top-0 w-2/4"
        />
      </div>
      <Card className="w-full max-w-xl p-6 space-y-6 relative z-10">
        <div className="flex justify-center mb-6">
          <div>
            <img className="h-28 w-auto" src="/images/3.jpg" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">تسجيل الدخول</h1>
          <p className="text-gray-500 text-sm">
            مرحباً، الرجاء إدخال التفاصيل الخاصة بك.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right block">
              رقم الموبايل :
            </Label>
            <Input
              id="phone"
              type="tel"
              dir="ltr"
              placeholder="+96650000000"
              className="text-right"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-right block">
              كلمة المرور :
            </Label>

            <PasswordInput
              id="password"
              type="password"
              className="text-right"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberPassword}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  rememberPassword: checked as boolean,
                })
              }
            />
            <Label htmlFor="remember" className="text-sm">
              تذكر كلمة المرور
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#8B2635] hover:bg-[#7A2230]"
          >
            تسجيل الدخول
          </Button>
          {/* <div className="py-2"></div> */}
          <div className="flex justify-between">
            <Link
              className="text-sm text-primary hover:underline"
              to="/forgot-password"
            >
              نسيت كلمة السر؟
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
