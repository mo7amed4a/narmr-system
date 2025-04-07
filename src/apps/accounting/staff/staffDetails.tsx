// import CardBorderStart from "@/components/global/CardBorderStart";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import BondsHistory from "./components/BondsHistory";
// import { useState } from "react";
// import BondAddInStaff from "./components/bond-add";
// import { useParams } from "react-router-dom";
// import useFetch from "@/hooks/use-fetch";
// import { useUser } from "@/hooks/auth.context";
// import Loading from "@/components/api/loading";
// import NotFoundPage from "@/pages/NotFoundPage";

// export default function StaffDetails() {
//   const { id } = useParams(); // Get employee_id from URL
//   const [refresh] = useState(false);
//   const [open, setOpen] = useState(false);
//   const {user} = useUser()
//   // Fetch employee data
//   const { data, loading, error } = useFetch(`/employee/${id}`, refresh);
//   const employee = data?.data || {};


//   // Format create_date to "20 Dec, 2021, 02:30 AM" style
//   const formatDate = (dateString: string) => {
//     if (!dateString) return "غير متوفر";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("ar-EG", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     }) + ", " + date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
//   };

//   if (loading) return <Loading />;
//   if (error) return <div>Error: {error}</div>;

//   return employee?.name ? (
//     <Card>
//       <CardHeader>
//         <Card className="border">
//           <CardHeader className="flex justify-between flex-row items-center">
//             <CardTitle>بيانات الموظف</CardTitle>
//             <Button variant="outline">تعديل</Button>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <CardBorderStart title="اسم الموظف" value={employee.name || "غير متوفر"} />
//             <div className="flex flex-wrap justify-between gap-4">
//               <CardBorderStart title="الدور الوظيفي" value={employee.role || "غير متوفر"} />
//               <CardBorderStart title="رقم الموبايل" value={employee.phone || "غير متوفر"} />
//               <CardBorderStart title="الراتب" value={`${employee.salary || "0"} $`} />
//               <CardBorderStart title="تاريخ الاضافة" value={formatDate(employee.create_date)} />
//             </div>
//           </CardContent>
//         </Card>
//       </CardHeader>
//         {user.user_category === "admin" && <CardContent>
//             <Card className="border">
//             <CardHeader className="flex justify-between flex-row items-center">
//                 <CardTitle>اضافة سند</CardTitle>
//                 <div className="flex gap-3">
//                 <Button variant="ghost" className="text-red-500">استرجاع</Button>
//                 <Button onClick={() => setOpen(true)} variant="green">اضافة سند</Button>
//                 </div>
//             </CardHeader>
//             <BondAddInStaff open={open} />
//             </Card>
//             <BondsHistory />
//         </CardContent>}
//     </Card>
//   ): <NotFoundPage />;
// }



import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { specializations } from "@/components/selects/SpecializationSelect";

export default function DoctorDetailsPage() {
  const { id } = useParams(); // Get doctor ID from URL params
  const [refresh] = useState(false);
  const { data:res, loading, error } = useFetch(`/employees/work/schedule`, refresh);
  const data = res?.data?.find((e:any) => e.id === parseInt(id as string))
  // // Map English days to Arabic
  // const dayMap: { [key: string]: string } = {
  //   Monday: "الإثنين",
  //   Tuesday: "الثلاثاء",
  //   Wednesday: "الأربعاء",
  //   Thursday: "الخميس",
  //   Friday: "الجمعة",
  //   Saturday: "السبت",
  //   Sunday: "الأحد",
  // };;
  

  // Prepare doctor info from API data
  const doctorInfo = data
    ? {
        name: data.name,
        phone: data.phone,
        specialization_input: data.specialization_input,
        workplace: data.branch_names.join(", "),
        addedDate: new Date(data.create_date).toLocaleDateString("ar-EG"),
      }
    : null;

  // Prepare work schedule from API data
  const workSchedule = data
    ? [
        { day: "السبت", enDay: "Saturday" },
        { day: "الأحد", enDay: "Sunday" },
        { day: "الإثنين", enDay: "Monday" },
        { day: "الثلاثاء", enDay: "Tuesday" },
        { day: "الأربعاء", enDay: "Wednesday" },
        { day: "الخميس", enDay: "Thursday" },
        { day: "الجمعة", enDay: "Friday" },
      ].map((dayItem) => {
        const schedule = data.available_schedule.find(
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
  if (!doctorInfo) return <div>لا توجد بيانات للموظف</div>;

  return (
    <Card className="p-0 shadow-none border-none">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>بيانات الموظف</CardTitle>
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
          {/* <Link to={`booking`}>
            <Button>حجز موعد</Button>
          </Link> */}
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex flex-wrap gap-4 justify-between border rounded p-4">
          <div className="border-s-2 ps-3">
            <p className="text-gray-500">اسم الموظف</p>
            <p className="font-semibold">{doctorInfo.name}</p>
          </div>
          <div className="border-s-2 ps-3">
            <p className="text-gray-500">رقم الموبايل</p>
            <p className="font-semibold">{doctorInfo.phone}</p>
          </div>
          <div className="border-s-2 ps-3">
            <p className="text-gray-500">التخصص</p>
            {/* @ts-ignore */}
            <p className="font-semibold">{specializations.find((e:any) => e.key === doctorInfo.specialization_input as any).name}</p>
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
