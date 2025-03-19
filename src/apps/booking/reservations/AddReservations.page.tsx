import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddReservationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: "",
    branch_id: "",
    doctor_id: "",
    service_id: "",
    reservation_day: "",
    reservation_time: "",
    reservation_type: "new",
    service_type: "consultation"
  });

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const weekDays = [
    { name: "السبت", date: "4 يناير", enName: "Saturday" },
    { name: "الأحد", date: "5 يناير", enName: "Sunday" },
    { name: "الإثنين", date: "6 يناير", enName: "Monday" },
    { name: "الثلاثاء", date: "7 يناير", enName: "Tuesday" },
    { name: "الأربعاء", date: "8 يناير", enName: "Wednesday" },
    { name: "الخميس", date: "9 يناير", enName: "Thursday" },
    { name: "الجمعة", date: "10 يناير", enName: "Friday" },
  ];

  const reservedSlots = [
    { day: "السبت", time: "08:00" },
    { day: "السبت", time: "13:00" },
    { day: "الأحد", time: "09:00" },
    { day: "الثلاثاء", time: "09:00" },
  ];

  const handleSubmit = async () => {
    if (!formData.customer_id || !formData.branch_id || !formData.doctor_id || 
        !formData.service_id || !formData.reservation_day || !formData.reservation_time) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert time to AM/PM format
      const [hour, minute] = formData.reservation_time.split(":");
      const hourNum = parseInt(hour);
      const period = hourNum >= 12 ? "PM" : "AM";
      const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum;
      const formattedTime = `${formattedHour.toString().padStart(2, "0")}:${minute} ${period}`;

      const payload = {
        customer_id: parseInt(formData.customer_id),
        branch_id: parseInt(formData.branch_id),
        doctor_id: parseInt(formData.doctor_id),
        service_id: parseInt(formData.service_id),
        reservation_day: formData.reservation_day,
        reservation_time: formattedTime,
        reservation_type: formData.reservation_type,
        service_type: formData.service_type
      };

      await api.post("/reservation/add", payload);
      toast.success("تم إضافة الحجز بنجاح");
      // Reset form
      // setFormData({
      //   customer_id: "",
      //   branch_id: "",
      //   doctor_id: "",
      //   service_id: "",
      //   reservation_day: "",
      //   reservation_time: "",
      //   reservation_type: "new",
      //   service_type: "consultation"
      // });
    } catch (error) {
      console.error("Error adding reservation:", error);
      // toast.error("حدث خطأ أثناء إضافة الحجز");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSlotClick = (day: string, time: string) => {
    if (!reservedSlots.some(slot => slot.day === day && slot.time === time)) {
      setFormData({
        ...formData,
        reservation_day: weekDays.find(d => d.name === day)?.enName || "",
        reservation_time: time
      });
    }
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold">حجز جديد</h2>
        <div className="gap-x-2 flex">
          <Button 
            variant="green" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <Button variant="ghost" className="text-primary">
            إلغاء
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">بيانات الحجز</h3>
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>اختر العميل</Label>
              <Select onValueChange={(value) => setFormData({...formData, customer_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر العميل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">ريم فهد</SelectItem>
                  {/* Add more customers as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>اختر الفرع</Label>
              <Select onValueChange={(value) => setFormData({...formData, branch_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">مركز المنصور</SelectItem>
                  {/* Add more branches as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>اختر التخصص</Label>
              <Select onValueChange={(value) => setFormData({...formData, service_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">جلدية</SelectItem>
                  {/* Add more services as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>اختر الطبيب</Label>
              <Select onValueChange={(value) => setFormData({...formData, doctor_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الطبيب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">د / عبد الرحمن وجيه</SelectItem>
                  {/* Add more doctors as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <div className="gap-4 flex items-center">
            <Label>نوع الحجز</Label>
            <RadioGroup 
              value={formData.reservation_type}
              onValueChange={(value) => setFormData({...formData, reservation_type: value})}
              className="flex gap-4"
            >
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">حجز جديد</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="followup" id="followup" />
                <Label htmlFor="followup">متابعة</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="gap-4 flex items-center">
            <Label>نوع الخدمة</Label>
            <RadioGroup 
              value={formData.service_type}
              onValueChange={(value) => setFormData({...formData, service_type: value})}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="consultation" id="consultation" />
                <Label htmlFor="consultation">استشارة</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="examination" id="examination" />
                <Label htmlFor="examination">فحص البشرة</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="surgery" id="surgery" />
                <Label htmlFor="surgery">جراحة تجميلية</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="skin" id="skin" />
                <Label htmlFor="skin">كشف جلدية</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="pigmentation" id="pigmentation" />
                <Label htmlFor="pigmentation">معالجة التصبغات</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">الوقت والتاريخ</h3>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-px bg-gray-200">
                <div className="bg-gray-50 p-2 text-center font-medium">الوقت</div>
                {weekDays.map((day) => (
                  <div key={day.name} className="space-y-1 bg-gray-50 p-2 text-center">
                    <div className="font-medium">{day.name}</div>
                    <div className="text-sm text-gray-500">{day.date}</div>
                  </div>
                ))}
                {timeSlots.map((time) => (
                  <React.Fragment key={time}>
                    <div className="border-t bg-white p-2 text-center">{time}</div>
                    {weekDays.map((day) => {
                      const isReserved = reservedSlots.some(
                        (slot) => slot.day === day.name && slot.time === time
                      );
                      const isSelected = formData.reservation_day === day.enName && 
                                       formData.reservation_time === time;
                      return (
                        <div
                          key={`${day.name}-${time}`}
                          className={cn(
                            "border-t bg-white p-2 text-center cursor-pointer",
                            isReserved && "bg-orange-50 cursor-not-allowed",
                            isSelected && "bg-green-100"
                          )}
                          onClick={() => !isReserved && handleSlotClick(day.name, time)}
                        >
                          {isReserved && (
                            <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700">
                              محجوز
                            </span>
                          )}
                          {isSelected && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                              محدد
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}