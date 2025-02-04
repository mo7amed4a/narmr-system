import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

const validationSchema = Yup.object({
  fullName: Yup.string().required('الاسم بالكامل مطلوب'),
  phoneNumber: Yup.string()
    .required('رقم الجوال مطلوب')
    .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط")
    .min(10, 'رقم الجوال يجب أن يكون على الأقل 10 أرقام')
    .max(15, 'رقم الجوال يجب أن يكون على الأكثر 15 أرقام'),
  birthDate: Yup.date().required('تاريخ الميلاد مطلوب'),
  city: Yup.string().required('المدينة مطلوبة'),
  bloodType: Yup.string(),
  country: Yup.string().required('الدولة مطلوبة'),
  address: Yup.string(),
  clientType: Yup.string().required('نوع العميل مطلوب'),
});

export default function EditClientPage() {
  const initialValues = {
    fullName: 'محمد',
    phoneNumber: '01212154949',
    birthDate: '2000-01-01',
    city: 'المنيا',
    country: 'مصر',
    address: 'ملوي',
    bloodType: 'B+',
    clientType: 'ذكر',
  }
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      birthDate: '',
      city: '',
      country: '',
      address: '',
      bloodType: '',
      clientType: 'ذكر',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form data', values);
      toast.success('تم تحديث بيانات العميل بنجاح');
    },
  });

  useEffect(() => {
    formik.setValues(initialValues)
  }, [])
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>تعديل بيانات العميل</CardTitle>
            <Button 
              type="submit"
              className="bg-green-700 md:px-7 hover:bg-green-800" 
            >
              حفظ
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 text-right">
            <CardTitle>
              <span>المعلومات الاساسية </span>
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
              placeholder={"أدخل أسم العميل بالكامل"} 
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && formik.errors.fullName}
            />
            <div className="grid md:grid-cols-3 gap-4 text-start">
              <InputLabel 
                label="رقم الجوال" 
                required 
                placeholder="أدخل رقم جوالك" 
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
                label="فصيلة الدم (إختياري)" 
                placeholder="فصيلة الدم" 
                type="tel"
                name="bloodType"
                value={formik.values.bloodType}
                onChange={formik.handleChange}
                error={formik.touched.bloodType && formik.errors.bloodType}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-start">
              <InputLabel 
                label="المدينة" 
                required 
                placeholder="بغداد" 
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && formik.errors.city}
              />
              <InputLabel 
                label="الدولة" 
                required 
                placeholder="العراق" 
                type="text"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && formik.errors.country}
              />
            </div>
            <InputLabel 
              label="عنوان المنزل (أختياري)" 
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
