import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CardBorderStart from "@/components/global/CardBorderStart";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

export default function SuppliersDetailsPage() {
  return (
    <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
      <Card className="w-full shadow-none">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>بيانات المورد</CardTitle>
          <Link to={`edit`}>
            <Button variant="outline">تعديل</Button>
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4 text-right">
          <CardBorderStart title="اسم المورد" value="محمد علي" />
          <div className="flex gap-5 md:gap-20 lg:gap-32">
            <CardBorderStart title="اسم الشركة" value="شركة الرحمة للتوريد" />
            <CardBorderStart title="رقم الجوال" value="+252414" />
            <CardBorderStart title="العنوان" value="العراق بغداد" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full shadow-none">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>تاريخ الفاتورة</CardTitle>
          <Link to={`edit`}>
            <Button variant="green">فاتورة جديدة</Button>
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4 text-right">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>اسم المنتج</TableCell>
                <TableCell>الكمية</TableCell>
                <TableCell>سعر الوحدة</TableCell>
                <TableCell>حالة الفاتورة</TableCell>
                <TableCell>الاجمالي</TableCell>
                <TableCell>الاجراءات</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit_price}</TableCell>
                  <TableCell>
                    {item.status ? (
                      <Badge variant={"green"}>مؤكدة</Badge>
                    ) : (
                      <Badge variant={"yellow"}>غير مؤكدة</Badge>
                    )}
                  </TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>
                    <Link to={`edit`}>
                      <Button variant="ghost"><Eye/></Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Card>
  );
}

const data = [
  {
    product_name: "كريم شعر",
    quantity: 4,
    unit_price: 100,
    status: true,
    total: 400,
  },
  {
    product_name: "كريم شعر",
    quantity: 4,
    unit_price: 100,
    status: true,
    total: 400,
  },
  {
    product_name: "كريم شعر",
    quantity: 4,
    unit_price: 100,
    status: false,
    total: 400,
  },
  {
    product_name: "كريم شعر",
    quantity: 4,
    unit_price: 100,
    status: false,
    total: 400,
  },
];
