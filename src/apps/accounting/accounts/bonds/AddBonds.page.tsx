import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SelectCustom from "@/components/ui/selectCustom";
import InputLabel from "@/components/form/InputLabel";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/axios";
import CustomerSelect from "@/components/selects/CustomerSelect";
import BranchSelect from "@/components/selects/BranchSelect";
import ServiceSelect from "@/components/selects/ServiceSelect";
import AccountsSelect from "@/components/selects/AccountsSelect";
import CashboxesSelect from "@/components/selects/CashboxesSelect";
import SuppliersSelect from "@/components/selects/SuppliersSelect"; // New import
import { useUser } from "@/hooks/auth.context";
import { SelectItem } from "@/components/ui/select";

export default function AddBondsAccountingPage() {
  const { user } = useUser();
  const [bondValue, setBondValue] = useState("receipt");
  const [formData, setFormData] = useState({
    customer_id: "", // ID for receipt/loan/journal_entry
    supplier_id: "", // ID for payment/expenditure
    notes: "", // ملاحظات
    cashbox_id: "", // الخزينة (ID)
    document_date: "", // تاريخ السند
    branch_id: "", // الفرع (ID)
    payment_method: "cash", // طريقة الدفع
    account_id: "", // الحساب (ID)
    service_id: "", // الخدمة (ID)
    amount: "", // المبلغ
  });

  // Document types for radio buttons
  const bondTypes = [
    { value: "receipt", label: "سند قبض" },
    { value: "payment", label: "سند دفع" },
    { value: "expenditure", label: "سند مصروفات" },
    { value: "loan", label: "سند قرض" },
    { value: "journal_entry", label: "سند قيد" },
  ];

  // Payment methods for select
  const paymentMethods = [
    { value: "cash", label: "نقدي" },
    { value: "bank", label: "بنك" },
    { value: "credit_card", label: "بطاقة ائتمان" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isSupplierType = ["payment", "expenditure"].includes(bondValue);
    const payload = {
      user_id: user.user_id, // Dynamic user ID from context
      document_type: bondValue,
      amount: Number(formData.amount),
      payment_method: formData.payment_method,
      cashbox_id: Number(formData.cashbox_id), // Default if empty
      document_date: formData.document_date || new Date().toISOString(),
      branch_id: Number(formData.branch_id), // From BranchSelect
      account_id: Number(formData.account_id), // From AccountsSelect
      service_id: Number(formData.service_id), // From ServiceSelect
      notes: formData.notes || "",
      customer_id: Number(formData.customer_id),
      ...(isSupplierType
        && { supplier_id: Number(formData.supplier_id)} ), // From CustomerSelect
    };

    if (!payload.amount || payload.amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح");
      return;
    }

    try {
      const response = await api.post("/sandat/create", payload);
      if (response.status === 200) {
        toast.success("تم حفظ السند بنجاح");
        setFormData({
          customer_id: "",
          supplier_id: "",
          notes: "",
          cashbox_id: "",
          document_date: "",
          branch_id: "",
          payment_method: "cash",
          account_id: "",
          service_id: "",
          amount: "",
        });
      } else {
        toast.error("فشل في حفظ السند: خطأ غير معروف");
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
          <h2 className="text-xl font-bold">إضافة سند</h2>
          <Button variant="green" form="bond-form" type="submit">
            حفظ السند
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <form id="bond-form" onSubmit={handleSubmit}>
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

              <div className="grid gap-6 lg:grid-cols-3">
                  {["payment", "expenditure"].includes(bondValue) && (
                    <SuppliersSelect
                      value={formData.supplier_id}
                      onValueChange={(value) => handleSelectChange("supplier_id", value)}
                    />
                  )}
                  <CustomerSelect
                    value={formData.customer_id}
                    onValueChange={(value) => handleSelectChange("customer_id", value)}
                  />
                
                <CashboxesSelect
                  value={formData.cashbox_id}
                  onValueChange={(value) => handleSelectChange("cashbox_id", value)}
                />
              </div>

              <div className="grid lg:grid-cols-3 items-center gap-4">
                <BranchSelect
                  value={formData.branch_id}
                  onValueChange={(value) => handleSelectChange("branch_id", value)}
                />
                <AccountsSelect
                  value={formData.account_id}
                  onValueChange={(value) => handleSelectChange("account_id", value)}
                />
                <ServiceSelect
                  value={formData.service_id}
                  onValueChange={(value) => handleSelectChange("service_id", value)}
                />
                
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                  <SelectCustom
                    label="طريقة الدفع"
                    value={formData.payment_method}
                    onValueChange={(value) => handleSelectChange("payment_method", value)}
                  >
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectCustom>
                  <InputLabel
                    label="تاريخ السند"
                    name="document_date"
                    classNameInput="!h-10"
                    placeholder="تاريخ السند"
                    type="date"
                    value={formData.document_date}
                    onChange={handleInputChange}
                  />
                  <InputLabel
                    label="ملاحظات"
                    name="notes"
                    classNameInput="!h-10"
                    value={formData.notes}
                    onChange={handleInputChange}
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
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}