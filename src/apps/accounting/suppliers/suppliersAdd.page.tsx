import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Define form values interface
interface FormValues {
  name: string;
  phone: string;
  company_name: string;
  email: string;
  city: string;
  country: string;
}

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "الاسم يجب أن يكون أكثر من حرفين")
    .max(50, "الاسم طويل جداً")
    .required("اسم المورد مطلوب"),
  phone: Yup.string()
    .matches(/^964[0-9]{9}$/, "رقم الموبايل يجب أن يبدأ بـ 964 ويكون 12 رقم")
    .required("رقم الموبايل مطلوب"),
  company_name: Yup.string()
    .min(2, "اسم الشركة يجب أن يكون أكثر من حرفين")
    .max(100, "اسم الشركة طويل جداً")
    .required("اسم الشركة مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .notRequired(),
  city: Yup.string()
    .min(2, "اسم المدينة يجب أن يكون أكثر من حرفين")
    .required("المدينة مطلوبة"),
  country: Yup.string()
    .min(2, "اسم الدولة يجب أن يكون أكثر من حرفين")
    .required("الدولة مطلوبة"),
});

export default function SuppliersAddPage() {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    name: "",
    phone: "",
    company_name: "",
    email: "",
    city: "",
    country: "",
  };

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const payload = {
              name: values.name,
              phone: values.phone,
              company_name: values.company_name,
              email: values.email || undefined,
              city: values.city,
              country: values.country,
            };

            await api.post("/supplier/add", payload);
            toast.success("تم إضافة المورد بنجاح");
            navigate(-1);
            resetForm();
          } catch (error) {
            console.error("Error adding supplier:", error);
            toast.error("حدث خطأ أثناء إضافة المورد");
          } finally {
            setSubmitting(false);
          }
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, isSubmitting, setFieldValue, errors, touched }) => (
          <Form>
            <Card className="w-full shadow-none p-0">
              <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>إضافة مورد جديد</CardTitle>
                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="text-red-500"
                    disabled={isSubmitting}
                    type="button"
                  >
                    إلغاء
                  </Button>
                  <Button
                    variant="green"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <InputLabel
                  label="اسم المورد"
                  required
                  placeholder="ادخل اسم المورد"
                  value={values.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("name", e.target.value)}
                  error={touched.name && errors.name}
                />
                <InputLabel
                  label="البريد الإلكتروني (اختياري)"
                  placeholder="ادخل البريد الإلكتروني (اختياري)"
                  value={values.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("email", e.target.value)}
                  error={touched.email && errors.email}
                />
                <InputLabel
                  label="رقم الموبايل"
                  required
                  placeholder="964xxxxxxxxx"
                  value={values.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setFieldValue("phone", value);
                  }}
                  maxLength={12}
                  error={touched.phone && errors.phone}
                />
                <InputLabel
                  label="اسم الشركة"
                  required
                  placeholder="ادخل اسم الشركة"
                  value={values.company_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("company_name", e.target.value)}
                  error={touched.company_name && errors.company_name}
                />
                <InputLabel
                  label="المدينة"
                  required
                  placeholder="ادخل المدينة"
                  value={values.city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("city", e.target.value)}
                  error={touched.city && errors.city}
                />
                <InputLabel
                  label="الدولة"
                  required
                  placeholder="العراق"
                  value={values.country}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("country", e.target.value)}
                  error={touched.country && errors.country}
                />
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </Card>
  );
}