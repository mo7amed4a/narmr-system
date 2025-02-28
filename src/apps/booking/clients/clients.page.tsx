import { DataTable } from "@/components/clients/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";

type ClientsDataTableType = {
  id: number;
  name: string;
  phone: string;
  type: string;
  addedDate: string;
};

export default function ClientsPage() {
  function getData(): ClientsDataTableType[] {
    // Fetch data from your API here.
    return [
      {
        id: 1,
        name: "هيا سلطان",
        phone: "(+33) 75 55 45 48",
        type: "أنثى",
        addedDate: "11/03/2022",
      },
      {
        id: 2,
        name: "Huda Al-Awadi",
        phone: "(+33) 75 55 45 47",
        type: "أنثى",
        addedDate: "11/03/2022",
      },
    ];
  }

  const data = getData();

  return (
      <Card className="p-4">
          <CardContent className="p-3 py-0">
            <DataTable
            title="قائمة العملاء"
              columns={columnsClientsDataTable}
              data={data}
              searchKey={["name"]}
              textKey="اسم العميل"
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
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    accessorKey: "phone",
    header: "رقم جوال",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "النوع",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("type")}</div>
      </>
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
