import { DataTable } from "@/components/clients/table";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/auth.context";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type ClientsDataTableType = {
  id: number;
  name: string;
  phone: string;
  create_date: string;
  gender: string;
  birth_date: string;
  city: string;
  country: string;
  visit_history: [];
};

export default function ClientsPage() {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("/customers", refresh);
  const { user } = useUser();
  const deleteBrach = (id: string) => {
    api
      .post(`/customer/delete/${id}`, {
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
    <Card className="p-4">
      <CardContent className="p-3 py-0">
        <DataTable
          loading={loading}
          error={error}
          columns={columnsDataTable(deleteBrach)}
          data={data?.data}
          title="قائمة العملاء"
          searchKey={["name"]}
          textKey="اسم العميل"
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

const columnsDataTable = (
  action: (id: string) => void
): ColumnDef<ClientsDataTableType>[] => {
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
      header: "أسم العميل",
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
      accessorKey: "gender",
      header: "النوع",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">{row.getValue("gender")}</div>
        </>
      ),
    },
    {
      accessorKey: "birth_date",
      header: "تاريخ الميلاد",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">{row.getValue("birth_date")}</div>
        </>
      ),
    },
    {
      accessorKey: "country",
      header: "الدولة",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">{row.getValue("country")}</div>
        </>
      ),
    },
    {
      accessorKey: "city",
      header: "البلد",
      cell: ({ row }) => (
        <>
          <div className="lowercase line-clamp-1">{row.getValue("city")}</div>
        </>
      ),
    },
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-1 cursor-pointer text-current font-bold me-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            تاريخ الإضافة
            <ArrowUpDown className="size-4" />
          </div>
        );
      },
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
            <Link to={`${row.getValue("id")}`}>
              <Button variant="ghost" size="icon">
                <Eye className="size-5" />
              </Button>
            </Link>
            <Link to={`${row.getValue("id")}/edit`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5" />
              </Button>
            </Link>

           <DeleteDialog action={() => action(row.getValue("id"))} >
              <Button variant="ghost" size="icon">
                <Trash className="size-5 text-red-500" />
              </Button>
           </DeleteDialog>
          </div>
        );
      },
    },
  ];
};
