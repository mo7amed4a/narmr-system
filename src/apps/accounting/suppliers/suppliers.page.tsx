import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link } from "react-router-dom";
import { ArrowUpDown, Edit, Eye, Plus, Scroll } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import useFetch from "@/hooks/use-fetch";

type SupplierType = {
  supplier_id: number;
  name: string;
  phone: string;
  company_name: string;
  email: string;
  city: string;
  country: string;
  initial_balance: number;
  current_balance: number;
  debit: number;
  credit: number;
  amount: number;
};

export default function SuppliersPage() {
  const [refresh] = useState(false); // لإعادة جلب البيانات لو حصل تعديل
  const { data, loading, error } = useFetch("/suppliers", refresh);

  const columns: ColumnDef<SupplierType>[] = [
    {
      accessorKey: "supplier_id",
      header: "رقم المورد",
      cell: ({ row }) => <div>{row.getValue("supplier_id")}</div>,
    },
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
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "company_name",
      header: "اسم الشركة",
      cell: ({ row }) => <div>{row.getValue("company_name")}</div>,
    },
    {
      accessorKey: "email",
      header: "البريد الإلكتروني",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "city",
      header: "المدينة",
      cell: ({ row }) => <div>{row.getValue("city")}</div>,
    },
    {
      accessorKey: "country",
      header: "الدولة",
      cell: ({ row }) => <div>{row.getValue("country")}</div>,
    },
    {
      accessorKey: "initial_balance",
      header: "الرصيد الأولي",
      cell: ({ row }) => <div>{row.getValue("initial_balance")} جنيه</div>,
    },
    {
      accessorKey: "current_balance",
      header: "الرصيد الحالي",
      cell: ({ row }) => <div>{row.getValue("current_balance")} جنيه</div>,
    },
    {
      accessorKey: "debit",
      header: "مدين",
      cell: ({ row }) => <div>{row.getValue("debit")} جنيه</div>,
    },
    {
      accessorKey: "credit",
      header: "دائن",
      cell: ({ row }) => <div>{row.getValue("credit")} جنيه</div>,
    },
    {
      accessorKey: "amount",
      header: "المبلغ",
      cell: ({ row }) => <div>{row.getValue("amount")} جنيه</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: "الإجراءات",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <Link to={`${row.getValue("supplier_id")}`}>
            <Button variant="ghost" size="icon">
              <Scroll />
            </Button>
          </Link>
          <Link to={`${row.getValue("supplier_id")}`}>
            <Button variant="ghost" size="icon">
              <Eye />
            </Button>
          </Link>
          <Link to={`${row.getValue("supplier_id")}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <CardContent>
        <DataTable
          title="بيانات الموردين"
          columns={columns}
          data={data?.data || []} // البيانات جاية داخل "data" في الـ response
          searchKey={["company_name", "name"]}
          textKey="اسم المورد أو اسم الشركة"
          loading={loading}
          error={error}
        >
          <Link to={`add`}>
            <Button variant="green">
              إضافة جديد <Plus />
            </Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}