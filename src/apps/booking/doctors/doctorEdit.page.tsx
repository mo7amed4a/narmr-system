import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import SpecializationSelect from "@/components/selects/SpecializationSelect";

interface Schedule {
  day: string;
  from: string;
  to: string;
}

export default function DoctorEditPage() {
  const { id } = useParams(); // جلب الـ ID من الـ URL
  const { data, loading, error } = useFetch(`/doctor/${id}`);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialization: "",
    branch_ids: [] as number[],
    available_schedule: [] as Schedule[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daysOfWeek = [
    { value: "Monday", label: "الإثنين" },
    { value: "Tuesday", label: "الثلاثاء" },
    { value: "Wednesday", label: "الأربعاء" },
    { value: "Thursday", label: "الخميس" },
    { value: "Friday", label: "الجمعة" },
    { value: "Saturday", label: "السبت" },
    { value: "Sunday", label: "الأحد" },
  ];

  const branches = [
    { id: 2, name: "نيووو" },
    // Add more branches as needed
  ];

  // تحويل الوقت من 12 ساعة AM/PM لـ 24 ساعة لعرضه في <Input type="time">
  const convertTo24Hour = (time: string): string => {
    const [hourMinute, period] = time.split(" ");
    let [hour, minute] = hourMinute.split(":");
    let hourNum = parseInt(hour);
    if (period === "PM" && hourNum !== 12) hourNum += 12;
    if (period === "AM" && hourNum === 12) hourNum = 0;
    return `${hourNum.toString().padStart(2, "0")}:${minute}`;
  };

  // تعبئة الـ formData ببيانات الدكتور لما تيجي من الـ API
  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name,
        phone: data.data.phone,
        specialization: data.data.specialization,
        branch_ids: data.data.branch_ids,
        available_schedule: data.data.available_schedule.map((schedule: any) => ({
          day: schedule.day,
          from: convertTo24Hour(schedule.from),
          to: convertTo24Hour(schedule.to),
        })),
      });
    }
  }, [data]);

  // دالة تحويل الوقت من 24 ساعة لـ 12 ساعة مع AM/PM للـ API
  const formatTimeTo12Hour = (time: string): string => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  const handleAddSchedule = () => {
    setFormData({
      ...formData,
      available_schedule: [...formData.available_schedule, { day: "", from: "", to: "" }],
    });
  };

  const handleScheduleChange = (index: number, field: keyof Schedule, value: string) => {
    const updatedSchedule = formData.available_schedule.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, available_schedule: updatedSchedule });
  };

  const handleRemoveSchedule = (index: number) => {
    setFormData({
      ...formData,
      available_schedule: formData.available_schedule.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.specialization || formData.branch_ids.length === 0) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedSchedule = formData.available_schedule
        .filter((schedule) => schedule.day && schedule.from && schedule.to)
        .map((schedule) => ({
          day: schedule.day,
          from: formatTimeTo12Hour(schedule.from),
          to: formatTimeTo12Hour(schedule.to),
        }));

      const payload = {
        doctor_id: parseInt(id || "0"),
        name: formData.name,
        phone: formData.phone,
        specialization: formData.specialization,
        branch_ids: formData.branch_ids,
        available_schedule: formattedSchedule,
      };
      await api.post(`/doctor/update`, payload); // افتراض أن الـ API بيستخدم PUT للتعديل
      toast.success("تم تعديل الطبيب بنجاح");
    } catch (error) {
      console.error("Error editing doctor:", error);
      toast.error("حدث خطأ أثناء تعديل الطبيب");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error.message}</div>;

  return (
    <Card className="p-4 shadow-none border-none" dir="rtl">
      <CardHeader className="flex justify-between flex-row items-center border-b pb-4">
        <CardTitle>تعديل طبيب - {formData.name || "جاري التحميل"}</CardTitle>
        <div className="flex gap-2">
          <Button variant="green" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <Button variant="ghost" className="text-primary">
            إلغاء
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold">بيانات الطبيب</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>اسم الطبيب</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم الطبيب"
              />
            </div>
            <div className="space-y-2">
              <Label>رقم الجوال</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="أدخل رقم الجوال"
                type="tel"
              />
            </div>
            <SpecializationSelect
              value={formData.specialization}
              onValueChange={(value) => setFormData({ ...formData, specialization: value })}
            />
            <div className="space-y-2">
              <Label>اختر الفرع</Label>
              <Select
                value={formData.branch_ids[0]?.toString() || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, branch_ids: [parseInt(value)] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">أوقات العمل</h3>
          <div className="space-y-4">
            {formData.available_schedule.map((schedule, index) => (
              <div key={index} className="grid gap-4 md:grid-cols-4 items-end">
                <div className="space-y-2">
                  <Label>اليوم</Label>
                  <Select
                    value={schedule.day}
                    onValueChange={(value) => handleScheduleChange(index, "day", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر اليوم" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>من</Label>
                  <Input
                    type="time"
                    value={schedule.from}
                    onChange={(e) => handleScheduleChange(index, "from", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>إلى</Label>
                  <Input
                    type="time"
                    value={schedule.to}
                    onChange={(e) => handleScheduleChange(index, "to", e.target.value)}
                  />
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveSchedule(index)}
                >
                  حذف
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddSchedule}>
              إضافة موعد
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}