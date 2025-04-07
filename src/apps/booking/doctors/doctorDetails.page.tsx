import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";

export default function DoctorDetailsPage() {
  const { id } = useParams(); // Get doctor ID from URL params
  const [refresh] = useState(false);
  const { data, loading, error } = useFetch(`/doctor/${id}`, refresh);

  // // Map English days to Arabic
  // const dayMap: { [key: string]: string } = {
  //   Monday: "الإثنين",
  //   Tuesday: "الثلاثاء",
  //   Wednesday: "الأربعاء",
  //   Thursday: "الخميس",
  //   Friday: "الجمعة",
  //   Saturday: "السبت",
  //   Sunday: "الأحد",
  // };

  // Prepare doctor info from API data
  const doctorInfo = data?.data
    ? {
        name: data.data.name,
        phone: data.data.phone,
        specialty: data.data.specialization,
        workplace: data.data.branch_names.join(", "),
        addedDate: new Date(data.data.create_date).toLocaleDateString("ar-EG"),
      }
    : null;

  // Prepare work schedule from API data
  const workSchedule = data?.data
    ? [
        { day: "السبت", enDay: "Saturday" },
        { day: "الأحد", enDay: "Sunday" },
        { day: "الإثنين", enDay: "Monday" },
        { day: "الثلاثاء", enDay: "Tuesday" },
        { day: "الأربعاء", enDay: "Wednesday" },
        { day: "الخميس", enDay: "Thursday" },
        { day: "الجمعة", enDay: "Friday" },
      ].map((dayItem) => {
        const schedule = data.data.available_schedule.find(
          (s: { day: string }) => s.day === dayItem.enDay
        );
        return {
          day: dayItem.day,
          ...(schedule
            ? { from: schedule.from, to: schedule.to }
            : { status: "لا عمل في هذا اليوم" }),
        };
      })
    : [];

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>حدث خطأ: {error.message}</div>;
  if (!doctorInfo) return <div>لا توجد بيانات للطبيب</div>;

  return (
    <Card className="p-0 shadow-none border-none">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>بيانات الطبيب</CardTitle>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button variant="green">حجز موعد</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>حجز موعد جديد</DialogTitle>
              <DialogDescription className="space-y-5 py-5">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1"></label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر اليوم" />
                      </SelectTrigger>
                      <SelectContent>
                        {workSchedule
                          .filter((item: any) => !item.status)
                          .map((item: any, index) => (
                            <SelectItem key={index} value={item.day}>
                              {item.day} ({item.from} - {item.to})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" className="text-primary">
                    إلغاء
                  </Button>
                  <Link to={`booking`}>
                    <Button>حفظ</Button>
                  </Link>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
          <Link to={`booking`}>
            <Button>حجز موعد</Button>
          </Link>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex flex-wrap gap-4 justify-between border rounded p-4">
          <div className="border-s-2 ps-3">
            <p className="text-gray-500">اسم الطبيب</p>
            <p className="font-semibold">{doctorInfo.name}</p>
          </div>
          <div className="border-s-2 ps-3">
            <p className="text-gray-500">رقم الموبايل</p>
            <p className="font-semibold">{doctorInfo.phone}</p>
          </div>
          <div className="border-s-2 ps-3">
            <p className="text-gray-500">التخصص</p>
            <p className="font-semibold">{doctorInfo.specialty}</p>
          </div>
          <div className="border-s-2 ps-3">
            <p className="text-gray-500">جهة العمل</p>
            <p className="font-semibold">{doctorInfo.workplace}</p>
          </div>
          <div className="border-s-2 ps-3">
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
          {workSchedule.map((item: any, index) => (
            <div
              key={index}
              className="flex justify-between items-center border shadow-inner p-2 rounded bg-gray-50"
            >
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
    </Card>
  );
}
