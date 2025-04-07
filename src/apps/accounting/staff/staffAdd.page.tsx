import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import SpecializationSelect from "@/components/selects/SpecializationSelect";
import BranchSelect from "@/components/selects/BranchSelect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Schedule {
  day: string;
  from: string;
  to: string;
}

export default function StaffAddPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "" as "doctor" | "employee" | "",
    branch_id: 0,
    specialization_input: "",
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
    if (!formData.name || !formData.phone || !formData.role || !formData.branch_id) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // Require specialization for doctors only
    if (formData.role === "doctor" && !formData.specialization_input) {
      toast.error("يرجى اختيار التخصص للطبيب");
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
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        branch_id: formData.branch_id,
        specialization_input: formData.role === "doctor" ? formData.specialization_input : undefined,
        available_schedule: formattedSchedule,
      };

      await api.post("/employee/work/add", payload);
      toast.success("تم إضافة الموظف بنجاح");
      setFormData({
        name: "",
        phone: "",
        role: "",
        branch_id: 0,
        specialization_input: "",
        available_schedule: [],
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("حدث خطأ أثناء إضافة الموظف");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-4 shadow-none border-none" dir="rtl">
      <CardHeader className="flex justify-between flex-row items-center border-b pb-4">
        <CardTitle>إضافة موظف جديد</CardTitle>
        <div className="flex gap-2">
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
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold">بيانات الموظف</h3>
          <div className="gird gap-3 pb-4">
            <div className="gap-4 flex items-center">
              <Label>نوع الموظف</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value: "doctor" | "employee") =>
                  setFormData({ ...formData, role: value })
                }
                className="flex gap-4"
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor">دكتور</Label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem value="employee" id="employee" />
                  <Label htmlFor="employee">موظف</Label>
                </div>
              </RadioGroup>
            </div>
              <div className="space-y-2">
                <Label>جهة  العمل</Label>
                <BranchSelect
                  value={formData.branch_id as any}
                  onValueChange={(value) =>
                    setFormData({ ...formData, branch_id: parseInt(value) })
                  }
                />
              </div>
          </div>
          <h3 className="mb-4 text-lg font-semibold">البيانات الاساسية</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>اسم الموظف</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم الموظف"
              />
            </div>
            <div className="space-y-2">
              <Label>رقم الموبايل</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="أدخل رقم الموبايل"
                type="tel"
              />
            </div>
            {formData.role === "doctor" && (
              <div className="space-y-2">
                <SpecializationSelect
                  value={formData.specialization_input}
                  onValueChange={(value) =>
                    setFormData({ ...formData, specialization_input: value })
                  }
                />
              </div>
            )}
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