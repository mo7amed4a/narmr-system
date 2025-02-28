import { useState } from "react";
import InputLabel from "@/components/form/InputLabel";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import SelectCustom from "@/components/ui/selectCustom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer } from "lucide-react";
import CardBorderStart from "@/components/global/CardBorderStart";
import LogoAndInfo from "@/components/global/LogoAndInfo";
import ButtonExcel from "@/components/buttons/ButtonExcel";
import ButtonPDF from "@/components/buttons/ButtonPDF";

export default function StatementAccountingPage() {
  const [account, setAccount] = useState("");
  const [fromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isNotEmptyForm, setIsNotEmptyForm] = useState(false);

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
          <CardTitle>كشف حساب</CardTitle>
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
              اجراء كشف حساب
            </Button>
          </div>
        </CardHeader>
      </Card>
      {isNotEmptyForm && <Card className=" border-none shadow-none">
        <CardHeader>
          <div className="space-y-6">
            <div className="flex flex-col-reverse md:flex-row items-center gap-5 justify-between md:items-start">
              <div className="text-sm text-start w-full space-y-1">
                <h2 className="text-xl font-bold text-right">كشف حساب</h2>
              </div>
              <LogoAndInfo />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 lg:!-mt-5 bg-transparent lg:w-5/6">
            <div className="space-y-2">
              <CardBorderStart title="اسم العميل" value="محمد عبدالرحمن" />
              <CardBorderStart title="رقم الجوال" value="20155115454" />
            </div>
            <div className="space-y-2">
              <CardBorderStart title="التاريخ الكشف">
                <div className="flex font-bold gap-1">
                  <span className="text-gray-500">من</span>{" "}
                  <span>10 يناير 2025 الساعه 05:30 م</span>
                  <span className="text-gray-500">الى</span>{" "}
                  <span>10 يناير 2025 الساعه 05:30 م</span>
                </div>
              </CardBorderStart>
              <CardBorderStart title="نوع الحساب" value="حساب عميل" />
            </div>
          </div>
          <div className="flex justify-between gap-4 lg:w-2/3">
            <CardBorderStart title="الصيد الأفتتاحي" value="0" />
            <CardBorderStart title="أجمالي الدين" value="66" />
            <CardBorderStart title="أجمالي الائتمان" value="55" />
          </div>

          <div className="flex w-full gap-2 justify-end py-6">
            <Button variant={"outline"}>
              <span className="hidden md:block">طباعة الملف</span>
              <Printer />
            </Button>
            <ButtonExcel />
            <ButtonPDF />
          </div>
        </CardHeader>
        <CardContent className="">
              <Table>
            <TableHeader className="bg-gray-100">
            <TableRow className="bg-[#D7D7D7] border [&>*]:border">
                <TableCell colSpan={3} className="font-medium text-center"></TableCell>
                <TableCell colSpan={2} className="font-medium">المعاملات</TableCell>
                <TableCell colSpan={2} className="font-medium">الرصيد</TableCell>
              </TableRow>
            <TableRow className="bg-[#F1F1F1] border [&>*]:border">
                <TableCell colSpan={3} className="font-medium text-center">
                  الرصيد الافتتاحي
                </TableCell>
                <TableCell className="font-medium">00</TableCell>
                <TableCell className="font-medium">00</TableCell>
                <TableCell className="font-medium">-</TableCell>
                <TableCell className="font-medium">-</TableCell>
              </TableRow>
              
            </TableHeader>
            <TableBody>
            <TableRow className="border [&>*]:border bg-[#F1F1F1]">
                <TableCell className="text-right font-semibold text-gray-700">التاريخ</TableCell>
                <TableCell className="text-right font-semibold text-gray-700">الرقم</TableCell>
                <TableCell className="text-right font-semibold text-gray-700">الوصف</TableCell>
                <TableCell className="text-right font-semibold text-gray-700">دائن</TableCell>
                <TableCell className="text-right font-semibold text-gray-700">مدين</TableCell>
                <TableCell className="text-right font-semibold text-gray-700">دائن</TableCell>
                <TableCell className="text-right font-semibold text-gray-700">مدين</TableCell>
              </TableRow>
              {transactions.map((transaction, index) => (
                <TableRow key={index} className={"border [&>*]:border " + (index % 2 === 0 ? "bg-white" : "bg-gray-50/50")}>
                  <TableCell className="text-sm text-gray-600">{transaction.date}</TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.reference}</TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.description}</TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.debitAmount}</TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.creditAmount}</TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.debitBalance}</TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.creditBalance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="border [&>*]:border">
                <TableCell colSpan={3}></TableCell>
                <TableCell>140</TableCell>
                <TableCell>140</TableCell>
                <TableCell colSpan={2} className="bg-emerald-600 text-white">
                  الإجمالي 350
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>}
    </div>
  );
}

const transactions = [
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  {
    date: "20 Dec, 2021, 02:21 AM",
    reference: "#028580",
    description: "سوق دوليه صلاحيه 10 سنوات - AHMED BANI-0G0BA12544900 اجازه",
    debitAmount: "70",
    creditAmount: "0",
    debitBalance: "70",
    creditBalance: "0",
  },
  // Repeated entries omitted for brevity
]