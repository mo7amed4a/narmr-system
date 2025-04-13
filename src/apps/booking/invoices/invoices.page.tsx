import { DataTable } from "@/components/clients/table";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/auth.context";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, ArrowLeftRight, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type InvoiceType = {
  invoice_id: number;
  invoice_code: string;
  customer_name: string;
  doctor_name: string;
  created_by: string;
  invoice_date: string;
  invoice_amount: number;
  invoice_status: string;
};

export default function InvoicesPage() {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("/invoices", refresh);
  const { user } = useUser();

  const deleteFun = (id: number) => {
    api
      .post(`/invoices/delete/`, {
        invoice_id: id, // تغيير doctor_id لـ invoice_id
        user_id: user.user_id,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("تم حذف الفاتورة بنجاح");
          setRefresh((prev) => !prev);
        }
      })
      .catch((err) => {
        console.error("Error deleting invoice:", err);
        toast.error("حدث خطأ أثناء حذف الفاتورة");
      });
  };

  const updateInvoiceStatus = async (id: number, newStatus: string) => {
    try {
      const response = await api.post(`/invoice/status/update`, {
        user_id: user.user_id,
        invoice_id: id,
        invoice_status: newStatus,
      });
      if (response.status === 200) {
        toast.success("تم تحديث حالة الفاتورة بنجاح");
        setRefresh((prev) => !prev); // إعادة جلب البيانات بعد التحديث
      }
    } catch (err) {
      console.error("Error updating invoice status:", err);
      toast.error("حدث خطأ أثناء تحديث حالة الفاتورة");
    }
  };

  const columns = columnsInvoices(updateInvoiceStatus, deleteFun);

  return (
    <Card className="p-0">
      <CardContent className="p-3 py-0">
        <DataTable
          title="قائمة فواتير الحجوزات"
          columns={columns}
          data={data?.data || []} // تمرير data.data لأن البيانات داخل "data" في الـ response
          searchKey={["invoice_code", "customer_name"]}
          textKey="كود الفاتورة أو اسم العميل"
          loading={loading}
          error={error}
        >
          <Link to={"add"}>
            <Button variant="default">إضافة فاتورة</Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}

const columnsInvoices = (
  updateInvoiceStatus: (id: number, newStatus: string) => void,
  deleteFun: (id: number) => void
): ColumnDef<InvoiceType>[] => [
  // {
  //   accessorKey: "invoice_id",
  //   header: "#",
  //   cell: ({ row }) => row.original.invoice_id + "", // استخدام invoice_id كـ id
  // },
  {
    accessorKey: "invoice_code",
    header: "كود الفاتورة",
    cell: ({ row }) => (
      <div className="text-red-600">{row.getValue("invoice_code")}</div>
    ),
  },
  {
    accessorKey: "customer_name",
    header: "العميل",
  },
  {
    accessorKey: "doctor_name",
    header: "الطبيب",
  },
  {
    accessorKey: "created_by",
    header: "أنشئ بواسطة",
  },
  {
    accessorKey: "invoice_date",
    header: "تاريخ الإضافة",
  },
  {
    accessorKey: "invoice_amount",
    header: "قيمة الفاتورة",
    cell: ({ row }) => `${row.getValue("invoice_amount")} دينار العراقي`,
  },
  {
    accessorKey: "invoice_status",
    header: "حالة الفاتورة",
    cell: ({ row }) => (
      <Badge
        variant={
          row.getValue("invoice_status") === "confirmed" ? "green" : "ghost"
        }
      >
        {row.getValue("invoice_status") === "confirmed" ? "مؤكدة" : "غير مؤكدة"}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "إجراءات",
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.getValue("invoice_status") !== "confirmed" && (
          <Button
            onClick={() =>
              updateInvoiceStatus(row.original.invoice_id, "confirmed")
            }
            variant="ghost"
            size="icon"
          >
            <ArrowLeftRight className="size-5" />
          </Button>
        )}
        <Link to={`${row.original.invoice_id}`}>
          <Button variant="ghost" size="icon">
            <Eye className="size-5" />
          </Button>
        </Link>
        <Link to={`${row.original.invoice_id}/edit`}>
          <Button variant="ghost" size="icon">
            <Edit className="size-5" />
          </Button>
        </Link>
        <DeleteDialog  action={() => deleteFun(row.original.invoice_id)}>
          <Button className="hidden" variant="ghost" size="icon">
            <Trash className="size-5 text-red-500" />
          </Button>
        </DeleteDialog>
      </div>
    ),
  },
];
