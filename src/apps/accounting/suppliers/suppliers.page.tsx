import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link } from "react-router-dom";
import { ArrowUpDown, Edit, Eye, Plus, Scroll } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

export default function SuppliersPage() {
  return (
    <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
      <Card className="w-full shadow-none">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>بيانات الموردين</CardTitle>
          <Link to={`/accounting/suppliers/add`}>
            <Button variant="green">
              اضافة جديد <Plus />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4 text-right">
          <DataTable
            columns={columnsSuppliers}
            data={suppliersData}
            searchKey={["company_name", "name"]}
            textKey="اسم المورد او اسم الشركة"
          />
        </CardContent>
      </Card>
    </Card>
  );
}

const suppliersData = [
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "ha",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "ههه الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
  {
    name: "مورد الأجهزة الطبية",
    phone: "0551234567",
    company_name: "kwejnjn",
    initial_balance: "178",
    debtor: "0551234567",
    creditor: "0551234567",
    amount: "0551234567",
    balance: "0551234567",
  },
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
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "company_name",
    header: "اسم الشركة",
    cell: ({ row }) => <div>{row.getValue("company_name")}</div>,
  },
  {
    accessorKey: "initial_balance",
    header: "الرصيد الاولى",
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("initial_balance")}</div>,
  },
  {
    accessorKey: "debtor",
    header: "مدين",
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("debtor")}</div>,
  },
  {
    accessorKey: "creditor",
    header: "دائن",
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("creditor")}</div>,
  },
  {
    accessorKey: "amount",
    header: "المبلغ",
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "balance",
    header: "الرصيد",
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("balance")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: "الإجراءات",
    cell: ({row}) => (
      <div className="flex gap-1">
        <Link to={`/accounting/suppliers/1/edit`}>
          <Button variant="ghost" size="icon">
            <Scroll /> 
          </Button>
        </Link>
        <Link to={`/accounting/suppliers/${row.getValue("name")}`}>
          <Button variant="ghost" size="icon">
            <Eye />
          </Button>
        </Link>
        <Link to={`/accounting/suppliers/1/edit`}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </Link>
      </div>
    ),
  },
];