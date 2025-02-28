import { useState } from "react";
import InputLabel from "@/components/form/InputLabel";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import SelectCustom from "@/components/ui/selectCustom";
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

export default function TreasuryAccountingPage() {
  const [account, setAccount] = useState("");
  const [toDate, setToDate] = useState("");
  const [isNotEmptyForm] = useState(true);

console.log(toDate, account, );

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-4">
          <CardTitle>تقارير الحجوزات</CardTitle>
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <SelectCustom label="اختر العميل" onValueChange={setAccount}>
              <SelectItem value="erj">محمد 1</SelectItem>
              <SelectItem value="xyz">احمد 2</SelectItem>
            </SelectCustom>
            <div className="flex flex-wrap md:flex-nowrap gap-3 items-center w-full">
                    <InputLabel
                      type="date"
                      label="المدة الزمنية من"
                      className="w-full"
                      placeholder=" "
                      classNameInput="!h-9"
                    />
              <span className="text-xs md:text-base">الى</span>
              <InputLabel
                type="date"
                label="المدة الزمنية الى"
                className="w-full"
                placeholder=" "
                classNameInput="!h-9"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <SelectCustom label="اختر الفرع" onValueChange={setAccount}>
              <SelectItem value="erj">فرع 1</SelectItem>
              <SelectItem value="xyz">فرع 2</SelectItem>
            </SelectCustom>
          </div>
        </CardHeader>
      </Card>
      {isNotEmptyForm && (
        <Card className=" border-none shadow-none">
          <CardContent className="pt-4 space-y-4">
          <div className="flex w-full gap-2 justify-end py-6">
            <Button variant={"outline"}>
              <span className="hidden md:block">طباعة الملف</span>
              <Printer />
            </Button>
            <ButtonExcel />
            <ButtonPDF />
          </div>
            <Table>
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
                    انشئ بواسطة
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    تاريخ العملية
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
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
                      {transaction.doctor_name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.client_name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.branch}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.status? <span className="text-green-500">مكتمل</span> : <span className="text-red-500">ملغي</span>}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.created_by}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.created_At}
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
                    دينار عراقي
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow className={"border [&>*]:border "}>
                    <TableCell className="text-sm text-gray-600">
                     الرصيد الافتاحي
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      -
                    </TableCell>
                  </TableRow>
                  <TableRow className={"border [&>*]:border "}>
                    <TableCell className="text-sm text-gray-600">
                     اجمالي الفواتير
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      150
                    </TableCell>
                  </TableRow>
                  <TableRow className={"border [&>*]:border "}>
                    <TableCell className="text-sm text-gray-600">
                     اجمالي الدفع
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      180
                    </TableCell>
                  </TableRow>

                  <TableRow className={"border [&>*]:border bg-green-700 text-white"}>
                    <TableCell className="text-sm ">
                     الرصيد
                    </TableCell>
                    <TableCell className="text-sm ">
                      190
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

const transactions = [
  {
    date: "20 Dec, 2021, 02:21 AM",
    doctor_name: "سيد",
    client_name: "طارق",
    branch: "فرع 1",
    status: true,
    created_by: "Admin",
    created_At: "20 Dec, 2021, 02:21 AM"
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    doctor_name: "سيد",
    client_name: "طارق",
    branch: "فرع 1",
    status: false,
    created_by: "Admin",
    created_At: "20 Dec, 2021, 02:21 AM"
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    doctor_name: "سيد",
    client_name: "طارق",
    branch: "فرع 1",
    status: false,
    created_by: "Admin",
    created_At: "20 Dec, 2021, 02:21 AM"
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    doctor_name: "سيد",
    client_name: "طارق",
    branch: "فرع 1",
    status: false,
    created_by: "Admin",
    created_At: "20 Dec, 2021, 02:21 AM"
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    doctor_name: "سيد",
    client_name: "طارق",
    branch: "فرع 1",
    status: false,
    created_by: "Admin",
    created_At: "20 Dec, 2021, 02:21 AM"
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    doctor_name: "سيد",
    client_name: "طارق",
    branch: "فرع 1",
    status: false,
    created_by: "Admin",
    created_At: "20 Dec, 2021, 02:21 AM"
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    doctor_name: "سيد",
    client_name: "طارق",
    branch: "فرع 1",
    status: false,
    created_by: "Admin",
    created_At: "20 Dec, 2021, 02:21 AM"
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    doctor_name: "سيد",
    client_name: "طارق",
    branch: "فرع 1",
    status: false,
    created_by: "Admin",
    created_At: "20 Dec, 2021, 02:21 AM"
  },
];
