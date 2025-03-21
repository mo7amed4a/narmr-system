import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";
import SelectCustom from "@/components/ui/selectCustom";
import { SelectItem } from "@/components/ui/select";

export default function StaffEditPage() {
  const navigate = useNavigate();
  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <form>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>تعديل بيانات الموظف</CardTitle>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="text-red-500"
              >
                الغاء
              </Button>
              <Button variant="green">حفظ</Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid lg:grid-cols-3 gap-4">
                <InputLabel
                label="اسم الموظف"
                required
                value="محمد محمد"
                placeholder="ادخل اسم الموظف"
                />
                <InputLabel
                label="الراتب"
                required
                value="1000"
                placeholder="ادخل الراتب"
                />
                <SelectCustom label="ادخل العيادة"  >
                    <SelectItem value="1">عيادة 1</SelectItem>
                </SelectCustom>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <InputLabel
                label="رقم الجوال"
                required
                value="0123456789"
                placeholder="ادخل رقم الجوال"
                />
                <InputLabel
                label="الدور الوظيفي"
                required
                value="طبيب جلدية"
                placeholder="ادخل الدور الوظيفي"
                />
            </div>
          </CardContent>
        </Card>
      </form>
    </Card>
  )
}
