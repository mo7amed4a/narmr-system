import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import AccountsSelect from "@/components/selects/AccountsSelect";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function StatementAccountingPage() {
  const [account, setAccount] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null); // Use 'any' temporarily since we don’t have a full type yet

  const handleSubmit = async () => {
    if (account) {
      try {
        const res = await api.get(`/account/statement?account_id=${account}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching statement:", error);
      }
    } else toast.error("يرجى اختيار حساب");
  };

  // Calculate totals from transactions if not provided by API
  const calculateTotals = (transactions: any[]) => {
    let totalDebit = 0;
    let totalCredit = 0;
    let runningDebitBalance = 0;
    let runningCreditBalance = 0;

    transactions.forEach((t) => {
      if (t.document_type === "receipt" || t.document_type === "loan") {
        totalDebit += t.amount;
        runningDebitBalance += t.amount;
      } else if (t.document_type === "payment" || t.document_type === "expenditure") {
        totalCredit += t.amount;
        runningCreditBalance += t.amount;
      }
    });

    return {
      totalDebit,
      totalCredit,
      totalBalance: totalDebit - totalCredit,
      openingBalance: 0, // Assume 0 unless API provides it
    };
  };

  const totals = data?.transactions ? calculateTotals(data.transactions) : null;

  return (
    <div className="space-y-4" dir="rtl">
      <Card className="border-none shadow-none">
        <CardHeader className="p-4">
          <CardTitle>كشف حساب</CardTitle>
          <div className="grid md:grid-cols-2 gap-4 pt-4 items-end">
            <AccountsSelect
              value={account || ""}
              onValueChange={(value) => setAccount(value)}
            />
          </div>
          <div className="flex justify-end py-4">
            <Button variant={"green"} onClick={handleSubmit}>
              إجراء كشف حساب
            </Button>
          </div>
        </CardHeader>
      </Card>

      {data?.transactions && (
        <Card className="border-none shadow-none">
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
                <CardBorderStart
                  title="اسم العميل"
                  value={data.transactions[0]?.party || "غير محدد"}
                />
                <CardBorderStart title="رقم الجوال" value="غير متوفر" /> {/* API doesn’t provide this */}
              </div>
              <div className="space-y-2">
                <CardBorderStart title="التاريخ الكشف">
                  <div className="flex font-bold gap-1">
                    <span className="text-gray-500">من</span>
                    <span>
                      {data.transactions.length > 0
                        ? new Date(
                            Math.min(
                              ...data.transactions.map((t: any) =>
                                new Date(t.document_date).getTime()
                              )
                            )
                          ).toLocaleString("en-US")
                        : "غير محدد"}
                    </span>
                    <span className="text-gray-500">إلى</span>
                    <span>
                      {data.transactions.length > 0
                        ? new Date(
                            Math.max(
                              ...data.transactions.map((t: any) =>
                                new Date(t.document_date).getTime()
                              )
                            )
                          ).toLocaleString("en-US")
                        : "غير محدد"}
                    </span>
                  </div>
                </CardBorderStart>
                <CardBorderStart title="نوع الحساب" value="حساب عميل" /> {/* Static unless API provides */}
              </div>
            </div>
            <div className="flex justify-between gap-4 lg:w-2/3">
              <CardBorderStart
                title="الرصيد الافتتاحي"
                value={totals?.openingBalance.toString() || "0"}
              />
              <CardBorderStart
                title="إجمالي الدين"
                value={totals?.totalDebit.toString() || "0"}
              />
              <CardBorderStart
                title="إجمالي الائتمان"
                value={totals?.totalCredit.toString() || "0"}
              />
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
          <CardContent>
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
                  <TableCell className="font-medium">0</TableCell>
                  <TableCell className="font-medium">0</TableCell>
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
                {data.transactions.map((transaction: any, index: number) => {
                  const isDebit = ["receipt", "loan"].includes(transaction.document_type);
                  const isCredit = ["payment", "expenditure"].includes(transaction.document_type);
                  return (
                    <TableRow
                      key={index}
                      className={"border [&>*]:border " + (index % 2 === 0 ? "bg-white" : "bg-gray-50/50")}
                    >
                      <TableCell className="text-sm text-gray-600">
                        {new Date(transaction.document_date).toLocaleString("en-US")}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{transaction.document_number}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {transaction.notes || transaction.document_type}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {isDebit ? transaction.amount : "0"}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {isCredit ? transaction.amount : "0"}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {isDebit ? totals?.totalDebit : "0"}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {isCredit ? totals?.totalCredit : "0"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow className="border [&>*]:border">
                  <TableCell colSpan={3}></TableCell>
                  <TableCell>{totals?.totalDebit || "0"}</TableCell>
                  <TableCell>{totals?.totalCredit || "0"}</TableCell>
                  <TableCell colSpan={2} className="bg-emerald-600 text-white">
                    الإجمالي {totals?.totalBalance || "0"}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}