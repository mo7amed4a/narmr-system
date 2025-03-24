import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link } from "react-router-dom";
import { ArrowUpDown, Edit, Eye, Trash, Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/auth.context";

export type ProductType = {
  product_id: number;
  name: string;
  price: number;
  stock_quantity: number;
};

export default function ProductsPage() {
  const [refresh, setRefresh] = useState(false); // لإعادة جلب البيانات لو حصل تعديل
  const { data, loading, error } = useFetch("/products", refresh);
    const {user} = useUser()
  // Handle delete product
  const handleDelete = async (productId: any) => {
    try {
        await api.post(`/product/delete`, {
            "product_id": parseInt(productId as string),
            user_id: user.user_id
        });
        setRefresh(prev => !prev); // Refresh data after deletion
        toast.success("تم حذف المنتج بنجاح")
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "product_id",
      header: "رقم المنتج",
      cell: ({ row }) => <div>{row.getValue("product_id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-current font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          اسم المنتج <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "price",
      header: "السعر",
      cell: ({ row }) => <div>{row.getValue("price")} جنيه</div>,
    },
    {
      accessorKey: "stock_quantity",
      header: "الكمية المتوفرة",
      cell: ({ row }) => <div>{row.getValue("stock_quantity")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: "الإجراءات",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <Link to={`${row.getValue("product_id")}`}>
            <Button variant="ghost" size="icon">
              <Eye />
            </Button>
          </Link>
          <Link to={`${row.getValue("product_id")}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.getValue("product_id"))}
          >
            <Trash className="text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <CardContent>
        <DataTable
          title="بيانات المنتجات"
          columns={columns}
          data={data?.data || []} // البيانات جاية داخل "data" في الـ response
          searchKey={["name"]}
          textKey="اسم المنتج"
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