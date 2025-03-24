import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import CardBorderStart from "@/components/global/CardBorderStart";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch";
import PurchasesPage from "../purchases/purchases.page";
import Loading from "@/components/api/loading";
import AddInvoiceDialog from "@/components/dialogs/AddInvoiceDialog";

export default function SuppliersDetailsPage() {
  const { id } = useParams(); // Get supplier_id from URL
  const [refresh, setRefresh] = useState(false);

  // Fetch supplier data
  const { data, loading, error } = useFetch(`/supplier/${id}`, refresh);
  const supplier = data?.data || {};

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <Card className="w-full shadow-none">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>بيانات المورد</CardTitle>
          <Link to={`/suppliers/${id}/edit`}>
            <Button variant="outline">تعديل</Button>
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4 text-right">
          <CardBorderStart title="اسم المورد" value={supplier.name || "غير متوفر"} />
          <div className="flex gap-5 md:gap-20 lg:gap-32">
            <CardBorderStart title="اسم الشركة" value={supplier.company_name || "غير متوفر"} />
            <CardBorderStart title="رقم الجوال" value={supplier.phone || "غير متوفر"} />
            <CardBorderStart title="العنوان" value={`${supplier.city || "غير متوفر"}, ${supplier.country || "غير متوفر"}`} />
          </div>
          <div className="flex gap-5 md:gap-20 lg:gap-32">
            <CardBorderStart title="الرصيد الافتتاحي" value={supplier.initial_balance || "0"} />
            <CardBorderStart title="الرصيد الحالي" value={supplier.current_balance || "0"} />
            <CardBorderStart title="الدين" value={supplier.debit || "0"} />
            <CardBorderStart title="الائتمان" value={supplier.credit || "0"} />
          </div>
        </CardContent>
      </Card>
      <PurchasesPage type={null} supplier_id={parseInt(id as string)} reload={refresh}>
        <AddInvoiceDialog supplierId={parseInt(id as string)} onInvoiceAdded={() => setRefresh(prev => !prev)}/>
      </PurchasesPage>
    </Card>
  );
}