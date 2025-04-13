import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer } from "lucide-react";
import CardBorderStart from "@/components/global/CardBorderStart";
import { Badge } from "@/components/ui/badge";
import LogoAndInfo from "@/components/global/LogoAndInfo";
import useFetch from "@/hooks/use-fetch";
import { useParams } from "react-router-dom";
import { printPDF } from "@/utils/exportUtils"; // Assuming printPDF is available
import { exportExcel } from "@/utils/exportUtils"; // Assuming exportExcel is available

export default function BondsDetailsAccountingPage() {
  const { id } = useParams<{ id: string }>(); // Get document number from URL
  const { data, loading, error } = useFetch(`/sandat/${id}`);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;
  if (!data?.sandat) return <div>لم يتم العثور على السند</div>;

  const bond = data.sandat;
  const bondTypeArabic =
    bond.document_type === "receipt"
      ? "سند قبض"
      : bond.document_type === "payment"
      ? "سند صرف"
      : "سند قيد";

  const handlePrint = () => {
    printPDF(
      [[bond]],
      [
        "رقم الحساب",
        "رقم المرجع",
        "ملاحظات",
        "تاريخ الإضافة",
        "القسم",
        "المدين",
        "الدائن",
      ]
    );
  };

  const handleExportExcel = () => {
    exportExcel(
      [bond],
      `سند_${bond.document_number}`,
      [
        "رقم الحساب",
        "رقم المرجع",
        "ملاحظات",
        "تاريخ الإضافة",
        "القسم",
        "المدين",
        "الدائن",
      ]
    );
  };

  const handleExportPDF = () => {
    printPDF(
      [[bond]],
      [
        "رقم الحساب",
        "رقم المرجع",
        "ملاحظات",
        "تاريخ الإضافة",
        "القسم",
        "المدين",
        "الدائن",
      ]
    );
  };

  return (
    <Card className="border-none shadow-none" dir="rtl">
      <CardHeader>
        <div className="space-y-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-5 justify-between md:items-start">
            <div className="text-sm text-start w-full space-y-1">
              <h2 className="text-xl font-bold text-right">تفاصيل السند</h2>
              <Badge variant={bondTypeArabic === "سند صرف" ? "yellow" : "green"}>
                {bondTypeArabic}
              </Badge>
            </div>
            <LogoAndInfo />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 lg:!-mt-5 bg-transparent">
          <div className="space-y-2">
            {bondTypeArabic === "سند صرف" ? (
              <CardBorderStart
                title="اسم المورد"
                value={bond.lines[0]?.account_name || "غير محدد"}
              />
            ) : (
              <CardBorderStart
                title="الخزينة"
                value={bond.cashbox_name || "غير محدد"}
              />
            )}
            <CardBorderStart
              title="المبلغ IQD"
              value={bond.amount.toLocaleString()}
            />
            <CardBorderStart
              title="محصل من"
              value={bond.notes || "غير محدد"}
            />
            <div className="text-gray-500">
              <p className="text-gray-600 mt-4">المستلم</p>
              <p className="mt-2">
                موافقة بواسطة <span className="text-gray-400">______________</span>
              </p>
              <p>
                أنشئ بواسطة <span className="text-gray-600">{bond.added_by}</span>
              </p>
              {bondTypeArabic === "سند صرف" && (
                <p className="mt-2">
                  موافقة بواسطة <span className="text-gray-400">______________</span>
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <CardBorderStart
              title="التاريخ"
              value={formatDate(bond.document_date, "ar-EG")}
            />
            <CardBorderStart
              title="المبلغ USD"
              value={(bond.amount / 1500).toFixed(2)}
            />
            <CardBorderStart
              title="ملاحظات"
              value={bond.notes || "لا يوجد ملاحظات"}
            />
            <div className="text-gray-500">
              <p className="mt-2">
                الاسم /{" "}
                <span className="text-gray-400">
                  {bond.lines[0]?.account_name || "غير محدد"}
                </span>
              </p>
              <p>
                التوقيع / <span className="text-gray-400">______________</span>
              </p>
            </div>
            {bondTypeArabic === "سند صرف" && (
              <div className="flex gap-2 text-gray-500">
                <span>تاريخ الطباعة</span>
                <span>{formatDate(new Date().toISOString(), "ar-EG")}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      {false && <CardContent className="">
        <Table className="mt-6">
          <TableHeader>
            <TableRow className="border [&>*]:border">
              <TableHead className="!text-gray-800">رقم الحساب</TableHead>
              <TableHead className="!text-gray-800">اسم الحساب</TableHead>
              <TableHead className="!text-gray-800">رقم المرجع</TableHead>
              <TableHead className="!text-gray-800">ملاحظات</TableHead>
              <TableHead className="!text-gray-800">تاريخ الإضافة</TableHead>
              <TableHead className="!text-gray-800">القسم</TableHead>
              <TableHead className="!text-gray-800">المدين</TableHead>
              <TableHead className="!text-gray-800">الدائن</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bond.lines.map((line: any, index: number) => (
              <TableRow key={index} className="border [&>*]:border">
                <TableCell className="text-blue-500">{line.account_id}</TableCell>
                <TableCell>{line.account_name}</TableCell>
                <TableCell>{bond.document_number}</TableCell>
                <TableCell>{line.note || bond.notes || "-"}</TableCell>
                <TableCell>{formatDate(bond.document_date, "en-US")}</TableCell>
                <TableCell>{bond.branch_name || "-"}</TableCell>
                <TableCell>{line.debit.toLocaleString()}</TableCell>
                <TableCell>{line.credit.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>}
      {false && <CardFooter className="w-full">
        <div className="flex w-full gap-2 justify-end py-6">
          <Button variant={"outline"} onClick={handlePrint}>
            <span className="hidden md:block">طباعة الملف</span>
            <Printer />
          </Button>
          <Button variant={"outline"} onClick={handleExportExcel}>
            <span className="hidden md:block">تصدير ملف Excel</span>
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content unchanged */}
            </svg>
          </Button>
          <Button variant={"outline"} onClick={handleExportPDF}>
            <span className="hidden md:block">تصدير ملف PDF</span>
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content unchanged */}
            </svg>
          </Button>
        </div>
      </CardFooter>}
    </Card>
  );
}

// Utility function for date formatting (create in src/utils/formatDate.ts)
export const formatDate = (dateString: string, locale: string = "ar-EG") => {
  const date = new Date(dateString);
  if (locale === "ar-EG") {
    return (
      date.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " الساعة " +
      date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
    );
  }
  return (
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
};