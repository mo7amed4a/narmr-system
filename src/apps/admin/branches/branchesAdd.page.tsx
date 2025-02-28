import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";

export default function BranchesAddPage() {
  const navigate = useNavigate();
  return (
    <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
      <form>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>اضافة عيادة جديدة</CardTitle>
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
            <InputLabel
              label="اسم العيادة"
              required
              placeholder="ادخل اسم العيادة"
            />
          </CardContent>
        </Card>
      </form>
    </Card>
  );
}
