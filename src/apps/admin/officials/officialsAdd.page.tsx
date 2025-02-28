import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function OfficialsAddPage() {
  const navigate = useNavigate();
  return (
    <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
      <form>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>اضافة مسؤول جديد</CardTitle>
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
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="col-span-full flex justify-start pb-4 gap-4">
              <span>الدور</span>
              <RadioGroup
                dir="rtl"
                defaultValue="all"
                className="flex justify-center gap-2"
              >
                <div className="flex items-center flex-nowrap gap-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="text-nowrap">
                    مسؤول الحسابات
                  </Label>
                </div>
                <div className="flex items-center flex-nowrap gap-x-2">
                  <RadioGroupItem value="complete" id="complete" />
                  <Label htmlFor="complete" className="text-nowrap">
                    مسؤول الحجوزات
                  </Label>
                </div>
                <div className="flex items-center flex-nowrap gap-x-2">
                  <RadioGroupItem value="canceled" id="canceled" />
                  <Label htmlFor="canceled" className="text-nowrap">
                    مسؤول عام
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <InputLabel
              label="اسم المسؤول"
              required
              placeholder="ادخل اسم المسؤول"
            />
            <InputLabel
              label="رقم الجوال"
              required
              placeholder="ادخل رقم الجوال"
            />
            <InputLabel
              label="البريد الالكتروني (اختياري)"
              placeholder="ادخل البريد الالكتروني (اختياري)"
            />
          </CardContent>
        </Card>
      </form>
    </Card>
  );
}
