import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link } from "react-router-dom";
import { ArrowRightLeft, ArrowUpDown, Eye, Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch"; // Assuming this is your custom fetch hook
import api from "@/lib/axios";
import toast from "react-hot-toast";

export type InvoiceType = {
  invoice_id: number;
  invoice_code: string;
  supplier_id: number;
  invoice_date: string;
  status: string;
  total_amount: number;
  invoice_type: string;
};

export default function PurchasesPage({
  supplier_id=null,
  type="purchase",
  children,
  reload
}:{
  supplier_id?: number | null
  type?: "purchase"|"sale"|null
  children?: React.ReactNode
  reload?:boolean
}) {
  const [refresh, setRefresh] = useState(reload || false);
  let url = `/invoices1`
  if (type) {
    url += `?type=${type}`
  }
  if (supplier_id) {
    url += type === null ? `?supplier_id=${supplier_id}` : `&supplier_id=${supplier_id}`
  }
  const { data, loading, error } = useFetch(url, reload || refresh);
  const editStatus = async (id: number, status: "completed" | "canceled") => {
    try {
      await api.post(`/invoice1/update`, {
        "invoice_id": id,
        "status": status
      })
      setRefresh(prev=>!prev)
      toast.success("تم تحديث حالة الفاتورة بنجاح")
    } catch (error) {
      console.log(error)
    }
  }

  const columnsSuppliers: ColumnDef<InvoiceType>[] = [
    {
      accessorKey: "invoice_code",
      header: "كود الفاتورة",
      cell: ({ row }) => <div>{row.getValue("invoice_code")}</div>,
    },
    ...(type !== null ? [{
      accessorKey: "supplier_id", // Will replace with supplier name if fetching supplier data
      header: ({ column }: {column: any}) => (
        <Button
          variant="ghost"
          className="text-current font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          اسم المورد <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }: {row: any}) => (
        <div className="font-bold">
          {row.getValue("supplier_id")} {/* Replace with supplier name if fetched */}
        </div>
      ),
    }]:[]),
    {
      accessorKey: "total_amount",
      header: "قيمة الفاتورة",
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue("total_amount")}</div>,
    },
    {
      accessorKey: "status",
      header: "حالة الفاتورة",
      cell: ({ row }) => (
        <div className="line-clamp-1">
          {row.getValue("status") === "completed" ? (
            <Badge variant="green">مكتمل</Badge>
          ) : (
            <Badge variant="yellow">غير مكتمل</Badge>
          )}
        </div>
      ),
    },
    ...(type !== null ? [{
      id: "actions",
      enableHiding: false,
      header: "الإجراءات",
      cell: ({ row }:{row: any}) => (
        <div className="flex gap-1">
          <Button onClick={() => editStatus(row.original.invoice_id, row.original.status === "completed" ? "canceled" : "completed")} variant="ghost" size="icon">
            <ArrowRightLeft />
          </Button>
          <Link to={`${row.original.invoice_id}`}>
            <Button variant="ghost" size="icon">
              <Eye />
            </Button>
          </Link>
        </div>
      ),
    }] : []),
  ];

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <CardContent className="p-2">
        <DataTable
          title={`قائمة ${type != null ? (type === "sale" && "المبيعات" || type == "purchase" && "المشتريات") : "الفواتير"}`}
          columns={columnsSuppliers}
          data={data?.data || []} // API returns data in a "data" field
          searchKey={["invoice_code", "supplier_id"]} // Adjust search keys as needed
          textKey="كود الفاتورة او اسم المورد"
          loading={loading}
          error={error}
        >
          {children || <Link to={`add`}>
            <Button variant="green">
              اضافة جديد <Plus />
            </Button>
          </Link>}
        </DataTable>
      </CardContent>
    </Card>
  );
}