import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SelectCustom from "@/components/ui/selectCustom";
import { SelectItem } from "@/components/ui/select";
import { citiesByCountry, countries } from "@/static/countries";

const validationSchema = Yup.object({
  fullName: Yup.string().required("الاسم بالكامل مطلوب"),
  phoneNumber: Yup.string()
    .required("رقم الموبايل مطلوب")
    .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط")
    .min(10, "رقم الموبايل يجب أن يكون على الأقل 10 أرقام")
    .max(15, "رقم الموبايل يجب أن يكون على الأكثر 15 أرقام"),
  birthDate: Yup.date().required("تاريخ الميلاد مطلوب"),
  city: Yup.string().required("المدينة مطلوبة"),
  country: Yup.string().required("الدولة مطلوبة"),
  clientType: Yup.string().required("نوع العميل مطلوب"),
});

export default function EditClientPage() {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      birthDate: "",
      city: "",
      country: "",
      clientType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.post(`/customer/update/${id}`, {
          name: values.fullName,
          phone: values.phoneNumber,
          birth_date: values.birthDate,
          city: values.city,
          country: values.country,
          gender: values.clientType === "ذكر" ? "male" : "female",
        });

        console.log("Client updated:", response.data);
        toast.success("تم تحديث بيانات العميل بنجاح");
      } catch (error) {
        console.error("Error updating client:", error);
        toast.error("حدث خطأ أثناء تحديث البيانات");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetch customer data when component mounts
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await api.get(`/customer/${id}`);
        const customerData = response.data.data;
        formik.setValues({
          fullName: customerData.name || "",
          phoneNumber: customerData.phone || "",
          birthDate: customerData.birth_date || "",
          city: customerData.city || "",
          country: customerData.country || "",
          clientType: customerData.gender === "male" ? "ذكر" : "أنثى",
        });
      } catch (error) {
        console.error("Error fetching customer data:", error);
        toast.error("حدث خطأ أثناء جلب بيانات العميل");
      }
    };

    if (id) fetchCustomerData();
  }, [id]);

  // Get cities based on selected country
  const availableCities = formik.values.country
    ? citiesByCountry[formik.values.country] || []
    : [];

  return (
    <form onSubmit={formik.handleSubmit} dir="rtl">
      <Card className="w-full flex flex-col gap-4 shadow-none border-none">
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>تعديل بيانات العميل</CardTitle>
            <Button
              type="submit"
              className="bg-green-700 md:px-7 hover:bg-green-800"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "جاري التحديث..." : "تحديث"}
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
                label="رقم الموبايل"
                required
                placeholder="أدخل رقم الموبايلك"
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
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-start">
              <div>
                <SelectCustom
                  label="الدولة"
                  required
                  value={formik.values.country}
                  onValueChange={(value:any
                                      ) => {
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
          </CardContent>
        </Card>
      </Card>
    </form>
  );
}