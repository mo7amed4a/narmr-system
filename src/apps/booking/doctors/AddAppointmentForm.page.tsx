"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function AddAppointmentFormPage() {
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 7
    return `${hour.toString().padStart(2, "0")}:00`
  })

  const weekDays = [
    { name: "السبت", date: "4 يناير" },
    { name: "الأحد", date: "5 يناير" },
    { name: "الإثنين", date: "6 يناير" },
    { name: "الثلاثاء", date: "7 يناير" },
    { name: "الأربعاء", date: "8 يناير" },
    { name: "الخميس", date: "9 يناير" },
    { name: "الجمعة", date: "10 يناير" },
  ]

  const reservedSlots = [
    { day: "السبت", time: "08:00" },
    { day: "السبت", time: "13:00" },
    { day: "الأحد", time: "09:00" },
    { day: "الثلاثاء", time: "09:00" },
  ]

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold">حجز جديد د. عبدالرحمن السلطان</h2>
        <div className="gap-x-2">
          <Button variant="green">حفظ</Button>
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="ريم فهد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reem">ريم فهد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <div className="gap-4 flex items-center ">
            <Label>نوع الحجز</Label>
            <RadioGroup defaultValue="new" className="flex gap-4">
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
            <RadioGroup defaultValue="examination" className="flex flex-wrap gap-4">
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
                    {weekDays.map((day) => (
                      <div
                        key={`${day.name}-${time}`}
                        className={cn(
                          "border-t bg-white p-2 text-center",
                          reservedSlots.some((slot) => slot.day === day.name && slot.time === time) && "bg-orange-50",
                        )}
                      >
                        {reservedSlots.some((slot) => slot.day === day.name && slot.time === time) && (
                          <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700">
                            محجوز
                          </span>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

