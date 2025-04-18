import { DataTable } from "@/components/clients/table";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { useUser } from "@/hooks/auth.context";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export interface ServicesType {
  id: number;
  name: string;
  price: number;
  create_date: string;
};

export default function ServicesPage() {
  const [refresh, setRefresh] = useState(false);
  const {data, loading, error} = useFetch("/services", refresh) 
  const {user} = useUser()
  const deleteBrach = (id: string) => {
    api.post(`/delete_service/${id}`, {
      user_id: user.user_id 
    }).then(res => {
      if (res.status === 200) {
        toast.success("تم حذف الخدمة بنجاح")
        setRefresh(prev=> !prev)
      }
    })
  }

  return (
      <Card>
          <CardContent className="p-3 py-0">
            <DataTable
              loading={loading}
              error={error}
              columns={columnsDataTable(deleteBrach)}
              title="قائمة الخدمات"
              data={data?.data}
              searchKey={["name"]}
              textKey="اسم الخدمة"
            >
              <Link to={'add'} >
                <Button className="bg-green-700 md:px-7 hover:bg-green-800">اضافة جديد</Button>
              </Link>
            </DataTable>
          </CardContent>
      </Card>
  );
}

const columnsDataTable = (action: (id: string) => void):ColumnDef<ServicesType>[] => {
  return [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
      ),
    },
    {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-current font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          أسم الخدمة
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
    accessorKey: "price",
    header: "سعر الخدمة",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("price")}</div>
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
    cell: ({row}) => {
      // const payment = row.original;
      return (
        <div className="flex gap-1">
            <Button variant="ghost" size="icon">
                <Edit className="size-5" />
            </Button>
            <DeleteDialog action={() => action(row.getValue("id")+"")} >
              <Button variant="ghost" size="icon">
                <Trash className="size-5 text-red-500" />
              </Button>
           </DeleteDialog>
        </div>
      );
    },
  },
]
}
