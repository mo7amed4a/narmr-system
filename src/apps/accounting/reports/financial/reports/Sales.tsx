import InputLabel from "@/components/form/InputLabel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BranchSelect from "@/components/selects/BranchSelect";
import { Button } from "@/components/ui/button";
import AccountsSelect from "@/components/selects/AccountsSelect";
import ButtonPDF from "@/components/buttons/ButtonPDF";
import { exportSales, printSales } from "@/utils/prints/sales";
import ButtonExcel from "@/components/buttons/ButtonExcel";
import { Printer } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import api from "@/lib/axios";

export default function Sales() {
  const [account, setAccount] = useState<string | null>(null);
  const [branch, setBranch] = useState("");
  const [data, setData] = useState<any | null>(null); // API response: { status, data, summary }
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = async () => {
    if (account && branch) {
      try {
        const res = await api.post(`/reports/sales`, {
          account_id: account,
          branch_id: branch,
          date_from: fromDate,
          date_to: toDate,
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching purchases report:", error);
        toast.error("حدث خطأ أثناء جلب تقرير المبيعات");
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
              <CardTitle className="py-2 w-full">تقارير المبيعات</CardTitle>

              <div className="flex w-full gap-2 justify-end">
                <Button variant={"outline"} onClick={() => printSales(data)}>
                  <span className="hidden md:block">طباعة الملف</span>
                  <Printer />
                </Button>
                <div onClick={() => exportSales(data?.data)}>
                  <ButtonExcel />
                </div>
                <div onClick={() => printSales(data)}>
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
     {data?.data&& <CardContent className="pt-4 space-y-4">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow className="border [&>*]:border bg-[#F1F1F1]">
              <TableCell className="text-right font-semibold text-gray-700">
                الوقت والتاريخ
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-700">
                اسم الخدمة
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-700">
                عدد الحجوزات
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-700">
                سعر البيع
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-700">
                اجمالي المبيعات
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: any, index: any) => {
              const values = Object.values(item) as any;
              return (
                <TableRow
                  key={index}
                  className={
                    "border [&>*]:border " +
                    (index % 2 === 0 ? "bg-white" : "bg-gray-50/50")
                  }
                >
                  <TableCell className="text-sm text-gray-600">
                    {item[values[0]]}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {item[values[1]]}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {item[values[2]]}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {item[values[3]]}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {item[values[4]]}
                  </TableCell>
                </TableRow>
              );
            })}
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
      </CardContent>}
    </>
  );
}
