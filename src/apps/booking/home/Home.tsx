import BookingChart from "@/components/charts/BookingChart";
import { ChartOne } from "@/components/charts/ChartOne";
import StateCard from "@/components/home/StateCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import {
  CreditCard,
  ShoppingCart,
  Users,
} from "lucide-react";


export default function BookingHome() {
  const {data:data2, loading} = useFetch("/dashboard/reservation-summary", true)
  const booking = data2?.data
  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StateCard
            loading={loading}
            title="عدد العملاء"
            value={booking?.total_customers}
            Icon={CreditCard}
            className="bg-gray-500"
          />
          <StateCard
            loading={loading}
            title="حجوزات اليوم"
            value={booking?.today_reservations}
            Icon={ShoppingCart}
            className="bg-blue-500"
          />
          <StateCard
            loading={loading}
            title="الحجوزات المكتملة"
            value={booking?.completed_reservations}
            Icon={Users}
            className="bg-yellow-500"
          />
          <StateCard
            loading={loading}
            title="الحجوزات القادمة"
            value={booking?.upcoming_reservations}
            Icon={Users}
            className="bg-green-900"
          />
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">
          <ChartOne />
          <BookingChart />
        </CardContent>
      </Card>
    </div>
  );
}
