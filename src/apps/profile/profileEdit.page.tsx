import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { useUser } from "@/hooks/auth.context";

const validationSchema = Yup.object({
  name: Yup.string().required("الاسم بالكامل مطلوب"),
  phone: Yup.string()
    .required("رقم الموبايل مطلوب")
    .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط")
    .min(10, "رقم الموبايل يجب أن يكون على الأقل 10 أرقام")
    .max(15, "رقم الموبايل يجب أن يكون على الأكثر 15 أرقام"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .optional(),
});

export default function ProfileEditPage() {
  const { user, fetchUser } = useUser();
  const id = user?.user_id;
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Split name into first_name and last_name
        const nameParts = values.name.trim().split(" ");
        const first_name = nameParts[0];
        const last_name = nameParts.slice(1).join(" ") || "";

        const payload = {
          auth_user_id: user?.user_id, // Ensure user_id exists
          first_name,
          last_name,
          phone: values.phone,
          ...(values.password && { password: values.password }), // Include only if provided
        };
        await api.post(`/user/self-update/${id}`, payload);
        toast.success("تم تحديث بيانات المستخدم بنجاح");
        fetchUser()
      } catch (error:any) {
        console.error("Error updating user:", error); // Debug: Log full error
        toast.error(
          error.response?.data?.message || "حدث خطأ أثناء تحديث البيانات"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/user_info/${id}`);
        const userData = response.data.data;
        console.log("Fetched user data:", userData); // Debug: Check fetched data
        formik.setValues({
          name: userData.name || "",
          phone: userData.phone || "",
          password: "", // Leave empty
        });
      } catch (error) {
        console.error("Error fetching user data:", error); // Debug: Log full error
        toast.error("حدث خطأ أثناء جلب بيانات المستخدم");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]); // Removed formik from dependencies to avoid unnecessary re-renders

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <form onSubmit={formik.handleSubmit} dir="rtl">
      <Card className="w-full flex flex-col gap-4 shadow-none border-none">
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>تعديل الملف الشخصي</CardTitle>
            {formik.values.name && (
              <Button
                type="submit"
                className="bg-green-700 md:px-7 hover:bg-green-800"
                disabled={formik.isSubmitting || !formik.isValid} // Disable if invalid
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
              <div className="grid lg:grid-cols-3 gap-4">
                <InputLabel
                  label="الاسم بالكامل"
                  required
                  placeholder="أدخل الاسم بالكامل"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} // Ensure touched state updates
                  error={formik.touched.name && formik.errors.name}
                />
                <InputLabel
                  label="رقم الموبايل"
                  required
                  placeholder="أدخل رقم الموبايل"
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && formik.errors.phone}
                />
                <InputLabel
                  label="كلمة المرور (اختياري)"
                  placeholder="أدخل كلمة المرور الجديدة"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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