import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";

export default function SuppliersAddPage() {
  const navigate = useNavigate()
  return (
    <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
      <form>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>اضافة مورد جديد</CardTitle>
            <div className="flex gap-3">
              <Button onClick={()=> navigate(-1)} variant="outline" className="text-red-500">
                الغاء
              </Button>
              <Button variant="green">حفظ</Button>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <InputLabel
              label="اسم المورد"
              required
              placeholder="ادخل اسم المورد"
            />
            <InputLabel
              label="البريد الالكتروني (اختياري)"
              placeholder="ادخل البريد الالكتروني (اختياري)"
            />
            <InputLabel
              label="رقم الجوال"
              required
              placeholder="ادخل رقم الجوال"
            />
            <InputLabel
              label="اسم الشركة"
              required
              placeholder="ادخل اسم الشركة"
            />
            <InputLabel label="المدينة" required placeholder="ادخل المدينة" />
            <InputLabel label="الدولة" required placeholder="العراق" />
          </CardContent>
        </Card>
      </form>
    </Card>
  );
}
