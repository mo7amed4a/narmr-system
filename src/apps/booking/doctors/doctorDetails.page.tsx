import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const doctorInfo = {
  name: "د/ عبد الرحمن وجية",
  phone: "+964 073 345 0606",
  specialty: "طبيب جلدية",
  workplace: "مركز بيوني",
  addedDate: "11/03/2022",
};

const workSchedule = [
  { day: "السبت", status: "لا عمل في هذا اليوم" },
  { day: "الأحد", from: "٩:٠٠ صباحًا", to: "٩:٠٠ صباحًا" },
  { day: "الاثنين", status: "لا عمل في هذا اليوم" },
  { day: "الثلاثاء", from: "٩:٠٠ صباحًا", to: "٩:٠٠ صباحًا" },
  { day: "الأربعاء", status: "لا عمل في هذا اليوم" },
  { day: "الخميس", from: "٩:٠٠ صباحًا", to: "٩:٠٠ صباحًا" },
  { day: "الجمعة", status: "لا عمل في هذا اليوم" },
];

export default function DoctorDetailsPage() {
  return (
    <Card className="p-0 shadow-none border-none">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>بيانات الطبيب</CardTitle>
        <Dialog>
          <DialogTrigger>
            <Button variant="green">حجز موعد</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription className="space-y-5 py-5">
                <Input type="time"/>
                <div className="flex justify-end">
                  <Button variant={"ghost"} className="text-primary">الغاء</Button>
                  <Link to="booking"><Button >حفظ</Button></Link>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex flex-wrap gap-4 justify-between border rounded p-4">
          <div className="border-s-2 ps-3 ">
            <p className="text-gray-500">اسم الطبيب</p>
            <p className="font-semibold">{doctorInfo.name}</p>
          </div>
          <div className="border-s-2 ps-3 ">
            <p className="text-gray-500">رقم الجوال</p>
            <p className="font-semibold">{doctorInfo.phone}</p>
          </div >
          <div className="border-s-2 ps-3 ">
            <p className="text-gray-500">التخصص</p>
            <p className="font-semibold">{doctorInfo.specialty}</p>
          </div>
          <div className="border-s-2 ps-3 ">
            <p className="text-gray-500">حهة العمل</p>
            <p className="font-semibold">{doctorInfo.workplace}</p>
          </div>
          <div className="border-s-2 ps-3 ">
            <p className="text-gray-500">تاريخ الإضافة</p>
            <p className="font-semibold">{doctorInfo.addedDate}</p>
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>أوقات العمل</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border p-4 rounded-lg grid md:grid-cols-2 gap-4 text-sm">
          {workSchedule.map((item, index) => (
            <div key={index} className="flex justify-between items-center border shadow-inner p-2 rounded bg--300" >
              <span>{item.day}</span>
              {item.status ? (
                <span className="text-red-500">{item.status}</span>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="text-blue-500" /> {item.from} - {item.to}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <Button className="bg-green-700 mt-4 hover:bg-green-800">حجز موعد</Button>
    </Card>
  );
}
