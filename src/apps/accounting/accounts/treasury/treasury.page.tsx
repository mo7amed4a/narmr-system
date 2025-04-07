import { useState } from "react";
import InputLabel from "@/components/form/InputLabel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/axios";
import CashboxesSelect from "@/components/selects/CashboxesSelect";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/auth.context";

export default function TreasuryAccountingPage() {
  const {user} = useUser()
  const [cashbox, setCashbox] = useState("");
  const [data, setData] = useState<any | null>(null); // Use 'any' temporarily since we don’t have a full type yet
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = async () => {
    if (cashbox && fromDate && toDate) {
      try {
        const res = await api.post(`/cashbox/report`, {
          cashbox_id: cashbox || user?.user_id,
          date_from: fromDate,
          date_to: toDate,
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching treasury report:", error);
      }
    } else toast.error("يرجى ملء جميع الحقول المطلوبة");
  };

  return (
    <div className="space-y-4" dir="rtl">
      <Card className="border-none shadow-none">
        <CardHeader className="p-4">
          <CardTitle>الخزينة</CardTitle>
          <div className="grid md:grid-cols-2 gap-4 pt-4 items-end">
            {user?.user_category != "transformer_employee" && <CashboxesSelect
              value={cashbox || ""}
              onValueChange={(value) => setCashbox(value)}
            />}
            <div className="flex flex-wrap md:flex-nowrap gap-3 items-center w-full">
              <InputLabel
                type="date"
                label="المدة الزمنية من"
                className="w-full"
                placeholder=" "
                classNameInput="!h-9"
                onChange={(e) => setFromDate(e.target.value)}
              />
              <span className="text-xs md:text-base">إلى</span>
              <InputLabel
                type="date"
                label="المدة الزمنية إلى"
                className="w-full"
                placeholder=" "
                classNameInput="!h-9"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end py-4">
            <Button variant={"green"} onClick={handleSubmit}>
              إجراء الخزينة
            </Button>
          </div>
        </CardHeader>
      </Card>

      {data?.records && (
        <Card className="border-none shadow-none">
          <CardContent className="pt-4 space-y-4">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow className="border [&>*]:border bg-[#F1F1F1]">
                  <TableCell className="text-right font-semibold text-gray-700">
                    التاريخ
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    نوع الفاتورة
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    الرقم
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    الوصف
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    التفاصيل
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    المدفوع
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    التكلفة
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    الحالة
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.records.map((transaction: any, index: number) => (
                  <TableRow
                    key={index}
                    className={
                      "border [&>*]:border " +
                      (index % 2 === 0 ? "bg-white" : "bg-gray-50/50")
                    }
                  >
                    <TableCell className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleString("ar-EG")}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.type === "receipt" ? "قبض" : transaction.type === "payment" ? "دفع" : transaction.type}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.number}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.details}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.paid}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.cost}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Table className="md:w-2/4 lg:w-1/4">
              <TableHeader className="bg-gray-100">
                <TableRow className="border [&>*]:border bg-[#F1F1F1]">
                  <TableCell className="text-right font-semibold text-gray-700">
                    العملة
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    {data.summary.currency}
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className={"border [&>*]:border"}>
                  <TableCell className="text-sm text-gray-600">
                    الرصيد الافتتاحي
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {data.summary.opening_balance}
                  </TableCell>
                </TableRow>
                <TableRow className={"border [&>*]:border"}>
                  <TableCell className="text-sm text-gray-600">
                    إجمالي الفواتير
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {data.summary.total_cost}
                  </TableCell>
                </TableRow>
                <TableRow className={"border [&>*]:border"}>
                  <TableCell className="text-sm text-gray-600">
                    إجمالي الدفع
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {data.summary.total_paid}
                  </TableCell>
                </TableRow>
                <TableRow className={"border [&>*]:border bg-green-700 text-white hover:text-green-500"}>
                  <TableCell className="text-sm">
                    الرصيد
                  </TableCell>
                  <TableCell className="text-sm">
                    {data.summary.balance}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}