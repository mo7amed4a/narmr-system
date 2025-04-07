import CardBorderStart from "@/components/global/CardBorderStart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BranchStaffDetailsPage() {
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
                    <CardBorderStart title="رقم الموبايل" value="+252414" />
                    <CardBorderStart title="الراتب" value="1500 $" />
                    <CardBorderStart title="تاريخ الاضافة" value="20 Dec, 2021, 02:30 AM" />
                </div>
            </CardContent>
        </Card>
    </CardHeader>
   </Card>
  )
}
