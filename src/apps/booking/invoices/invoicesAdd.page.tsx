import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import SelectCustom from "@/components/ui/selectCustom";
import { Trash2 } from "lucide-react";

export default function InvoicesAddPage() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>فاتورة جديدة</CardTitle>
        </CardHeader>
          <CardContent className="p-3 py-0">
          <div className="flex gap-4 md:w-3/4">
            <SelectCustom label="اختر العميل">
              <SelectItem value="1">عبدالرحمن</SelectItem>
            </SelectCustom>
            <SelectCustom label="اختر الطبيب">
              <SelectItem value="1">عبدالرحمن</SelectItem>
            </SelectCustom>
          </div>
          </CardContent>
      </Card>
      <Card className="p-4">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>الخدمات</CardTitle>
        </CardHeader>
          <CardContent className="p-3 py-0 space-y-4">
          <div className="flex gap-4">
            <SelectCustom label="اختر الخدمة">
              <SelectItem value="1">عبدالرحمن</SelectItem>
            </SelectCustom>
            <SelectCustom label="سعر الخدمة">
              <SelectItem value="1">عبدالرحمن</SelectItem>
            </SelectCustom>
            <Button variant={"ghost"} size={"icon"} className="px-2"><Trash2 /></Button>
          </div>
          <div className="flex gap-4">
            <SelectCustom label="اختر الخدمة">
              <SelectItem value="1">عبدالرحمن</SelectItem>
            </SelectCustom>
            <SelectCustom label="سعر الخدمة">
              <SelectItem value="1">عبدالرحمن</SelectItem>
            </SelectCustom>
            <Button variant={"ghost"} size={"icon"} className="px-2"><Trash2 /></Button>
          </div>
          </CardContent>
          <CardFooter className="flex flex-col py-5">
          <div className="flex justify-end py-4 ms-auto">
            <span className="">الاجمالي 0</span>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <Button variant="green" className="bg-green-100 text-green-600 hover:text-white">اضافة خدمة</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-red-800">استرجاع</Button>
              <Button variant="green">تأكيد الفاتورة</Button>
            </div>
          </div>
          </CardFooter>
      </Card>
    </div>
  );
}
