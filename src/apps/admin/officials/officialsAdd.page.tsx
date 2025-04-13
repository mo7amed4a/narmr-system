import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OtpForm from "@/pages/auth/register/_components/otp";
import RegisterForm from "@/pages/auth/register/_components/RegisterForm";
import { useState } from "react";

export default function OfficialsAddPage() {
  const [steps, setSteps] = useState(1);
  return (
    <div>
      {steps === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>اضافة مسؤول جديد</CardTitle>    
          </CardHeader>
          <CardContent>
            <OtpForm page setSteps={setSteps} />
          </CardContent>
        </Card>
      )}
      {steps === 2 && <RegisterForm setSteps={setSteps} />}
    </div>
  );
}
