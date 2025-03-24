import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import BookingBondOne from "@/components/bonds-add/bond-one";
import BookingBondTwo from "@/components/bonds-add/bond-two";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/axios";

export default function AddBondsAccountingPage() {
  const [bondValue, setBondValue] = useState("three");

  // Map bond types to API document_type values
  const bondTypeMap: Record<string, string> = {
    one: "receipt", // سند قبض
    two: "payment", // سند صرف (assuming 'payment' for disbursement, adjust if different)
    three: "entry", // سند قيد (assuming 'entry' for journal entry, adjust if different)
  };

  // Handle form submission
  const handleSubmit = async (formData: {
    amount: string;
    payment_method: string;
    cashbox_name: string;
    branch_id: string;
    account_id: string;
    service_id: string;
    notes: string;
    customer_id: string;
  }) => {
    const payload = {
      user_id: 2, // Hardcoded for now, replace with dynamic user ID (e.g., from auth context)
      document_type: bondTypeMap[bondValue],
      amount: Number(formData.amount),
      payment_method: formData.payment_method || "cash",
      cashbox_name: formData.cashbox_name || "الخزينة الرئيسية",
      branch_id: Number(formData.branch_id),
      account_id: Number(formData.account_id),
      service_id: Number(formData.service_id),
      notes: formData.notes || "",
      customer_id: Number(formData.customer_id),
    };

    if (!payload.amount || payload.amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح");
      return;
    }

    try {
      const response = await api.post("/sandat/create", payload);

      if (response.status === 200) {
        toast.success("تم حفظ السند بنجاح");
      } else {
        toast.error(`فشل في حفظ السند خطأ غير معروف"`);
      }
    } catch (err) {
      console.error("Error creating bond:", err);
      toast.error("حدث خطأ أثناء حفظ السند");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="w-full border-none shadow-none" dir="rtl">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold">اضافة سند</h2>
          <div className="gap-x-2 flex">
            <Button variant="green" form="bond-form" type="submit">
              حفظ السند
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">اضافة سند</h3>
          <div className="mb-8 space-y-6">
            <div className="gap-4 flex items-center">
              <Label>نوع السند</Label>
              <RadioGroup
                defaultValue={bondValue}
                className="flex gap-4"
                onValueChange={(value) => setBondValue(value)}
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem value="one" id="one" />
                  <Label htmlFor="one">سند قبض</Label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem value="two" id="two" />
                  <Label htmlFor="two">سند صرف</Label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem value="three" id="three" />
                  <Label htmlFor="three">سند قيد</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {bondValue === "one" && <BookingBondOne onSubmit={handleSubmit} />}
          {bondValue === "two" && <BookingBondTwo onSubmit={handleSubmit} />}
          {/* {bondValue === "three" && <BookingBondThree onSubmit={handleSubmit} />} */}
        </CardContent>
      </Card>
    </div>
  );
}