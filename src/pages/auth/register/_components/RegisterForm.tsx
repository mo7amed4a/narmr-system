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
  first_name: Yup.string()
    .required("الاسم الأول مطلوب")
    .min(2, "الاسم الأول يجب أن يكون على الأقل 2 أحرف"),
  last_name: Yup.string()
    .required("الاسم الثاني مطلوب")
    .min(2, "الاسم الثاني يجب أن يكون على الأقل 2 أحرف"),
  phone: Yup.string()
    .required("رقم الجوال مطلوب")
    .matches(/^[0-9]+$/, "رقم الجوال يجب أن يحتوي على أرقام فقط")
    .min(10, "رقم الجوال يجب أن يكون على الأقل 10 أرقام"),
  otp_code: Yup.string()
    .required("كود التحقق مطلوب")
    .matches(/^[0-9]+$/, "كود التحقق يجب أن يحتوي على أرقام فقط"),
  user_category: Yup.string().required("الدور مطلوب"),
  password: Yup.string()
    .required("كلمة السر مطلوبة")
    .min(8, "كلمة السر يجب أن تكون على الأقل 8 أحرف"),
  confirm_password: Yup.string()
    .required("تأكيد كلمة السر مطلوب")
    .oneOf([Yup.ref("password")], "كلمة السر غير متطابقة"),
});

export default function RegisterForm() {
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    phone: localStorage.getItem("otp_phone") || "",
    otp_code: "",
    user_category: "transformer_employee",
    password: "",
    confirm_password: "",
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await api.post("/create_portal_user", {...values,
        phone: values.phone.split("+").join(""),
      });
      if (response.status === 200) {
        toast.success("تم انشاء المستخدم بنجاح");
        navigate(-1);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Form>
            <Card className="w-full shadow-none">
              <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>اضافة مسؤول جديد</CardTitle>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="text-red-500"
                  >
                    الغاء
                  </Button>
                  <Button type="submit" variant="green">
                    حفظ
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div className="col-span-full flex justify-start flex-wrap pb-4 gap-4">
                  <span>الدور</span>
                  <RadioGroup
                    dir="rtl"
                    name="user_category"
                    value={values.user_category}
                    onValueChange={(value) =>
                      setFieldValue("user_category", value)
                    }
                    className="flex justify-center flex-wrap flex-col md:flex-row gap-2"
                  >
                    <div className="flex items-center gap-x-2">
                      <RadioGroupItem
                        value="transformer_employee"
                        id="transformers"
                      />
                      <Label htmlFor="transformers">موظف الحجوزات</Label>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <RadioGroupItem
                        value="accounting_employee"
                        id="accounts"
                      />
                      <Label htmlFor="accounts">موظف الحسابات</Label>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin">المسؤول العام</Label>
                    </div>
                  </RadioGroup>
                  {errors.user_category && touched.user_category && (
                    <div className="text-red-500 text-sm">
                      {errors.user_category}
                    </div>
                  )}
                </div>

                <InputLabel
                  label="الاسم الاول"
                  name="first_name"
                  required
                  placeholder="الاسم الاول"
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
                  label="رقم الجوال"
                  name="phone"
                  required
                  placeholder="+96650000000"
                  value={values.phone}
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
                  required
                  type="password"
                  placeholder="ادخل كلمة السر"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && errors.password}
                />
                <InputLabel
                  label="تأكيد كلمة السر"
                  name="confirm_password"
                  required
                  type="password"
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
