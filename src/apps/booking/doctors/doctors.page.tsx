import { dayMap } from "@/components/Appointment/TimeSlotSelector";
import { DataTable } from "@/components/clients/table";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@/hooks/auth.context";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export interface Doctor {
  id: number;
  name: string;
  phone: string;
  specialization: string;
  branch_ids: number[];
  branch_names: string[];
  available_schedule: AvailableSchedule[];
  create_date: string;
}

export interface AvailableSchedule {
  day: string;
  from: string;
  to: string;
}

export default function DoctorsPage() {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("/doctors", refresh);
  const { user } = useUser();
  const deleteDoctor = (id: string) => {
    api
      .post(`/doctor/delete/`, {
        doctor_id: id,
        user_id: user.user_id,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("تم حذف العميل بنجاح");
          setRefresh((prev) => !prev);
        }
      });
  };
  return (
    <Card className="replaceAll">
      <CardContent className="p-3 py-0">
        <DataTable
          title="قائمة الأطباء"
          searchKey={["name"]} // Adjusted to match accessorKey
          textKey="اسم الطبيب"
          loading={loading}
          error={error}
          columns={columnsUpcomingReservations(deleteDoctor)}
          data={data?.data}
        >
          <Link to={"add"}>
            <Button className="bg-green-700 md:px-7 hover:bg-green-800">
              اضافة جديد
            </Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}

const columnsUpcomingReservations = (
  action: (id: string) => void
): ColumnDef<Doctor>[] => {
  return [
    {accessorKey: "id"
      
    },
    {
      accessorKey: "name",
      header: "اسم الطبيب",
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "رقم الجوال",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "specialization",
      header: "التخصص",
      cell: ({ row }) => <div>{row.getValue("specialization")}</div>,
    },
    {
      accessorKey: "branch_names",
      header: "جهة العمل",
      cell: ({ row }) => (
        <div>{(row.getValue("branch_names") as string[]).join(", ")}</div>
      ),
    },
    {
      accessorKey: "available_schedule",
      header: "المواعيد",
      cell: ({ row }) => {
        const schedule = row.getValue(
          "available_schedule"
        ) as AvailableSchedule[];
        return (
          <div className="text-right">
            {schedule && schedule.length > 0 ? (
              <>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="ghost" size="icon">
                      <Eye className="size-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ul className="list-none p-0 divide-y" dir="rtl">
                    {schedule.map((slot, index) => (
                      <li key={index} className="text-sm grid grid-cols-4 gap-3">
                        <span className="p-2 border-e">{dayMap[slot.day]}</span>
                        <span className="p-2 col-span-3 text-center flex gap-3 justify-center " dir="rtl"><span>{slot.from}</span> -  <span>{slot.to}</span></span>
                      </li>
                    ))}
                  </ul>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <span>غير متوفر</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "create_date",
      header: "تاريخ الإضافة",
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("create_date")).toLocaleDateString("ar-EG")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "اجراءات",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <Link to={`${row.original.id}`}>
            <Button variant="ghost" size="icon">
              <Eye className="size-5" />
            </Button>
          </Link>
          <Link to={`${row.getValue("id")}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="size-5" />
            </Button>
          </Link>

          <DeleteDialog action={() => action(row.getValue("id"))}>
            <Button variant="ghost" size="icon">
              <Trash className="size-5 text-red-500" />
            </Button>
          </DeleteDialog>
        </div>
      ),
    },
  ];
};
