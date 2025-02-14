
import { DataTable } from "@/components/clients/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

type UpcomingReservationsType = {
  doctor_name: string
  phone: string
  specialization: string
  workplace: string
  time: string
  addition_date: string
}

export default function DoctorsPage() {
  return (
    <Card className="p-4">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>قائمة الأطباء</CardTitle>
          
        </CardHeader>
        <Card className="shadow-none">
          <CardContent className="p-3 py-0">
            <DataTable
                columns={columnsUpcomingReservations}
                data={data}
                searchKey="doctor_name"
                textKey="اسم الطبيب"
            />
          </CardContent>
        </Card>
      </Card>
  )
}


const data = [
  {
    doctor_name: "أسو الطبيب",
    phone: "(+33) 75 55 45 48",
    specialization: "باطنة",
    workplace: "طبيب",
    time: "ميزة بيوتي",
    addition_date: "11/03/2022",
  },
];
  
  const columnsUpcomingReservations: ColumnDef<UpcomingReservationsType>[] = [
    {
      accessorKey: "doctor_name",
      header: "اسم الطبيب",
      cell: ({ row }) => <div className="text-right">{row.getValue("doctor_name")}</div>,
    },
    {
      accessorKey: "phone",
      header: "رقم اجوال",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "specialization",
      header: "التخصص",
      cell: ({ row }) => <div>{row.getValue("specialization")}</div>,
    },
    {
      accessorKey: "workplace",
      header: "جهة العمل",
      cell: ({ row }) => <div>{row.getValue("workplace")}</div>,
    },
    {
      accessorKey: "time",
      header: "مواعيد",
      cell: ({ row }) => <div>{row.getValue("time")}</div>,
    },
    {
      accessorKey: "addition_date",
      header: "تاريخ الإضافة",
      cell: ({ row }) => <div>{row.getValue("addition_date")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: "اجراءات",
      cell: () => (
        <div className="flex gap-1">
          <Link to={`/booking/doctors/1`}>
            <Button variant="ghost" size="icon">
              <Eye className="size-5" />
            </Button>
          </Link>
          {/* <Link to={`/booking/doctors/1/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="size-5" />
            </Button>
          </Link> */}
        </div>
      ),
    },
  ];