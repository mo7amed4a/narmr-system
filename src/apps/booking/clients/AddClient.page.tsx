import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { Formik, Form } from "formik"; // Changed to use Formik components
import * as Yup from "yup";
import toast from "react-hot-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import SelectCustom from "@/components/ui/selectCustom";
import { SelectItem } from "@/components/ui/select";
import { citiesByCountry, countries } from "@/static/countries";
import { useNavigate } from "react-router-dom";

// Define interfaces
interface FormValues {
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  city: string;
  country: string;
  address: string;
  bloodType: string;
  clientType: "ذكر" | "أنثى";
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("الاسم بالكامل مطلوب"),
  phoneNumber: Yup.string()
    .required("رقم الموبايل مطلوب")
    .matches(/^964[0-9]{10}$/, "رقم الموبايل يجب أن يبدأ بـ 964 ويكون 13 رقم"),
  birthDate: Yup.date().required("تاريخ الميلاد مطلوب"),
  city: Yup.string().required("المدينة مطلوبة"),
  bloodType: Yup.string(),
  country: Yup.string().required("الدولة مطلوبة"),
  address: Yup.string(),
  clientType: Yup.string()
    .oneOf(["ذكر", "أنثى"], "يجب اختيار نوع العميل")
    .required("نوع العميل مطلوب"),
});

export default function AddClientPage() {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    city: "",
    country: "",
    address: "",
    bloodType: "",
    clientType: "ذكر",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await api.post(`/add_customer`, {
            name: values.fullName,
            phone: values.phoneNumber,
            birth_date: values.birthDate,
            city: values.city,
            country: values.country,
            gender: values.clientType === "ذكر" ? "male" : "female",
            ...(values.address && { address: values.address }),
            ...(values.bloodType && { blood_type: values.bloodType }),
          });

          console.log("Client added:", response.data);
          toast.success("تم الحفظ بنجاح " + values.fullName);
          navigate(-1);
        } catch (error) {
          console.error("Error adding client:", error);
          toast.error("حدث خطأ أثناء الحفظ");
        } finally {
          setSubmitting(false);
        }
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ values, isSubmitting, setFieldValue, errors, touched }) => (
        <Form dir="rtl">
          <Card className="w-full flex flex-col gap-4 shadow-none border-none">
            <Card className="w-full shadow-none">
              <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>إضافة عميل جديد</CardTitle>
                <Button
                  type="submit"
                  className="bg-green-700 md:px-7 hover:bg-green-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4 text-right">
                <CardTitle>
                  <span>المعلومات الأساسية </span>
                  <span className="text-xs text-red-500 -mb-2 font-normal">*مطلوب</span>
                </CardTitle>
                <div>
                  <div className="flex gap-4">
                    <span>نوع العميل </span>
                    <RadioGroup
                      dir="rtl"
                      value={values.clientType}
                      onValueChange={(value: "ذكر" | "أنثى") => setFieldValue("clientType", value)}
                      className="flex justify-center gap-6"
                    >
                      <div className="flex items-center gap-x-2">
                        <RadioGroupItem value="ذكر" id="male" />
                        <Label htmlFor="male">ذكر</Label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <RadioGroupItem value="أنثى" id="female" />
                        <Label htmlFor="female">أنثى</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {touched.clientType && errors.clientType && (
                    <div className="text-red-500 text-xs">{errors.clientType}</div>
                  )}
                </div>
                <InputLabel
                  label="الاسم بالكامل"
                  required
                  placeholder="أدخل اسم العميل بالكامل"
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setFieldValue("fullName", e.target.value)}
                  error={touched.fullName && errors.fullName}
                />
                <div className="grid md:grid-cols-3 gap-4 text-start">
                  <InputLabel
                    label="الموبايل"
                    required
                    placeholder="964xxxxxxxxx"
                    type="tel"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setFieldValue("phoneNumber", value);
                    }}
                    maxLength={13}
                    error={touched.phoneNumber && errors.phoneNumber}
                  />
                  <InputLabel
                    label="تاريخ الميلاد"
                    required
                    placeholder="تاريخ الميلاد"
                    type="date"
                    name="birthDate"
                    value={values.birthDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setFieldValue("birthDate", e.target.value)}
                    error={touched.birthDate && errors.birthDate}
                  />
                  <InputLabel
                    label="فصيلة الدم (اختياري)"
                    placeholder="فصيلة الدم"
                    type="text"
                    name="bloodType"
                    value={values.bloodType}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setFieldValue("bloodType", e.target.value)}
                    error={touched.bloodType && errors.bloodType}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-start">
                  <div>
                    <SelectCustom
                      label="الدولة"
                      required
                      value={values.country}
                      onValueChange={(value: string) => {
                        setFieldValue("country", value);
                        setFieldValue("city", ""); // Reset city when country changes
                      }}
                    >
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectCustom>
                    {touched.country && errors.country && (
                      <div className="text-red-500 text-xs mt-1">{errors.country}</div>
                    )}
                  </div>
                  <div>
                    <SelectCustom
                      label="المدينة"
                      required
                      value={values.city}
                      onValueChange={(value: string) => setFieldValue("city", value)}
                      disabled={!values.country}
                    >
                      {(citiesByCountry[values.country] || []).map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectCustom>
                    {touched.city && errors.city && (
                      <div className="text-red-500 text-xs mt-1">{errors.city}</div>
                    )}
                  </div>
                </div>
                <InputLabel
                  label="عنوان المنزل (اختياري)"
                  placeholder="عنوان العميل"
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setFieldValue("address", e.target.value)}
                  error={touched.address && errors.address}
                />
              </CardContent>
            </Card>
          </Card>
        </Form>
      )}
    </Formik>
  );
}