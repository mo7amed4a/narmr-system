import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link, useParams } from "react-router-dom";
import { DollarSign, Edit, Eye, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import StateCard from "@/components/home/StateCard";
import useFetch from "@/hooks/use-fetch";
import Loading from "@/components/api/loading";

export default function BranchesDetailsPage() {
  const params = useParams()
  const {data, loading} = useFetch(`/branch/${params.id}`)
  const branch = data?.data
  return (
    <Card className="w-full replaceAll flex flex-col gap-4 shadow-none border-none">
      {data && branch && <>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>بيانات الفرع</CardTitle>
            <Button variant="outline">تعديل</Button>
          </CardHeader>
          <CardContent className="grid gap-4 text-right">
            <div className="border-s-2 ps-3">
              <p className="text-gray-500">الاسم الفرع</p>
              <p className="font-semibold">{branch.name}</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">عدد الموظفين</p>
                <p className="font-semibold">{branch.employee_count}</p>
              </div>
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">تاريخ الاضافة</p>
                <p className="font-semibold">{branch.create_date}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid lg:grid-cols-3 gap-4">
        <StateCard
              title="اجمالي العائد"
              value="1,245"
              Icon={DollarSign}
              className="bg-gray-400"
            />
        <StateCard
              title="الصرفيات (فواتير ورواتب)"
              value="1,245"
              Icon={DollarSign}
              className="bg-gray-400"
            />
        <StateCard
              title="صافي الربح"
              value="1,245"
              Icon={DollarSign}
              className="bg-gray-400"
            />
        </div>
        <Card className="shadow-none">
          <CardContent>
            <DataTable
              title="قائمة الموظفين"
              columns={columnsUpcomingReservations}
              data={data}
              searchKey={["name"]}
              textKey="الاسم"
            />
          </CardContent>
        </Card>
      </>}
      {
        loading && <Loading />
      }
    </Card>
  );
}


const columnsUpcomingReservations: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "اسم الموظف",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("name")}</div>
      </>
    ),
  },
  {
    accessorKey: "phone",
    header: "رقم الجوال",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("phone")}</div>
      </>
    ),
  },
  {
    accessorKey: "role",
    header: "الدور الوظيفي",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("role")}</div>
      </>
    ),
  },
  {
    accessorKey: "salary",
    header: "الراتب الشهري",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("salary")}</div>
      </>
    ),
  },
  {
    accessorKey: "date",
    header: "تاريخ الاضافة",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("date")}</div>
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
          <Button variant="ghost" size="icon">
            <Trash className="size-5" />
          </Button>
          <Link to={`/admin/accounting/staff/1`}>
            <Button variant="ghost" size="icon">
              <Eye className="size-5" />
            </Button>
          </Link>
          <Link to={`/admin/accounting/staff/1/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="size-5" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
