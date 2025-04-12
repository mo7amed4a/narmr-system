import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react"; // New import
import ReceiptBond from "@/components/bonds/ReceiptAndGlobal";
import JournalEntryBond from "@/components/bonds/JournalEntry";

export default function BondsAddAccountingPage() {
  const [bondValue, setBondValue] = useState("receipt");
 
  // Document types for radio buttons
  const bondTypes = [
    { value: "receipt", label: "سند قبض" },
    { value: "payment", label: "سند دفع" },
    // { value: "expenditure", label: "سند مصروفات" },
    // { value: "loan", label: "سند قرض" },
    { value: "journal_entry", label: "سند قيد" },
  ];

  // Payment methods for select
//   const paymentMethods = [
//     { value: "cash", label: "نقدي" },
//     { value: "bank", label: "بنك" },
//     { value: "credit_card", label: "بطاقة ائتمان" },
//   ];


  return (
    <div className="space-y-4">
      <Card className="w-full border-none shadow-none" dir="rtl">
        {/* <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold">إضافة سند</h2>
          <Button variant="green" form="bond-form" type="submit">
            حفظ السند
          </Button>
        </CardHeader> */}
        <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-semibold">إضافة سند</h3>
            <div className="mb-8 space-y-6">
              <div className="flex items-center gap-4">
                <Label>نوع السند</Label>
                <RadioGroup
                  value={bondValue}
                  onValueChange={setBondValue}
                  className="flex flex-wrap gap-4"
                >
                  {bondTypes.map((type) => (
                    <div key={type.value} className="flex items-center gap-x-2">
                      <RadioGroupItem value={type.value} id={type.value} />
                      <Label htmlFor={type.value}>{type.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            {bondValue === "receipt" && <ReceiptBond />}
            {bondValue === "payment" && <ReceiptBond bondType="payment" />}
            {bondValue === "expenditure" && <ReceiptBond bondType="expenditure" />}
            {bondValue === "loan" && <ReceiptBond bondType="loan" />}
            {bondValue === "journal_entry" && <JournalEntryBond />}
        </CardContent>
      </Card>
    </div>
  );
}