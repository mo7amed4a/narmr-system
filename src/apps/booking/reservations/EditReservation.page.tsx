import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import CustomerSelect from "@/components/selects/CustomerSelect";
import ServiceTypeSelect from "@/components/selects/ServicesTypeSelect";
import TimeSlotSelector, { days } from "@/components/Appointment/TimeSlotSelector";
import DoctorSelect from "@/components/selects/DoctorSelect";
import BranchSelect from "@/components/selects/BranchSelect";
import ServiceSelect from "@/components/selects/ServiceSelect";
import useFetch from "@/hooks/use-fetch";
import Loading from "@/components/api/loading";
import { Doctor } from "../doctors/doctors.page";

export default function EditReservationPage() {
  const { id: reservation_code } = useParams(); // جلب كود الحجز من الـ URL

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    reservation_code: reservation_code || "",
    customer_id: 0,
    branch_id: 0,
    doctor_id: 0,
    service_id: 0,
    reservation_day: "",
    reservation_time: "",
    reservation_date: "",
    status: "confirmed",
    reservation_type: "new",
    service_type: "consultation",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // جلب بيانات الحجز
  const { data, loading, error } = useFetch(`/reservation/details?reservation_code=${reservation_code}`);

  const { data: doctorData, loading: doctorLoading } = useFetch(
    formData.doctor_id ? `/doctor/${formData.doctor_id}` : "/doctor/not-found"
  );

  // تحويل الوقت لصيغة 24 ساعة
  const convertTo24Hour = (time: string) => {
    if (!time) return "";
    const [hourMinute, period] = time.split(" ");
    let [hour, minute] = hourMinute.split(":");
    let hourNum = parseInt(hour);
    if (period === "PM" && hourNum !== 12) hourNum += 12;
    if (period === "AM" && hourNum === 12) hourNum = 0;
    return `${hourNum.toString().padStart(2, "0")}:${minute}`;
  };

  // تحويل الوقت لصيغة 12 ساعة مع AM/PM
  const formatTimeTo12Hour = (time: string): string => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  // استخراج اليوم والوقت من reservation_date
  const parseReservationDate = (date: string) => {
    if (!date) return { day: "", time: "" };
    const [datePart, timePart] = date.split(" ");
    const reservationDate = new Date(datePart);
    const dayName = reservationDate.toLocaleString("en-US", { weekday: "long" });
    return { day: dayName, time: timePart ? timePart.slice(0, 5) : "" }; // "HH:MM"
  };

  // تعبئة formData و doctor لما البيانات تتحمل
  useEffect(() => {
    if (data?.data) {
      const reservation = data.data;
      setFormData({
        reservation_code: reservation.reservation_code || reservation_code,
        customer_id: reservation.customer_id || 0,
        branch_id: reservation.branch_id || 0,
        doctor_id: reservation.doctor_id || 0,
        service_id: reservation.service_id || 0,
        reservation_day: days[new Date(reservation.reservation_date).getDay()], // YYYY-MM-DD HH:MM:SS
        reservation_time: reservation.reservation_time || "",
        reservation_date: reservation.reservation_date || "", // YYYY-MM-DD HH:MM:SS
        status: reservation.status || "confirmed",
        reservation_type: reservation.reservation_type || "new",
        service_type: reservation.service_type || "consultation",
      });
    }
  }, [data, reservation_code]);

  useEffect(() => {
    if (doctorData?.data) {
      // @ts-ignore
      setDoctor({
        id: doctorData.data.id,
        available_schedule: doctorData.data.available_schedule || [],
      });
    }
  }, [doctorData]);

  const { day: selectedDay, time: selectedTime } = parseReservationDate(formData.reservation_date);

  const timeSlots = doctor?.available_schedule
    ? Array.from(new Set(doctor.available_schedule.map((s: any) => convertTo24Hour(s.from))))
    : [];

  const reservedSlots = [
    { day: "السبت", time: "08:00" },
    { day: "السبت", time: "13:00" },
    { day: "الأحد", time: "09:00" },
    { day: "الثلاثاء", time: "09:00" },
  ];

  const handleSlotSelect = (day: string, time: string, fullDate: string) => {
    console.log(day, time);
    setFormData({
      ...formData,
      reservation_day: days[new Date(fullDate).getDay()],
      reservation_time: formatTimeTo12Hour(time), // بنستخدم التاريخ الكامل هنا
      reservation_date: fullDate, // التاريخ الكامل YYYY-MM-DD HH:MM:SS
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.customer_id ||
      !formData.branch_id ||
      !formData.doctor_id ||
      !formData.service_id ||
      !formData.reservation_date
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        reservation_code: formData.reservation_code,
        customer_id: formData.customer_id,
        branch_id: formData.branch_id,
        doctor_id: formData.doctor_id,
        service_id: formData.service_id,
        reservation_day: formData.reservation_day, // YYYY-MM-DD HH:MM:SS
        reservation_time: formData.reservation_time,
        reservation_date: formData.reservation_date, // YYYY-MM-DD HH:MM:SS
        status: formData.status,
        reservation_type: formData.reservation_type,
        service_type: formData.service_type,
      };
      await api.post("/reservation/update", payload); // أو PUT لو API بيدعم
      toast.success("تم تعديل الحجز بنجاح");
    } catch (error) {
      console.error("Error updating reservation:", error);
      toast.error("حدث خطأ أثناء تعديل الحجز");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || doctorLoading) return <Loading />;
  if (error) return <div>خطأ: {error.message}</div>;

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <h2 className="text-lg md:text-xl font-bold">تعديل الحجز - {formData.reservation_code}</h2>
        <div className="gap-x-2 flex">
          <Button variant="green" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
          </Button>
          <Button variant="ghost" className="text-primary">
            إلغاء
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">بيانات الحجز</h3>
          <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
            <CustomerSelect
              value={formData.customer_id.toString()}
              onValueChange={(value) => setFormData({ ...formData, customer_id: parseInt(value) })}
            />
            <BranchSelect
              value={formData.branch_id.toString()}
              onValueChange={(value) => setFormData({ ...formData, branch_id: parseInt(value) })}
            />
            <ServiceSelect
              value={formData.service_id.toString()}
              onValueChange={(value) => setFormData({ ...formData, service_id: parseInt(value) })}
            />
            <DoctorSelect
              value={formData.doctor_id.toString()}
              allData
              onValueChange={(value) => {
                if (typeof value === "object") {
                  setDoctor(value);
                  setFormData({ ...formData, doctor_id: value.id });
                }
              }}
            />
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <div className="gap-4 flex items-center">
            <Label>نوع الحجز</Label>
            <RadioGroup
              value={formData.reservation_type}
              onValueChange={(value) => setFormData({ ...formData, reservation_type: value })}
              className="flex gap-4"
            >
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">حجز جديد</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="follow_up" id="follow_up" />
                <Label htmlFor="follow_up">متابعة</Label>
              </div>
            </RadioGroup>
          </div>

          <ServiceTypeSelect
            value={formData.service_type}
            onValueChange={(value) => setFormData({ ...formData, service_type: value })}
          />
        </div>

        <TimeSlotSelector
          timeSlots={timeSlots}
          reservedSlots={reservedSlots}
          availableSchedule={doctor?.available_schedule || []}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          onSlotSelect={handleSlotSelect}
        />
      </CardContent>
    </Card>
  );
}