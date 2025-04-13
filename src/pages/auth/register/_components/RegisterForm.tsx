import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  first_name: Yup.string().required("الاسم الأول مطلوب").min(2),
  last_name: Yup.string().required("الاسم الثاني مطلوب").min(2),
  phone: Yup.string().required("رقم الموبايل مطلوب").matches(/^[0-9]+$/, "يجب أن يكون أرقام").min(10),
  otp_code: Yup.string().required("كود التحقق مطلوب").matches(/^[0-9]+$/, "أرقام فقط"),
  user_category: Yup.string().required("الدور مطلوب"),
  password: Yup.string().required("كلمة السر مطلوبة").min(8),
  confirm_password: Yup.string().oneOf([Yup.ref("password")], "كلمة السر غير متطابقة").required("مطلوب"),
});

export default function RegisterForm({ setSteps }: { setSteps: React.Dispatch<React.SetStateAction<number>> }) {
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    phone: localStorage.getItem("otp_phone")?.replace(/^\+/, "") || "0500000000",
    otp_code: "",
    user_category: "transformer_employee",
    password: "",
    confirm_password: "",
  };

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      const response = await api.post("/create_portal_user", values);
      if (response.status === 200) {
        toast.success("تم إنشاء المستخدم بنجاح");
        navigate(-1);
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "حدث خطأ أثناء الحفظ";
      // toast.error(message);
      setErrors({ submit: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }: any) => (
          <Form>
            <Card className="w-full shadow-none">
              <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>إضافة مسؤول جديد</CardTitle>
                <div className="flex gap-3">
                  <Button type="button" onClick={() => setSteps(1)} variant="outline" className="text-red-500">
                    رجوع
                  </Button>
                  <Button type="submit" variant="green" disabled={isSubmitting}>
                    {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                {errors.submit && <div className="col-span-full text-red-500 text-sm">{errors.submit}</div>}

                <div className="col-span-full flex justify-start flex-wrap pb-4 gap-4">
                  <span>الدور</span>
                  <RadioGroup
                    dir="rtl"
                    name="user_category"
                    value={values.user_category}
                    onValueChange={(value) => setFieldValue("user_category", value)}
                    className="flex justify-center flex-wrap flex-col md:flex-row gap-2"
                  >
                    <div className="flex items-center gap-x-2">
                      <RadioGroupItem value="transformer_employee" id="transformers" />
                      <Label htmlFor="transformers">موظف الحجوزات</Label>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <RadioGroupItem value="accounting_employee" id="accounts" />
                      <Label htmlFor="accounts">موظف الحسابات</Label>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin">المسؤول العام</Label>
                    </div>
                  </RadioGroup>
                  {errors.user_category && touched.user_category && (
                    <div className="text-red-500 text-sm">{errors.user_category}</div>
                  )}
                </div>

                <InputLabel
                  label="الاسم الأول"
                  name="first_name"
                  required
                  placeholder="الاسم الأول"
                  value={values.first_name}
                  onChange={handleChange}
                  error={touched.first_name && errors.first_name}
                />
                <InputLabel
                  label="الاسم الثاني"
                  name="last_name"
                  required
                  placeholder="الاسم الثاني"
                  value={values.last_name}
                  onChange={handleChange}
                  error={touched.last_name && errors.last_name}
                />
                <InputLabel
                  label="رقم الموبايل"
                  name="phone"
                  required
                  readOnly
                  className="[&>*]:!text-gray-600 [&>*]:cursor-not-allowed"
                  value={values.phone}
                  placeholder="+96650000000"
                  onChange={handleChange}
                  error={touched.phone && errors.phone}
                />
                <InputLabel
                  label="كود التحقق"
                  name="otp_code"
                  required
                  placeholder="كود التحقق"
                  value={values.otp_code}
                  onChange={handleChange}
                  error={touched.otp_code && errors.otp_code}
                />
                <InputLabel
                  label="كلمة السر"
                  name="password"
                  type="password"
                  required
                  placeholder="كلمة السر"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && errors.password}
                />
                <InputLabel
                  label="تأكيد كلمة السر"
                  name="confirm_password"
                  type="password"
                  required
                  placeholder="تأكيد كلمة السر"
                  value={values.confirm_password}
                  onChange={handleChange}
                  error={touched.confirm_password && errors.confirm_password}
                />
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
