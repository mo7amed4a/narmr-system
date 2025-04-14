import { DataTable } from "@/components/clients/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { exportExcel, printPDF } from "@/utils/exportUtils";
import { addCommasToNumber } from "@/utils/numbers"; // استيراد الفانكشن لتنسيق الأرقام

export type DocumentType = {
  id: number;
  document_number: string;
  document_type: string;
  document_date: string;
  branch_name: string;
  cashbox_name: string;
  amount: number;
  notes: string;
  added_by: string;
  accounts: {
    account_id: number;
    account_name: string;
    debit: number;
    credit: number;
    note: string;
  }[];
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
      accessorKey: "accounts",
      header: "اسم الحساب",
      cell: ({ row }) => {
        const accounts = row.getValue("accounts") as DocumentType["accounts"];
        const isName = accounts[0]?.account_name || row.getValue("cashbox_name")
        return <div>{isName ||  ""}</div>;
      },
    },
    {
      accessorKey: "amount",
      header: "المبلغ",
      cell: ({ row }) => <div>{addCommasToNumber(row.getValue("amount"))}</div>,
    },
    // {
    //   accessorKey: "cashbox_name",
    //   header: "طريقة الدفع",
    //   cell: ({ row }) => <div>{row.getValue("cashbox_name") || "نقدي"}</div>,
    // },
    {
      accessorKey: "branch_name",
      header: "العيادة - الفرع",
      cell: ({ row }) => <div>{row.getValue("branch_name")}</div>,
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

  // تحويل البيانات لتتناسب مع المفاتيح المترجمة
  const preparePrintData = (sandat: DocumentType[]) => {
    return sandat.map((record) => ({
      "المعرف": record.id,
      "رقم السند": record.document_number,
      "نوع السند": record.document_type === "receipt" ? "سند قبض" : "سند صرف",
      "تاريخ الوثيقة": new Date(record.document_date).toLocaleString("ar-EG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      "اسم الفرع": record.branch_name,
      "اسم الخزينة": record.cashbox_name || "نقدي",
      "المبلغ": addCommasToNumber(record.amount), // استخدام الفانكشن لتنسيق الأرقام
      "الملاحظات": record.notes,
      "أُضيف بواسطة": record.added_by,
      "اسم العميل أو المورد": record.accounts[0]?.account_name || "غير محدد",
    }));
  };

  const printKeys = [
    "المعرف",
    "رقم السند",
    "نوع السند",
    "تاريخ الوثيقة",
    "اسم الفرع",
    "اسم الخزينة",
    "المبلغ",
    "الملاحظات",
    "أُضيف بواسطة",
    "اسم العميل أو المورد",
  ];

  const handlePrint = () => {
    if (data?.sandat) {
      const preparedData = preparePrintData(data.sandat);
      printPDF([preparedData], printKeys);
    }
  };

  const handleExportExcel = () => {
    if (data?.sandat) {
      const preparedData = preparePrintData(data.sandat);
      exportExcel(preparedData, "سندات_محاسبة", printKeys);
    }
  };

  const handleExportPDF = () => {
    if (data?.sandat) {
      const preparedData = preparePrintData(data.sandat);
      printPDF([preparedData], printKeys);
    }
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
          data={data?.sandat || []}
          searchKey={["document_number", "accounts.account_name"]}
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