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
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface Schedule {
  day: string;
  from: string;
  to: string;
}

interface FormValues {
  name: string;
  phone: string;
  role: "doctor" | "employee" | "";
  branch_id: number;
  specialization_input: string;
  available_schedule: Schedule[];
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "الاسم يجب أن يكون أكثر من حرفين")
    .max(50, "الاسم طويل جداً")
    .required("اسم الموظف مطلوب"),
  phone: Yup.string()
    .matches(/^964[0-9]{9}$/, "رقم الموبايل يجب أن يبدأ بـ 964 ويكون 12 رقم")
    .required("رقم الموبايل مطلوب"),
  role: Yup.string()
    .oneOf(["doctor", "employee"], "يجب اختيار نوع الموظف")
    .required("نوع الموظف مطلوب"),
  branch_id: Yup.number()
    .min(1, "يجب اختيار جهة العمل")
    .required("جهة العمل مطلوبة"),
  specialization_input: Yup.string().when("role", {
    is: "doctor",
    then: (schema) => schema.required("التخصص مطلوب للطبيب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  available_schedule: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required("اليوم مطلوب"),
      from: Yup.string().required("وقت البداية مطلوب"),
      to: Yup.string()
        .required("وقت النهاية مطلوب")
        // .test("is-after-from", "وقت النهاية يجب أن يكون بعد وقت البداية", function (value) {
        //   const { from } = this.parent;
        //   return !from || !value || value > from;
        // }),
    })
  ),
});

export default function StaffAddPage() {
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
    role: "",
    branch_id: 0,
    specialization_input: "",
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
              ...values,
              available_schedule: formattedSchedule,
              specialization_input: values.role === "doctor" ? values.specialization_input : undefined,
            };

            await api.post("/employee/work/add", payload);
            toast.success("تم إضافة الموظف بنجاح");
            navigate(-1);
            resetForm();
          } catch (error) {
            console.error("Error adding employee:", error);
            toast.error("حدث خطأ أثناء إضافة الموظف");
          } finally {
            setSubmitting(false);
          }
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, isSubmitting, setFieldValue, errors, touched }) => (
          <Form>
            <CardHeader className="flex justify-between flex-row items-center border-b pb-4">
              <CardTitle>إضافة موظف جديد</CardTitle>
              <div className="flex gap-2">
                <Button variant="green" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                </Button>
                <Button variant="ghost" className="text-primary" type="button">
                  إلغاء
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold">بيانات الموظف</h3>
                <div className="space-y-4">
                  <div className="gap-4 flex items-center">
                    <Label>نوع الموظف</Label>
                    <Field name="role">
                      {({ field }: any) => (
                        <RadioGroup
                          {...field}
                          onValueChange={(value: "doctor" | "employee") => setFieldValue("role", value)}
                          value={field.value}
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
                      )}
                    </Field>
                    {touched.role && errors.role && (
                      <div className="text-red-500 text-sm">{errors.role}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>جهة العمل</Label>
                    <BranchSelect
                      value={values.branch_id+""}
                      onValueChange={(value: string) => setFieldValue("branch_id", parseInt(value))}
                    />
                    {touched.branch_id && errors.branch_id && (
                      <div className="text-red-500 text-sm">{errors.branch_id}</div>
                    )}
                  </div>
                </div>
                <h3 className="mb-4 text-lg font-semibold">البيانات الاساسية</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>اسم الموظف</Label>
                    <Field
                      as={Input}
                      name="name"
                      placeholder="أدخل اسم الموظف"
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
                  {values.role === "doctor" && (
                    <div className="space-y-2">
                      <SpecializationSelect
                        value={values.specialization_input}
                        onValueChange={(value: string) => setFieldValue("specialization_input", value)}
                      />
                      {touched.specialization_input && errors.specialization_input && (
                        <div className="text-red-500 text-sm">{errors.specialization_input}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">أوقات العمل</h3>
                <FieldArray name="available_schedule">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.available_schedule.map((_, index) => (
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
                            // @ts-ignore
                              errors.available_schedule?.[index]?.to && (
                                <div className="text-red-500 text-sm">
                            {/* @ts-ignore */}
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