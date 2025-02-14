import StateCard from "@/components/home/StateCard";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DollarSign,
  Users,
} from "lucide-react";

// type UpcomingReservationsType = {};

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

        {/* <CardContent className="grid md:grid-cols-2 gap-4">
          <ChartOne />
          <BookingChart />
        </CardContent> */}
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>الحجوزات القادمة</CardTitle>
          <DataTable
            columns={columnsUpcomingReservations}
            data={data}
            searchKey="client_name"
            textKey="اسم العميل"
            />
        </CardHeader>
      </Card> */}
    </div>
  );
}

// const data = [
//   {
//     code: "#APP43",
//     branch: "مركز بيوني",
//     client_name: "ريم فهد",
//     doctor: "Hebah Abdullah",
//     service_type: "فحص بشري",
//     appointment_time: "٠٦:٣٠ م",
//     booking_status: "قيد الانتظار",
//     booking_type: "زيارات المتابعة",
//   },
// ];

// const columnsUpcomingReservations: ColumnDef<UpcomingReservationsType>[] = [
//   {
//     accessorKey: "code",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           className="text-current font-bold"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           كود الحجز <ArrowUpDown />
//         </Button>
//       );
//     },
//     cell: ({ row }) => (
//       <>
//         <div className="capitalize text-red-900">{row.getValue("code")}</div>
//       </>
//     ),
//   },
//   {
//     accessorKey: "branch",
//     header: "فرع الحجز",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("branch")}</div>
//     ),
//   },
//   {
//     accessorKey: "client_name",
//     header: () => <div className="text-right">أسم العميل</div>,
//     cell: ({ row }) => {
//       const amount = row.getValue("time") as Date;
//       // Format the amount as a dollar amount
//       const formatted = new Intl.DateTimeFormat("en-US").format(amount);
//       return <div className="text-right font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "doctor",
//     header: "الطبيب المعالج",
//     cell: ({ row }) => (
//       <>
//         <div className="lowercase line-clamp-1">{row.getValue("doctor")}</div>
//       </>
//     ),
//   },
//   {
//     accessorKey: "service_type",
//     header: "نوع الخدمة",
//     cell: ({ row }) => (
//       <>
//         <div className="lowercase line-clamp-1">{row.getValue("service_type")}</div>
//       </>
//     ),
//   },
//   {
//     accessorKey: "appointment_time",
//     header: "موعد الحجز",
//     cell: ({ row }) => (
//       <>
//         <div className="lowercase line-clamp-1">{row.getValue("appointment_time")}</div>
//       </>
//     ),
//   },
//   {
//     accessorKey: "booking_status",
//     header: "حالة الحجز",
//     cell: ({ row }) => (
//       <>
//         <div className="lowercase line-clamp-1">
//           <span className="bg-blue-100 rounded-full p-2 text-blue-600">{row.getValue("booking_status")}</span>
//         </div>
//       </>
//     ),
//   },
//   {
//     accessorKey: "booking_type",
//     header: "نوع الحجز",
//     cell: ({ row }) => (
//       <>
//         <div className="lowercase line-clamp-1">{row.getValue("booking_type")}</div>
//       </>
//     ),
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     header: "اجراءات",
//     //   cell: ({ row }) => {
//     cell: () => {
//       // const payment = row.original;
//       return (
//         <div className="flex gap-1">
//           <Link to={`/booking/clients/1`}>
//             <Button variant="ghost" size="icon">
//               <Eye className="size-5" />
//             </Button>
//           </Link>
//           <Link to={`/booking/clients/1/edit`}>
//             <Button variant="ghost" size="icon">
//               <Edit className="size-5" />
//             </Button>
//           </Link>
//         </div>
//       );
//     },
//   },
// ];
