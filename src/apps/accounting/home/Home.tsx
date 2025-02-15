import ChartBarAccountingHome from "@/components/charts/ChartBarAccountingHome";
import StateCard from "@/components/home/StateCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users } from "lucide-react";

export default function BookingHome() {
  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StateCard
            title="عدد الموردين"
            value="+12,234"
            Icon={Users}
            className="bg-gray-500"
          />
          <StateCard
            title="اجمالي العائد"
            value="8,560 $"
            Icon={DollarSign}
            className="bg-blue-500"
          />
          <StateCard
            title="المصرفيات"
            value="1,245"
            Icon={DollarSign}
            className="bg-yellow-500"
          />
          <StateCard
            title="صافي الربح"
            value="1,245"
            Icon={DollarSign}
            className="bg-green-900"
          />
        </CardHeader>
        <CardContent className="grid md:grid-cols-6 gap-4 lg:h-[34rem]">
          <div className="lg:col-span-4">
            <ChartBarAccountingHome />
          </div>
          <Card className="lg:col-span-2 h-96 lg:h-full overflow-y-auto custom-scrollbar">
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
      </Card>
    </div>
  );
}

const dataTable = [
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
  {
    name: "محمد علي",
    phone: "+5441542",
    total: "10000",
  },
];
