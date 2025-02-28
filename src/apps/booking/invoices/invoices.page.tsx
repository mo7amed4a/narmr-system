import { DataTable } from "@/components/clients/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type InvoiceType = {
  id:number
  invoice_code: string;
  client: string;
  doctor: string;
  created_by: string;
  addition_date: string;
  invoice_value: string;
  invoice_status: boolean;
};

export default function InvoicesPage() {
  const [data, setData] = useState([
    {
      id: 1,
      invoice_code: "S0000031",
      client: "ريم فهمي",
      doctor: "د/ سامي مصطفى",
      created_by: "Administrator",
      addition_date: "20 Dec, 2021, 02:21 AM",
      invoice_value: "$150",
      invoice_status:false,
    },
    {
      id: 2,
      invoice_code: "S0000030",
      client: "مها عبد الرحمن",
      doctor: "د/ عبد الرحمن وجية",
      created_by: "Administrator",
      addition_date: "20 Dec, 2021, 02:21 AM",
      invoice_value: "$240",
      invoice_status:false,
    },
    {
      id: 3,
      invoice_code: "S0000032",
      client: "محمد المهاني",
      doctor: "د/ عبد الرحمن وجية",
      created_by: "Administrator",
      addition_date: "20 Dec, 2021, 02:21 AM",
      invoice_value: "$200",
      invoice_status:true,
    },
  ])


  const updateInvoiceStatus = (id: number, newStatus: boolean) => {
    setData((prevData) =>
      prevData.map((invoice) =>
        invoice.id === id ? { ...invoice, invoice_status: newStatus } : invoice
      )
    );
  };

  
  return (
    <Card className="p-4">
      <CardContent className="p-3 py-0">
        <DataTable
          title="قائمة فواتير الحجوزات"
          columns={columnsInvoices(updateInvoiceStatus)}
          data={data}
          searchKey={["invoice_code", "client"]}
          textKey="كود الفاتورة أو اسم العميل"
        >
          <Link to={'add'} >
            <Button variant="default">إضافة فاتورة</Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}


const columnsInvoices = (
  updateInvoiceStatus: (id: number, newStatus: boolean) => void
): ColumnDef<InvoiceType>[] => [
  {
    accessorKey: "id",
    header: "#",
  },
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
        variant={row.getValue("invoice_status") ===true ? "green" : "ghost"}
      >
        {row.getValue("invoice_status") ===true ? "مؤكدة" : "غير مؤكدة"}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "إجراءات",
    cell: ({ row }) => (
      <div className="flex gap-1">
        {!row.getValue("invoice_status") && <Button onClick={()=> updateInvoiceStatus(row.getValue("id"), true)} variant="ghost" size="icon">
          <ArrowLeftRight className="size-5" />
        </Button>}
        <Link to={"1"}>
          <Button variant="ghost" size="icon">
            <Eye className="size-5" />
          </Button>
        </Link>
        <Link to={"1/edit"}>
          <Button variant="ghost" size="icon">
            <Edit className="size-5" />
          </Button>
        </Link>
      </div>
    ),
  },
];
