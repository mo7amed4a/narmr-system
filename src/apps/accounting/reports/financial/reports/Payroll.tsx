import InputLabel from "@/components/form/InputLabel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useState } from "react";
import AccountsSelect from "@/components/selects/AccountsSelect";
import BranchSelect from "@/components/selects/BranchSelect";
import toast from "react-hot-toast";
import { Printer } from "lucide-react";
import ButtonExcel from "@/components/buttons/ButtonExcel";
import ButtonPDF from "@/components/buttons/ButtonPDF";
import { exportExcel, printPDF } from "@/utils/exportUtils";

export default function Payroll() {
  const [account, setAccount] = useState<string | null>(null);
  const [branch, setBranch] = useState("");
  const [data, setData] = useState<any | null>(null); // API response: { status, data, summary }
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = async () => {
    if (account && branch) {
      try {
        const res = await api.post(`/reports/salaries`, {
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
    <>
      <CardHeader>
        <Card className="border shadow-none">
          <CardHeader className="p-4">
          <div className="flex w-full flex-col items-start lg:items-center justify-between lg:flex-row ">
              <CardTitle className="py-2 w-full">تقارير المرتبات</CardTitle>

              <div className="flex w-full gap-2 justify-end">
                <Button variant={"outline"} onClick={() => printPDF([data?.data, data?.summary], [
    "الوقت والتاريخ",
    "اسم الموظف",
    "الراتب الاساسي",
    "البدلات",
    "الخصومات",
    "صافي الراتب"
  ],["العملة","	دينار عراقي"])}>
                  <span className="hidden md:block">طباعة الملف</span>
                  <Printer />
                </Button>
                <div onClick={() => exportExcel(data?.data, "تقارير المرتبات", [
    "الوقت والتاريخ",
    "اسم الموظف",
    "الراتب الاساسي",
    "البدلات",
    "الخصومات",
    "صافي الراتب"
  ])}>
                  <ButtonExcel />
                </div>
                <div onClick={() => printPDF([data?.data, data?.summary], [
    "الوقت والتاريخ",
    "اسم الموظف",
    "الراتب الاساسي",
    "البدلات",
    "الخصومات",
    "صافي الراتب"
  ],["العملة","	دينار عراقي"])}>
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
      </CardHeader>
      {data?.data && (
        <CardContent className="pt-4 space-y-4">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow className="border [&>*]:border bg-[#F1F1F1]">
                <TableCell className="text-right font-semibold text-gray-700">
                  الوقت والتاريخ
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  اسم الموظف
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  الراتب الاساسي
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  البدلات
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  الخصومات
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-700">
                  صافي الراتب
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((transaction: any, index: any) => (
                <TableRow
                  key={index}
                  className={
                    "border [&>*]:border " +
                    (index % 2 === 0 ? "bg-white" : "bg-gray-50/50")
                  }
                >
                  <TableCell className="text-sm text-gray-600">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.employee_name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.basic_salary}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.allowances}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.deductions}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.net_salary}
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
                <TableCell className="text-sm text-gray-600">إجمالي</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {data.summary.total_paid}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      )}
    </>
  );
}
