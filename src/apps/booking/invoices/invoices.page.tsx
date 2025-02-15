import { DataTable } from "@/components/clients/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";

type InvoiceType = {
  invoice_code: string;
  client: string;
  doctor: string;
  created_by: string;
  addition_date: string;
  invoice_value: string;
  invoice_status: string;
};

export default function InvoicesPage() {
  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>قائمة فواتير الحجوزات</CardTitle>
       <Link to={'/booking/invoices/add'} >
        <Button variant="default">إضافة فاتورة</Button>
       </Link>
      </CardHeader>
      <Card className="shadow-none">
        <CardContent className="p-3 py-0">
          <DataTable
            columns={columnsInvoices}
            data={data}
            searchKey={["invoice_code", "client"]}
            textKey="كود الفاتورة أو اسم العميل"
          />
        </CardContent>
      </Card>
    </Card>
  );
}

const data = [
  {
    invoice_code: "S0000030",
    client: "مها عبد الرحمن",
    doctor: "د/ عبد الرحمن وجية",
    created_by: "Administrator",
    addition_date: "20 Dec, 2021, 02:21 AM",
    invoice_value: "$240",
    invoice_status: "غير مؤكدة",
  },
  {
    invoice_code: "S0000031",
    client: "ريم فهمي",
    doctor: "د/ سامي مصطفى",
    created_by: "Administrator",
    addition_date: "20 Dec, 2021, 02:21 AM",
    invoice_value: "$150",
    invoice_status: "غير مؤكدة",
  },
  {
    invoice_code: "S0000032",
    client: "محمد المهاني",
    doctor: "د/ عبد الرحمن وجية",
    created_by: "Administrator",
    addition_date: "20 Dec, 2021, 02:21 AM",
    invoice_value: "$200",
    invoice_status: "مكتمل",
  },
];

const columnsInvoices: ColumnDef<InvoiceType>[] = [
  {
    accessorKey: "invoice_code",
    header: "كود الفاتورة",
    cell: ({ row }) => (
      <div className="text-red-600">{row.getValue("invoice_code")}</div>
    ),
  },
  {
    accessorKey: "client",
    header: "العميل",
  },
  {
    accessorKey: "doctor",
    header: "الطبيب",
  },
  {
    accessorKey: "created_by",
    header: "أنشئ بواسطة",
  },
  {
    accessorKey: "addition_date",
    header: "تاريخ الإضافة",
  },
  {
    accessorKey: "invoice_value",
    header: "قيمة الفاتورة",
  },
  {
    accessorKey: "invoice_status",
    header: "حالة الفاتورة",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("invoice_status") === "مكتمل" ? "green" : "ghost"}
      >
        {row.getValue("invoice_status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "إجراءات",
    cell: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="icon">
          <ArrowLeftRight className="size-5" />
        </Button>
        <Link to={"/booking/invoices/1"}>
          <Button variant="ghost" size="icon">
            <Eye className="size-5" />
          </Button>
        </Link>
        <Link to={"/booking/invoices/1/edit"}>
          <Button variant="ghost" size="icon">
            <Edit className="size-5" />
          </Button>
        </Link>
      </div>
    ),
  },
];
