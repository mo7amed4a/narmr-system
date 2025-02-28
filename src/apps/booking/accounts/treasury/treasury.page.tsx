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

export default function TreasuryPage() {
  const [account, setAccount] = useState("");
  const [fromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isNotEmptyForm, setIsNotEmptyForm] = useState(true);

  const handleSubmit = () => {
    if (account && fromDate && toDate) {
      setIsNotEmptyForm(true);
      console.log("الحساب:", account);
      console.log("من:", fromDate);
      console.log("إلى:", toDate);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-4">
          <CardTitle>الخزينة</CardTitle>
          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <SelectCustom label="اختر الحساب" onValueChange={setAccount}>
              <SelectItem value="erj">حساب 1</SelectItem>
              <SelectItem value="xyz">حساب 2</SelectItem>
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
          </div>
          <div className="flex justify-end py-4">
            <Button variant={"green"} onClick={handleSubmit}>
              اجراء الخزينة
            </Button>
          </div>
        </CardHeader>
      </Card>
      {isNotEmptyForm && (
        <Card className=" border-none shadow-none">
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
                      {transaction.type}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.phone}
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
    date: "20 Dec, 2021, 02:21 AM",
    type: "",
    phone: "",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    details: "70",
    paid: "0",
    cost: "70",
    status: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    type: "",
    phone: "",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    details: "70",
    paid: "0",
    cost: "70",
    status: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    type: "",
    phone: "",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    details: "70",
    paid: "0",
    cost: "70",
    status: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    type: "",
    phone: "",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    details: "70",
    paid: "0",
    cost: "70",
    status: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    type: "",
    phone: "",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    details: "70",
    paid: "0",
    cost: "70",
    status: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    type: "",
    phone: "",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    details: "70",
    paid: "0",
    cost: "70",
    status: "0",
  },
];
