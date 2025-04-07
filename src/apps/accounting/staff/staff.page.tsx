import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link } from "react-router-dom";
import { ArrowUpDown, Eye, Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch";
import UpdateSalaryDialog from "@/components/dialogs/UpdateSalaryDialog";
import { AvailableSchedule } from "@/apps/booking/doctors/doctors.page";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { dayMap } from "@/components/Appointment/TimeSlotSelector";

// Define the type for the employee data
type EmployeeType = {
  id: number;
  name: string;
  phone: string;
  role: string;
  salary: number;
  create_date: string;
};

export default function StaffPage() {
  const [refresh, setRefresh] = useState(false); // For refreshing data after updates
  const { data, loading, error } = useFetch("/employees/work/schedule", refresh);

  const columnsSuppliers: ColumnDef<EmployeeType>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-current font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          اسم الموظف <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "phone",
      header: "رقم الموبايل",
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "role",
      header: "الدور الوظيفي",
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue("role")}</div>,
    },
    {
      accessorKey: "create_date",
      header: "تاريخ الإضافة",
      cell: ({ row }) => {
        const date = new Date(row.getValue("create_date"));
        return <div>{date.toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" })}</div>;
      },
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
      accessorKey: "salary",
      header: "الراتب الشهري",
      cell: ({ row }) => <div>{row.getValue("salary")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: "الإجراءات",
      cell: ({ row }) => (
        <div className="flex gap-1">
          {/* <Link to={`${row.original.employee_id}/edit`}>
            <Button variant="ghost" size="icon">
              <Scroll />
            </Button>
          </Link> */}
          <Link to={`${row.original.id}`}>
            <Button variant="ghost" size="icon">
              <Eye />
            </Button>
          </Link>
          <UpdateSalaryDialog
            employeeId={row.original.id}
            currentSalary={row.original.salary}
            onSalaryUpdated={() => setRefresh((prev) => !prev)}
          />
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <CardContent className="p-2">
        <DataTable
          title="قائمة الموظفين"
          columns={columnsSuppliers}
          data={data?.data || []}
          searchKey={["name"]}
          textKey="اسم الموظف"
          loading={loading}
          error={error}
        >
          <Link to={`add`}>
            <Button variant="green">
              اضافة جديد <Plus />
            </Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}