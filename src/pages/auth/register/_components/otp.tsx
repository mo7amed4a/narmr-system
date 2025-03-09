import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";


export default function OtpForm({setSteps, page=false}:{setSteps:React.Dispatch<React.SetStateAction<number>>, page?:boolean}) {
  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
         const response = api.post("/send_otp", {
          "phone": formData.phone.split("+").join("")
          })
          const res = (await response)
          if (res.status == 200) {
            toast.success("تم ارسال رمز التحقق")
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

        <form onSubmit={handleSubmit} className={`space-y-4 ${page && "flex w-full justify-between items-end gap-4"}`}>
          <div className={`space-y-2 ${page && "w-full"}`}>
            <Label htmlFor="phone" className="text-right block">
              رقم الجوال :
            </Label>
            <Input
              id="phone"
              type="tel"
              dir="ltr"
              className="text-right"
              placeholder="+966500000000"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>


          <Button
            type="submit"
            className={`bg-[#8B2635] hover:bg-[#7A2230] ${page ? "h-9" : "w-full"}`}
          >
            رمز التحقق
          </Button>
        </form>
    </div>
  );
}
