import CardBorderStart from "@/components/global/CardBorderStart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BondsHistory from "./components/BondsHistory";
import { useState } from "react";
import BondAddInStaff from "./components/bond-add";

export default function StaffDetails() {
    const isAdmin = localStorage.getItem("userType") === "admin" ? true : false;
    const [open, setOpen] = useState(false)
  return (
   <Card>
    <CardHeader>
        <Card className="border">
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>بيانات الموظف</CardTitle>
                <Button variant={"outline"}>تعديل</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardBorderStart title="اسم الموظف" value="محمد علي" />
                <div className="flex flex-wrap justify-between gap-4">
                    <CardBorderStart title="الدور الوظيفي" value="طبيب" />
                    <CardBorderStart title="رقم الجوال" value="+252414" />
                    <CardBorderStart title="الراتب" value="1500 $" />
                    <CardBorderStart title="تاريخ الاضافة" value="20 Dec, 2021, 02:30 AM" />
                </div>
            </CardContent>
        </Card>
    </CardHeader>
    { isAdmin &&
        <CardContent>
             <Card className="border">
                <CardHeader className="flex justify-between flex-row items-center">
                    <CardTitle>اضافة سند</CardTitle>
                    <div className="flex gap-3">
                        <Button variant={"ghost"} className="text-red-500">استرجاع</Button>
                        <Button onClick={() => setOpen(true)} variant={"green"}>اضافة سند</Button>
                    </div>
                </CardHeader>
                <BondAddInStaff open={open} />
            </Card>
            <BondsHistory />
        </CardContent>
    }
   </Card>
  )
}
