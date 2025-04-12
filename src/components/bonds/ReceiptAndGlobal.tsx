import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InputLabel from "@/components/form/InputLabel";
import BranchSelect from "@/components/selects/BranchSelect";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/axios";
import { useUser } from "@/hooks/auth.context";
import AccountsSelect from "../selects/AccountsSelect";

export default function ReceiptBond({
  bondType = "receipt",
}: {
  bondType?: "receipt" | "payment" | "expenditure" | "loan" | "journal_entry";
}) {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    branch_id: "", // الفرع (ID)
    notes: "", // ملاحظات
    amount: "", // المبلغ
    account_id: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      user_id: user.user_id, 
      document_type: bondType, 
      amount: Number(formData.amount),
      branch_id: Number(formData.branch_id), 
      notes: formData.notes || "",
      account_id: Number(formData.account_id) > 0 ? Number(formData.account_id) : undefined
    };

    if (!payload.amount || payload.amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح");
      return;
    }

    if (!payload.branch_id) {
      toast.error("يرجى اختيار الفرع");
      return;
    }

    try {
      const response = await api.post("/sandat/create", payload);
      if (response.status === 200) {
        toast.success("تم حفظ سند القبض بنجاح");
        setFormData({
          branch_id: "",
          notes: "",
          amount: "",
          account_id: ""
        });
      } else {
        toast.error("فشل في حفظ السند: خطأ غير معروف");
      }
    } catch (err) {
      console.error("Error creating receipt bond:", err);
      toast.error("حدث خطأ أثناء حفظ السند");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="w-full border-none shadow-none p-0" dir="rtl">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <h3 className="mb-4 text-lg font-semibold"> سند 
                {bondType === "receipt" && " قبض"}
                {bondType === "payment" && " دفع"}
                {/* {bondType === "receipt" && "قبض"} */}
            </h3>
          <Button variant="green" form="receipt-bond-form" type="submit">
            حفظ السند
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <form id="receipt-bond-form" onSubmit={handleSubmit}>
            <div className="mb-8 space-y-6">
              <div className="grid gap-6 lg:grid-cols-3 items-end">
                <BranchSelect
                  value={formData.branch_id}
                  onValueChange={(value) =>
                    handleSelectChange("branch_id", value)
                  }
                />
                {bondType === "payment" && <AccountsSelect
                  value={formData.account_id}
                  onValueChange={(value) =>
                    handleSelectChange("account_id", value)
                  }
                />}
                <InputLabel
                  label="المبلغ"
                  name="amount"
                  classNameInput="!h-10"
                  placeholder="0"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
                <InputLabel
                  label="ملاحظات"
                  name="notes"
                  classNameInput="!h-10"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
