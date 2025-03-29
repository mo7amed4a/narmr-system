import InputLabel from "@/components/form/InputLabel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AccountsSelect from "@/components/selects/AccountsSelect";
import { useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import BranchSelect from "@/components/selects/BranchSelect";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import ButtonExcel from "@/components/buttons/ButtonExcel";
import ButtonPDF from "@/components/buttons/ButtonPDF";
import { exportPurchasing, printPurchasing } from "@/utils/prints/purchasing";

export default function Purchasing() {
  const [account, setAccount] = useState<string | null>(null);
  const [branch, setBranch] = useState("");
  const [data, setData] = useState<any | null>(null); // API response: { status, data, summary }
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = async () => {
    if (account && branch) {
      try {
        const res = await api.post(`/reports/purchases`, {
          account_id: account,
          branch_id: branch,
          date_from: fromDate,
          date_to: toDate,
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching purchases report:", error);
        toast.error("حدث خطأ أثناء جلب تقرير المشتريات");
      }
    } else {
      toast.error("يرجى اختيار حساب وفرع");
    }
  };

  return (
    <div dir="rtl">
      <Card className="border shadow-none">
        <CardHeader className="p-4">
          <div className="flex w-full flex-col items-start lg:items-center justify-between lg:flex-row ">
            <CardTitle className="py-2 w-full">تقارير المشتريات</CardTitle>

            <div className="flex w-full gap-2 justify-end">
              <Button variant={"outline"} onClick={() => printPurchasing(data)}>
                <span className="hidden md:block">طباعة الملف</span>
                <Printer />
              </Button>
              <div onClick={() => exportPurchasing(data?.data)}>
                <ButtonExcel />
              </div>
              <div onClick={() => printPurchasing(data)}>
                <ButtonPDF />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-4 items-end">
            <AccountsSelect
              value={account || ""}
              onValueChange={(value) => setAccount(value)}
            />
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
            <BranchSelect
              value={branch || ""}
              onValueChange={(value) => setBranch(value)}
            />
          </div>
          <div className="flex justify-end py-4">
            <Button variant={"green"} onClick={handleSubmit}>
              إجراء الخزينة
            </Button>
          </div>
        </CardHeader>
      </Card>

      {data?.data && (
        <CardContent className="pt-4 space-y-4">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow className="border [&>*]:border bg-[#F1F1F1]">
                <TableCell className="text-right font-semibold text-gray-700">
                  الوقت والتاريخ
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  المنتج
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  المورد
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  الكمية المشتراة
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  سعر الوحدة
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  إجمالي المشتريات
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((transaction: any, index: number) => (
                <TableRow
                  key={index}
                  className={
                    "border [&>*]:border " +
                    (index % 2 === 0 ? "bg-white" : "bg-gray-50/50")
                  }
                >
                  <TableCell className="text-sm text-gray-600">
                    {transaction.datetime}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.product_name || "غير محدد"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.supplier_name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.quantity}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.unit_price}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.total_purchase}
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
              <TableRow className="border [&>*]:border bg-green-700 text-white">
                <TableCell className="text-sm">إجمالي المشتريات</TableCell>
                <TableCell className="text-sm">
                  {data.summary.total_purchases}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      )}
    </div>
  );
}
