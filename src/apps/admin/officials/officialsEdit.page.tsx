import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/auth.context";

const validationSchema = Yup.object({
  name: Yup.string().required("الاسم بالكامل مطلوب"),
  phone: Yup.string()
    .required("رقم الموبايل مطلوب")
    .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط")
    .min(10, "رقم الموبايل يجب أن يكون على الأقل 10 أرقام")
    .max(15, "رقم الموبايل يجب أن يكون على الأكثر 15 أرقام"),
  user_category: Yup.string().required("فئة المستخدم مطلوبة"),
  salary: Yup.number()
    .min(0, "الراتب يجب أن يكون أكبر من أو يساوي 0")
    .optional(),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .optional(),
});

// User category options
const userCategories = [
  { value: "admin", label: "مسؤول عام" },
  { value: "accounting_employee", label: "موظف حسابات" },
  { value: "transformer_employee", label: "موظف حجوزات" },
];

export default function EditAdminPage() {
  const { id } = useParams();
  const {user} = useUser()
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      user_category: "",
      salary: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Split name into first_name and last_name
        const nameParts = values.name.trim().split(" ");
        const first_name = nameParts[0];
        const last_name = nameParts.slice(1).join(" ") || ""; // Handle single-word names

        const payload = {
          auth_user_id: user.user_id, // Use dynamic id instead of hardcoded 2
          first_name,
          last_name,
          phone: values.phone,
          user_category: values.user_category,
          ...(values.salary && { salary: parseFloat(values.salary) }), // Include only if provided
          ...(values.password && { password: values.password }), // Include only if provided
        };
        const response = await api.post(`/user/update-full/${id}`, payload);

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
        const response = await api.get(`/user_info/${id}`);
        const userData = response.data.data;
        formik.setValues({
          name: userData.name || "",
          phone: userData.phone || "",
          user_category: userData.user_category || "",
          salary: "", // Leave empty
          password: "", // Leave empty
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("حدث خطأ أثناء جلب بيانات المستخدم");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <form onSubmit={formik.handleSubmit} dir="rtl">
      <Card className="w-full flex flex-col gap-4 shadow-none border-none">
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>تعديل بيانات المستخدم</CardTitle>
            {formik.values.name && (
              <Button
                type="submit"
                className="bg-green-700 md:px-7 hover:bg-green-800"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "جاري التحديث..." : "تحديث"}
              </Button>
            )}
          </CardHeader>
          {formik.values.name && (
            <CardContent className="grid gap-6 text-right">
              <CardTitle>
                <span>المعلومات الأساسية </span>
                <span className="text-xs text-red-500 -mb-2 font-normal">
                  *مطلوب
                </span>
              </CardTitle>
              <InputLabel
                label="الاسم بالكامل"
                required
                placeholder="أدخل الاسم بالكامل"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && formik.errors.name}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <InputLabel
                  label="رقم الموبايل"
                  required
                  placeholder="أدخل رقم الموبايل"
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && formik.errors.phone}
                />
                <div>
                  <Select
                    required
                    value={formik.values.user_category} // Controlled value from Formik
                    onValueChange={(value) => {
                      formik.setFieldValue("user_category", value)
                    }}
                  >
                    <SelectTrigger className="w-full h-12 text-gray-700">
                      <SelectValue placeholder="فئة المستخدم" />
                    </SelectTrigger>{" "}
                    <SelectContent>
                      {userCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.user_category &&
                    formik.errors.user_category && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.user_category}
                      </div>
                    )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <InputLabel
                  label="الراتب (اختياري)"
                  placeholder="أدخل الراتب"
                  type="number"
                  name="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  error={formik.touched.salary && formik.errors.salary}
                />
                <InputLabel
                  label="كلمة المرور (اختياري)"
                  placeholder="أدخل كلمة المرور الجديدة"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && formik.errors.password}
                />
              </div>
            </CardContent>
          )}
        </Card>
      </Card>
    </form>
  );
}
