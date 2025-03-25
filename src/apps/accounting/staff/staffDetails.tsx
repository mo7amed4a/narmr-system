import CardBorderStart from "@/components/global/CardBorderStart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BondsHistory from "./components/BondsHistory";
import { useState } from "react";
import BondAddInStaff from "./components/bond-add";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@/hooks/auth.context";
import Loading from "@/components/api/loading";
import NotFoundPage from "@/pages/NotFoundPage";

export default function StaffDetails() {
  const { id } = useParams(); // Get employee_id from URL
  const [refresh] = useState(false);
  const [open, setOpen] = useState(false);
  const {user} = useUser()
  // Fetch employee data
  const { data, loading, error } = useFetch(`/employee/${id}`, refresh);
  const employee = data?.data || {};


  // Format create_date to "20 Dec, 2021, 02:30 AM" style
  const formatDate = (dateString: string) => {
    if (!dateString) return "غير متوفر";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) + ", " + date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return employee?.name ? (
    <Card>
      <CardHeader>
        <Card className="border">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>بيانات الموظف</CardTitle>
            <Button variant="outline">تعديل</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardBorderStart title="اسم الموظف" value={employee.name || "غير متوفر"} />
            <div className="flex flex-wrap justify-between gap-4">
              <CardBorderStart title="الدور الوظيفي" value={employee.role || "غير متوفر"} />
              <CardBorderStart title="رقم الجوال" value={employee.phone || "غير متوفر"} />
              <CardBorderStart title="الراتب" value={`${employee.salary || "0"} $`} />
              <CardBorderStart title="تاريخ الاضافة" value={formatDate(employee.create_date)} />
            </div>
          </CardContent>
        </Card>
      </CardHeader>
        {user.user_category === "admin" && <CardContent>
            <Card className="border">
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>اضافة سند</CardTitle>
                <div className="flex gap-3">
                <Button variant="ghost" className="text-red-500">استرجاع</Button>
                <Button onClick={() => setOpen(true)} variant="green">اضافة سند</Button>
                </div>
            </CardHeader>
            <BondAddInStaff open={open} />
            </Card>
            <BondsHistory />
        </CardContent>}
    </Card>
  ): <NotFoundPage />;
}