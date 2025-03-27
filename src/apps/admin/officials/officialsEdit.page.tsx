import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { useParams } from "react-router-dom";
import SelectCustom from "@/components/ui/selectCustom";
import { SelectItem } from "@/components/ui/select";

const validationSchema = Yup.object({
  name: Yup.string().required("الاسم بالكامل مطلوب"),
  phone: Yup.string()
    .required("رقم الجوال مطلوب")
    .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط")
    .min(10, "رقم الجوال يجب أن يكون على الأقل 10 أرقام")
    .max(15, "رقم الجوال يجب أن يكون على الأكثر 15 أرقام"),
  user_category: Yup.string().required("فئة المستخدم مطلوبة"),
});

// User category options (adjust based on your app's categories)
const userCategories = [
  { value: "admin", label: "مسؤول عام" },
  { value: "accounting_employee", label: "موظف حسابات" },
  { value: "transformer_employee", label: "موظف حجوزات" }, // Added based on your data
];

export default function EditAdminPage() {
  const { id } = useParams(); // Assuming the route param is still called 'id'
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      user_category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.post(`/user/update/${id}`, {
          name: values.name,
          phone: values.phone,
          user_category: values.user_category,
        });

        console.log("User updated:", response.data);
        toast.success("تم تحديث بيانات المستخدم بنجاح");
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("حدث خطأ أثناء تحديث البيانات");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user_info/${id}`); // Updated endpoint
        const userData = response.data.data;
        formik.setValues({
          name: userData.name || "",
          phone: userData.phone || "",
          user_category: userData.user_category || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  if (loading) return <div>جاري التحميل...</div>;

  return  (
    <form onSubmit={formik.handleSubmit} dir="rtl">
      <Card className="w-full flex flex-col gap-4 shadow-none border-none">
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>تعديل بيانات المستخدم</CardTitle>
            {formik.values.name && <Button
              type="submit"
              className="bg-green-700 md:px-7 hover:bg-green-800"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "جاري التحديث..." : "تحديث"}
            </Button>}
          </CardHeader>
          {formik.values.name && <CardContent className="grid gap-4 text-right">
            <CardTitle>
              <span>المعلومات الأساسية </span>
              <span className="text-xs text-red-500 -mb-2 font-normal">*مطلوب</span>
            </CardTitle>
            <InputLabel
              label="الاسم بالكامل"
              required
              placeholder="أدخل اسم المستخدم بالكامل"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            />
            <div className="grid md:grid-cols-2 gap-4 text-start">
              <InputLabel
                label="رقم الجوال"
                required
                placeholder="أدخل رقم الجوال"
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && formik.errors.phone}
              />
              <div>
                <SelectCustom
                  className="h-12"
                  label="فئة المستخدم"
                  required
                  value={formik.values.user_category}
                  onValueChange={(value) => formik.setFieldValue("user_category", value)}
                >
                  {userCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectCustom>
                {formik.touched.user_category && formik.errors.user_category && (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.user_category}</div>
                )}
              </div>
            </div>
          </CardContent>}
        </Card>
      </Card>
    </form>
  );
}