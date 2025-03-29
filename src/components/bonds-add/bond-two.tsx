import SelectCustom from "@/components/ui/selectCustom";
import InputLabel from "@/components/form/InputLabel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface BookingBondTwoProps {
  onSubmit: (formData: {
    amount: string;
    payment_method: string;
    cashbox_name: string;
    branch_id: string;
    account_id: string;
    service_id: string;
    notes: string;
    customer_id: string;
  }) => void;
}

interface RowData {
  account_id: string;
  service_id: string;
  amount: string;
}

export default function BookingBondTwo({ onSubmit }: BookingBondTwoProps) {
  const [formData, setFormData] = useState({
    customer_name: "", // الاسم
    notes: "", // ملاحظات
    cashbox_name: "", // الخزينة
    document_date: "", // تاريخ السند
    branch_id: "", // اختر الفرع
    payment_method: "", // طريقة التحويل
  });

  const [rows, setRows] = useState<RowData[]>([
    { account_id: "", service_id: "", amount: "" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowChange = (
    index: number,
    field: keyof RowData,
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { account_id: "", service_id: "", amount: "" }]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate total amount from all rows
    const totalAmount = rows
      .reduce((sum, row) => sum + (Number(row.amount) || 0), 0)
      .toString();

    // Use the first row’s account_id and service_id (adjust if API supports multiple)
    const firstRow = rows[0] || { account_id: "", service_id: "" };

    const submitData = {
      amount: totalAmount,
      payment_method: formData.payment_method || "cash",
      cashbox_name: formData.cashbox_name || "الخزينة الرئيسية",
      branch_id: formData.branch_id || "2", // Default if not selected
      account_id: firstRow.account_id || "1", // Default if not selected
      service_id: firstRow.service_id || "6", // Default if not selected
      notes: formData.notes,
      customer_id: "5", // Hardcoded for now, replace with dynamic value
    };

    onSubmit(submitData);
  };

  return (
    <div>
      <form id="bond-form" onSubmit={handleFormSubmit}>
        <div className="mb-8">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="col-span-2">
              <InputLabel
                label="الاسم"
                name="customer_name"
                classNameInput="!h-10"
                value={formData.customer_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <InputLabel
                label="ملاحظات"
                name="notes"
                classNameInput="!h-10"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputLabel
                label="الخزينة"
                name="cashbox_name"
                classNameInput="!h-10"
                value={formData.cashbox_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="py-4 grid lg:grid-cols-5 items-center gap-4">
            <div className="col-span-2">
              <InputLabel
                classNameInput="!h-10"
                label="تاريخ السند"
                name="document_date"
                placeholder="تاريخ السند"
                type="date"
                value={formData.document_date}
                onChange={handleInputChange}
              />
            </div>
            <SelectCustom
              label="اختر الفرع"
              value={formData.branch_id}
              onValueChange={(value:any) => handleSelectChange("branch_id", value)}
            >
              <SelectItem value="2">ريم فهد</SelectItem>
              {/* Add more branches as needed */}
            </SelectCustom>
            <div className="col-span-2">
              <SelectCustom
                label="طريقة التحويل"
                value={formData.payment_method}
                onValueChange={(value:any) =>
                  handleSelectChange("payment_method", value)
                }
              >
                <SelectItem value="cash">نقدي</SelectItem>
                {/* Add more payment methods as needed */}
              </SelectCustom>
            </div>
          </div>
        </div>
        <CardTitle className="pb-4">اضافة سند صرف</CardTitle>
        <Table>
          <TableHeader>
            <TableRow className="border [&>*]:border bg-gray-100">
              <TableHead className="text-right">اختر الحساب</TableHead>
              <TableHead className="text-right">الخدمة</TableHead>
              <TableHead className="text-right">المبلغ</TableHead>
              <TableHead className="text-right">الاجمالي</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} className="border [&>*]:border">
                <TableCell>
                  <Select
                    value={row.account_id}
                    onValueChange={(value) =>
                      handleRowChange(index, "account_id", value)
                    }
                  >
                    <SelectTrigger className="rounded-none border-none shadow-none px-0">
                      <SelectValue placeholder="اختر الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">wenfm</SelectItem>
                      {/* Add more account options */}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={row.service_id}
                    onValueChange={(value) =>
                      handleRowChange(index, "service_id", value)
                    }
                  >
                    <SelectTrigger className="rounded-none border-none shadow-none px-0">
                      <SelectValue placeholder="اختر الخدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">wenfm</SelectItem>
                      {/* Add more service options */}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right font-bold">
                  <Input
                    className="rounded-none border-none shadow-none px-0"
                    placeholder="0"
                    type="number"
                    value={row.amount}
                    onChange={(e) =>
                      handleRowChange(index, "amount", e.target.value)
                    }
                  />
                </TableCell>
                {index === 0 && (
                  <TableCell
                    rowSpan={rows.length}
                    className="text-right font-bold"
                  >
                    {rows
                      .reduce((sum, r) => sum + (Number(r.amount) || 0), 0)
                      .toString()}
                  </TableCell>
                )}
              </TableRow>
            ))}
            <TableRow className="border [&>*]:border">
              <TableCell colSpan={3} className="text-right font-bold p-0">
                <Button
                  variant="green"
                  className="rounded-none"
                  type="button"
                  onClick={addRow}
                >
                  + إضافة
                </Button>
              </TableCell>
              {rows.length === 0 && (
                <TableCell className="text-right font-bold">0</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );
}