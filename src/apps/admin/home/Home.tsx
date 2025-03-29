import BookingChart from "@/components/charts/BookingChart";
import { ChartOne } from "@/components/charts/ChartOne";
import StateCard from "@/components/home/StateCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCard, ShoppingCart, Users } from "lucide-react";
import ChartBarAccountingHome from "@/components/charts/ChartBarAccountingHome";

import useFetch from "@/hooks/use-fetch";
import SuppliersTable from "@/components/home/SuppliersTable";

export default function AdminHome() {
  const { data, loading } = useFetch("/summary/dashboard", true);
  const admin = data?.data;
  const { data: data2, loading: loading2 } = useFetch("/customers", true);
  const clients = data2?.data;
  console.log(admin);
  
  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StateCard
            loading={loading}
            title="عدد الموردين"
            value={admin?.supplier_count}
            Icon={CreditCard}
            className="bg-gray-400"
          />
          <StateCard
            loading={loading}
            title="اجمالي العائد"
            value={admin?.total_income}
            Icon={ShoppingCart}
            className="bg-gray-400"
          />
          <StateCard
            loading={loading}
            title="الصرفيات"
            value={admin?.total_expense}
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            loading={loading}
            title="صافي الربح"
            value={admin?.net_profit}
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            loading={loading2}
            title="العملاء"
            value={clients?.length}
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            loading={loading}
            title="اجمالي الحجوزات اليوم"
            value={admin?.reservations_today}
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            loading={loading}
            title="الحجوزات المكتملة"
            value={admin?.completed_reservations}
            Icon={Users}
            className="bg-gray-400"
          />
          <StateCard
            loading={loading}
            title="الحجوزات القادمة"
            value={admin?.upcoming_reservations}
            Icon={Users}
            className="bg-gray-400"
          />
        </CardHeader>

        <CardContent className="grid md:grid-cols-6 gap-4 lg:h-[34rem]">
          <div className="lg:col-span-4">
            <ChartBarAccountingHome />
          </div>
          <SuppliersTable />
        </CardContent>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <ChartOne />
          <BookingChart />
        </CardContent>
      </Card>
    </div>
  );
}
