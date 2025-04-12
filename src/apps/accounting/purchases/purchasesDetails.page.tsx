import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import LogoAndInfo from "@/components/global/LogoAndInfo";
import useFetch from "@/hooks/use-fetch";
import { useParams } from "react-router-dom";

export default function PurchasesDetailsPage() {
  const { id } = useParams<{ id: string }>(); // جلب invoice_id من URL
  const { data, loading, error } = useFetch(`/invoices1?invoice_id=${id}`);

  if (loading) return <div dir="rtl">جاري التحميل...</div>;
  if (error) return <div dir="rtl">خطأ: {error}</div>;
  if (!data?.data?.length) return <div dir="rtl">لم يتم العثور على الفاتورة</div>;

  const invoice = data.data[0]; // أول فاتورة من الـ API

  return (
    <div className="space-y-5">
      <Card className="w-full border-none shadow-none">
        <CardHeader className="space-y-6 border-b">
          <div className="flex justify-between items-center md:p-8 bg-[#F9FAFC] rounded-xl">
            <div className="text-sm text-right space-y-1">
              <h2 className="text-xl font-bold">{invoice?.supplier_name}</h2>
              <p>{invoice?.supplier_name}</p>
              <p dir="ltr">{invoice?.supplier_phone}</p>
              <p>{invoice?.supplier_email}</p>
              <p>{invoice?.supplier_country}, {invoice?.supplier_city}</p>
            </div>
            <LogoAndInfo />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">كود الفاتورة</TableHead>
                <TableHead className="text-right">اسم الشركة</TableHead>
                <TableHead className="text-right">قيمة الفاتورة</TableHead>
                <TableHead className="text-right">حالة الفاتورة</TableHead>
                <TableHead className="text-right">تاريخ الفاتورة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{invoice?.invoice_code}</TableCell>
                <TableCell>{invoice?.company_name}</TableCell>
                <TableCell>{invoice?.total_amount}</TableCell>
                <TableCell>
                  {invoice?.status ? (
                    <Badge variant="green">مؤكدة</Badge>
                  ) : (
                    <Badge variant="yellow">غير مؤكدة</Badge>
                  )}
                </TableCell>
                <TableCell>{invoice?.invoice_date}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* {status ? (
        <Card className="w-full border-none shadow-none">
          <CardHeader className="space-y-6 border-b">
            <CardTitle>الفاتورة</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Table dir="rtl">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">نوع الخدمة</TableHead>
                  <TableHead className="text-right">التكلفة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>فحص بشرة</TableCell>
                  <TableCell>750$</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>فحص بشرة</TableCell>
                  <TableCell>750$</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end py-4">
              <span className="">الاجمالي 1500</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <InvoiceForm setStatus={setStatus} />
      )} */}
    </div>
  );
}
