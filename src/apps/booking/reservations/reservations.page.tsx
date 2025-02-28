
import { DataTable } from "@/components/clients/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { filterColumnsIsAdminTable } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";

type UpcomingReservationsType = {
  code: string;
  branch: string;
  client_name: string;
  doctor: string;
  service_type: string;
  created_by: string;
  appointment_time: string;
  booking_status: string;
  booking_type: string;
};


export default function ReservationsPage() {
  return (
    <Card className="p-4">
          <CardContent className="p-3 py-0">
            <DataTable
                title="قائمة الحجوزات"
                columns={filterColumnsIsAdminTable(columnsUpcomingReservations, "created_by")}
                data={data}
                searchKey={["client_name"]}
                textKey="اسم العميل"
            >
               <Link to={'add'} >
                <Button className="bg-green-700 md:px-7 hover:bg-green-800">اضافة حجز جديد</Button>
              </Link>
            </DataTable>
          </CardContent>
      </Card>
  )
}



const data:UpcomingReservationsType[] = [
    {
      code: "#APP43",
      branch: "مركز بيوني",
      client_name: "ريم فهد",
      doctor: "Hebah Abdullah",
      service_type: "فحص بشري",
      created_by: "Administrator",
      appointment_time: "٠٦:٣٠ م",
      booking_status: "قيد الانتظار",
      booking_type: "زيارات المتابعة",
    },
  ];
  
  const columnsUpcomingReservations: ColumnDef<UpcomingReservationsType>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-current font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            كود الحجز <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <>
          <div className="capitalize text-red-900">{row.getValue("code")}</div>
        </>
      ),
    },
    {
      accessorKey: "branch",
      header: "فرع الحجز",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("branch")}</div>
      ),
    },
    {
      accessorKey: "client_name",
      header: () => <div className="text-right">أسم العميل</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("client_name")}</div>;
      },
    },
    {
      accessorKey: "doctor",
      header: "الطبيب المعالج",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">{row.getValue("doctor")}</div>
        </>
      ),
    },
    {
      accessorKey: "service_type",
      header: "نوع الخدمة",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">{row.getValue("service_type")}</div>
        </>
      ),
    },
    {
      accessorKey: "appointment_time",
      header: "موعد الحجز",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">{row.getValue("appointment_time")}</div>
        </>
      ),
    },
    {
      accessorKey: "booking_status",
      header: "حالة الحجز",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">
            <span className="bg-blue-100 rounded-full p-2 text-blue-600">{row.getValue("booking_status")}</span>
          </div>
        </>
      ),
    },{
      accessorKey: "created_by",
      
      header: "انشئ بواسطة",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">
            <span>{row.getValue("created_by")}</span>
          </div>
        </>
      ),
    },
    {
      accessorKey: "booking_type",
      header: "نوع الحجز",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">{row.getValue("booking_type")}</div>
        </>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "اجراءات",
      //   cell: ({ row }) => {
      cell: () => {
        // const payment = row.original;
        return (
          <div className="flex gap-1">
            <Link to={`1`}>
              <Button variant="ghost" size="icon">
                <Eye className="size-5" />
              </Button>
            </Link>
            <Link to={`1/edit`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];
  