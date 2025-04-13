import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InputLabel from "@/components/form/InputLabel";
import BranchSelect from "@/components/selects/BranchSelect";
import AccountsSelect from "@/components/selects/AccountsSelect";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/axios";
import { useUser } from "@/hooks/auth.context";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Line {
  account_id: string;
  note: string;
}

export default function JournalEntryBond() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branch_id: "",
    notes: "",
    amount: "",
  });
  const [lines, setLines] = useState<Line[]>([{ account_id: "", note: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false); // متغير جديد لتتبع حالة الإرسال

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLineChange = (
    index: number,
    field: keyof Line,
    value: string
  ) => {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [field]: value } : line))
    );
  };

  const addLine = () => {
    setLines((prev) => [...prev, { account_id: "", note: "" }]);
  };

  const removeLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // منع الإرسال إذا كان النموذج قيد الإرسال

    setIsSubmitting(true); // تعطيل الإرسال

    const payload = {
      user_id: user.user_id,
      document_type: "journal_entry",
      amount: Number(formData.amount),
      branch_id: Number(formData.branch_id),
      notes: formData.notes || "",
      lines: lines
        .filter((line) => line.account_id)
        .map((line) => ({
          account_id: Number(line.account_id),
          note: line.note || "",
        })),
    };

    if (!payload.amount || payload.amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح");
      setIsSubmitting(false); // إعادة تفعيل الإرسال
      return;
    }

    if (!payload.branch_id) {
      toast.error("يرجى اختيار الفرع");
      setIsSubmitting(false); // إعادة تفعيل الإرسال
      return;
    }

    if (payload.lines.length < 2) {
      toast.error("يرجى إضافة حسابين على الأقل (مدين ودائن)");
      setIsSubmitting(false); // إعادة تفعيل الإرسال
      return;
    }

    try {
      const response = await api.post("/sandat/create", payload);
      if (response.status === 200) {
        toast.success("تم حفظ سند القيد بنجاح");
        setFormData({
          branch_id: "",
          notes: "",
          amount: "",
        });
        navigate(-1);
        setLines([{ account_id: "", note: "" }]);
      } else {
        toast.error("فشل في حفظ السند: خطأ غير معروف");
      }
    } catch (err) {
      console.error("Error creating journal entry bond:", err);
      toast.error("حدث خطأ أثناء حفظ السند");
    } finally {
      setIsSubmitting(false); // إعادة تفعيل الإرسال بعد انتهاء العملية
    }
  };

  return (
    <div className="space-y-4">
      <Card className="w-full border-none shadow-none" dir="rtl">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <h3 className="mb-4 text-lg font-semibold">إضافة سند قيد</h3>
          <Button
            variant="green"
            form="journal-entry-form"
            type="submit"
            disabled={isSubmitting} // تعطيل الزر أثناء الإرسال
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ السند"}{" "}
            {/* تغيير النص أثناء الإرسال */}
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <form id="journal-entry-form" onSubmit={handleSubmit}>
            <div className="mb-8 space-y-6">
              <div className="grid gap-6 lg:grid-cols-3 items-end">
                <BranchSelect
                  value={formData.branch_id}
                  onValueChange={(value) =>
                    handleSelectChange("branch_id", value)
                  }
                />
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

              {/* قسم الحسابات (Lines) */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold">الحسابات</h4>
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className="grid gap-4 lg:grid-cols-4 items-end"
                  >
                    <AccountsSelect
                      value={line.account_id}
                      onValueChange={(value) =>
                        handleLineChange(index, "account_id", value)
                      }
                    />
                    <InputLabel
                      label={`ملاحظة الحساب ${index + 1}`}
                      name={`line-note-${index}`}
                      classNameInput="!h-10"
                      value={line.note}
                      onChange={(e) =>
                        handleLineChange(index, "note", e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeLine(index)}
                      disabled={lines.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addLine}>
                  إضافة حساب آخر
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
