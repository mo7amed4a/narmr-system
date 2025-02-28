import { DataTable } from "@/components/clients/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import { Link } from "react-router-dom";

type ClientsDataTableType = {
  id: number;
  name: string;
  phone: string;
  role: string;
  addedDate: string;
};

export default function OfficialsPage() {
  function getData(): ClientsDataTableType[] {
    // Fetch data from your API here.
    return [
      {
        id: 1,
        name: "هيا سلطان",
        role: "مسؤول حجوزات",
        phone: "(+33) 75 55 45 48",
        addedDate: "11/03/2022",
      },
    ];
  }

  const data = getData();

  return (
      <Card className="p-4">
          <CardContent className="p-3 py-0">
            <DataTable
            title="قائمة المسؤولين"
              columns={columnsClientsDataTable}
              data={data}
              searchKey={["name"]}
              textKey="اسم المسؤول"
            >
              <Link to={'add'} >
                <Button className="bg-green-700 md:px-7 hover:bg-green-800">اضافة جديد</Button>
              </Link>
            </DataTable>
          </CardContent>
      </Card>
  );
}

const columnsClientsDataTable: ColumnDef<ClientsDataTableType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-current font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          أسم العميل
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <div className="capitalize">{row.getValue("name")}</div>
      </>
    ),
  },
  {
    accessorKey: "role",
    header: "الدور",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "رقم جوال",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "time",
    header: () => <div className="text-right">تاريخ الإضافة</div>,
    cell: ({ row }) => {
      const amount = row.getValue("time") as Date;
      // Format the amount as a dollar amount
      const formatted = new Intl.DateTimeFormat("en-US").format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
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
            <Button variant="ghost" size="icon">
                <Trash className="size-5" />
            </Button>
        </div>
      );
    },
  },
];
