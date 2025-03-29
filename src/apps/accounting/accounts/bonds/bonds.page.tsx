import { DataTable } from "@/components/clients/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { exportBands, printBands } from "@/utils/prints/bands";

export type DocumentType = {
  document_number: string;
  document_type: string;
  party_name: string;
  amount: number;
  payment_method: string;
  branch: string;
  added_by: string;
  notes: string;
  document_date: string;
};

export default function BandsAccountingPage() {
  const [refresh] = useState(false);
  const { data, loading, error } = useFetch("/sandat/all", refresh);

  const columnsDocuments: ColumnDef<DocumentType>[] = [
    {
      accessorKey: "document_number",
      header: "رقم السند",
      cell: ({ row }) => <div className="text-right text-primary">{row.getValue("document_number")}</div>,
    },
    {
      accessorKey: "document_type",
      header: "نوع السند",
      cell: ({ row }) => (
        <Badge
          variant={row.getValue("document_type") === "receipt" ? "green" : "yellow"}
        >
          {row.getValue("document_type") === "receipt" ? "سند قبض" : "سند صرف"}
        </Badge>
      ),
    },
    {
      accessorKey: "party_name",
      header: "اسم العميل أو المورد",
      cell: ({ row }) => <div>{row.getValue("party_name")}</div>,
    },
    {
      accessorKey: "amount",
      header: "المبلغ",
      cell: ({ row }) => <div>${row.getValue("amount")}</div>,
    },
    {
      accessorKey: "payment_method",
      header: "طريقة الدفع",
      cell: ({ row }) => <div>{row.getValue("payment_method") === "cash" ? "نقدي" : row.getValue("payment_method")}</div>,
    },
    {
      accessorKey: "branch",
      header: "العيادة - الفرع",
      cell: ({ row }) => <div>{row.getValue("branch")}</div>,
    },
    {
      accessorKey: "added_by",
      header: "أُضيف بواسطة",
      cell: ({ row }) => <div>{row.getValue("added_by")}</div>,
    },
    {
      accessorKey: "notes",
      header: "ملاحظات",
      cell: ({ row }) => <div>{row.getValue("notes")}</div>,
    },
    {
      accessorKey: "document_date",
      header: "تاريخ الإضافة",
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("document_date")).toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }) +
            ", " +
            new Date(row.getValue("document_date")).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "اجراءات",
      cell: ({ row }) => (
        <Link to={`${row.original.document_number}`} className="flex gap-1">
          <Button variant="ghost" size="icon">
            <Eye className="size-5" />
          </Button>
        </Link>
      ),
    },
  ];

  const handlePrint = () => {
    if (data?.records) printBands(data.records);
  };

  const handleExportExcel = () => {
    if (data?.records) exportBands(data.records, "سندات_محاسبة");
  };

  const handleExportPDF = () => {
    // if (data?.records) exportToPDF(data.records, "سندات_محاسبة");
    if (data?.records) printBands(data.records)
  };

  return (
    <Card className="replaceAll">
      <CardHeader className="flex justify-end flex-row items-center">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <span className="hidden md:block">طباعة الملف</span>
            <Printer />
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <span className="hidden md:block">تصدير ملف Excel</span>
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <span className="hidden md:block">تصدير ملف PDF</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 py-0">
        <DataTable
          title="السندات"
          columns={columnsDocuments}
          data={data?.records || []}
          searchKey={["document_number", "party_name"]}
          textKey="رقم السند او اسم العميل"
          loading={loading}
          error={error}
        >
          <Link to="add">
            <Button variant="green">اضافة سند</Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}