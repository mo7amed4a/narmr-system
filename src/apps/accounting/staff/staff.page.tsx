import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link } from "react-router-dom";
import { ArrowUpDown, Eye, Plus, Scroll } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

export default function StaffPage() {
  return (
    <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
        <CardContent className="p-2">
          <DataTable
            title="قائمة الموظفين"
            columns={columnsSuppliers}
            data={suppliersData}
            searchKey={["name"]}
            textKey="اسم الموظف"
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

const suppliersData = [
  {
    name: "مورد الأجهزة الطبية",
    phone: "(+33) 75 55 45 48",
    job_role: "طبيب",
    salary: "34567",
    date: "4 يناير 2025",
  }
];

const columnsSuppliers: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-current font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        اسم المورد <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phone",
    header: "رقم الجوال",
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "job_role",
    header: "الدور الوظيفي",
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("job_role")}</div>,
  },
  {
    accessorKey: "date",
    header: "تاريخ الاضافة",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
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
    cell: ({row}) => (
      <div className="flex gap-1">
        <Link to={`1/edit`}>
          <Button variant="ghost" size="icon">
            <Scroll /> 
          </Button>
        </Link>
        <Link to={`${row.getValue("name")}`}>
          <Button variant="ghost" size="icon">
            <Eye />
          </Button>
        </Link>
      </div>
    ),
  },
];