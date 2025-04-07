import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import SelectCustom from "@/components/ui/selectCustom"; // Your custom select component
import { SelectItem } from "@/components/ui/select"; // Import SelectItem for options
import { citiesByCountry, countries } from "@/static/countries";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  fullName: Yup.string().required("الاسم بالكامل مطلوب"),
  phoneNumber: Yup.string()
    .required("رقم الموبايل مطلوب")
    .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط")
    .min(10, "رقم الموبايل يجب أن يكون على الأقل 10 أرقام")
    .max(15, "رقم الموبايل يجب أن يكون على الأكثر 15 أرقام"),
  birthDate: Yup.date().required("تاريخ الميلاد مطلوب"),
  city: Yup.string().required("المدينة مطلوبة"),
  bloodType: Yup.string(),
  country: Yup.string().required("الدولة مطلوبة"),
  address: Yup.string(),
  clientType: Yup.string().required("نوع العميل مطلوب"),
});



export default function AddClientPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      birthDate: "",
      city: "",
      country: "",
      address: "",
      bloodType: "",
      clientType: "ذكر",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
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
    },
  });

  // Get cities based on selected country
  const availableCities = formik.values.country
    ? citiesByCountry[formik.values.country] || []
    : [];

  return (
    <form onSubmit={formik.handleSubmit} dir="rtl">
      <Card className="w-full flex flex-col gap-4 shadow-none border-none">
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>إضافة عميل جديد</CardTitle>
            <Button
              type="submit"
              className="bg-green-700 md:px-7 hover:bg-green-800"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "جاري الحفظ..." : "حفظ"}
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
                  value={formik.values.clientType}
                  onValueChange={(value) => formik.setFieldValue("clientType", value)}
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
              {formik.touched.clientType && formik.errors.clientType && (
                <div className="text-red-500 text-xs">{formik.errors.clientType}</div>
              )}
            </div>
            <InputLabel
              label="الاسم بالكامل"
              required
              placeholder="أدخل اسم العميل بالكامل"
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && formik.errors.fullName}
            />
            <div className="grid md:grid-cols-3 gap-4 text-start">
              <InputLabel
                label="الموبايل"
                required
                placeholder="أدخل الموبايل"
                type="tel"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
              <InputLabel
                label="تاريخ الميلاد"
                required
                placeholder="تاريخ الميلاد"
                type="date"
                name="birthDate"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                error={formik.touched.birthDate && formik.errors.birthDate}
              />
              <InputLabel
                label="فصيلة الدم (اختياري)"
                placeholder="فصيلة الدم"
                type="text"
                name="bloodType"
                value={formik.values.bloodType}
                onChange={formik.handleChange}
                error={formik.touched.bloodType && formik.errors.bloodType}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-start">
              <div>
                <SelectCustom
                  label="الدولة"
                  required
                  value={formik.values.country}
                  onValueChange={(value:any) => {
                    formik.setFieldValue("country", value);
                    formik.setFieldValue("city", ""); // Reset city when country changes
                  }}
                >
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectCustom>
                {formik.touched.country && formik.errors.country && (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.country}</div>
                )}
              </div>
              <div>
                <SelectCustom
                  label="المدينة"
                  required
                  value={formik.values.city}
                  onValueChange={(value:any) => formik.setFieldValue("city", value)}
                  disabled={!formik.values.country} // Disable if no country selected
                >
                  {availableCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectCustom>
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.city}</div>
                )}
              </div>
            </div>
            <InputLabel
              label="عنوان المنزل (اختياري)"
              placeholder="عنوان العميل"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && formik.errors.address}
            />
          </CardContent>
        </Card>
      </Card>
    </form>
  );
}