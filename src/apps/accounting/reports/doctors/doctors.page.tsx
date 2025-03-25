import { useRef, useState } from "react";
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
import { Printer } from "lucide-react";
import ButtonExcel from "@/components/buttons/ButtonExcel";
import ButtonPDF from "@/components/buttons/ButtonPDF";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import BranchSelect from "@/components/selects/BranchSelect";
import DoctorSelect from "@/components/selects/DoctorSelect";
import { DownloadTableExcel } from 'react-export-table-to-excel';


export default function TreasuryAccountingPage() {
  const [doctor, setDoctor] = useState("");
  const [branch, setBranch] = useState("");
  const [data, setData] = useState<any | null>(null); // API response: { status, data, summary }
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const tableRef = useRef(null);


  const handleSubmit = async () => {
    if (doctor && branch && fromDate && toDate) {
      try {
        const res = await api.post(`/reservations/doctor_report?status=all`, {
          doctor_id: parseInt(doctor),
          branch_id: parseInt(branch),
          date_from: fromDate,
          date_to: toDate,
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching treasury report:", error);
        toast.error("حدث خطأ أثناء جلب التقرير");
      }
    } else {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <Card className="border-none shadow-none">
        <CardHeader className="p-4">
          <CardTitle>تقارير الاطباء</CardTitle>
          <div className="grid md:grid-cols-3 gap-4 pt-4 items-end">
            <DoctorSelect
              value={doctor || ""}
              onValueChange={(value) => setDoctor(value as string)}
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
              إجراء البحث
            </Button>
          </div>
        </CardHeader>
      </Card>
      {data?.data && (
        <Card className="border-none shadow-none">
          <CardContent className="pt-4 space-y-4">
            <div className="flex w-full gap-2 justify-end py-6">
              <Button variant={"outline"} onClick={() => window.print()}>
                <span className="hidden md:block">طباعة الملف</span>
                <Printer />
              </Button>
              <ButtonExcel />
              <ButtonPDF />
              <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <button> Export excel </button>

                </DownloadTableExcel>
            </div>
            <Table ref={tableRef} id="print_doctors_99">
              <TableHeader className="bg-gray-100">
                <TableRow className="border [&>*]:border bg-[#F1F1F1]">
                  <TableCell className="text-right font-semibold text-gray-700">
                    الموعد
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    الطبيب المعالج
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    اسم العميل
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    فرع الحجز
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    حالة الحجز
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    أنشئ بواسطة
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    تاريخ العملية
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
                      {transaction.reservation_date}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.doctor_name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.customer_name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.branch_name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.status === "confirmed" ? (
                        <span className="text-green-500">مكتمل</span>
                      ) : transaction.status === "pending" ? (
                        <span className="text-yellow-500">معلق</span>
                      ) : (
                        <span className="text-red-500">ملغي</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.created_by}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.operation_date}
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
                    {data.summary.total_invoices}
                  </TableCell>
                </TableRow>
                <TableRow className={"border [&>*]:border"}>
                  <TableCell className="text-sm text-gray-600">
                    إجمالي الدفع
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {data.summary.total_payments}
                  </TableCell>
                </TableRow>
                <TableRow className={"border [&>*]:border bg-green-700 text-white"}>
                  <TableCell className="text-sm">الرصيد</TableCell>
                  <TableCell className="text-sm">
                    {data.summary.final_balance}
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