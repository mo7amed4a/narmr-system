import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import LogoAndInfo from "@/components/global/LogoAndInfo";
import useFetch from "@/hooks/use-fetch";

export default function InvoiceDetailsPage() {
  const { id } = useParams(); // جلب الـ invoice_id من الـ URL
  const { data, loading, error } = useFetch(`/invoice?invoice_id=${id}`);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error.message}</div>;

  const invoice = data?.data; // البيانات جاية داخل "data" في الـ response

  // حساب الإجمالي من الخدمات
  const totalAmount = invoice?.services.reduce((sum: number, service: any) => sum + service.price, 0) || 0;

  return (
    <div className="space-y-5">
      <Card className="w-full border-none shadow-none">
        <CardHeader className="space-y-6 border-b">
          <div className="flex justify-between items-center md:p-8 bg-[#F9FAFC] rounded-xl">
            <div className="text-sm text-right space-y-1">
              <h2 className="text-xl font-bold">{invoice?.customer_name}</h2>
              <p>{new Date(invoice?.invoice_date).toLocaleString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}</p>
              <p dir="ltr">{invoice?.customer_phone}</p>
              <p>address City, Country - 00000</p> {/* افتراضي، ممكن تضيفي حقل في الـ API لو موجود */}
            </div>
            <LogoAndInfo />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">كود الفاتورة</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">الطبيب</TableHead>
                <TableHead className="text-right">أنشئت بواسطة</TableHead>
                <TableHead className="text-right">تاريخ الإضافة</TableHead>
                <TableHead className="text-right">قيمة الفاتورة</TableHead>
                <TableHead className="text-right">حالة الفاتورة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{invoice?.invoice_code}</TableCell>
                <TableCell>{invoice?.customer_name}</TableCell>
                <TableCell>{invoice?.doctor_name}</TableCell>
                <TableCell>{invoice?.created_by}</TableCell>
                <TableCell dir="ltr">
                  {new Date(invoice?.invoice_date).toLocaleString("ar-EG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </TableCell>
                <TableCell>{invoice?.invoice_amount} دينار عراقي</TableCell>
                <TableCell>
                  <Badge variant={invoice?.invoice_status === "confirmed" ? "green" : "ghost"}>
                    {invoice?.invoice_status === "confirmed" ? "مؤكدة" : "غير مؤكدة"}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-full border-none shadow-none">
        <CardHeader className="space-y-6 border-b">
          <CardTitle>الخدمات</CardTitle>
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
              {invoice?.services.map((service: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{service.service_name}</TableCell>
                  <TableCell>{service.price} دينار عراقي</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end py-4">
            <span className="">الإجمالي: {totalAmount} دينار عراقي</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}