import BookingChart from "@/components/charts/BookingChart";
import { ChartOne } from "@/components/charts/ChartOne";
import StateCard from "@/components/home/StateCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  CreditCard,
  ShoppingCart,
  Users,
} from "lucide-react";
import ChartBarAccountingHome from "@/components/charts/ChartBarAccountingHome";
import { CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dataTable } from "@/apps/accounting/home/Home";


export default function AdminHome() {
  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StateCard
            title="عدد الموردين"
            value="+12,234"
            Icon={CreditCard}
            className="bg-gray-400"
          />
          <StateCard
            title="اجمالي العائد"
            value="8,560"
            Icon={ShoppingCart}
            className="bg-gray-400"
          />
          <StateCard
            title="الصرفيات"
            value="1,245"
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            title="صافي الربح"
            value="1,245"
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            title="العملاء"
            value="1,245"
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            title="اجمالي الحجوزات اليوم"
            value="1,245"
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            title="الحجوزات المكتملة"
            value="1,245"
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            title="الحجوزات القادمة"
            value="1,245"
            Icon={Users}
            className="bg-gray-400"
          />
        </CardHeader>

        <CardContent className="grid md:grid-cols-6 gap-4 lg:h-[34rem]">
          <div className="lg:col-span-4">
            <ChartBarAccountingHome />
          </div>
          <Card className="lg:col-span-2 h-96 border lg:h-full overflow-y-auto custom-scrollbar">
            <CardHeader>
              <CardTitle className="text-sm font-bold">الموردين</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="mt-6 !h-40 !overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead className="!text-gray-800 !font-bold">
                      اسم المورد
                    </TableHead>
                    <TableHead className="!text-gray-800 !font-bold">
                      رقم الجوال
                    </TableHead>
                    <TableHead className="!text-gray-800 !font-bold">
                      اجمالي المبيعات
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataTable.map((item, index) => (
                    <TableRow key={index} className="[&>*]:border-t">
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <ChartOne />
          <BookingChart />
        </CardContent>
      </Card>

    </div>
  );
}

