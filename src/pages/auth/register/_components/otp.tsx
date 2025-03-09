import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { Label } from "@/components/ui/label";


export default function OtpForm({setSteps}:{setSteps:React.Dispatch<React.SetStateAction<number>>}) {
  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
         const response = api.post("/send_otp", {
          "phone": formData.phone
          })
          const res = (await response)
          if (res.status == 200) {
            setSteps(2)
          }
          else {
            console.error(response)
          }
      } catch (error) {
   
      }
    
  };

  return (
    <div
    >

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right block">
              رقم الجوال :
            </Label>
            <Input
              id="phone"
              type="tel"
              dir="ltr"
              className="text-right"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>


          <Button
            type="submit"
            className="w-full bg-[#8B2635] hover:bg-[#7A2230]"
          >
            رمز التحقق
          </Button>
          <div className="py-2"></div>
        </form>
    </div>
  );
}
