import ChartBarAccountingHome from "@/components/charts/ChartBarAccountingHome";
import StateCard from "@/components/home/StateCard";
import SuppliersTable from "@/components/home/SuppliersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/use-fetch";
import { DollarSign, Users } from "lucide-react";

export default function BookingHome() {
  const {data, loading} = useFetch("/dashboard/financial-summary", true)
  const accounting = data?.data
  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StateCard
            title="عدد الموردين"
            loading={loading}
            value={accounting?.supplier_count}
            Icon={Users}
            className="bg-gray-500"
          />
          <StateCard
            title="اجمالي العائد"
            loading={loading}
            value={accounting?.total_revenue}
            Icon={DollarSign}
            className="bg-blue-500"
          />
          <StateCard
            title="المصرفيات"
            value={accounting?.total_expenses}
            loading={loading}
            Icon={DollarSign}
            className="bg-yellow-500"
          />
          <StateCard
            title="صافي الربح"
            loading={loading}
            value={accounting?.net_profit}
            Icon={DollarSign}
            className="bg-green-900"
          />
        </CardHeader>
        <CardContent className="grid md:grid-cols-6 gap-4 lg:h-[34rem]">
          <div className="lg:col-span-4">
            <ChartBarAccountingHome />
          </div>
         <SuppliersTable />
        </CardContent>
      </Card>
    </div>
  );
}

export const dataTable = [
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
