import { DataTable } from "@/components/clients/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/auth.context";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowLeftRight, ArrowUpDown, Edit, Eye } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type UpcomingReservationsType = {
  reservation_code: string
  branch_name: string
  customer_name: string
  doctor_name: string
  service_name: string
  reservation_date: string
  status: string
  reservation_type: string
};

export default function ReservationsPage() {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("/reservations", refresh);
  const {user} = useUser()
  const updateReservationStatus = async (id: string, newStatus: string) => {
    try {
      const response = await api.post(`/reservation/status`, {
        user_id: user.user_id,
        reservation_code: id,
        status: newStatus,
      });
      if (response.status === 200) {
        toast.success("تم تحديث حالة الفاتورة بنجاح");
        setRefresh((prev) => !prev); // إعادة جلب البيانات بعد التحديث
      }
    } catch (err) {
      console.error("Error updating invoice status:", err);
    }
  };


  return (
    <Card>
      <CardContent className="p-3 py-0">
        <DataTable
          loading={loading}
          error={error}
          columns={columnsDataTable(updateReservationStatus)}
          data={data?.data}
          title="قائمة الحجوزات"
          searchKey={["client_name","customer_name", "doctor_name", "branch_name"]}
          textKey="اسم العميل"
        >
          <Link to={"add"}>
            <Button className="bg-green-700 md:px-7 hover:bg-green-800">
              اضافة حجز جديد
            </Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}


const columnsDataTable = (
  updateReservationStatus: (id: string, newStatus: string) => void,
): ColumnDef<UpcomingReservationsType>[] => {
  return [{
    accessorKey: "reservation_code",
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
        <div className="capitalize text-red-900">{row.getValue("reservation_code")}</div>
      </>
    ),
  },
  {
    accessorKey: "branch_name",
    header: "فرع الحجز",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("branch_name")}</div>
    ),
  },
  {
    accessorKey: "customer_name",
    header: () => <div className="text-right">أسم العميل</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("customer_name")}
        </div>
      );
    },
  },
  {
    accessorKey: "doctor_name",
    header: "الطبيب المعالج",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("doctor_name")}</div>
      </>
    ),
  },
  {
    accessorKey: "service_name",
    header: "نوع الخدمة",
    cell: ({ row }) => (
      <>
        <div className="lowercase line--1">
          {row.getValue("service_name")}
        </div>
      </>
    ),
  },
  {
    accessorKey: "reservation_date",
    header: "موعد الحجز",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">
          {row.getValue("reservation_date")}
        </div>
      </>
    ),
  },
  {
    accessorKey: "status",
    header: "حالة الحجز",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">
          {row.getValue("status") === "confirmed" ? <Badge variant={"green"}>مؤكد</Badge>: <Badge variant={"yellow"}>غير مؤكد</Badge>}
          {/* <span className="bg-blue-100 rounded-full p-2 text-blue-600">
            {row.getValue("status")}
          </span> */}
        </div>
      </>
    ),
  },
  // {
  //   accessorKey: "reservation_date",

  //   header: "انشئ بواسطة",
  //   cell: ({ row }) => (
  //     <>
  //       <div className="lowercase line-clamp-1">
  //         <span>{row.getValue("reservation_date")}</span>
  //       </div>
  //     </>
  //   ),
  // },
  {
    accessorKey: "reservation_type",
    header: "نوع الحجز",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">
          {row.getValue("reservation_type")}
        </div>
      </>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "اجراءات",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {row.getValue("invoice_status") !== "confirmed" && (
            <Button
              onClick={() =>
                updateReservationStatus(row?.original?.reservation_code, "confirmed")
              }
              variant="ghost"
              size="icon"
            >
              <ArrowLeftRight className="size-5" />
            </Button>
          )}
          <Link to={`${row.getValue("reservation_code")}`}>
            <Button variant="ghost" size="icon">
              <Eye className="size-5" />
            </Button>
          </Link>
          <Link to={`${row.getValue("reservation_code")}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="size-5" />
            </Button>
          </Link>
        </div>
      );
    },
  },
]
};
