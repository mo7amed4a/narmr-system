import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import SpecializationSelect from "@/components/selects/SpecializationSelect";
import BranchSelect from "@/components/selects/BranchSelect";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

// Define interfaces
interface Schedule {
  day: string;
  from: string;
  to: string;
}

interface FormValues {
  name: string;
  phone: string;
  specialization: string;
  branch_ids: number[];
  available_schedule: Schedule[];
}

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "الاسم يجب أن يكون أكثر من حرفين")
    .max(50, "الاسم طويل جداً")
    .required("اسم الطبيب مطلوب"),
  phone: Yup.string()
    .matches(/^964[0-9]{9}$/, "رقم الموبايل يجب أن يبدأ بـ 964 ويكون 12 رقم")
    .required("رقم الموبايل مطلوب"),
  specialization: Yup.string().required("التخصص مطلوب"),
  branch_ids: Yup.array()
    .of(Yup.number())
    .min(1, "يجب اختيار فرع واحد على الأقل")
    .required("الفرع مطلوب"),
  available_schedule: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required("اليوم مطلوب"),
      from: Yup.string().required("وقت البداية مطلوب"),
      to: Yup.string()
        .required("وقت النهاية مطلوب")
        .test("is-after-from", "وقت النهاية يجب أن يكون بعد وقت البداية", function (value) {
          const { from } = this.parent;
          return !from || !value || value > from;
        }),
    })
  ),
});

export default function AddDoctorPage() {
  const navigate = useNavigate();
  const daysOfWeek: { value: string; label: string }[] = [
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

  const initialValues: FormValues = {
    name: "",
    phone: "",
    specialization: "",
    branch_ids: [],
    available_schedule: [],
  };

  return (
    <Card className="p-4 shadow-none border-none" dir="rtl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const formattedSchedule = values.available_schedule
              .filter((schedule) => schedule.day && schedule.from && schedule.to)
              .map((schedule) => ({
                day: schedule.day,
                from: formatTimeTo12Hour(schedule.from),
                to: formatTimeTo12Hour(schedule.to),
              }));

            const payload = {
              name: values.name,
              phone: values.phone,
              specialization: values.specialization,
              branch_ids: values.branch_ids,
              available_schedule: formattedSchedule,
            };

            await api.post("/doctor/add", payload);
            toast.success("تم إضافة الطبيب بنجاح");
            resetForm();
            navigate(-1);
          } catch (error) {
            console.error("Error adding doctor:", error);
            toast.error("حدث خطأ أثناء إضافة الطبيب");
          } finally {
            setSubmitting(false);
          }
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, isSubmitting, setFieldValue, errors, touched }: any) => (
          <Form>
            <CardHeader className="flex justify-between flex-row items-center border-b pb-4">
              <CardTitle>إضافة طبيب جديد</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="green"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="text-primary"
                  type="button"
                >
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
                    <Field
                      as={Input}
                      name="name"
                      placeholder="أدخل اسم الطبيب"
                      type="text"
                    />
                    {touched.name && errors.name && (
                      <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الموبايل</Label>
                    <Field
                      as={Input}
                      name="phone"
                      placeholder="964xxxxxxxxx"
                      type="tel"
                      maxLength={12}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setFieldValue("phone", value);
                      }}
                    />
                    {touched.phone && errors.phone && (
                      <div className="text-red-500 text-sm">{errors.phone}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <SpecializationSelect
                      value={values.specialization}
                      onValueChange={(value: string) => setFieldValue("specialization", value)}
                    />
                    {touched.specialization && errors.specialization && (
                      <div className="text-red-500 text-sm">{errors.specialization}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <BranchSelect
                      value={values.branch_ids[0]+""}
                      onValueChange={(value: string) =>
                        setFieldValue("branch_ids", [parseInt(value)])
                      }
                    />
                    {touched.branch_ids && errors.branch_ids && (
                      <div className="text-red-500 text-sm">
                        {typeof errors.branch_ids === "string" ? errors.branch_ids : "الفرع مطلوب"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">أوقات العمل</h3>
                <FieldArray name="available_schedule">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.available_schedule.map((_:any, index:any) => (
                        <div key={index} className="grid gap-4 md:grid-cols-4 items-end">
                          <div className="space-y-2">
                            <Label>اليوم</Label>
                            <Field name={`available_schedule.${index}.day`}>
                              {({ field }: any) => (
                                <Select
                                  {...field}
                                  onValueChange={(value: string) =>
                                    setFieldValue(`available_schedule.${index}.day`, value)
                                  }
                                  value={field.value}
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
                              )}
                            </Field>
                            {touched.available_schedule?.[index]?.day &&
                            // @ts-ignore
                              errors.available_schedule?.[index]?.day && (
                                <div className="text-red-500 text-sm">
                                  {/* @ts-ignore */}
                                  {errors.available_schedule[index].day}
                                </div>
                              )}
                          </div>
                          <div className="space-y-2">
                            <Label>من</Label>
                            <Field
                              as={Input}
                              type="time"
                              name={`available_schedule.${index}.from`}
                            />
                            {touched.available_schedule?.[index]?.from &&
                            // @ts-ignore
                              errors.available_schedule?.[index]?.from && (
                                <div className="text-red-500 text-sm">
                                  {/* @ts-ignore */}
                                  {errors.available_schedule[index].from}
                                </div>
                              )}
                          </div>
                          <div className="space-y-2">
                            <Label>إلى</Label>
                            <Field
                              as={Input}
                              type="time"
                              name={`available_schedule.${index}.to`}
                            />
                            {touched.available_schedule?.[index]?.to &&
                              errors.available_schedule?.[index]?.to && (
                                <div className="text-red-500 text-sm">
                                  {errors.available_schedule[index].to}
                                </div>
                              )}
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => remove(index)}
                            type="button"
                          >
                            حذف
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => push({ day: "", from: "", to: "" })}
                      >
                        إضافة موعد
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>
            </CardContent>
          </Form>
        )}
      </Formik>
    </Card>
  );
}