import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link } from "react-router-dom";
import { ArrowRightLeft, ArrowUpDown, Eye, Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export default function PurchasesPage() {
  return (
    <Card className="w-full replaceAll flex flex-col gap-4 shadow-none border-none">
        <CardContent className="p-2">
          <DataTable
            title="قائمة المشتريات"
            columns={columnsSuppliers}
            data={suppliersData}
            searchKey={["code", "name"]}
            textKey="كود الفاتورة او اسم العميل"
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
    code: "0551234567",
    name: "مورد الأجهزة الطبية",
    company_name: "kwejnjn",
    invoice_value: "34567",
    invoice_status: true,
  },
  {
    code: "0551234567",
    name: "مورد الأجهزة الطبية",
    company_name: "kwejnjn",
    invoice_value: "34567",
    invoice_status: false,
  }
];

const columnsSuppliers: ColumnDef<any>[] = [
  {
    accessorKey: "code",
    header: "كود الفاتورة",
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
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
    accessorKey: "company_name",
    header: "اسم الشركة",
    cell: ({ row }) => <div>{row.getValue("company_name")}</div>,
  },
  {
    accessorKey: "invoice_value",
    header: "قيمة الفاتورة",
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("invoice_value")}</div>,
  },
  {
    accessorKey: "invoice_status",
    header: "حالة الفاتورة",
    cell: ({ row }) => <div className="line-clamp-1">
      {row.getValue("invoice_status") ? <Badge variant={"green"}>مكتمل</Badge> : <Badge variant={"yellow"}>غير مكتمل</Badge>}
    </div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: "الإجراءات",
    cell: ({row}) => (
      <div className="flex gap-1">
        <Link to={`1/edit`}>
          <Button variant="ghost" size="icon">
            <ArrowRightLeft /> 
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