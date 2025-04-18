import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import React from "react";
import InvoiceForm from "@/components/purchases/InvoiceForm";

export default function SalesDetailsPage() {
  const [status, setStatus] = React.useState(false);
  return (
    <div className="space-y-5">
      <Card className="w-full border-none shadow-none">
        <CardHeader className="space-y-6 border-b">
          <div className="flex justify-between items-center md:p-8 bg-[#F9FAFC] rounded-xl">
            <div className="text-sm text-right space-y-1">
              <h2 className="text-xl font-bold">مها عبدالرحمن</h2>
              <p>يناير ٢، ٢٠٢٤ الساعة ١:٣٥ م</p>
              <p dir="ltr">+960025425256</p>
              <p>address City, Country - 00000</p>
            </div>
            <LogoAndInfo />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">كود الفاتورة</TableHead>
                <TableHead className="text-right">اسم المورد</TableHead>
                <TableHead className="text-right">اسم الشركة</TableHead>
                <TableHead className="text-right">قيمة الفاتورة</TableHead>
                <TableHead className="text-right">حالة الفاتورة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>S0000030</TableCell>
                <TableCell>مها عبد الرحمن</TableCell>
                <TableCell>شركة الوايلي</TableCell>
                <TableCell>$240</TableCell>
                <TableCell>
                  {status ? (
                    <Badge variant="green">مؤكدة</Badge>
                  ) : (
                    <Badge variant="yellow">غير مؤكدة</Badge>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {status ? (
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
      )}
    </div>
  );
}
